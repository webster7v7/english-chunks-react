import { useMemo } from 'react'
import type { ChunkData } from '../data/types'
import { filterChunks } from '../utils/search'
import { useDebounce } from './useDebounce'

/**
 * Hook to handle search filtering with debounce
 * @param chunks - Array of chunks to search through
 * @param searchTerm - The search term to filter by
 * @param debounceDelay - Delay for debouncing (default: 300ms)
 * @returns Filtered chunks based on the debounced search term
 */
export function useSearch(
  chunks: ChunkData[],
  searchTerm: string,
  debounceDelay: number = 300
): ChunkData[] {
  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay)

  const filteredChunks = useMemo(() => {
    return filterChunks(chunks, debouncedSearchTerm)
  }, [chunks, debouncedSearchTerm])

  return filteredChunks
}
