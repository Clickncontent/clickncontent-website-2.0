const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // React Router Dom -> Next/Link & Next/Navigation
  content = content.replace(/import\s+\{([^}]*)\}\s+from\s+[\"']react-router-dom[\"']/g, (match, imports) => {
    let nextImports = [];
    let navImports = [];
    if (imports.includes('Link')) nextImports.push('Link');
    if (imports.includes('useNavigate')) navImports.push('useRouter as useNavigate');
    if (imports.includes('useLocation')) navImports.push('usePathname as useLocation');
    if (imports.includes('useParams')) navImports.push('useParams');
    
    let res = '';
    if (nextImports.length > 0) res += `import ${nextImports.join(', ')} from 'next/link';\n`;
    if (navImports.length > 0) res += `import { ${navImports.join(', ')} } from 'next/navigation';\n`;
    return res;
  });

  // Link to= -> Link href=
  content = content.replace(/<Link([^>]+)to=/g, '<Link$1href=');
  
  // framer-motion, useState, useEffect -> 'use client'
  if (content.match(/from ['"]framer-motion['"]|from ['"]react['"]/) && (content.includes('useState') || content.includes('useEffect') || content.includes('motion.'))) {
    if (!content.includes('"use client"') && !content.includes("'use client'")) {
      content = '"use client";\n' + content;
    }
  }

  // Next.js uses standard html elements for video and img but we don't need to change them if unoptimized is set.
  
  // Remove <Layout> wrapper from all pages since it's now in app/layout.tsx
  if (file.includes('/pages/')) {
    content = content.replace(/<Layout>/g, '<>');
    content = content.replace(/<\/Layout>/g, '</>');
    content = content.replace(/import Layout from [^;]+;/g, '');
    
    // Remove Helmet
    content = content.replace(/import\s+\{\s*Helmet\s*\}\s+from\s+['"]react-helmet-async['"];?/g, '');
    content = content.replace(/<Helmet>[\s\S]*?<\/Helmet>/g, '');
  }

  if (content !== original) {
    fs.writeFileSync(file, content);
    changedCount++;
    console.log('Fixed:', file);
  }
});
console.log('Total files patched:', changedCount);
