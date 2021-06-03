const core = require('@actions/core')
const gha_exec = require('@actions/exec')

// lol `sw_vers -productVersion` does all this for us

async function run() {
  try {
    const stdout = await exec('sw_vers')
    const matches = stdout.match(/^ProductVersion:\s+(.*)$/m)
    if (!matches[1]) throw new Error("Regex match to `sw_vers` failed")
    core.setOutput("macOS-version", matches[1])
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()

async function exec(command) {
  let out = ''

  const listeners = {
    stdout: data => out += data.toString(),
    stderr: data => process.stderr.write(data.toString())
  }

  await gha_exec.exec(command, [], {listeners})

  console.log('stdout collected:', out)

  return out
}
