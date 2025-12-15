import type { ChunkData } from '../../data/types'
import { ChunkGrid } from './ChunkGrid'
import { navigationData } from '../../data'
import './ChunkSection.css'

interface ChunkSectionProps {
  id: string
  title: string
  chunks: ChunkData[]
  searchTerm?: string
}

export function ChunkSection({ id, title, chunks, searchTerm = '' }: ChunkSectionProps) {
  // Don't render if no chunks match the search
  if (searchTerm && chunks.length === 0) {
    return null
  }

  // Find the part data for this section
  const partData = navigationData.parts.find(part => part.id === id)

  // Group chunks by subcategory
  const chunksByCategory = partData?.categories.reduce((acc, category) => {
    const categoryId = `${id}-${category.id}`
    const categoryChunks = chunks.filter(chunk => chunk.subcategory === category.id)
    if (categoryChunks.length > 0) {
      acc[categoryId] = {
        category,
        chunks: categoryChunks
      }
    }
    return acc
  }, {} as Record<string, { category: typeof partData.categories[0], chunks: ChunkData[] }>) || {}

  return (
    <section id={id} className="content-section">
      <h2 className="section-title">{title}</h2>
      
      {Object.entries(chunksByCategory).map(([categoryId, { category, chunks: categoryChunks }]) => (
        <div key={categoryId} id={categoryId} className="category-section">
          <h3 className="category-title">
            {category.title} ({category.range})
          </h3>
          <ChunkGrid chunks={categoryChunks} searchTerm={searchTerm} />
        </div>
      ))}
      
      {/* Fallback: if no categories found, show all chunks */}
      {Object.keys(chunksByCategory).length === 0 && (
        <ChunkGrid chunks={chunks} searchTerm={searchTerm} />
      )}
    </section>
  )
}
