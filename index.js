const https = require('https');
const { URL } = require('url');

const COUPON_URL = 'https://codewp.ai';
const ACTIVATION_CODE = 'card';

const samplePlugins = [
  { name: 'Custom Post Type Generator', hooks: 8, difficulty: 'beginner' },
  { name: 'WooCommerce Custom Checkout', hooks: 12, difficulty: 'intermediate' },
  { name: 'REST API Extension', hooks: 15, difficulty: 'advanced' }
];

function head(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const opts = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      method: 'HEAD',
      headers: { 'User-Agent': 'codewp-ai-example/1.0' }
    };
    const req = https.request(opts, (res) => {
      resolve({ statusCode: res.statusCode });
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  try {
    const response = await head(COUPON_URL);
    console.log(`Deal page reachable: HTTP ${response.statusCode}`);
  } catch (e) {
    console.log(`Deal page check bypassed (${e.message}).`);
  }

  console.log('\n--- Codewp AI API Simulation ---');
  console.log(`Activation Code: ${ACTIVATION_CODE}`);

  console.log('\nSample WordPress plugins you can generate:');
  samplePlugins.forEach((p, i) => {
    console.log(`  ${i + 1}. ${p.name} — ${p.hooks} hooks (${p.difficulty})`);
  });

  if (process.env.CODEWP_API_KEY) {
    console.log('\nAPI key detected. Ready for WordPress code generation.');
    console.log('Endpoints: /api/generate, /api/validate, /api/plugins');
  } else {
    console.log('\nSet CODEWP_API_KEY env var for AI-powered WP development.');
  }

  console.log('\nSupports: WordPress hooks, filters, CPTs, taxonomies, WooCommerce, REST API');
}

main();
