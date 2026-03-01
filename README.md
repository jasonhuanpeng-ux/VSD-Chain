# Chain Platform - Industrial Chain Product Catalog

一个为工业链条制造商设计的现代化产品展示平台，用于展示和销售棕榈油链、制糖机链、焊接链等高性能工业链条产品。

## 🎯 项目概述

**Chain Platform** 是一个基于 React + Vite 的电商展示网站，帮助工业链条企业向全球客户展示产品、获取询价。

### 核心功能

- 📦 **产品分类展示** - 多类别链条产品（Sugar Mill Chain、Palm Oil Chain、Welded Chain）
- 🔍 **产品详情** - 技术规格参数、设计图纸、配件信息
- 🏭 **应用场景** - 按工业应用类型（制糖、棕榈油、通用工业等）展示产品
- 📋 **询价表单** - 客户可直接提交采购询价
- 📱 **响应式设计** - 完全支持移动端、平板、桌面端

## 🛠️ 技术栈

- **Frontend Framework**: React 19
- **Build Tool**: Vite (Rolldown)
- **Routing**: React Router v7
- **Styling**: Tailwind CSS + PostCSS
- **State Management**: React Hooks
- **Testing**: Puppeteer
- **Code Quality**: ESLint

## 📁 项目结构

```
chain-platform/
├── src/
│   ├── pages/              # 页面组件
│   │   ├── Home.jsx        # 首页
│   │   ├── Products.jsx    # 产品列表页
│   │   ├── CategoryPage.jsx # 分类详情页
│   │   ├── ProductDetail.jsx # 产品详情页
│   │   ├── ApplicationDetail.jsx # 应用场景详情页
│   │   ├── applications.jsx # 应用列表页
│   │   └── Inquiry.jsx     # 询价表单
│   ├── components/         # 可复用组件
│   ├── hooks/              # 自定义 Hook
│   ├── data/               # 静态数据（JSON）
│   │   ├── categories.json
│   │   ├── applications.json
│   │   └── {category}/     # 各类别的产品数据
│   └── assets/             # 样式和资源
├── public/                 # 静态资源（图片、PDF 等）
├── scripts/                # 构建脚本（CSV 转 JSON）
└── package.json
```

## 🚀 快速开始

### 安装

```bash
cd chain-platform
npm install
```

### 开发环境

```bash
npm run dev
```

访问 `http://localhost:5173`，支持热更新（HMR）。

### 生产构建

```bash
npm run build
```

生成优化后的 `dist/` 文件夹，可直接部署到任何静态服务器。

### 预览生产构建

```bash
npm run preview
```

## 📊 数据结构

产品数据存储在 `src/data/` 中，采用 JSON 格式：

```
src/data/
├── categories.json         # 产品分类元数据
├── applications.json       # 应用场景配置
└── {category-slug}/
    ├── index.json          # 链条设计（Design）
    ├── chains.json         # 产品列表和规格参数
    └── attachments.json    # 配件信息
```

## 🔧 主要特性

### 1. 灵活的分类系统
- 支持多种链条类型（棕榈油、制糖、焊接、水泥等）
- 可通过 `is_active` 字段隐藏未上线的分类

### 2. 完整的产品信息
- 规格参数（节距、宽度、强度等）
- 关联的配件（Attachments）
- 产品图片和技术图纸

### 3. 应用场景映射
- 每个应用（Application）关联多个产品分类
- 用户可从应用入口快速找到相关产品

### 4. 响应式 UI
- 使用 Tailwind CSS 确保各屏幕尺寸完美显示
- 移动优先设计理念

## 📝 代码规范

- ESLint 配置检查代码质量
- 使用 React Hooks 管理状态
- 文件组织按功能模块分类

## 🌐 部署

项目支持多种部署方式：

### Vercel / Netlify（推荐）
1. 将仓库连接到 Vercel/Netlify
2. 设置构建命令：`npm run build`
3. 设置发布目录：`dist`
4. 自动部署完成

### GitHub Pages
```bash
npm run build
# 将 dist 内容推送到 gh-pages 分支
```

### 自托管
```bash
npm run build
# 将 dist 文件夹上传到 Web 服务器根目录
```

## 📄 许可证

此项目为课程作业，仅供学习和演示之用。

## 👨‍💻 作者

Created as a course project for CIT693 at Northern Arizona University.
