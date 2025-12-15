import './CourseIntro.css'

export function CourseIntro() {
  return (
    <section id="course-intro" className="course-intro">
      <div className="course-intro-container">
        <div className="course-intro-header">
          <h1 className="course-intro-title">英语兔 | 200个黄金语块</h1>
          <p className="course-intro-subtitle">提升英语表达地道性的实用语块集合</p>
        </div>
        
        <div className="course-intro-content">
          <div className="intro-section">
            <h2>课程简介</h2>
            <p>
              欢迎来到"200个黄金语块"课程！这是一个专门为提升英语表达地道性而设计的实用语块集合。
              每个语块都经过精心挑选，涵盖了日常交流、学术写作、商务沟通等多个场景。
            </p>
          </div>

          <div className="intro-section">
            <h2>学习目标</h2>
            <ul className="intro-list">
              <li>掌握200个高频实用的英语语块</li>
              <li>提升英语表达的地道性和流利度</li>
              <li>增强在不同场景下的沟通能力</li>
              <li>建立更自信的英语表达习惯</li>
            </ul>
          </div>

          <div className="intro-section">
            <h2>课程结构</h2>
            <div className="course-structure">
              <div className="structure-item">
                <h3>第一部分：表明态度与观点</h3>
                <p>学习如何清晰地表达个人立场、同意或反对的观点，以及表达确定性和偏好。</p>
              </div>
              <div className="structure-item">
                <h3>第二部分：逻辑连接与铺陈</h3>
                <p>掌握逻辑连接词和表达方式，让你的英语表达更有条理和说服力。</p>
              </div>
              <div className="structure-item">
                <h3>第三部分：互动与沟通策略</h3>
                <p>学习有效的沟通技巧，包括澄清、打断、转移话题等实用策略。</p>
              </div>
              <div className="structure-item">
                <h3>第四部分：高频特定场景功能</h3>
                <p>针对特定场景的实用表达，如请求帮助、假设推测等常见情况。</p>
              </div>
            </div>
          </div>

          <div className="intro-section">
            <h2>使用建议</h2>
            <div className="tips-grid">
              <div className="tip-item">
                <h4>📚 系统学习</h4>
                <p>按照章节顺序学习，每天掌握5-10个语块</p>
              </div>
              <div className="tip-item">
                <h4>🎯 重点练习</h4>
                <p>选择与你需求最相关的语块进行重点练习</p>
              </div>
              <div className="tip-item">
                <h4>💬 实际应用</h4>
                <p>在日常对话和写作中有意识地使用这些语块</p>
              </div>
              <div className="tip-item">
                <h4>🔄 定期复习</h4>
                <p>定期回顾已学语块，确保长期记忆</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}