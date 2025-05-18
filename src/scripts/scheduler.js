const cron = require('node-cron');
const { spawn } = require('child_process');
const path = require('path');

// 每天凌晨3点运行爬虫
cron.schedule('0 3 * * *', () => {
  console.log('Running crawler...');
  
  const crawler = spawn('node', [path.join(__dirname, 'crawler.js')], {
    stdio: 'inherit'
  });
  
  crawler.on('close', (code) => {
    if (code === 0) {
      console.log('Crawler completed successfully');
    } else {
      console.error(`Crawler process exited with code ${code}`);
    }
  });
}); 