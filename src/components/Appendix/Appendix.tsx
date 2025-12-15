import { useMemo } from 'react'
import type { ChunkData, IndexItem } from '../../data/types'
import './Appendix.css'

interface AppendixProps {
  chunks: ChunkData[]
}

export function Appendix({ chunks }: AppendixProps) {
  const alphabeticalIndex = useMemo(() => {
    const index: Map<string, { number: number; title: string }[]> = new Map()

    chunks.forEach((chunk) => {
      // Get the first letter of the title (uppercase)
      const firstChar = chunk.title.charAt(0).toUpperCase()
      // Only include A-Z letters
      if (/[A-Z]/.test(firstChar)) {
        if (!index.has(firstChar)) {
          index.set(firstChar, [])
        }
        index.get(firstChar)!.push({ number: chunk.number, title: chunk.title })
      }
    })

    // Sort each group alphabetically by title
    index.forEach((items) => {
      items.sort((a, b) => a.title.localeCompare(b.title))
    })

    // Convert to array and sort by letter
    const result: IndexItem[] = []
    const sortedLetters = Array.from(index.keys()).sort()
    sortedLetters.forEach((letter) => {
      result.push({ letter, chunks: index.get(letter)! })
    })

    return result
  }, [chunks])

  const handleIndexClick = (number: number) => {
    const element = document.getElementById(`chunk-${number.toString().padStart(3, '0')}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="appendix" className="appendix">
      <h2 className="appendix-title">附录：语块索引</h2>
      <p className="appendix-description">按首字母排序，点击可跳转到对应语块</p>

      <div className="alphabet-index">
        {alphabeticalIndex.map(({ letter, chunks: letterChunks }) => (
          <div key={letter} className="letter-group">
            <h3 className="letter-heading">{letter}</h3>
            <ul className="index-list">
              {letterChunks.map(({ number, title }) => (
                <li key={number}>
                  <button
                    className="index-item"
                    onClick={() => handleIndexClick(number)}
                  >
                    <span className="index-number">{number.toString().padStart(3, '0')}</span>
                    <span className="index-title">{title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
