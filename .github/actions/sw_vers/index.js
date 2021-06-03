const core = require('@actions/core')
const gha_exec = require('@actions/exec')

// lol `sw_vers -productVersion` does all this for us

async function run() {
  try {
    let stdout = await exec('sw_vers')
    let matches = stdout.match(/^ProductVersion:\s+(.*)$/m)
    if (!matches[1]) throw new Error("Regex match to `sw_vers` failed")
    core.setOutput("macOS", matches[1])

    stdout = await exec('swift', ['--version'])
    matches = stdout.match(/Swift version (.+?)\s/m)
    if (!matches[1]) throw new Error("Regex match for `swift --version` failed")
    core.setOutput("swift", matches[1])

  } catch (error) {
    core.setFailed(error.message);
  }
}

run()

async function exec(command, args) {
  let out = ''

  const listeners = {
    stdout: data => out += data.toString(),
    stderr: data => process.stderr.write(data.toString())
  }

  await gha_exec.exec(command, args, {listeners})

  console.log('stdout collected:', out)

  return out
}
