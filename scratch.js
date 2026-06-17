const fs = require('fs');

async function analyzeApi() {
  const baseUrl = 'https://negocioefranquia.com.br/wp-json/wp/v2';
  
  try {
    const [categories, tags, users, types, singlePost] = await Promise.all([
      fetch(`${baseUrl}/categories?per_page=100`).then(r => r.json()),
      fetch(`${baseUrl}/tags?per_page=100`).then(r => r.json()),
      fetch(`${baseUrl}/users?per_page=100`).then(r => r.json()),
      fetch(`${baseUrl}/types`).then(r => r.json()),
      fetch(`${baseUrl}/posts?per_page=1&_embed`).then(r => r.json())
    ]);

    const report = {
      categories: categories.map(c => ({ id: c.id, name: c.name, slug: c.slug, count: c.count })),
      tags: tags.map(t => ({ id: t.id, name: t.name, slug: t.slug, count: t.count })),
      users: users.map(u => ({ id: u.id, name: u.name, slug: u.slug })),
      types: Object.keys(types),
      postSampleMeta: Object.keys(singlePost[0] || {}),
      customFields: singlePost[0]?.acf || singlePost[0]?.meta || {}
    };

    fs.writeFileSync('api_report.json', JSON.stringify(report, null, 2));
    console.log('API analysis saved to api_report.json');
  } catch (error) {
    console.error('Error analyzing API:', error.message);
  }
}

analyzeApi();
