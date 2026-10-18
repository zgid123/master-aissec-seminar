param([Parameter(Mandatory=$true)][string]$Destination)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$packageRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$destinationPath = [IO.Path]::GetFullPath($Destination)
if (Test-Path -LiteralPath $destinationPath) { throw 'Destination already exists. Choose a new ZIP path.' }
if (-not (Test-Path -LiteralPath ([IO.Path]::GetDirectoryName($destinationPath)))) { throw 'Destination parent must exist.' }
$selectedFiles = @('README.md','VERIFICATION.md','REVIEW_VA_HUONG_DAN_DIEU_CHINH.md','package.json','package-lock.json','config.json','tsconfig.json','.gitignore')
foreach ($folder in @('src','tests','scripts','docs','artifacts\simulation','artifacts\simulation-reviewed')) {
  $folderPath = Join-Path $packageRoot $folder
  foreach ($item in Get-ChildItem -LiteralPath $folderPath -Recurse -File) {
    $selectedFiles += [IO.Path]::GetRelativePath($packageRoot,$item.FullName)
  }
}
$selectedFiles += 'artifacts\reproducibility.json'
$selectedFiles += 'artifacts\reproducibility-reviewed.json'
$archive = [IO.Compression.ZipFile]::Open($destinationPath,[IO.Compression.ZipArchiveMode]::Create)
try {
  foreach ($relativePath in ($selectedFiles | Sort-Object -Unique)) {
    $sourcePath = [IO.Path]::GetFullPath((Join-Path $packageRoot $relativePath))
    if (-not $sourcePath.StartsWith($packageRoot + [IO.Path]::DirectorySeparatorChar,[StringComparison]::OrdinalIgnoreCase)) { throw 'Package entry outside source.' }
    $entryName = 'member3/' + $relativePath.Replace('\','/')
    [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive,$sourcePath,$entryName,[IO.Compression.CompressionLevel]::Optimal) | Out-Null
  }
} finally { $archive.Dispose() }
Get-Item -LiteralPath $destinationPath | Select-Object FullName,Length
Get-FileHash -LiteralPath $destinationPath -Algorithm SHA256
