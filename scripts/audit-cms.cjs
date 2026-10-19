// Read-only public content audit. No tokens, mutations or dataset export required.
const fs = require('node:fs');
require('dotenv').config({path: '.env.local', quiet: true});
const project = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ztfniri3';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
async function main() {
  const query = `{"posts": *[_type == "post"]{_id,title,slug,publishedAt,"hasBody":count(body)>0,"inlineTables":count(body[_type=="tableBlock"]),"legacyTables":count(dataTables),"hasSeo":defined(seo),"hasAlt":defined(mainImage.alt)},"categories":*[_type=="category"]{_id,title,slug},"authors":count(*[_type=="author"]),"tables":count(*[_type=="table"])}`;
  const response = await fetch(`https://${project}.api.sanity.io/v2025-03-25/data/query/${dataset}?perspective=published&query=${encodeURIComponent(query)}`);
  if (!response.ok) throw Error(`Sanity audit failed: ${response.status}`);
  const {result} = await response.json();
  const slugs = result.posts.map(p => p.slug?.current).filter(Boolean);
  const summary = {checkedAt: new Date().toISOString(), project, dataset, posts: result.posts.length, categories: result.categories.length, authors: result.authors, tables: result.tables, missingPostSlugs: result.posts.filter(p=>!p.slug?.current).map(p=>p._id), duplicateSlugs: slugs.filter((s,i)=>slugs.indexOf(s)!==i), missingBodies: result.posts.filter(p=>!p.hasBody).map(p=>p._id), postsWithInlineTables: result.posts.filter(p=>p.inlineTables>0).length, postsWithLegacyTables: result.posts.filter(p=>p.legacyTables>0).length, postsWithSeo: result.posts.filter(p=>p.hasSeo).length, postsWithFeaturedAlt: result.posts.filter(p=>p.hasAlt).length};
  fs.mkdirSync('.cache', {recursive:true});
  fs.writeFileSync('.cache/cms-audit.json', JSON.stringify({summary,...result},null,2));
  console.log(JSON.stringify(summary,null,2));
}
main().catch(e=>{console.error(e.message);process.exitCode=1});
