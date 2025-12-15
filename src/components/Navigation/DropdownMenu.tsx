import { useState } from 'react'
import type { NavItem } from '../../data/types'

interface DropdownMenuProps {
  item: NavItem
  isActive: boolean
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}

export function DropdownMenu({ item, isActive, onNavClick }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleMouseEnter = () => {
    if (window.innerWidth > 768) {
      setIsOpen(true)
    }
  }
  
  const handleMouseLeave = () => {
    if (window.innerWidth > 768) {
      setIsOpen(false)
    }
  }

  const handleClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(!isOpen)
    }
  }

  if (!item.children || item.children.length === 0) {
    return (
      <a
        href={item.href}
        className={`nav-link ${isActive ? 'active' : ''}`}
        onClick={(e) => onNavClick(e, item.href)}
      >
        {item.label}
      </a>
    )
  }

  return (
    <div
      className={`navbar-dropdown ${isOpen ? 'active' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`dropdown-trigger ${isActive ? 'active' : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {item.label}
        <span className="dropdown-icon">▼</span>
      </button>

      <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
        {item.children.map((child) => (
          <a
            key={child.id}
            href={child.href}
            className="dropdown-item"
            onClick={(e) => onNavClick(e, child.href)}
          >
            {child.label}
          </a>
        ))}
      </div>
    </div>
  )
}
