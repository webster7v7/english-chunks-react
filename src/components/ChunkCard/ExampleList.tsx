import type { ChunkExample } from '../../data/types'
import { highlightText } from '../../utils/highlight'

interface ExampleListProps {
  examples: ChunkExample[]
  searchTerm?: string
}

export function ExampleList({ examples, searchTerm = '' }: ExampleListProps) {
  return (
    <ul className="example-list">
      {examples.map((example, index) => (
        <li key={index}>
          <span className="example-english">
            {searchTerm ? highlightText(example.english, searchTerm) : example.english}
          </span>
          <em className="example-chinese">
            {searchTerm ? highlightText(example.chinese, searchTerm) : example.chinese}
          </em>
        </li>
      ))}
    </ul>
  )
}
