#!/bin/bash

# 英语语块React应用部署脚本

echo "🚀 开始部署英语语块React应用..."

# 检查Node.js和npm
echo "📋 检查环境..."
node --version
npm --version

# 安装依赖
echo "📦 安装依赖..."
npm install

# 运行测试
echo "🧪 运行测试..."
npm test

# 运行代码检查
echo "🔍 代码质量检查..."
npm run lint

# 构建项目
echo "🔨 构建项目..."
npm run build

# 检查构建结果
if [ -d "dist" ]; then
    echo "✅ 构建成功！"
    echo "📊 构建文件大小："
    du -sh dist/*
else
    echo "❌ 构建失败！"
    exit 1
fi

echo "🎉 项目准备就绪，可以部署到Vercel！"
echo ""
echo "部署命令："
echo "  vercel --prod"
echo ""
echo "或者推送到GitHub并在Vercel Dashboard中导入项目"