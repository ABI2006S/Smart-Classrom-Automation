'use client'

import Image from 'next/image'
import slideOne from '@/class/1.png'
import slideTwo from '@/class/2.png'
import slideThree from '@/class/3.png'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'

const slides = [
  {
    category: 'OVERVIEW',
    title: 'Prototype Overview',
    caption: 'A conceptual view of the complete classroom setup.',
    src: slideOne,
    alt: 'Classroom prototype overview, image 1 of 3.',
  },
  {
    category: 'HARDWARE & SENSORS',
    title: 'Hardware & Sensors',
    caption: 'An illustrative arrangement of electronics and sensing components.',
    src: slideTwo,
    alt: 'Classroom prototype overview, image 2 of 3.',
  },
  {
    category: 'CLASSROOM AUTOMATION',
    title: 'Classroom Automation',
    caption: 'A concept for a more responsive learning environment.',
    src: slideThree,
    alt: 'Classroom prototype overview, image 3 of 3.',
  },
]

export function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const swipeStart = useRef<{ x: number; y: number } | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const showSlide = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length)
  }

  const moveSlide = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + slides.length) % slides.length)
  }

  useEffect(() => {
    if (isPaused) return

    const intervalId = window.setInterval(() => {
      moveSlide(1)
    }, 4500)

    return () => window.clearInterval(intervalId)
  }, [isPaused])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      moveSlide(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      moveSlide(-1)
    }
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    swipeStart.current = { x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipeStart.current
    swipeStart.current = null
    if (!start) return

    const deltaX = event.clientX - start.x
    const deltaY = event.clientY - start.y
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.15) return

    moveSlide(deltaX < 0 ? 1 : -1)
  }

  const handlePointerCancel = () => {
    swipeStart.current = null
  }

  return (
    <section className="showcase-section" id="showcase" aria-labelledby="showcase-heading">
      <motion.div
        className="showcase-container"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : { duration: 0.58, ease: [0.16, 1, 0.3, 1] as const }
        }
      >


        <div
          className="carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Smart Class Automation concept gallery"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="carousel-stage"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            {slides.map((slide, index) => {
              const position = (index - activeIndex + slides.length) % slides.length
              const offset = position === 0 ? 0 : position === 1 ? 1 : -1
              const isActive = index === activeIndex

              return (
                <motion.article
                  key={slide.title}
                  className="carousel-slide"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
                  aria-hidden={!isActive}
                  initial={false}
                  animate={{
                    x: `${offset * 88}%`,
                    scale: isActive ? 1 : 0.86,
                    rotateY: offset * -13,
                    z: isActive ? 0 : -220,
                    opacity: isActive ? 1 : 0.58,
                  }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.01 }
                      : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
                  }
                  style={{
                    zIndex: isActive ? 3 : 2,
                    transformStyle: 'preserve-3d',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <div className="slide-surface">
                    <Image
                      className="slide-image"
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 640px) 88vw, (max-width: 1280px) 80vw, 1040px"
                      priority={index === 0}
                    />
                    <div className="slide-shade" aria-hidden="true" />
                    <p className="slide-placeholder-label">CONCEPT PLACEHOLDER</p>
                    <div className="slide-copy">
                      <p className="slide-index-label">0{index + 1} / 0{slides.length} · {slide.category}</p>
                      <h3>{slide.title}</h3>
                      <p className="slide-caption">{slide.caption}</p>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>

          <div className="carousel-footer">
            <p className="carousel-count" aria-hidden="true">
              <span className="carousel-count-current">0{activeIndex + 1}</span>
              <span className="carousel-count-divider">/</span>
              <span>0{slides.length}</span>
              <span className="carousel-count-title">{slides[activeIndex].title}</span>
            </p>

            <div className="carousel-pagination" role="group" aria-label="Choose a slide">
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  className="pagination-dot"
                  type="button"
                  aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  onClick={() => showSlide(index)}
                >
                  <span className="pagination-dot-indicator" aria-hidden="true" />
                </button>
              ))}
            </div>

            <div className="carousel-arrows" role="group" aria-label="Slide controls">
              <button
                className="carousel-arrow"
                type="button"
                aria-label="Previous slide"
                onClick={() => moveSlide(-1)}
              >
                <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.7} />
              </button>
              <button
                className="carousel-arrow"
                type="button"
                aria-label="Next slide"
                onClick={() => moveSlide(1)}
              >
                <ArrowRight aria-hidden="true" size={17} strokeWidth={1.7} />
              </button>
            </div>
          </div>
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            Slide {activeIndex + 1} of {slides.length}: {slides[activeIndex].title}
          </p>
        </div>
      </motion.div>
    </section>
  )
}
