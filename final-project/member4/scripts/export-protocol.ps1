param(
    [string]$OutputName = 'QUY_TRINH_THUC_NGHIEM_VO_CONG_MINH.docx',
    [string]$SourceName = 'QUY_TRINH_THUC_NGHIEM_VO_CONG_MINH.md'
)

$ErrorActionPreference = 'Stop'
if ([System.IO.Path]::GetFileName($OutputName) -ne $OutputName -or
    [System.IO.Path]::GetExtension($OutputName) -ne '.docx') {
    throw 'OutputName must be a DOCX filename without a directory.'
}
if ([System.IO.Path]::GetFileName($SourceName) -ne $SourceName -or
    [System.IO.Path]::GetExtension($SourceName) -ne '.md') {
    throw 'SourceName must be a Markdown filename without a directory.'
}
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$root = Split-Path -Parent $PSScriptRoot
$source = Join-Path $root $SourceName
$output = Join-Path $root $OutputName
$lines = Get-Content -LiteralPath $source -Encoding UTF8
$paragraphs = New-Object System.Collections.Generic.List[string]
for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    if (-not $line.Trim()) { continue }
    $style = 'Normal'
    if ($i -eq 0) { $style = 'Title' }
    elseif ($line -match '^## ') { $style = 'Heading1' }
    $line = $line -replace '^#{1,2} ', ''
    $escaped = [System.Security.SecurityElement]::Escape($line)
    $paragraphs.Add("<w:p><w:pPr><w:pStyle w:val=`"$style`"/></w:pPr><w:r><w:t xml:space=`"preserve`">$escaped</w:t></w:r></w:p>")
}
$entries = @{
    '[Content_Types].xml' = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>'
    '_rels/.rels' = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'
    'word/_rels/document.xml.rels' = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'
    'word/styles.xml' = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="22"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style><w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:pPr><w:keepNext/></w:pPr><w:rPr><w:b/><w:sz w:val="34"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:pPr><w:keepNext/><w:spacing w:before="240" w:after="120"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:color w:val="17365D"/><w:sz w:val="27"/></w:rPr></w:style></w:styles>'
    'word/document.xml' = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>' + ($paragraphs -join '') + '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134"/></w:sectPr></w:body></w:document>'
}
$temp = [System.IO.Path]::GetTempFileName()
try {
    $zip = [System.IO.Compression.ZipFile]::Open($temp, [System.IO.Compression.ZipArchiveMode]::Update)
    try {
        foreach ($name in ($entries.Keys | Sort-Object)) {
            [xml]$validated = $entries[$name]
            $entry = $zip.CreateEntry($name)
            $writer = New-Object System.IO.StreamWriter($entry.Open(), (New-Object System.Text.UTF8Encoding($false)))
            try { $writer.Write($validated.OuterXml) } finally { $writer.Dispose() }
        }
    } finally { $zip.Dispose() }
    if ([System.IO.File]::Exists($output)) {
        [System.IO.File]::Replace($temp, $output, [System.Management.Automation.Language.NullString]::Value)
    } else {
        [System.IO.File]::Move($temp, $output)
    }
} finally {
    if (Test-Path -LiteralPath $temp) { Remove-Item -LiteralPath $temp }
}
Write-Output "Created $output ($($paragraphs.Count) paragraphs)."
