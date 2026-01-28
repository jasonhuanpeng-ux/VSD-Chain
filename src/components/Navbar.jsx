import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // 判断当前路径是否激活，用于高亮显示导航文字
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Applications', path: '/applications' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo 区域 */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tighter">
                CHAIN<span className="text-blue-600">INDUSTRY</span>
              </span>
            </Link>
          </div>

          {/* 桌面端菜单 (md 以上显示) */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold transition-colors ${
                  isActive(link.path) ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/inquiry"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-100 transition-all"
            >
              Inquiry Now
            </Link>
          </div>

          {/* 移动端菜单按钮 (md 以下显示) */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 移动端下拉菜单面板 */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-inner">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-bold ${
                  isActive(link.path) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/inquiry"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-blue-600 text-white px-4 py-4 rounded-xl font-bold mt-4"
            >
              Inquiry Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;