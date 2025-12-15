import { useState, useEffect } from 'react'

/**
 * Hook to determine which section is currently in view based on scroll position
 * @param sectionIds - Array of section IDs to track
 * @param offset - Offset from top of viewport to consider (default: 100px)
 * @returns The ID of the currently active section
 */
export function useActiveSection(sectionIds: string[], offset: number = 100): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset

      // Find the section that is currently in view
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i])
          return
        }
      }

      // Default to first section if none found
      if (sectionIds.length > 0) {
        setActiveSection(sectionIds[0])
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sectionIds, offset])

  return activeSection
}
