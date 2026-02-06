const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const docs = path.join(root, 'docs');

function cleanDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.lstatSync(full);
    if (stat.isDirectory()) {
      cleanDir(full);
      fs.rmdirSync(full);
    } else {
      fs.unlinkSync(full);
    }
  }
}

function copyRecursive(src, dest) {
  const stat = fs.lstatSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Recreate docs directory
if (fs.existsSync(docs)) {
  cleanDir(docs);
} else {
  fs.mkdirSync(docs);
}

// Copy all root HTML files
for (const file of fs.readdirSync(root)) {
  const full = path.join(root, file);
  const stat = fs.lstatSync(full);
  if (stat.isFile() && file.endsWith('.html')) {
    fs.copyFileSync(full, path.join(docs, file));
  }
}

// Copy folders: css, img, js
const folders = ['css', 'img', 'js'];
for (const f of folders) {
  const src = path.join(root, f);
  const dest = path.join(docs, f);
  if (fs.existsSync(src) && fs.lstatSync(src).isDirectory()) {
    copyRecursive(src, dest);
  }
}

// Create a simple README in docs for clarity
fs.writeFileSync(path.join(docs, 'README.md'), '# Published site files (docs)\n');

console.log('docs/ prepared with HTML, css, img, js');
