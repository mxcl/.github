(()=>{var e={351:function(e,t,i){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,i,r){if(r===undefined)r=i;Object.defineProperty(e,r,{enumerable:true,get:function(){return t[i]}})}:function(e,t,i,r){if(r===undefined)r=i;e[r]=t[i]});var n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:true,value:t})}:function(e,t){e["default"]=t});var s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var i in e)if(i!=="default"&&Object.hasOwnProperty.call(e,i))r(t,e,i);n(t,e);return t};Object.defineProperty(t,"__esModule",{value:true});t.issue=t.issueCommand=void 0;const o=s(i(87));const c=i(278);function issueCommand(e,t,i){const r=new Command(e,t,i);process.stdout.write(r.toString()+o.EOL)}t.issueCommand=issueCommand;function issue(e,t=""){issueCommand(e,{},t)}t.issue=issue;const u="::";class Command{constructor(e,t,i){if(!e){e="missing.command"}this.command=e;this.properties=t;this.message=i}toString(){let e=u+this.command;if(this.properties&&Object.keys(this.properties).length>0){e+=" ";let t=true;for(const i in this.properties){if(this.properties.hasOwnProperty(i)){const r=this.properties[i];if(r){if(t){t=false}else{e+=","}e+=`${i}=${escapeProperty(r)}`}}}}e+=`${u}${escapeData(this.message)}`;return e}}function escapeData(e){return c.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A")}function escapeProperty(e){return c.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/:/g,"%3A").replace(/,/g,"%2C")}},186:function(e,t,i){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,i,r){if(r===undefined)r=i;Object.defineProperty(e,r,{enumerable:true,get:function(){return t[i]}})}:function(e,t,i,r){if(r===undefined)r=i;e[r]=t[i]});var n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:true,value:t})}:function(e,t){e["default"]=t});var s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var i in e)if(i!=="default"&&Object.hasOwnProperty.call(e,i))r(t,e,i);n(t,e);return t};var o=this&&this.__awaiter||function(e,t,i,r){function adopt(e){return e instanceof i?e:new i((function(t){t(e)}))}return new(i||(i=Promise))((function(i,n){function fulfilled(e){try{step(r.next(e))}catch(e){n(e)}}function rejected(e){try{step(r["throw"](e))}catch(e){n(e)}}function step(e){e.done?i(e.value):adopt(e.value).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:true});t.getState=t.saveState=t.group=t.endGroup=t.startGroup=t.info=t.warning=t.error=t.debug=t.isDebug=t.setFailed=t.setCommandEcho=t.setOutput=t.getBooleanInput=t.getInput=t.addPath=t.setSecret=t.exportVariable=t.ExitCode=void 0;const c=i(351);const u=i(717);const a=i(278);const l=s(i(87));const d=s(i(622));var f;(function(e){e[e["Success"]=0]="Success";e[e["Failure"]=1]="Failure"})(f=t.ExitCode||(t.ExitCode={}));function exportVariable(e,t){const i=a.toCommandValue(t);process.env[e]=i;const r=process.env["GITHUB_ENV"]||"";if(r){const t="_GitHubActionsFileCommandDelimeter_";const r=`${e}<<${t}${l.EOL}${i}${l.EOL}${t}`;u.issueCommand("ENV",r)}else{c.issueCommand("set-env",{name:e},i)}}t.exportVariable=exportVariable;function setSecret(e){c.issueCommand("add-mask",{},e)}t.setSecret=setSecret;function addPath(e){const t=process.env["GITHUB_PATH"]||"";if(t){u.issueCommand("PATH",e)}else{c.issueCommand("add-path",{},e)}process.env["PATH"]=`${e}${d.delimiter}${process.env["PATH"]}`}t.addPath=addPath;function getInput(e,t){const i=process.env[`INPUT_${e.replace(/ /g,"_").toUpperCase()}`]||"";if(t&&t.required&&!i){throw new Error(`Input required and not supplied: ${e}`)}if(t&&t.trimWhitespace===false){return i}return i.trim()}t.getInput=getInput;function getBooleanInput(e,t){const i=["true","True","TRUE"];const r=["false","False","FALSE"];const n=getInput(e,t);if(i.includes(n))return true;if(r.includes(n))return false;throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${e}\n`+`Support boolean input list: \`true | True | TRUE | false | False | FALSE\``)}t.getBooleanInput=getBooleanInput;function setOutput(e,t){process.stdout.write(l.EOL);c.issueCommand("set-output",{name:e},t)}t.setOutput=setOutput;function setCommandEcho(e){c.issue("echo",e?"on":"off")}t.setCommandEcho=setCommandEcho;function setFailed(e){process.exitCode=f.Failure;error(e)}t.setFailed=setFailed;function isDebug(){return process.env["RUNNER_DEBUG"]==="1"}t.isDebug=isDebug;function debug(e){c.issueCommand("debug",{},e)}t.debug=debug;function error(e){c.issue("error",e instanceof Error?e.toString():e)}t.error=error;function warning(e){c.issue("warning",e instanceof Error?e.toString():e)}t.warning=warning;function info(e){process.stdout.write(e+l.EOL)}t.info=info;function startGroup(e){c.issue("group",e)}t.startGroup=startGroup;function endGroup(){c.issue("endgroup")}t.endGroup=endGroup;function group(e,t){return o(this,void 0,void 0,(function*(){startGroup(e);let i;try{i=yield t()}finally{endGroup()}return i}))}t.group=group;function saveState(e,t){c.issueCommand("save-state",{name:e},t)}t.saveState=saveState;function getState(e){return process.env[`STATE_${e}`]||""}t.getState=getState},717:function(e,t,i){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,i,r){if(r===undefined)r=i;Object.defineProperty(e,r,{enumerable:true,get:function(){return t[i]}})}:function(e,t,i,r){if(r===undefined)r=i;e[r]=t[i]});var n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:true,value:t})}:function(e,t){e["default"]=t});var s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var i in e)if(i!=="default"&&Object.hasOwnProperty.call(e,i))r(t,e,i);n(t,e);return t};Object.defineProperty(t,"__esModule",{value:true});t.issueCommand=void 0;const o=s(i(747));const c=s(i(87));const u=i(278);function issueCommand(e,t){const i=process.env[`GITHUB_${e}`];if(!i){throw new Error(`Unable to find environment variable for file command ${e}`)}if(!o.existsSync(i)){throw new Error(`Missing file at path: ${i}`)}o.appendFileSync(i,`${u.toCommandValue(t)}${c.EOL}`,{encoding:"utf8"})}t.issueCommand=issueCommand},278:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:true});t.toCommandValue=void 0;function toCommandValue(e){if(e===null||e===undefined){return""}else if(typeof e==="string"||e instanceof String){return e}return JSON.stringify(e)}t.toCommandValue=toCommandValue},514:function(e,t,i){"use strict";var r=this&&this.__awaiter||function(e,t,i,r){function adopt(e){return e instanceof i?e:new i((function(t){t(e)}))}return new(i||(i=Promise))((function(i,n){function fulfilled(e){try{step(r.next(e))}catch(e){n(e)}}function rejected(e){try{step(r["throw"](e))}catch(e){n(e)}}function step(e){e.done?i(e.value):adopt(e.value).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())}))};var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var i in e)if(Object.hasOwnProperty.call(e,i))t[i]=e[i];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const s=n(i(159));function exec(e,t,i){return r(this,void 0,void 0,(function*(){const r=s.argStringToArray(e);if(r.length===0){throw new Error(`Parameter 'commandLine' cannot be null or empty.`)}const n=r[0];t=r.slice(1).concat(t||[]);const o=new s.ToolRunner(n,t,i);return o.exec()}))}t.exec=exec},159:function(e,t,i){"use strict";var r=this&&this.__awaiter||function(e,t,i,r){function adopt(e){return e instanceof i?e:new i((function(t){t(e)}))}return new(i||(i=Promise))((function(i,n){function fulfilled(e){try{step(r.next(e))}catch(e){n(e)}}function rejected(e){try{step(r["throw"](e))}catch(e){n(e)}}function step(e){e.done?i(e.value):adopt(e.value).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())}))};var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var i in e)if(Object.hasOwnProperty.call(e,i))t[i]=e[i];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const s=n(i(87));const o=n(i(614));const c=n(i(129));const u=n(i(622));const a=n(i(436));const l=n(i(962));const d=process.platform==="win32";class ToolRunner extends o.EventEmitter{constructor(e,t,i){super();if(!e){throw new Error("Parameter 'toolPath' cannot be null or empty.")}this.toolPath=e;this.args=t||[];this.options=i||{}}_debug(e){if(this.options.listeners&&this.options.listeners.debug){this.options.listeners.debug(e)}}_getCommandString(e,t){const i=this._getSpawnFileName();const r=this._getSpawnArgs(e);let n=t?"":"[command]";if(d){if(this._isCmdFile()){n+=i;for(const e of r){n+=` ${e}`}}else if(e.windowsVerbatimArguments){n+=`"${i}"`;for(const e of r){n+=` ${e}`}}else{n+=this._windowsQuoteCmdArg(i);for(const e of r){n+=` ${this._windowsQuoteCmdArg(e)}`}}}else{n+=i;for(const e of r){n+=` ${e}`}}return n}_processLineBuffer(e,t,i){try{let r=t+e.toString();let n=r.indexOf(s.EOL);while(n>-1){const e=r.substring(0,n);i(e);r=r.substring(n+s.EOL.length);n=r.indexOf(s.EOL)}t=r}catch(e){this._debug(`error processing line. Failed with error ${e}`)}}_getSpawnFileName(){if(d){if(this._isCmdFile()){return process.env["COMSPEC"]||"cmd.exe"}}return this.toolPath}_getSpawnArgs(e){if(d){if(this._isCmdFile()){let t=`/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;for(const i of this.args){t+=" ";t+=e.windowsVerbatimArguments?i:this._windowsQuoteCmdArg(i)}t+='"';return[t]}}return this.args}_endsWith(e,t){return e.endsWith(t)}_isCmdFile(){const e=this.toolPath.toUpperCase();return this._endsWith(e,".CMD")||this._endsWith(e,".BAT")}_windowsQuoteCmdArg(e){if(!this._isCmdFile()){return this._uvQuoteCmdArg(e)}if(!e){return'""'}const t=[" ","\t","&","(",")","[","]","{","}","^","=",";","!","'","+",",","`","~","|","<",">",'"'];let i=false;for(const r of e){if(t.some((e=>e===r))){i=true;break}}if(!i){return e}let r='"';let n=true;for(let t=e.length;t>0;t--){r+=e[t-1];if(n&&e[t-1]==="\\"){r+="\\"}else if(e[t-1]==='"'){n=true;r+='"'}else{n=false}}r+='"';return r.split("").reverse().join("")}_uvQuoteCmdArg(e){if(!e){return'""'}if(!e.includes(" ")&&!e.includes("\t")&&!e.includes('"')){return e}if(!e.includes('"')&&!e.includes("\\")){return`"${e}"`}let t='"';let i=true;for(let r=e.length;r>0;r--){t+=e[r-1];if(i&&e[r-1]==="\\"){t+="\\"}else if(e[r-1]==='"'){i=true;t+="\\"}else{i=false}}t+='"';return t.split("").reverse().join("")}_cloneExecOptions(e){e=e||{};const t={cwd:e.cwd||process.cwd(),env:e.env||process.env,silent:e.silent||false,windowsVerbatimArguments:e.windowsVerbatimArguments||false,failOnStdErr:e.failOnStdErr||false,ignoreReturnCode:e.ignoreReturnCode||false,delay:e.delay||1e4};t.outStream=e.outStream||process.stdout;t.errStream=e.errStream||process.stderr;return t}_getSpawnOptions(e,t){e=e||{};const i={};i.cwd=e.cwd;i.env=e.env;i["windowsVerbatimArguments"]=e.windowsVerbatimArguments||this._isCmdFile();if(e.windowsVerbatimArguments){i.argv0=`"${t}"`}return i}exec(){return r(this,void 0,void 0,(function*(){if(!l.isRooted(this.toolPath)&&(this.toolPath.includes("/")||d&&this.toolPath.includes("\\"))){this.toolPath=u.resolve(process.cwd(),this.options.cwd||process.cwd(),this.toolPath)}this.toolPath=yield a.which(this.toolPath,true);return new Promise(((e,t)=>{this._debug(`exec tool: ${this.toolPath}`);this._debug("arguments:");for(const e of this.args){this._debug(`   ${e}`)}const i=this._cloneExecOptions(this.options);if(!i.silent&&i.outStream){i.outStream.write(this._getCommandString(i)+s.EOL)}const r=new ExecState(i,this.toolPath);r.on("debug",(e=>{this._debug(e)}));const n=this._getSpawnFileName();const o=c.spawn(n,this._getSpawnArgs(i),this._getSpawnOptions(this.options,n));const u="";if(o.stdout){o.stdout.on("data",(e=>{if(this.options.listeners&&this.options.listeners.stdout){this.options.listeners.stdout(e)}if(!i.silent&&i.outStream){i.outStream.write(e)}this._processLineBuffer(e,u,(e=>{if(this.options.listeners&&this.options.listeners.stdline){this.options.listeners.stdline(e)}}))}))}const a="";if(o.stderr){o.stderr.on("data",(e=>{r.processStderr=true;if(this.options.listeners&&this.options.listeners.stderr){this.options.listeners.stderr(e)}if(!i.silent&&i.errStream&&i.outStream){const t=i.failOnStdErr?i.errStream:i.outStream;t.write(e)}this._processLineBuffer(e,a,(e=>{if(this.options.listeners&&this.options.listeners.errline){this.options.listeners.errline(e)}}))}))}o.on("error",(e=>{r.processError=e.message;r.processExited=true;r.processClosed=true;r.CheckComplete()}));o.on("exit",(e=>{r.processExitCode=e;r.processExited=true;this._debug(`Exit code ${e} received from tool '${this.toolPath}'`);r.CheckComplete()}));o.on("close",(e=>{r.processExitCode=e;r.processExited=true;r.processClosed=true;this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);r.CheckComplete()}));r.on("done",((i,r)=>{if(u.length>0){this.emit("stdline",u)}if(a.length>0){this.emit("errline",a)}o.removeAllListeners();if(i){t(i)}else{e(r)}}));if(this.options.input){if(!o.stdin){throw new Error("child process missing stdin")}o.stdin.end(this.options.input)}}))}))}}t.ToolRunner=ToolRunner;function argStringToArray(e){const t=[];let i=false;let r=false;let n="";function append(e){if(r&&e!=='"'){n+="\\"}n+=e;r=false}for(let s=0;s<e.length;s++){const o=e.charAt(s);if(o==='"'){if(!r){i=!i}else{append(o)}continue}if(o==="\\"&&r){append(o);continue}if(o==="\\"&&i){r=true;continue}if(o===" "&&!i){if(n.length>0){t.push(n);n=""}continue}append(o)}if(n.length>0){t.push(n.trim())}return t}t.argStringToArray=argStringToArray;class ExecState extends o.EventEmitter{constructor(e,t){super();this.processClosed=false;this.processError="";this.processExitCode=0;this.processExited=false;this.processStderr=false;this.delay=1e4;this.done=false;this.timeout=null;if(!t){throw new Error("toolPath must not be empty")}this.options=e;this.toolPath=t;if(e.delay){this.delay=e.delay}}CheckComplete(){if(this.done){return}if(this.processClosed){this._setResult()}else if(this.processExited){this.timeout=setTimeout(ExecState.HandleTimeout,this.delay,this)}}_debug(e){this.emit("debug",e)}_setResult(){let e;if(this.processExited){if(this.processError){e=new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`)}else if(this.processExitCode!==0&&!this.options.ignoreReturnCode){e=new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`)}else if(this.processStderr&&this.options.failOnStdErr){e=new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`)}}if(this.timeout){clearTimeout(this.timeout);this.timeout=null}this.done=true;this.emit("done",e,this.processExitCode)}static HandleTimeout(e){if(e.done){return}if(!e.processClosed&&e.processExited){const t=`The STDIO streams did not close within ${e.delay/1e3} seconds of the exit event from process '${e.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;e._debug(t)}e._setResult()}}},962:function(e,t,i){"use strict";var r=this&&this.__awaiter||function(e,t,i,r){function adopt(e){return e instanceof i?e:new i((function(t){t(e)}))}return new(i||(i=Promise))((function(i,n){function fulfilled(e){try{step(r.next(e))}catch(e){n(e)}}function rejected(e){try{step(r["throw"](e))}catch(e){n(e)}}function step(e){e.done?i(e.value):adopt(e.value).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())}))};var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var i in e)if(Object.hasOwnProperty.call(e,i))t[i]=e[i];t["default"]=e;return t};var s;Object.defineProperty(t,"__esModule",{value:true});const o=i(357);const c=n(i(747));const u=n(i(622));s=c.promises,t.chmod=s.chmod,t.copyFile=s.copyFile,t.lstat=s.lstat,t.mkdir=s.mkdir,t.readdir=s.readdir,t.readlink=s.readlink,t.rename=s.rename,t.rmdir=s.rmdir,t.stat=s.stat,t.symlink=s.symlink,t.unlink=s.unlink;t.IS_WINDOWS=process.platform==="win32";function exists(e){return r(this,void 0,void 0,(function*(){try{yield t.stat(e)}catch(e){if(e.code==="ENOENT"){return false}throw e}return true}))}t.exists=exists;function isDirectory(e,i=false){return r(this,void 0,void 0,(function*(){const r=i?yield t.stat(e):yield t.lstat(e);return r.isDirectory()}))}t.isDirectory=isDirectory;function isRooted(e){e=normalizeSeparators(e);if(!e){throw new Error('isRooted() parameter "p" cannot be empty')}if(t.IS_WINDOWS){return e.startsWith("\\")||/^[A-Z]:/i.test(e)}return e.startsWith("/")}t.isRooted=isRooted;function mkdirP(e,i=1e3,n=1){return r(this,void 0,void 0,(function*(){o.ok(e,"a path argument must be provided");e=u.resolve(e);if(n>=i)return t.mkdir(e);try{yield t.mkdir(e);return}catch(r){switch(r.code){case"ENOENT":{yield mkdirP(u.dirname(e),i,n+1);yield t.mkdir(e);return}default:{let i;try{i=yield t.stat(e)}catch(e){throw r}if(!i.isDirectory())throw r}}}}))}t.mkdirP=mkdirP;function tryGetExecutablePath(e,i){return r(this,void 0,void 0,(function*(){let r=undefined;try{r=yield t.stat(e)}catch(t){if(t.code!=="ENOENT"){console.log(`Unexpected error attempting to determine if executable file exists '${e}': ${t}`)}}if(r&&r.isFile()){if(t.IS_WINDOWS){const t=u.extname(e).toUpperCase();if(i.some((e=>e.toUpperCase()===t))){return e}}else{if(isUnixExecutable(r)){return e}}}const n=e;for(const s of i){e=n+s;r=undefined;try{r=yield t.stat(e)}catch(t){if(t.code!=="ENOENT"){console.log(`Unexpected error attempting to determine if executable file exists '${e}': ${t}`)}}if(r&&r.isFile()){if(t.IS_WINDOWS){try{const i=u.dirname(e);const r=u.basename(e).toUpperCase();for(const n of yield t.readdir(i)){if(r===n.toUpperCase()){e=u.join(i,n);break}}}catch(t){console.log(`Unexpected error attempting to determine the actual case of the file '${e}': ${t}`)}return e}else{if(isUnixExecutable(r)){return e}}}}return""}))}t.tryGetExecutablePath=tryGetExecutablePath;function normalizeSeparators(e){e=e||"";if(t.IS_WINDOWS){e=e.replace(/\//g,"\\");return e.replace(/\\\\+/g,"\\")}return e.replace(/\/\/+/g,"/")}function isUnixExecutable(e){return(e.mode&1)>0||(e.mode&8)>0&&e.gid===process.getgid()||(e.mode&64)>0&&e.uid===process.getuid()}},436:function(e,t,i){"use strict";var r=this&&this.__awaiter||function(e,t,i,r){function adopt(e){return e instanceof i?e:new i((function(t){t(e)}))}return new(i||(i=Promise))((function(i,n){function fulfilled(e){try{step(r.next(e))}catch(e){n(e)}}function rejected(e){try{step(r["throw"](e))}catch(e){n(e)}}function step(e){e.done?i(e.value):adopt(e.value).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())}))};var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var i in e)if(Object.hasOwnProperty.call(e,i))t[i]=e[i];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const s=n(i(129));const o=n(i(622));const c=i(669);const u=n(i(962));const a=c.promisify(s.exec);function cp(e,t,i={}){return r(this,void 0,void 0,(function*(){const{force:r,recursive:n}=readCopyOptions(i);const s=(yield u.exists(t))?yield u.stat(t):null;if(s&&s.isFile()&&!r){return}const c=s&&s.isDirectory()?o.join(t,o.basename(e)):t;if(!(yield u.exists(e))){throw new Error(`no such file or directory: ${e}`)}const a=yield u.stat(e);if(a.isDirectory()){if(!n){throw new Error(`Failed to copy. ${e} is a directory, but tried to copy without recursive flag.`)}else{yield cpDirRecursive(e,c,0,r)}}else{if(o.relative(e,c)===""){throw new Error(`'${c}' and '${e}' are the same file`)}yield copyFile(e,c,r)}}))}t.cp=cp;function mv(e,t,i={}){return r(this,void 0,void 0,(function*(){if(yield u.exists(t)){let r=true;if(yield u.isDirectory(t)){t=o.join(t,o.basename(e));r=yield u.exists(t)}if(r){if(i.force==null||i.force){yield rmRF(t)}else{throw new Error("Destination already exists")}}}yield mkdirP(o.dirname(t));yield u.rename(e,t)}))}t.mv=mv;function rmRF(e){return r(this,void 0,void 0,(function*(){if(u.IS_WINDOWS){try{if(yield u.isDirectory(e,true)){yield a(`rd /s /q "${e}"`)}else{yield a(`del /f /a "${e}"`)}}catch(e){if(e.code!=="ENOENT")throw e}try{yield u.unlink(e)}catch(e){if(e.code!=="ENOENT")throw e}}else{let t=false;try{t=yield u.isDirectory(e)}catch(e){if(e.code!=="ENOENT")throw e;return}if(t){yield a(`rm -rf "${e}"`)}else{yield u.unlink(e)}}}))}t.rmRF=rmRF;function mkdirP(e){return r(this,void 0,void 0,(function*(){yield u.mkdirP(e)}))}t.mkdirP=mkdirP;function which(e,t){return r(this,void 0,void 0,(function*(){if(!e){throw new Error("parameter 'tool' is required")}if(t){const t=yield which(e,false);if(!t){if(u.IS_WINDOWS){throw new Error(`Unable to locate executable file: ${e}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`)}else{throw new Error(`Unable to locate executable file: ${e}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`)}}return t}const i=yield findInPath(e);if(i&&i.length>0){return i[0]}return""}))}t.which=which;function findInPath(e){return r(this,void 0,void 0,(function*(){if(!e){throw new Error("parameter 'tool' is required")}const t=[];if(u.IS_WINDOWS&&process.env["PATHEXT"]){for(const e of process.env["PATHEXT"].split(o.delimiter)){if(e){t.push(e)}}}if(u.isRooted(e)){const i=yield u.tryGetExecutablePath(e,t);if(i){return[i]}return[]}if(e.includes(o.sep)){return[]}const i=[];if(process.env.PATH){for(const e of process.env.PATH.split(o.delimiter)){if(e){i.push(e)}}}const r=[];for(const n of i){const i=yield u.tryGetExecutablePath(o.join(n,e),t);if(i){r.push(i)}}return r}))}t.findInPath=findInPath;function readCopyOptions(e){const t=e.force==null?true:e.force;const i=Boolean(e.recursive);return{force:t,recursive:i}}function cpDirRecursive(e,t,i,n){return r(this,void 0,void 0,(function*(){if(i>=255)return;i++;yield mkdirP(t);const r=yield u.readdir(e);for(const s of r){const r=`${e}/${s}`;const o=`${t}/${s}`;const c=yield u.lstat(r);if(c.isDirectory()){yield cpDirRecursive(r,o,i,n)}else{yield copyFile(r,o,n)}}yield u.chmod(t,(yield u.stat(e)).mode)}))}function copyFile(e,t,i){return r(this,void 0,void 0,(function*(){if((yield u.lstat(e)).isSymbolicLink()){try{yield u.lstat(t);yield u.unlink(t)}catch(e){if(e.code==="EPERM"){yield u.chmod(t,"0666");yield u.unlink(t)}}const i=yield u.readlink(e);yield u.symlink(i,t,u.IS_WINDOWS?"junction":null)}else if(!(yield u.exists(t))||i){yield u.copyFile(e,t)}}))}},357:e=>{"use strict";e.exports=require("assert")},129:e=>{"use strict";e.exports=require("child_process")},614:e=>{"use strict";e.exports=require("events")},747:e=>{"use strict";e.exports=require("fs")},87:e=>{"use strict";e.exports=require("os")},622:e=>{"use strict";e.exports=require("path")},669:e=>{"use strict";e.exports=require("util")}};var t={};function __nccwpck_require__(i){var r=t[i];if(r!==undefined){return r.exports}var n=t[i]={exports:{}};var s=true;try{e[i].call(n.exports,n,n.exports,__nccwpck_require__);s=false}finally{if(s)delete t[i]}return n.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var i={};(()=>{const e=__nccwpck_require__(186);const t=__nccwpck_require__(514);async function run(){try{e.info(process.platform);switch(process.platform){case"darwin":let t=await exec("sw_vers");let i=t.match(/^ProductVersion:\s+(.*)$/m);if(!i[1])throw new Error("Regex match to `sw_vers` failed");e.setOutput("os",i[1]);break;default:const{readFileSync:r}=__nccwpck_require__(747);for(const t of r("/etc/os-release",{encoding:"utf8"}).toString().split("\n")){const[i,r]=t.split("=");if(i!=="VERSION")continue;const n=r.match(/((\d+\.)*\d+)\s/);if(n&&n[1]){e.setOutput("os",n[1]);break}}break}stdout=await exec("swift",["--version"]);matches=stdout.match(/Swift version (.+?)\s/m);if(!matches[1])throw new Error("Regex match for `swift --version` failed");e.setOutput("swift",matches[1])}catch(t){e.setFailed(t.message)}}run();async function exec(e,i){let r="";const n={stdout:e=>r+=e.toString(),stderr:e=>process.stderr.write(e.toString())};await t.exec(e,i,{listeners:n});console.log("stdout collected:",r);return r}})();module.exports=i})();