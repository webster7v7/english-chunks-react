import type { ChunkData } from '../../data/types'
import { ChunkCard } from '../ChunkCard'

interface ChunkGridProps {
  chunks: ChunkData[]
  searchTerm?: string
}

export function ChunkGrid({ chunks, searchTerm = '' }: ChunkGridProps) {
  return (
    <div className="chunk-grid">
      {chunks.map((chunk, index) => (
        <ChunkCard
          key={chunk.number}
          chunk={chunk}
          searchTerm={searchTerm}
          animationDelay={index * 50}
        />
      ))}
    </div>
  )
}
