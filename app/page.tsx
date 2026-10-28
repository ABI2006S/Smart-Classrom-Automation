import { ProjectCarousel } from '@/components/project-carousel'
import { ProjectTitle } from '@/components/project-title'
import { SmartClassroomDocs } from '@/components/smart-classroom-docs'
import { TeamMembersSection } from '@/components/team-members-section'

export default function HomePage() {
  return (
    <div className="site-shell">
      <main id="main-content">
        <ProjectCarousel />
        <ProjectTitle />
        <SmartClassroomDocs />
        <TeamMembersSection />
      </main>
    </div>
  )
}
