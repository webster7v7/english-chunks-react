import { useState, useMemo } from 'react'
import {
  Header,
  Navigation,
  SearchBox,
  Introduction,
  ChunkSection,
  BackToTop,
  Appendix,
} from './components'
import { chunks, getNavItems, navigationData, getAllSectionIds } from './data'
import { useSearch, useActiveSection } from './hooks'
import { filterChunks } from './utils'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const navItems = getNavItems()

  // Get all section IDs for scroll tracking (including subcategories)
  const sectionIds = useMemo(() => {
    return getAllSectionIds()
  }, [])

  const activeSection = useActiveSection(sectionIds)

  // Filter chunks based on search
  const filteredChunks = useSearch(chunks, searchTerm)

  // Group filtered chunks by part
  const chunksByPart = useMemo(() => {
    const grouped: Record<string, typeof chunks> = {}
    navigationData.parts.forEach((part) => {
      grouped[part.id] = filterChunks(
        filteredChunks.filter((chunk) => chunk.category === part.id),
        searchTerm
      )
    })
    return grouped
  }, [filteredChunks, searchTerm])

  return (
    <div className="app">
      <Header />
      <Navigation items={navItems} activeSection={activeSection} />

      <main className="main-content">        
        <div className="container">
          <SearchBox value={searchTerm} onChange={setSearchTerm} />

          {!searchTerm && <Introduction />}

          {navigationData.parts.map((part) => (
            <ChunkSection
              key={part.id}
              id={part.id}
              title={`PART ${part.id.replace('part', '')} - ${part.title}`}
              chunks={chunksByPart[part.id] || []}
              searchTerm={searchTerm}
            />
          ))}

          {!searchTerm && <Appendix chunks={chunks} />}
        </div>
      </main>

      <BackToTop />
    </div>
  )
}

export default App
