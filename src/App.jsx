import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 导入全局组件
import Navbar from './components/Navbar';

// 导入所有页面组件
import Home from './pages/Home';
import Products from './pages/Products';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import Applications from './pages/applications';
import ApplicationDetail from './pages/ApplicationDetail';
import Inquiry from './pages/Inquiry';

/**
 * App 指挥中心
 * 负责定义全站的 URL 路径映射关系
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* 1. 全局导航栏：在所有页面顶部显示 */}
        <Navbar />

        {/* 2. 动态内容区：根据浏览器地址栏 (URL) 切换显示不同的组件 */}
        <main className="flex-grow">
          <Routes>
            {/* 首页 */}
            <Route path="/" element={<Home />} />

            {/* 产品相关路由 */}
            <Route path="/products" element={<Products />} /> 
            <Route path="/products/:categorySlug" element={<CategoryPage />} />
            
            {/* 🆕 新增：带类别的产品详情路由 */}
            <Route path="/product/:categorySlug/:productId" element={<ProductDetail />} />
            
            {/* 旧路由保留兼容 */}
            <Route path="/product/:productId" element={<ProductDetail />} />

            {/* 应用场景相关路由 */}
            <Route path="/applications" element={<Applications />} />
            <Route path="/applications/:appSlug" element={<ApplicationDetail />} />

            {/* 询盘页面 */}
            <Route path="/inquiry" element={<Inquiry />} />

            {/* 404 兜底页面：当用户输入不存在的地址时显示 */}
            <Route path="*" element={
              <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-9xl font-black text-gray-200">404</h1>
                <p className="text-2xl font-bold text-gray-800 mt-4">Page Not Found</p>
                <p className="text-gray-500 mt-2 mb-8">The link you followed may be broken, or the page may have been removed.</p>
                <a href="/" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
                  Back to Homepage
                </a>
              </div>
            } />
          </Routes>
        </main>

        {/* 3. 全局页脚：展示公司版权和快速联系信息 */}
        <footer className="bg-white border-t border-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4">Chain Industry Platform</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Professional manufacturer of high-performance industrial chains for global markets. 
                Focusing on durability, precision, and efficiency.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h4>
              <ul className="text-gray-500 text-sm space-y-2">
                <li><a href="/products" className="hover:text-blue-600">All Products</a></li>
                <li><a href="/applications" className="hover:text-blue-600">Industries</a></li>
                <li><a href="/inquiry" className="hover:text-blue-600">Get a Quote</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4">Contact Us</h4>
              <p className="text-gray-500 text-sm">Email: sales@chain-platform.com</p>
              <p className="text-gray-500 text-sm mt-1">Global Delivery & Technical Support</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-50 text-center text-gray-400 text-xs">
            © {new Date().getFullYear()} Chain Industry. All rights reserved. Technical specs for reference only.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;