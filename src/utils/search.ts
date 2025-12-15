import type { ChunkData } from '../data/types'

/**
 * Escape special regex characters in a string
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Check if a chunk matches the search term
 * Searches in title, meaning, coreUsage, commonMistake, and examples
 */
export function chunkMatchesSearch(chunk: ChunkData, searchTerm: string): boolean {
  if (!searchTerm.trim()) return true

  const term = searchTerm.toLowerCase().trim()

  // Check title
  if (chunk.title.toLowerCase().includes(term)) return true

  // Check meaning
  if (chunk.meaning.toLowerCase().includes(term)) return true

  // Check core usage
  if (chunk.coreUsage.toLowerCase().includes(term)) return true

  // Check common mistake
  if (chunk.commonMistake.toLowerCase().includes(term)) return true

  // Check examples
  for (const example of chunk.examples) {
    if (example.english.toLowerCase().includes(term)) return true
    if (example.chinese.toLowerCase().includes(term)) return true
  }

  return false
}

/**
 * Filter chunks by search term
 * Returns all chunks that match the search term in title, meaning, or examples
 */
export function filterChunks(chunks: ChunkData[], searchTerm: string): ChunkData[] {
  if (!searchTerm.trim()) return chunks

  return chunks.filter((chunk) => chunkMatchesSearch(chunk, searchTerm))
}
