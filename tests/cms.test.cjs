const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
// Exercise production helpers directly without adding a test-only dependency.
function load(file, dependencies = {}) {
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions: {module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX}}).outputText;
  const result = {exports: {}};
  new Function('require', 'module', 'exports', source)(name => dependencies[name] || require(name), result, result.exports);
  return result.exports;
}
const {buildMetadata, absoluteUrl, safeJsonLd, customJsonLd, isSitemapEntry, imageUrl} = load('sanity/lib/seo.ts');
test('legacy post needs no SEO fields and retains its canonical URL', () => {
  const result = buildMetadata({path: '/blog/existing-slug', title: 'Existing article', description: 'Existing excerpt', seo: null});
  assert.equal(result.title.absolute, 'Existing article');
  assert.equal(result.description, 'Existing excerpt');
  assert.equal(result.alternates.canonical, absoluteUrl('/blog/existing-slug'));
  assert.deepEqual(result.robots, {index: true, follow: true});
});
test('SEO and social overrides affect metadata and sitemap indexing', () => {
  const seo = {title: 'Search title', description: 'Search summary', focusKeyword: 'internal note', canonicalUrl: 'https://example.com/original', noindex: true, socialImage: {asset: {url: 'https://example.com/share.jpg'}, alt: 'Share image'}};
  const result = buildMetadata({path: '/blog/example', title: 'Visible title', seo});
  assert.equal(result.title.absolute, 'Search title');
  assert.equal(result.openGraph.images[0].url, 'https://example.com/share.jpg');
  assert.equal(result.twitter.card, 'summary_large_image');
  assert.equal(result.robots.index, false);
  assert.equal(result.keywords, undefined);
  assert.equal(isSitemapEntry('/blog/example', seo), false);
  assert.equal(isSitemapEntry('/blog/example', {canonicalUrl: 'https://example.com/original'}), false);
  assert.equal(isSitemapEntry('/blog/example', {canonicalUrl: absoluteUrl('/blog/example')}), true);
});
test('social image fallback preserves alt text and settings', () => {
  const result = buildMetadata({path: '/', title: 'Title', image: {asset: {url: 'https://example.com/post.jpg'}, alt: 'Post alt'}, settings: {defaultDescription: 'Default summary', siteName: 'A2Z'}});
  assert.equal(result.description, 'Default summary');
  assert.equal(result.openGraph.images[0].alt, 'Post alt');
  assert.equal(imageUrl({asset: {_ref: 'image-abc-1200x630-jpg'}}).endsWith('/abc-1200x630.jpg'), true);
});
test('JSON-LD cannot terminate its script and rejects malformed input', () => {
  const serialized = safeJsonLd({name: '</script><script>alert(1)</script>'});
  assert.equal(serialized.includes('<'), false);
  assert.equal(JSON.parse(serialized).name, '</script><script>alert(1)</script>');
  assert.equal(customJsonLd({structuredData: '{oops'}), null);
  assert.equal(customJsonLd({structuredData: '42'}), null);
  assert.deepEqual(customJsonLd({structuredData: '{"@type":"WebPage"}'}), {'@type': 'WebPage'});
});
test('post cards handle legacy missing image, author, category and date', () => {
  const {postCard} = load('sanity/lib/postCard.ts');
  const card = postCard({title: 'Legacy', slug: {current: 'old'}}, 0);
  assert.equal(card.date, 'No date');
  assert.equal(card.thumbnail, '/images/blog/blog-01.png');
  assert.equal(card.category, 'Uncategorised');
});
test('legacy article mapper retains rich text and avoids duplicating inline tables', async () => {
  const {getSingleBlogPost} = load('components/Blog/blogDetailsData.tsx', {'@/app/utils/api/SanityAPI': {fetchPostBySlug: () => {throw Error('Should use supplied published document')}}});
  const inline = {_id: 'table-1', title: 'Inline', slug: {current: 'inline'}};
  const legacy = {_id: 'table-2', title: 'Legacy', slug: {current: 'legacy'}};
  const body = [{_type: 'block', children: [{_type:'span',text:'Existing article'}]}, {_type: 'tableBlock', table: inline}];
  const post = await getSingleBlogPost('existing', {_id:'post-1', title:'Existing article', body, dataTables:[inline,legacy], mainImage:{alt:'Existing image',asset:{url:'https://example.com/image.jpg'}}});
  assert.deepEqual(post.content, body);
  assert.deepEqual(post.dataTables, [legacy]);
  assert.equal(post.mainImageAlt,'Existing image');
  assert.equal(post.publishDate,'No date');
});
