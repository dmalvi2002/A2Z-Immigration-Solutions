const fs = require('node:fs');
const assert = require('node:assert/strict');
const base = process.env.CMS_TEST_URL || 'http://localhost:3100';
const {posts, categories} = JSON.parse(fs.readFileSync('.cache/cms-audit.json','utf8'));
async function main() {
  let checked = 0;
  const sitemapResponse = await fetch(`${base}/sitemap.xml`);
  assert.equal(sitemapResponse.status,200);
  const sitemap = await sitemapResponse.text();
  const robots = await (await fetch(`${base}/robots.txt`)).text();
  assert.match(robots,/Disallow: \/studio/);
  assert.match(robots,/Sitemap:/);
  const pending = [...posts];
  await Promise.all(Array.from({length:4}, async()=> {
    while(pending.length) {
      const post = pending.shift();
      if(!post.slug?.current) continue;
      const path = `/blog/${post.slug.current}`;
      const response = await fetch(base+path);
      assert.equal(response.status,200,path);
      const html = await response.text();
      assert.ok(/<h1[^>]*>/.test(html),path+' server heading');
      assert.ok(/<title>[^<]+<\/title>/.test(html),path+' search title');
      assert.ok(/<link[^>]+rel="canonical"[^>]+href="[^"]+"/.test(html),path+' canonical');
      assert.ok(/<meta name="description" content="[^"]+"/.test(html),path+' description');
      assert.ok(/application\/ld\+json/.test(html),path+' article schema');
      const scripts = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
      assert.ok(scripts.some(s => s['@type'] === 'BlogPosting' && s.headline === post.title),path+' actual article headline');
      if (post.inlineTables > 0 || post.legacyTables > 0) assert.ok(/<table\b/.test(html),path+' existing tables rendered');
      assert.doesNotMatch(html,/Kobe Steel|Showing alternative content instead/);
      assert.ok(sitemap.includes(path),path+' sitemap');
      checked++;
    }
  }));
  for(const path of ['/blog/this-post-does-not-exist-cms-test','/blog/category/no-such-category-cms-test']) {
    const response = await fetch(base+path);
    assert.equal(response.status,404,path);
  }
  const redirect = await fetch(`${base}/blog`,{redirect:'manual'});
  assert.equal(redirect.status,308);
  assert.equal(redirect.headers.get('location'),'/blog/category/show-all');
  const archive = await (await fetch(`${base}/blog/category/show-all`)).text();
  assert.match(archive,/READ MORE/,'archive cards in server HTML');
  const studio = await (await fetch(`${base}/studio`)).text();
  assert.match(studio,/noindex/);
  for (const category of categories) {
    if(!category.slug?.current) continue;
    const response = await fetch(`${base}/blog/category/${category.slug.current}`);
    assert.equal(response.status,200,category.title+' category archive');
    const html = await response.text();
    assert.ok(/<link[^>]+rel="canonical"/.test(html),category.title+' archive canonical');
  }
  const pages = ['/', '/about-us', '/services/sponsor-licence', '/services/skilled-worker-visa', '/services/compliance', '/services/other-services', '/get-in-touch', '/our-clients', '/resources', '/calculator', '/offers', '/terms', '/privacy-policy'];
  for(const path of pages) {
    const response = await fetch(base+path);
    assert.equal(response.status,200,path);
    const html = await response.text();
    assert.ok(/<link[^>]+rel="canonical"/.test(html),path+' page canonical');
    assert.ok(/<title>[^<]+<\/title>/.test(html),path+' page title');
  }
  console.log(`PASS: ${checked} existing posts, ${categories.length} category archives, ${pages.length} fixed pages; SSR headings, search titles, canonicals, descriptions, article JSON-LD, legacy/inline tables, sitemap, robots, archive SSR, missing-route 404s, blog redirect and Studio noindex.`);
}
main().catch(e=>{console.error(e);process.exitCode=1});
