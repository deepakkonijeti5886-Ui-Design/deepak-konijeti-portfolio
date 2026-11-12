const https = require('https');

function fetchContent(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function verify() {
  console.log('Checking live production website: https://deepak-konijeti-portfolio.vercel.app');
  const html = await fetchContent('https://deepak-konijeti-portfolio.vercel.app');
  
  const jsMatch = html.match(/src="(\/assets\/index-[^"]+\.js)"/);
  if (!jsMatch) {
    console.log('Could not find JS bundle in HTML!');
    return;
  }
  const jsUrl = 'https://deepak-konijeti-portfolio.vercel.app' + jsMatch[1];
  console.log('Found JS bundle:', jsUrl);
  const js = await fetchContent(jsUrl);

  console.log('--- Verification Checklist on Vercel Live ---');
  console.log('1. Contains React.js / JavaScript:', js.includes('React.js / JavaScript'));
  console.log('2. Removed 15% Checkout Funnel metric badge:', !js.includes('metrics:"+15% Checkout Funnel"') && !js.includes('+15% Checkout Funnel'));
  console.log('3. Contains 45-60 Days Notice Period:', js.includes('45-60 Days Notice Period'));
  console.log('4. Contains Redesigned Multi-Step Checkout Funnel:', js.includes('Redesigned Multi-Step Checkout Funnel'));
  console.log('5. Does NOT contain 90 Days Notice Period:', !js.includes('90 Days Notice Period'));
}

verify().catch(console.error);
