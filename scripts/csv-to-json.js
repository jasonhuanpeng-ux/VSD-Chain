import csvtojson from 'csvtojson';
import fs from 'fs';
import path from 'path';

// ========== 配置 ==========
const CONFIG = {
  chainsCSV: './csv-data/chain_sugarmill.csv',
  attachmentsCSV: './csv-data/att_sugarmill.csv',
  
  // 输出目录
  outputDir: './src/data/sugar-mill',
};
// ========== 列名映射 (你的CSV列名 → JSON key) ==========
const CHAIN_COLUMN_MAP = {
  'Product ID': 'id',
  'Category': 'category',
  'Chain Design': 'chain_design',
  'DrawingID': 'drawing_id',
  'Chain No.': 'chain_no',
  'P (Pitch)': 'P',
  'b1 (Inner Width)': 'b1',
  'R (Roller Dia)': 'R',
  'd (Pin Dia)': 'd',
  'id (hollow pin inner dia)': 'id_hollow',
  'L1': 'L1',
  'L2': 'L2',
  'Pin Type': 'pin_type',
  'h (Plate Height)': 'h',
  't (Inner)': 't',
  'T (Outer)': 'T',
  'Fu (Strength)': 'Fu',
  'q (Weight)': 'q',
  'Note/material': 'material'
};

const ATTACHMENT_COLUMN_MAP = {
  'Product ID': 'id',
  'Category': 'category',
  'Parent_Chain_Number': 'parent_chain_no',
  'Attachment_number': 'attachment_number',
  'Drawing_number': 'drawing_number',
  'Spec_Number': 'spec_number',
  'Note': 'note'
};

// 规格字段列表
const SPEC_FIELDS = ['P', 'b1', 'R', 'd', 'id_hollow', 'L1', 'L2', 'h', 't', 'T', 'Fu', 'q'];

// ========== 主函数 ==========
async function main() {
  console.log('🚀 开始转换...\n');

  // 1. 读取 CSV
  let chainsRaw = [];
  let attachmentsRaw = [];

  try {
    chainsRaw = await csvtojson().fromFile(CONFIG.chainsCSV);
    console.log(`✅ 读取 ${chainsRaw.length} 条链条数据`);
  } catch (e) {
    console.error('❌ 无法读取 chains.csv:', e.message);
  }

  try {
    attachmentsRaw = await csvtojson().fromFile(CONFIG.attachmentsCSV);
    console.log(`✅ 读取 ${attachmentsRaw.length} 条附件数据`);
  } catch (e) {
    console.error('❌ 无法读取 attachments.csv:', e.message);
  }

  console.log('');

  // 2. 按 Category 分组处理链条数据
  const categoriesMap = {};

  chainsRaw.forEach((row) => {
    // 跳过空行
    if (!row['Category'] && !row['Product ID']) return;

    const category = normalizeCategory(row['Category']);
    if (!category) return;

    // 初始化分类
    if (!categoriesMap[category]) {
      categoriesMap[category] = {
        designs: {},
        products: [],
        attachments: []
      };
    }

    // 提取 Design 信息
    const designId = row['DrawingID'] || 'unknown';
    const designName = row['Chain Design'] || '';

    if (designId && !categoriesMap[category].designs[designId]) {
      categoriesMap[category].designs[designId] = {
        design_id: designId,
        design_name_en: designName,
        design_name_cn: '',
        drawing: `/images/drawings/${category}/${designId}.png`
      };
    }

    // 提取产品信息
    const specs = {};
    SPEC_FIELDS.forEach(field => {
      const csvKey = Object.keys(CHAIN_COLUMN_MAP).find(k => CHAIN_COLUMN_MAP[k] === field);
      if (csvKey && row[csvKey] !== undefined && row[csvKey] !== '' && row[csvKey] !== '-') {
        const value = parseFloat(row[csvKey]);
        if (!isNaN(value)) {
          specs[field] = value;
        }
      }
    });

    categoriesMap[category].products.push({
      id: row['Product ID'] || '',
      chain_no: row['Chain No.'] || '',
      design_id: designId,
      pin_type: row['Pin Type'] || '',
      material: row['Note/material'] || '',
      specs: specs
    });
  });

  // 3. 处理附件数据
  attachmentsRaw.forEach((row) => {
    if (!row['Category'] && !row['Product ID']) return;

    const category = normalizeCategory(row['Category']);
    if (!category || !categoriesMap[category]) {
      // 如果附件的类别在链条中不存在，创建它
      if (category && !categoriesMap[category]) {
        categoriesMap[category] = {
          designs: {},
          products: [],
          attachments: []
        };
      } else {
        return;
      }
    }

    const attachmentNumber = row['Attachment_number'] || '';
    
    categoriesMap[category].attachments.push({
      id: row['Product ID'] || '',
      parent_chain_no: row['Parent_Chain_Number'] || '',
      attachment_type: extractAttachmentType(attachmentNumber),
      attachment_number: attachmentNumber,
      drawing: `/images/drawings/${category}/attachments/${row['Drawing_number'] || ''}.png`,
      spec_sheet: `/images/drawings/${category}/attachments/${row['Spec_Number'] || ''}.png`,
      note: row['Note'] || ''
    });
  });

  // 4. 生成 JSON 文件
  const categories = [];

  for (const [categorySlug, data] of Object.entries(categoriesMap)) {
    const categoryDir = path.join(CONFIG.outputDir, categorySlug);

    // 创建目录
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    // === index.json ===
    const indexJson = {
      id: categorySlug,
      name_en: formatCategoryName(categorySlug),
      name_cn: getCategoryNameCn(categorySlug),
      description_en: '',
      description_cn: '',
      hero_image: `/images/categories/${categorySlug}.jpg`,
      chain_designs: Object.values(data.designs)
    };

    fs.writeFileSync(
      path.join(categoryDir, 'index.json'),
      JSON.stringify(indexJson, null, 2),
      'utf8'
    );

    // === chains.json ===
    const chainsJson = {
      category_id: categorySlug,
      spec_columns: getSpecColumns(),
      products: data.products
    };

    fs.writeFileSync(
      path.join(categoryDir, 'chains.json'),
      JSON.stringify(chainsJson, null, 2),
      'utf8'
    );

    // === attachments.json ===
    const attachmentsJson = {
      category_id: categorySlug,
      attachments: data.attachments
    };

    fs.writeFileSync(
      path.join(categoryDir, 'attachments.json'),
      JSON.stringify(attachmentsJson, null, 2),
      'utf8'
    );

    // 添加到 categories 列表
    categories.push({
      id: categorySlug,
      slug: categorySlug,
      name_en: formatCategoryName(categorySlug),
      name_cn: getCategoryNameCn(categorySlug),
      image: `/images/categories/${categorySlug}.jpg`,
      summary: '',
      sort_order: categories.length + 1,
      is_active: true
    });

    console.log(`✅ ${categorySlug}/`);
    console.log(`   📦 ${data.products.length} 个产品`);
    console.log(`   📐 ${Object.keys(data.designs).length} 种设计`);
    console.log(`   🔧 ${data.attachments.length} 个附件\n`);
  }

  // 5. 生成 categories.json
  // 确保输出目录存在
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(CONFIG.outputDir, 'categories.json'),
    JSON.stringify(categories, null, 2),
    'utf8'
  );

  console.log('✅ categories.json\n');
  console.log('🎉 转换完成！');
  console.log(`\n📁 输出目录: ${CONFIG.outputDir}`);
}

