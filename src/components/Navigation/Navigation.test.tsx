import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { Navigation } from './Navigation'
import type { NavItem } from '../../data/types'

// Mock the useStickyNav hook
vi.mock('../../hooks', () => ({
  useStickyNav: () => true,
}))

const mockNavItems: NavItem[] = [
  {
    id: 'intro',
    label: '课程介绍',
    href: '#intro',
  },
  {
    id: 'part1',
    label: '态度与观点表达',
    href: '#part1',
    children: [
      {
        id: 'part1-topic',
        label: '开启话题与引入观点 (001-010)',
        href: '#part1-topic',
      },
      {
        id: 'part1-agree',
        label: '表达强烈的同意 (011-020)',
        href: '#part1-agree',
      },
    ],
  },
]

// Mock scrollTo
const mockScrollTo = vi.fn()
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
})

// Mock getElementById
const mockGetElementById = vi.fn()
Object.defineProperty(document, 'getElementById', {
  value: mockGetElementById,
  writable: true,
})

describe('Navigation', () => {
  beforeEach(() => {
    mockScrollTo.mockClear()
    mockGetElementById.mockClear()
  })

  it('renders navigation items correctly', () => {
    render(<Navigation items={mockNavItems} />)
    
    expect(screen.getByText('课程介绍')).toBeInTheDocument()
    expect(screen.getByText('态度与观点表达')).toBeInTheDocument()
  })

  it('handles navigation click with smooth scrolling', () => {
    const mockElement = { offsetTop: 500 }
    mockGetElementById.mockReturnValue(mockElement)

    render(<Navigation items={mockNavItems} />)
    
    const introLink = screen.getByText('课程介绍')
    fireEvent.click(introLink)

    expect(mockGetElementById).toHaveBeenCalledWith('intro')
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 400, // 500 - 100 (nav height)
      behavior: 'smooth',
    })
  })

  it('shows dropdown menu items on hover', () => {
    render(<Navigation items={mockNavItems} />)
    
    // Dropdown items should be in the document (but may be hidden via CSS)
    expect(screen.getByText('开启话题与引入观点 (001-010)')).toBeInTheDocument()
    expect(screen.getByText('表达强烈的同意 (011-020)')).toBeInTheDocument()
    
    // Hover over the dropdown trigger should activate the dropdown
    const dropdownTrigger = screen.getByText('态度与观点表达')
    const dropdown = dropdownTrigger.closest('.navbar-dropdown')!
    
    fireEvent.mouseEnter(dropdown)
    
    // Check if dropdown has active class
    expect(dropdown).toHaveClass('active')
  })

  it('handles dropdown item clicks', () => {
    const mockElement = { offsetTop: 800 }
    mockGetElementById.mockReturnValue(mockElement)

    render(<Navigation items={mockNavItems} />)
    
    // Open dropdown
    const dropdownTrigger = screen.getByText('态度与观点表达')
    fireEvent.mouseEnter(dropdownTrigger.closest('.navbar-dropdown')!)
    
    // Click on dropdown item
    const dropdownItem = screen.getByText('开启话题与引入观点 (001-010)')
    fireEvent.click(dropdownItem)

    expect(mockGetElementById).toHaveBeenCalledWith('part1-topic')
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 700, // 800 - 100 (nav height)
      behavior: 'smooth',
    })
  })
})