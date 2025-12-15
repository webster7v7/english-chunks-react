import './Header.css'

interface HeaderProps {
  title?: string
  subtitle?: string
}

export function Header({
  title = '英语兔 | 200个黄金语块',
  subtitle = '掌握地道英语表达，让你的英语更自然流畅',
}: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">{title}</h1>
        <p className="header-subtitle">{subtitle}</p>
      </div>
    </header>
  )
}
