const { join } = require('path');
const { readFileSync, mkdirSync, writeFileSync } = require('fs');
const core = require('@actions/core');
const artifact = require('@actions/artifact');

const WORKDIR = join(process.cwd(), '.dev.mxcl');

async function storeData(key, value) {
    const client = artifact.create();
    const file = join(WORKDIR, `${key}.txt`);
    mkdirSync(WORKDIR, { recursive: true });
    writeFileSync(file, value, { encoding: 'utf8' });
    await client.uploadArtifact(key, [file], process.cwd())
}

async function loadData(keys){
    const client = artifact.create();
    const values = []
    for (const key of keys) {
      const file = join(WORKDIR, `${key}.txt`);
      let value
      try {
        await client.downloadArtifact(key);
        value = readFileSync(file, { encoding: 'utf8' }).toString();
      } catch (error) {
        core.warning(error)
        value = null
      }
      core.setOutput(key, value);
      values.push({[key]: value})
    }

    core.setOutput('json', JSON.stringify(values))
}

async function run(){
  const inputs = {
    key: core.getInput('key'),
    value: core.getInput('value')
  }

  if (inputs.value) {
    await storeData(inputs.key, inputs.value)
  } else {
    await loadData(inputs.key.split(/\s+/))
  }
}

run()
  .then(() => core.info('✅'))
  .catch(e => core.setFailed(e.toString()))
