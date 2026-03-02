# Chain Platform - Industrial Chain Product Catalog

Chain Platform 是一个基于 React 和 Vite 的工业链条产品展示网站。支持多类别链条（如制糖机链、棕榈油链、焊接链等）的浏览、详情查看和在线询价。

## 项目功能

- 产品分类浏览
- 产品详情与技术参数
- 按行业应用筛选产品
- 在线询价表单
- 响应式设计，支持手机、平板和桌面

## 技术栈

- React 19
- Vite
- React Router v7
- Tailwind CSS
- ESLint

## 快速开始

1. 安装依赖
    ```bash
    npm install
    ```
2. 启动开发环境
    ```bash
    npm run dev
    ```
    访问 http://localhost:5173
3. 构建生产版本
    ```bash
    npm run build
    ```
4. 预览生产构建
    ```bash
    npm run preview
    ```

## 数据结构

产品数据存放在 `src/data/` 目录下，采用 JSON 格式。

## 目录结构

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
│   │   ├── Navbar.jsx      # 顶部导航栏
│   │   ├── CartPanel.jsx   # 购物车浮窗
│   │   ├── DesignCard.jsx  # 设计卡片
│   │   ├── ProductTable.jsx # 产品表格
│   │   └── AttachmentCard.jsx # 配件卡片
│   ├── hooks/              # 自定义 Hook
│   │   ├── useCart.js      # 购物车状态管理
│   │   └── useProductData.js # 产品数据加载
│   ├── data/               # 静态数据（JSON）
│   │   ├── categories.json
│   │   ├── applications.json
│   │   ├── products.json
│   │   └── {category}/     # 各类别的产品数据
│   │        ├── chains.json
│   │        ├── index.json
│   │        └── attachments.json
│   ├── assets/             # 样式和资源
│   │   ├── App.css
│   │   └── index.css
│   └── main.jsx            # 应用入口
├── public/                 # 静态资源（图片、PDF 等）
│   ├── images/
│   │   ├── applications/
│   │   ├── categories/
│   │   └── drawings/
├── package.json            # 项目配置
├── tailwind.config.js      # Tailwind CSS 配置
├── postcss.config.js       # PostCSS 配置
├── vite.config.js          # Vite 配置
├── eslint.config.js        # ESLint 配置
└── README.md               # 项目说明
```

## 部署

支持 Vercel、Netlify、GitHub Pages 或自托管。构建后将 dist 目录部署到静态服务器即可。

## 版权说明

本项目仅供学习和课程演示使用。
