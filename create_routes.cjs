const fs = require('fs');
const path = require('path');

const routes = {
  'page.tsx': 'Index',
  'ydelser/page.tsx': 'Ydelser',
  'cases/page.tsx': 'Cases',
  'cases/[slug]/page.tsx': 'CaseDetail',
  'priser/page.tsx': 'Priser',
  'om-os/page.tsx': 'OmOs',
  'kontakt/page.tsx': 'Kontakt',
  'tak-for-din-bestilling/page.tsx': 'TakForDinBestilling',
  'besked-modtaget/page.tsx': 'BeskedException',
  'not-found.tsx': 'NotFound'
};

const appDir = path.join(__dirname, 'src/app');

// Ensure all dirs exist
Object.keys(routes).forEach(routePath => {
  const fullPath = path.join(appDir, routePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  const componentName = routes[routePath];
  let content = `import ${componentName} from '@/pages/${componentName}';\n\nexport default function Page() {\n  return <${componentName} />;\n}\n`;
  if (routePath.includes('[slug]')) {
    content = `import ${componentName} from '@/pages/${componentName}';\n\nexport default function Page(props: any) {\n  return <${componentName} />;\n}\n`;
  }
  fs.writeFileSync(fullPath, content);
});

console.log('App router wrappers instantiated.');
