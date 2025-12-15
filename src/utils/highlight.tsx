import type { ReactNode } from 'react'
import { escapeRegex } from './search'

/**
 * Highlight matching text within a string
 * Returns an array of React nodes with matching portions wrapped in <mark> elements
 */
export function highlightText(text: string, searchTerm: string): ReactNode[] {
  if (!searchTerm.trim()) {
    return [text]
  }

  const escapedTerm = escapeRegex(searchTerm.trim())
  const regex = new RegExp(`(${escapedTerm})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, index) => {
    if (part.toLowerCase() === searchTerm.toLowerCase().trim()) {
      return (
        <mark key={index} className="highlight">
          {part}
        </mark>
      )
    }
    return part
  })
}

/**
 * Check if text contains the search term (case-insensitive)
 */
export function textContainsSearch(text: string, searchTerm: string): boolean {
  if (!searchTerm.trim()) return false
  return text.toLowerCase().includes(searchTerm.toLowerCase().trim())
}
