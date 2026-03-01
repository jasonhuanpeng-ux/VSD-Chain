import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:5174/products/welded-chain', { waitUntil: 'networkidle2' });
    
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
  } catch (e) {
    console.error('Test error:', e.message);
  }
  
  await browser.close();
})();
