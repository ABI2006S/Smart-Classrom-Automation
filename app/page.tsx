import { ProjectCarousel } from '@/components/project-carousel'
import { ProjectTitle } from '@/components/project-title'

export default function HomePage() {
  return (
    <div className="site-shell">
      <main id="main-content">
        <ProjectCarousel />
        <ProjectTitle />
      </main>
    </div>
  )
}
