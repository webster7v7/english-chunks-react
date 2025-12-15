import type { NavItem, NavigationData } from './types'

/**
 * Navigation data structure for the 4 main parts and their subcategories
 */
export const navigationData: NavigationData = {
  parts: [
    {
      id: 'part1',
      title: '表明态度与观点',
      categories: [
        { id: 'topic', title: '开启话题与引入观点', range: '001-010' },
        { id: 'agree', title: '表达强烈的同意', range: '011-020' },
        { id: 'oppose', title: '委婉地表示反对', range: '021-030' },
        { id: 'certainty', title: '表达确定与不确定', range: '031-040' },
        { id: 'preference', title: '表达个人喜好与偏向', range: '041-050' },
      ],
    },
    {
      id: 'part2',
      title: '逻辑连接与铺陈',
      categories: [
        { id: 'info', title: '添加信息与进一步说明', range: '051-060' },
        { id: 'cause', title: '表达因果与理由', range: '061-070' },
        { id: 'example', title: '举例与具体化', range: '071-080' },
        { id: 'contrast', title: '转折与对比', range: '081-090' },
        { id: 'emphasis', title: '强调重点', range: '091-100' },
        { id: 'summary', title: '总结与归纳', range: '101-110' },
      ],
    },
    {
      id: 'part3',
      title: '互动与沟通策略',
      categories: [
        { id: 'clarify', title: '澄清与确认', range: '111-120' },
        { id: 'fill', title: '争取思考时间填充词', range: '121-130' },
        { id: 'interrupt', title: '打断与插话', range: '131-140' },
        { id: 'shift', title: '转移与结束话题', range: '141-150' },
        { id: 'response', title: '回应好消息/坏消息', range: '151-160' },
      ],
    },
    {
      id: 'part4',
      title: '高频特定场景功能',
      categories: [
        { id: 'request', title: '请求与建议', range: '161-170' },
        { id: 'help', title: '请求帮助与提供帮助', range: '171-180' },
        { id: 'assume', title: '假设与推测', range: '181-190' },
        { id: 'summary', title: '概括与模糊表达', range: '191-200' },
      ],
    },
  ],
}

/**
 * Convert navigation data to NavItem array for the Navigation component
 */
export function getNavItems(): NavItem[] {
  const mainNavItems = navigationData.parts.map((part) => ({
    id: part.id,
    label: part.title,
    href: `#${part.id}`,
    children: part.categories.map((cat) => ({
      id: `${part.id}-${cat.id}`,
      label: `${cat.title} (${cat.range})`,
      href: `#${part.id}-${cat.id}`,
    })),
  }))

  // Course introduction at the beginning
  const courseIntro: NavItem = {
    id: 'course-intro',
    label: '课程介绍',
    href: '#course-intro',
  }

  // Appendix index at the end
  const appendixIndex: NavItem = {
    id: 'appendix',
    label: '附录索引',
    href: '#appendix',
  }

  return [courseIntro, ...mainNavItems, appendixIndex]
}

/**
 * Get all section IDs for scroll tracking
 */
export function getAllSectionIds(): string[] {
  const ids: string[] = ['course-intro']
  navigationData.parts.forEach((part) => {
    ids.push(part.id)
    part.categories.forEach((cat) => {
      ids.push(`${part.id}-${cat.id}`)
    })
  })
  ids.push('appendix')
  return ids
}
