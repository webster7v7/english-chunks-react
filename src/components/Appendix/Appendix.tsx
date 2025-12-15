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

      <div className="appendix-conclusion">
        <div className="conclusion-card">
          <h2 className="conclusion-title">写在最后</h2>
          <div className="conclusion-content">
            <p className="conclusion-motto">
              <strong>勤能补拙是良训，一分辛苦一分才</strong>
            </p>
            <p className="conclusion-text">
              以上就是所有的"200个黄金语块"。但这只是第一步。语言是"用"出来的，不是"存"出来的。
              不要让这本手册在你的收藏夹里吃灰。
            </p>
            <p className="conclusion-text">
              在下一次英语对话、写作或邮件中，试着有意识地替换掉那些平淡的词汇，用上你刚刚学到的"黄金语块"。
              你会发现，自信心会随着地道程度的提升而倍增。
            </p>
            <p className="conclusion-signature">
              —— 英语兔团队
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
