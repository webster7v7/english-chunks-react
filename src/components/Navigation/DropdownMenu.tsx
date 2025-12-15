import { useState } from 'react'
import type { NavItem } from '../../data/types'

interface DropdownMenuProps {
  item: NavItem
  isActive: boolean
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
  isMobile?: boolean
}

export function DropdownMenu({ item, isActive, onNavClick, isMobile = false }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsOpen(true)
    }
  }
  
  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsOpen(false)
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isMobile) {
      setIsOpen(!isOpen)
    }
  }

  if (!item.children || item.children.length === 0) {
    return (
      <a
        href={item.href}
        className={`nav-link ${isActive ? 'active' : ''} ${isMobile ? 'mobile' : ''}`}
        onClick={(e) => onNavClick(e, item.href)}
      >
        {item.label}
      </a>
    )
  }

  return (
    <div
      className={`navbar-dropdown ${isOpen ? 'active' : ''} ${isMobile ? 'mobile' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`dropdown-trigger ${isActive ? 'active' : ''} ${isMobile ? 'mobile' : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {item.label}
        <span className="dropdown-icon">▼</span>
      </button>

      <div className={`dropdown-menu ${isOpen ? 'open' : ''} ${isMobile ? 'mobile' : ''}`}>
        {item.children.map((child) => (
          <a
            key={child.id}
            href={child.href}
            className={`dropdown-item ${isMobile ? 'mobile' : ''}`}
            onClick={(e) => onNavClick(e, child.href)}
          >
            {child.label}
          </a>
        ))}
      </div>
    </div>
  )
}
