import { useState, useEffect, useMemo } from 'react';
import categoriesData from '../data/categories.json';

// 静态导入所有类别数据
import sugarMillIndex from '../data/sugar-mill/index.json' assert { type: 'json' };
import sugarMillChains from '../data/sugar-mill/chains.json' assert { type: 'json' };
import sugarMillAttachments from '../data/sugar-mill/attachments.json' assert { type: 'json' };

// 为每个类别创建配置
const categoryModules = {
  'sugar-mill': {
    index: sugarMillIndex,
    chains: sugarMillChains,
    attachments: sugarMillAttachments,
  },
  // 后续添加其他类别...
};

// 获取所有类别
export function useCategories() {
  return categoriesData;
}

// 获取单个类别的完整数据
export function useCategoryData(categorySlug) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (!categorySlug || !categoryModules[categorySlug]) {
        setError(`Category "${categorySlug}" not found`);
        setData(null);
        setLoading(false);
        return;
      }

      const modules = categoryModules[categorySlug];
      
      setData({
        index: modules.index,
        chains: modules.chains,
        attachments: modules.attachments,
      });
      setError(null);
      setLoading(false);
    } catch (err) {
      console.error('Error loading category data:', err);
      setError(err.message);
      setData(null);
      setLoading(false);
    }
  }, [categorySlug]);

  return { data, loading, error };
}

// 获取单个产品详情
export function useProductDetail(categorySlug, productId) {
  const { data, loading, error } = useCategoryData(categorySlug);

  const product = useMemo(() => {
    if (!data) return null;
    return data.chains.products.find(p => p.id === productId);
  }, [data, productId]);

  const design = useMemo(() => {
    if (!data || !product) return null;
    return data.index.chain_designs.find(d => d.design_id === product.design_id);
  }, [data, product]);

  const attachments = useMemo(() => {
    if (!data || !product) return [];
    return data.attachments.attachments.filter(
      att => att.parent_chain_no === product.chain_no
    );
  }, [data, product]);

  const specColumns = useMemo(() => {
    if (!data) return [];
    return data.chains.spec_columns;
  }, [data]);

  return {
    product,
    design,
    attachments,
    specColumns,
    categoryInfo: data?.index,
    loading,
    error,
  };
}