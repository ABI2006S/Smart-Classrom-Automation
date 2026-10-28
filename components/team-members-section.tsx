'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { CoverflowCarousel } from '@/components/ui/coverflow-carousel'

import card1 from '@/cards/1.jpeg'
import card2 from '@/cards/2.jpeg'
import card3 from '@/cards/3.jpeg'
import card4 from '@/cards/4.jpeg'
import card5 from '@/cards/5.jpeg'
import card6 from '@/cards/6.jpeg'
import card7 from '@/cards/7.jpeg'
import card8 from '@/cards/8.jpeg'
import card9 from '@/cards/9.jpeg'
import card10 from '@/cards/10.jpeg'
import card11 from '@/cards/11.jpeg'
import card12 from '@/cards/12.jpeg'
import card13 from '@/cards/13.jpeg'
import card14 from '@/cards/14.jpeg'

export const teamMemberSlides = [
  { src: card1, alt: 'Team Member 1' },
  { src: card2, alt: 'Team Member 2' },
  { src: card3, alt: 'Team Member 3' },
  { src: card4, alt: 'Team Member 4' },
  { src: card5, alt: 'Team Member 5' },
  { src: card6, alt: 'Team Member 6' },
  { src: card7, alt: 'Team Member 7' },
  { src: card8, alt: 'Team Member 8' },
  { src: card9, alt: 'Team Member 9' },
  { src: card10, alt: 'Team Member 10' },
  { src: card11, alt: 'Team Member 11' },
  { src: card12, alt: 'Team Member 12' },
  { src: card13, alt: 'Team Member 13' },
  { src: card14, alt: 'Team Member 14' },
]

export function TeamMembersSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="team-members"
      className="team-members-section relative w-full pt-16 pb-24 md:pt-20 md:pb-32 overflow-hidden border-t border-black/8"
      aria-labelledby="team-members-heading"
    >
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 md:mb-12"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : { duration: 0.58, ease: [0.16, 1, 0.3, 1] as const }
        }
      >
        <p className="section-eyebrow text-[9px] font-semibold tracking-[0.22em] text-neutral-400 uppercase mb-2">
          The People Behind The Project
        </p>
        <h2
          id="team-members-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-900 dark:text-white"
        >
          Team Members
        </h2>
      </motion.div>

      <CoverflowCarousel
        slides={teamMemberSlides}
        loop
        showCaption={false}
        showPagination={false}
        showNavigation
        label="Team Members"
        cardWidth="clamp(160px, 22vw, 260px)"
        rotation={32}
        depth={150}
        gap={60}
      />
    </section>
  )
}
