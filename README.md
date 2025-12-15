# 英语兔 - 200个黄金语块 React应用

这是一个现代化的React应用，用于学习英语语块（chunks）。该应用将原始的HTML页面转换为交互式的React单页应用，提供更好的用户体验和功能。

## 功能特性

- 📚 200个精选英语语块，按类别组织
- 🔍 实时搜索功能，支持标题、含义和例句搜索
- 🧭 智能导航系统，支持平滑滚动和活跃状态显示
- 📱 完全响应式设计，支持桌面和移动设备
- ⚡ 基于Vite构建，快速开发和构建
- 🎯 TypeScript支持，类型安全
- ✅ 完整的测试覆盖

## 技术栈

- React 19 + TypeScript
- Vite (使用Rolldown)
- CSS变量和现代CSS特性
- Vitest + Testing Library (测试)
- ESLint (代码质量)

## 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 运行测试
```bash
npm test
```

### 预览构建结果
```bash
npm run preview
```

## 部署到Vercel

1. 将项目推送到GitHub仓库
2. 在Vercel中导入项目
3. Vercel会自动检测到这是一个Vite项目并使用正确的构建设置
4. 部署完成！

或者使用Vercel CLI：
```bash
npm i -g vercel
vercel --prod
```

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
