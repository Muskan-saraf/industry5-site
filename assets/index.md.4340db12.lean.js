import{_ as f}from"./blog_Checking.md.909f951d.js";import{_ as h}from"./blog_Intro.md.c6c83943.js";import{r as u,b as _,o as l,c as o,F as p,d as m,_ as v,a as g,e as b,t as y}from"./app.8109a691.js";const x=g("",11),T=["href"],C=JSON.parse('{"title":"Welcome to the Industry 5.0 Hub","description":"","frontmatter":{},"headers":[{"level":2,"title":"Featured Topics","slug":"featured-topics","link":"#featured-topics","children":[{"level":3,"title":"What is Industry 5.0?","slug":"what-is-industry-5-0","link":"#what-is-industry-5-0","children":[]},{"level":3,"title":"Tools & Templates","slug":"tools-templates","link":"#tools-templates","children":[]},{"level":3,"title":"Case Studies","slug":"case-studies","link":"#case-studies","children":[]}]},{"level":2,"title":"Latest Blog Posts","slug":"latest-blog-posts","link":"#latest-blog-posts","children":[]}],"relativePath":"index.md"}'),w={name:"index.md"},I=Object.assign(w,{setup(k){const r=u([]);return _(async()=>{const t=Object.assign({"/blog/Checking.md":f,"/blog/Intro.md":h});console.log("Blog Files:",t);const a=Object.entries(t).map(([e,n])=>{var d;const i=n.default||"";console.log("Raw Content for:",e,`
`,i);const s=(d=i.split(`
`).find(c=>c.trim().startsWith("#")))==null?void 0:d.replace("#","").trim();return console.log("Extracted Title for:",e,`
`,s),s?{url:e.replace(".md",""),title:s}:null});console.log("Processed Blog Posts:",a),r.value=a.filter(e=>e!==null)}),(t,a)=>(l(),o("div",null,[x,(l(!0),o(p,null,m(r.value,e=>(l(),o("div",{key:e.url,class:"blog-item"},[b("a",{href:e.url,class:"blog-title"},y(e.title),9,T)]))),128))]))}}),F=v(I,[["__scopeId","data-v-f22a5ef4"]]);export{C as __pageData,F as default};
