# error 1: config yarn start & i 

node:child_process:399
      ex = new Error('Command failed: ' + cmd + '\n' + stderr);
           ^

Error: Command failed: osascript -e tell app "System Events" to count processes whose name is "Simulator"
28:69: execution error: Not authorized to send Apple events to System Events. (-1743)

    at ChildProcess.exithandler (node:child_process:399:12)
    at ChildProcess.emit (node:events:526:28)
    at maybeClose (node:internal/child_process:1092:16)
    at Process.ChildProcess._handle.onexit (node:internal/child_process:302:5) {
  killed: false,
  code: 1,
  signal: null,
  cmd: 'osascript -e tell app "System Events" to count processes whose name is "Simulator"'
}
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

## [solution: Goto Settings -> Security & Privacy -> Privacy -> Automation -> Privacy tab and check the System Events checkbox.](https://stackoverflow.com/questions/51299066/macos-mojave-automator-not-authorized-to-send-apple-events-to-system-events)

# error 2: [CommandError: No Android connected device found, and no emulators could be started automatically.](https://docs.expo.dev/workflow/android-studio-emulator/)

Android SDK Location: /Users/sun/Library/Android/sdk

四个插件只安装了第一个，更新了第二第三个，第四个太大没管，然后直接跑，程序自己下载了一个插件，就完事了。