// ========== 辅助函数 ==========

function normalizeCategory(category) {
  if (!category) return null;
  return category
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');
}

function formatCategoryName(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getCategoryNameCn(slug) {
  const map = {
    'sugar-mill': '制糖机链条',
    'palm-oil': '棕榈油链条',
    'cement-industry': '水泥工业链条',
    'welded-chain': '焊接链条',
    'mining-industry': '矿业链条',
    'plastic-chain': '塑料链条',
    'sewage-treatment': '污水处理链条',
    'trencher': '挖沟机链条',
    'automotive-industry': '汽车工业链条',
    'metallurgical-industry': '冶金工业链条',
    'asphalt-mixing': '沥青搅拌链条',
    'wetland-equipment': '湿地设备链条',
    'ice-cream-conveyor': '冰淇淋输送链条',
    'paper-mills-industry': '造纸工业链条'
  };
  return map[slug] || '';
}

function extractAttachmentType(attachmentNumber) {
  if (!attachmentNumber) return '';
  // "A42_AS2" → "A42"
  // "K2" → "K2"
  const match = attachmentNumber.match(/^([A-Z0-9]+)/i);
  return match ? match[1].toUpperCase() : attachmentNumber;
}

function getSpecColumns() {
  return [
    { key: 'P', label_en: 'Pitch', label_cn: '节距', unit: 'mm' },
    { key: 'b1', label_en: 'Inner Width', label_cn: '内宽', unit: 'mm' },
    { key: 'R', label_en: 'Roller Dia', label_cn: '滚子直径', unit: 'mm' },
    { key: 'd', label_en: 'Pin Dia', label_cn: '销轴直径', unit: 'mm' },
    { key: 'id_hollow', label_en: 'Hollow Pin Inner Dia', label_cn: '空心销内径', unit: 'mm' },
    { key: 'L1', label_en: 'Pin Length L1', label_cn: '销轴长度L1', unit: 'mm' },
    { key: 'L2', label_en: 'Pin Length L2', label_cn: '销轴长度L2', unit: 'mm' },
    { key: 'h', label_en: 'Plate Height', label_cn: '链板高度', unit: 'mm' },
    { key: 't', label_en: 'Inner Plate Thickness', label_cn: '内链板厚度', unit: 'mm' },
    { key: 'T', label_en: 'Outer Plate Thickness', label_cn: '外链板厚度', unit: 'mm' },
    { key: 'Fu', label_en: 'Tensile Strength', label_cn: '抗拉强度', unit: 'kN' },
    { key: 'q', label_en: 'Weight', label_cn: '重量', unit: 'kg/m' }
  ];
}

// ========== 运行 ==========
main().catch(console.error);