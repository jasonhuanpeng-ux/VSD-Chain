import puppeteer from 'puppeteer';
(async()=>{
  const b=await puppeteer.launch();
  const p=await b.newPage();
  const url='http://localhost:5174/product/welded-chain/WC-001';
  await p.goto(url,{waitUntil:'networkidle2'});
  const html=await p.content();
  console.log('len',html.length);
  console.log('contains chainno?', html.includes('Chain No:'));
  await b.close();
})();
