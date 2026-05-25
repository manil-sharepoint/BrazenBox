$bundledNode = "$env:USERPROFILE\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$npmCli = "$env:APPDATA\npm\node_modules\npm\bin\npm-cli.js"
$nodeBin = Split-Path $bundledNode

if (!(Test-Path $bundledNode)) {
  Write-Error "Bundled Node was not found at $bundledNode"
  exit 1
}

if (!(Test-Path $npmCli)) {
  Write-Error "npm CLI was not found at $npmCli"
  exit 1
}

$env:Path = "$nodeBin;$env:Path"
& $bundledNode $npmCli run build
