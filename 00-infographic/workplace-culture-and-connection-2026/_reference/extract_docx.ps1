Add-Type -AssemblyName System.IO.Compression.FileSystem
$docxPath = 'e:\HR\00-html\00-infographic\workplace-culture-and-connection-2026\_reference\Workplace_Culture_and_Connection_2026_2_27_26_3pm.docx'
$zip = [System.IO.Compression.ZipFile]::OpenRead($docxPath)
$entry = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$xmlContent = $reader.ReadToEnd()
$reader.Close()
$zip.Dispose()

$doc = [xml]$xmlContent
$nsMgr = New-Object System.Xml.XmlNamespaceManager($doc.NameTable)
$nsMgr.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')

$paragraphs = $doc.SelectNodes('//w:p', $nsMgr)
$output = @()
foreach ($para in $paragraphs) {
    $runs = $para.SelectNodes('.//w:t', $nsMgr)
    $text = ($runs | ForEach-Object { $_.InnerText }) -join ''
    $output += $text
}

$output | Out-File -FilePath 'e:\HR\00-html\00-infographic\workplace-culture-and-connection-2026\_reference\docx_content.txt' -Encoding UTF8
Write-Host "Done! Lines: $($output.Count)"
