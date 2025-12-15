/**
 * Represents an example sentence with both English and Chinese translations
 */
export interface ChunkExample {
  english: string
  chinese: string
}

/**
 * Represents a single language chunk with all its details
 */
export interface ChunkData {
  number: number // 1-200
  title: string // e.g., "Speaking of..."
  meaning: string // Chinese meaning
  coreUsage: string // Core usage explanation
  commonMistake: string // Common mistake to avoid
  examples: ChunkExample[] // 2-3 example sentences
  category: string // Main category ID
  subcategory: string // Subcategory ID
}

/**
 * Represents a subcategory within a main category
 */
export interface Subcategory {
  id: string
  title: string
  range: string // e.g., "001-010"
}

/**
 * Represents a main category containing subcategories
 */
export interface Category {
  id: string
  title: string
  subcategories: Subcategory[]
}

/**
 * Represents a navigation item for the menu
 */
export interface NavItem {
  id: string
  label: string
  href: string
  children?: NavItem[]
}

/**
 * Represents the navigation data structure
 */
export interface NavigationData {
  parts: {
    id: string
    title: string
    categories: {
      id: string
      title: string
      range: string
    }[]
  }[]
}

/**
 * Represents an item in the alphabetical index
 */
export interface IndexItem {
  letter: string
  chunks: { number: number; title: string }[]
}
