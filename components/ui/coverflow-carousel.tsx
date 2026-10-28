'use client'

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import Image, { type StaticImageData } from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface CoverflowSlide {
  src: string | StaticImageData
  alt: string
  title?: string
  subtitle?: string
}

export interface CoverflowCarouselProps {
  slides: CoverflowSlide[]
  initialIndex?: number
  loop?: boolean
  showCaption?: boolean
  showPagination?: boolean
  showNavigation?: boolean
  label?: string
  cardWidth?: string
  rotation?: number
  depth?: number
  gap?: number
  fade?: number
  className?: string
  onCardChange?: (index: number) => void
}

export function CoverflowCarousel({
  slides,
  initialIndex = 0,
  loop = true,
  showCaption = false,
  showPagination = false,
  showNavigation = true,
  label = 'Team Members',
  cardWidth = 'clamp(180px, 24vw, 280px)',
  rotation = 35,
  depth = 160,
  gap = 62,
  fade = 0.55,
  className,
  onCardChange,
}: CoverflowCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(
    Math.max(0, Math.min(initialIndex, slides.length - 1))
  )
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const isPointerDownRef = useRef(false)
  const pointerStartRef = useRef<{ x: number; y: number; time: number } | null>(null)
  const currentDragOffsetRef = useRef(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const total = slides.length

  const goToSlide = useCallback(
    (index: number) => {
      let target = index
      if (loop) {
        target = (target % total + total) % total
      } else {
        target = Math.max(0, Math.min(target, total - 1))
      }
      setActiveIndex(target)
      onCardChange?.(target)
    },
    [loop, total, onCardChange]
  )

  const nextSlide = useCallback(() => {
    if (loop || activeIndex < total - 1) {
      goToSlide(activeIndex + 1)
    }
  }, [activeIndex, total, loop, goToSlide])

  const prevSlide = useCallback(() => {
    if (loop || activeIndex > 0) {
      goToSlide(activeIndex - 1)
    }
  }, [activeIndex, loop, goToSlide])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      nextSlide()
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      prevSlide()
    } else if (event.key === 'Home') {
      event.preventDefault()
      goToSlide(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      goToSlide(total - 1)
    }
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return
    isPointerDownRef.current = true
    setIsDragging(true)
    pointerStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      time: Date.now(),
    }
    currentDragOffsetRef.current = 0
    setDragOffset(0)
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // Ignore if setPointerCapture fails on certain devices
    }
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current || !pointerStartRef.current) return
    const deltaX = event.clientX - pointerStartRef.current.x
    const deltaY = event.clientY - pointerStartRef.current.y

    // Allow vertical scrolling if gesture is predominantly vertical
    if (Math.abs(deltaY) > Math.abs(deltaX) * 1.5 && Math.abs(deltaX) < 15) {
      return
    }

    currentDragOffsetRef.current = deltaX
    setDragOffset(deltaX)
  }

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return
    isPointerDownRef.current = false
    setIsDragging(false)

    const start = pointerStartRef.current
    pointerStartRef.current = null
    const finalOffset = currentDragOffsetRef.current
    currentDragOffsetRef.current = 0
    setDragOffset(0)

    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId)
      }
    } catch {
      // Ignore releasePointerCapture errors
    }

    if (!start) return

    const deltaTime = Math.max(1, Date.now() - start.time)
    const velocity = Math.abs(finalOffset) / deltaTime
    const threshold = 35

    // Fast flick or dragging past threshold
    if (Math.abs(finalOffset) > threshold || velocity > 0.4) {
      if (finalOffset < 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }

  // Calculate circular distance between active index and given slide index
  const getRelativePosition = (index: number) => {
    if (!loop) {
      return index - activeIndex
    }
    let diff = (index - activeIndex) % total
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return diff
  }

  // Dynamic drag progression factor (-1 to 1)
  const dragProgress = Math.max(-1, Math.min(1, dragOffset / 220))

  return (
    <div
      ref={carouselRef}
      className={cn(
        'relative w-full max-w-7xl mx-auto flex flex-col items-center select-none outline-none py-6 overflow-hidden',
        className
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* 3D Coverflow Stage */}
      <div
        className="relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        style={{
          perspective: 1200,
          perspectiveOrigin: 'center center',
          height: 'clamp(320px, 44vw, 440px)',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {slides.map((slide, index) => {
            const rel = getRelativePosition(index)
            // Adjust relative position with live drag progress
            const effectiveRel = rel - dragProgress
            const absRel = Math.abs(effectiveRel)
            const isActive = Math.round(effectiveRel) === 0
            const isVisuallyActive = absRel < 0.5

            // Only render cards within visible radius to keep performance snappy
            if (absRel > 4.5 && total > 8) {
              return null
            }

            // Direction: -1 for left, 1 for right, 0 for center
            const direction = effectiveRel === 0 ? 0 : effectiveRel > 0 ? 1 : -1
            const cardRotateY = prefersReducedMotion
              ? 0
              : direction * -rotation * Math.min(1, absRel)
            const cardTranslateX = effectiveRel * gap
            const cardTranslateZ = prefersReducedMotion
              ? 0
              : -Math.min(absRel * depth, depth * 2.2)
            const cardScale = prefersReducedMotion
              ? 1
              : Math.max(0.74, 1 - absRel * 0.12)
            const cardOpacity = isVisuallyActive
              ? 1
              : Math.max(fade, 1 - absRel * (1 - fade))
            const zIndex = Math.round(100 - absRel * 10)

            return (
              <motion.div
                key={index}
                className="absolute flex items-center justify-center transition-transform"
                role="group"
                aria-roledescription="slide"
                aria-label={`Card ${index + 1} of ${total}`}
                aria-hidden={!isActive}
                onClick={() => {
                  if (Math.abs(currentDragOffsetRef.current) < 5 && !isVisuallyActive) {
                    goToSlide(index)
                  }
                }}
                animate={{
                  x: `${cardTranslateX}%`,
                  rotateY: cardRotateY,
                  z: cardTranslateZ,
                  scale: cardScale,
                  opacity: cardOpacity,
                }}
                transition={
                  isDragging
                    ? { duration: 0 }
                    : prefersReducedMotion
                    ? { duration: 0.01 }
                    : { type: 'spring', stiffness: 320, damping: 32, mass: 0.8 }
                }
                style={{
                  width: cardWidth,
                  aspectRatio: '2 / 3',
                  maxWidth: '85vw',
                  transformStyle: 'preserve-3d',
                  zIndex,
                  cursor: isVisuallyActive ? 'grab' : 'pointer',
                }}
              >
                <div
                  className={cn(
                    'group relative w-full h-full rounded-2xl overflow-hidden bg-neutral-900 border transition-all duration-300',
                    isVisuallyActive
                      ? 'border-neutral-800 shadow-2xl ring-1 ring-black/5 dark:ring-white/10'
                      : 'border-neutral-200/40 dark:border-neutral-800/40 shadow-md'
                  )}
                  style={{
                    boxShadow: isVisuallyActive
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 10px 20px -5px rgba(0, 0, 0, 0.15)'
                      : '0 10px 25px -5px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 640px) 75vw, (max-width: 1024px) 30vw, 280px"
                    className="object-cover object-center pointer-events-none select-none transition-transform duration-500 group-hover:scale-105"
                    priority={index === activeIndex}
                  />

                  {/* Subtle glossy card overlay */}
                  <div
                    className={cn(
                      'absolute inset-0 pointer-events-none transition-opacity duration-300',
                      isVisuallyActive ? 'opacity-0' : 'bg-black/15'
                    )}
                  />

                  {/* Optional Caption */}
                  {showCaption && (slide.title || slide.subtitle) && (
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white pointer-events-none">
                      {slide.title && (
                        <p className="font-semibold text-sm truncate">{slide.title}</p>
                      )}
                      {slide.subtitle && (
                        <p className="text-xs text-neutral-300 truncate">{slide.subtitle}</p>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      {(showNavigation || showPagination) && (
        <div className="flex items-center justify-center gap-6 mt-6 z-20">
          {showNavigation && (
            <button
              type="button"
              className="p-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:scale-105 transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-neutral-100 outline-none cursor-pointer"
              aria-label="Previous slide"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {showPagination && (
            <div className="flex items-center gap-1.5" role="group" aria-label="Slide indicators">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === activeIndex ? 'true' : undefined}
                  onClick={() => goToSlide(i)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300 cursor-pointer',
                    i === activeIndex
                      ? 'w-6 bg-neutral-900 dark:bg-neutral-100'
                      : 'w-1.5 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400'
                  )}
                />
              ))}
            </div>
          )}

          {showNavigation && (
            <button
              type="button"
              className="p-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:scale-105 transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-neutral-100 outline-none cursor-pointer"
              aria-label="Next slide"
              onClick={nextSlide}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {/* Screen reader announcement */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {activeIndex + 1} of {total}: {slides[activeIndex]?.alt || `Team Member ${activeIndex + 1}`}
      </p>
    </div>
  )
}

