'use client'

import { ArrowDown, ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.58, ease: [0.16, 1, 0.3, 1] as const }

  return (
    <section className="hero-section" id="top" aria-labelledby="hero-heading">
      <motion.div
        className="hero-content"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={transition}
      >
      
        <h1
          className="hero-heading"
          id="hero-heading"
          aria-label="A Smarter Way to Learn."
        >
          A Smarter Way to{' '}
          <br className="hero-heading-break" />
          <span>Learn.</span>
        </h1>

        <p className="hero-copy">
          An intelligent classroom automation prototype designed to make
          learning environments more responsive, efficient, and connected.
        </p>

        <div className="hero-actions">
          <a className="button-primary" href="#showcase">
            Explore the Prototype
            <ArrowDown aria-hidden="true" size={16} strokeWidth={1.8} />
          </a>
          <a className="hero-secondary" href="#showcase">
            Discover the Project
            <ArrowRight aria-hidden="true" size={15} strokeWidth={1.7} />
          </a>
        </div>
      </motion.div>
    </section>
  )
}
