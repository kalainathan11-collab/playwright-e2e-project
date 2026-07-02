const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function loadData(env = process.env.TEST_ENV || 'dev') {
  const base = path.resolve(__dirname, '..', 'data');
  const jsonPath = path.join(base, `${env}.json`);
  const yamlPath = path.join(base, `${env}.yaml`);

  if (fs.existsSync(jsonPath)) {
    return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  }
  if (fs.existsSync(yamlPath)) {
    return yaml.load(fs.readFileSync(yamlPath, 'utf8'));
  }
  // fallback to testData.json or testData.yaml
  const defaultJson = path.join(base, 'testData.json');
  const defaultYaml = path.join(base, 'testData.yaml');
  if (fs.existsSync(defaultJson)) return JSON.parse(fs.readFileSync(defaultJson, 'utf8'));
  if (fs.existsSync(defaultYaml)) return yaml.load(fs.readFileSync(defaultYaml, 'utf8'));

  throw new Error('No test data found for env: ' + env);
}

module.exports = { loadData };