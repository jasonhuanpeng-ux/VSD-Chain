const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5174/products/welded-chain', { waitUntil: 'networkidle2' });
  
  // Wait for attachment cards to load
  await page.waitForSelector('[class*="border-gray-200"]', { timeout: 5000 });
  
  // Extract attachment card text
  const attachmentCards = await page.evaluate(() => {
    const cards = document.querySelectorAll('[class*="border-gray-200"][class*="rounded-xl"]');
    return Array.from(cards).slice(0, 3).map(card => {
      const chainText = card.querySelector('p[class*="text-gray-500"]')?.textContent || '';
      return chainText.trim();
    });
  });
  
  console.log('First 3 attachment cards chain display:');
  attachmentCards.forEach((text, i) => {
    console.log(`Card ${i+1}: ${text}`);
  });
  
  const pageContent = await page.content();
  console.log(`\nPage loaded successfully. Content length: ${pageContent.length} bytes`);
  
  await browser.close();
})();
