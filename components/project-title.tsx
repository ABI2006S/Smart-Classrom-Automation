'use client'

import { motion, useReducedMotion } from 'framer-motion'

export function ProjectTitle() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="project-title-section" aria-labelledby="project-title-heading">
      <motion.div
        className="project-title-content"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : { duration: 0.58, ease: [0.16, 1, 0.3, 1] as const }
        }
      >
      
        <h2 id="project-title-heading">Smart Class Automation</h2>
    
      </motion.div>
    </section>
  )
}
