import { useState } from 'react'
import type { NavItem } from '../../data/types'
import { useStickyNav } from '../../hooks'
import { DropdownMenu } from './DropdownMenu'
import './Navigation.css'

interface NavigationProps {
  items: NavItem[]
  activeSection?: string
}

export function Navigation({ items, activeSection }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isNavVisible = useStickyNav()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      // Calculate offset for sticky navigation
      const navHeight = 100 // Approximate height of sticky nav
      const elementPosition = element.offsetTop - navHeight
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className={`nav-container ${isNavVisible ? 'visible' : 'hidden'}`}>
      <div className="nav-content">
        <button
          className={`navbar-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div className={`navbar-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          {items.map((item) => (
            <DropdownMenu
              key={item.id}
              item={item}
              isActive={activeSection?.startsWith(item.id) || false}
              onNavClick={handleNavClick}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}
