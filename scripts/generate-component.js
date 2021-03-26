const {existsSync, mkdirSync, writeFileSync} = require('fs');

const componentName = process.argv[2];

function templatePackage(name) {
  
  return`{
  "name": "@willson-c/${name}",
  "version": "0.0.1",
  "description": "",
  "main": "${name}.js",
  "module": "${name}.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "lit-element": "^2.4.0"
  }
}`
}


function templateComponent(name) { //x-dropzone
let className = name.split('-').map(string => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
}).join('');

return `import {LitElement, html} from 'lit-element';

class ${className} extends LitElement {
  
  constructor() {
    super();
  }

  render() {}
}

customElements.define('${name}', ${className});
`
}


function templateStory(name) {

  return `import {html} from 'lit-element';
import '../components/${name}';

export default {
  title: '${name}',
  component: '${name}'
}

const Template = (args) => {
  return html\`
  <${name}>
  </${name}>
\`
}

export const Basic = Template.bind({})
`
}

function createDirectories(name) {
  const baseDir = process.cwd();
  mkdirSync(`${baseDir}/components/${name}`);
}

function createFiles(name) {
  const baseDir = process.cwd();
  const componentDir = `${baseDir}/components/${name}`
  const files = [
    [`${componentDir}/${name}.js`, templateComponent(name)],
    [`${componentDir}/package.json`, templatePackage(name)],
    [`${baseDir}/stories/${name}.stories.js`, templateStory(name)],
  ];

  for(const [fileName, template] of files) {
    writeFileSync(fileName, template);
  }
}

function createComponent(name) {
  const baseDir = process.cwd();
  const dirs = [`${baseDir}/components/${name}`, `${baseDir}/stories/${name}.stories.js`];
  console.log(existsSync(dirs[0]))
  const existingItems = dirs.filter(dir => existsSync(dir));
  if (existingItems.length > 0) throw 'Error: component exists';

  createDirectories(name);
  createFiles(name);
}

try {
createComponent(componentName);

} catch(error) {
  console.log(error);
}