const {chromium} = require('playwright-chromium');
const {expect} = require('chai');




describe('Tests', async function(){
  this.timeout(5000);

  let page, browser;

  before(async () =>{
    browser = await chromium.launch();
  });

  after(async () =>{
    await browser.close();
  });

  beforeEach(async () =>{
    page = await browser.newPage();
  });

  afterEach(async () =>{
    await page.close();

  });

  it('loads and displays all books', async () =>{
    await page.goto('http://localhost:5500/02.Book-Library');
    
    await page.click('text=Load All Books');

    await page.waitForSelector('text=Harry Potter');

    const rows = await page.$$eval('tr', (rows) => rows.map(r => r.textContent.trim()));

    expect(rows[1]).to.contains('Harry Potter')
    expect(rows[1]).to.contains('Rowling')
    expect(rows[2]).to.contains('C# Fundamentals')
    expect(rows[2]).to.contains('Nakov')




  });


})