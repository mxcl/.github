const { join } = require('path');
const { readFileSync, mkdirSync, writeFileSync, rmdirSync } = require('fs');
const core = require('@actions/core');
const artifact = require('@actions/artifact');

const WORKDIR = join(process.cwd(), '.dev.mxcl');

async function storeData(key, value) {
    const client = artifact.create();
    const file = join(WORKDIR, `${key}.txt`);
    mkdirSync(WORKDIR, { recursive: true });
    writeFileSync(file, value, { encoding: 'utf8' });
    await client.uploadArtifact(key, [file], WORKDIR)
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

    core.setOutput('json', JSON.stringify(values, null, 2))
}

async function loadAllData(firstColumnTitles) {
  const client = artifact.create();
  const downloadResponse = await client.downloadAllArtifacts();

  const values = {}
  for (const rsp of downloadResponse) {
    const key = rsp.artifactName
    let value
    try {
      const fn = join(rsp.downloadPath, `${key}.txt`);
      value = readFileSync(fn, { encoding: 'utf8' }).toString();
      rmdirSync(rsp.downloadPath, {recursive: true});
    } catch (error) {
      core.warning(error);
      value = null;
    }
    core.setOutput(key, value);

    const [firstColumnKey, columnKey] = (() => {
      const parts = key.split('-')
      const k2 = parts.pop()
      return [parts.join('-'), k2]
    })()

    if (!values[firstColumnKey]) values[firstColumnKey] = {}
    values[firstColumnKey][columnKey] = value
  }

  const json = []
  for (key in values) {
    const obj = {...values[key]}

    key.split('-').forEach((x, i) => obj[firstColumnTitles[i]] = x)

    json.push(obj)
  }
  core.setOutput('json', JSON.stringify(json, null, 2))
}

async function run(){
  const inputs = {
    key: core.getInput('key'),
    value: core.getInput('value'),
    firstColumns: core.getInput('first-columns').split(/\s+/)
  }

  if (inputs.value) {
    await storeData(inputs.key, inputs.value)
  } else if (inputs.key) {
    await loadData(inputs.key.split(/\s+/))
  } else {
    await loadAllData(inputs.firstColumns)
  }
}

run()
  .then(() => core.info('✅'))
  .catch(e => core.setFailed(e.toString()))
