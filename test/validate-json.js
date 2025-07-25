const fs = require('fs');

const files = [
  { path: 'activites.json', required: ['nom', 'description', 'adresse', 'budget'] },
  { path: 'bonnes_actions.json', required: ['nom', 'description'] },
  { path: 'punitions.json', required: ['nom', 'description'] }
];

let hasError = false;

files.forEach(file => {
  const data = JSON.parse(fs.readFileSync(file.path, 'utf8'));
  if (!Array.isArray(data)) {
    console.error(`${file.path} should contain an array`);
    hasError = true;
    return;
  }

  data.forEach((entry, index) => {
    file.required.forEach(field => {
      if (!(field in entry)) {
        console.error(`${file.path} -> entry ${index} missing field '${field}'`);
        hasError = true;
      }
    });
  });
});

if (hasError) {
  console.error('Validation failed');
  process.exit(1);
} else {
  console.log('All JSON files are valid');
}
