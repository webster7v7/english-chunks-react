import './Introduction.css'

export function Introduction() {
  return (
    <section id="course-intro" className="introduction">
      <div className="intro-content">
        <h2 className="intro-title">课程简介</h2>
        <p className="intro-text">
          本课程精选了200个英语母语者最常用的"黄金语块"（Language Chunks）。
          这些语块是英语中预制的、固定的表达方式，掌握它们能让你的英语表达更加地道、自然、流畅。
        </p>
        <p className="intro-text">
          每个语块都包含：中文含义、核心语用场景、典型误区提醒，以及2-3个实用例句。
          通过系统学习这些语块，你将能够在各种场景下更自信地表达自己。
        </p>
        <div className="intro-features">
          <div className="feature-item">
            <span className="feature-icon">📚</span>
            <span className="feature-text">200个精选语块</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <span className="feature-text">核心语用解析</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚠️</span>
            <span className="feature-text">典型误区提醒</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">💡</span>
            <span className="feature-text">实用例句演示</span>
          </div>
        </div>
      </div>
    </section>
  )
}
