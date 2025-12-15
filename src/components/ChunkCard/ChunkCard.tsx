import type { ChunkData } from '../../data/types'
import { highlightText } from '../../utils/highlight'
import { ExampleList } from './ExampleList'
import './ChunkCard.css'

interface ChunkCardProps {
  chunk: ChunkData
  searchTerm?: string
  animationDelay?: number
}

export function ChunkCard({ chunk, searchTerm = '', animationDelay = 0 }: ChunkCardProps) {
  const formatNumber = (num: number) => num.toString().padStart(3, '0')

  return (
    <div
      className="chunk-card"
      data-number={formatNumber(chunk.number)}
      id={`chunk-${formatNumber(chunk.number)}`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="chunk-header">
        <div className="chunk-number">{formatNumber(chunk.number)}</div>
        <h3 className="chunk-title">
          {searchTerm ? highlightText(chunk.title, searchTerm) : chunk.title}
        </h3>
      </div>

      <div className="chunk-meaning">
        含义：{searchTerm ? highlightText(chunk.meaning, searchTerm) : chunk.meaning}
      </div>

      <div className="chunk-section">
        <div className="chunk-section-title">核心语用</div>
        <div className="chunk-text">
          {searchTerm ? highlightText(chunk.coreUsage, searchTerm) : chunk.coreUsage}
        </div>
      </div>

      <div className="pitfall">
        <div className="pitfall-title">典型误区</div>
        <div>{searchTerm ? highlightText(chunk.commonMistake, searchTerm) : chunk.commonMistake}</div>
      </div>

      <ExampleList examples={chunk.examples} searchTerm={searchTerm} />
    </div>
  )
}
