Add-Type -AssemblyName System.Drawing

$srcPath = "e:\HR\00-html\00-hrwest-2027\03-assets\hero-backgrounds\sponsors_hero_bg_v2.jpg"
$src = [System.Drawing.Image]::FromFile($srcPath)

# Crop exactly the 1-2 prominent sponsor booths in the foreground with attendees
# Y starts at 48% (around 370px) where the booth signs start, down to the bottom
$cropY = [int]($src.Height * 0.48)
$cropH = $src.Height - $cropY
$cropX = 0
$cropW = $src.Width

$rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$destBmp = New-Object System.Drawing.Bitmap($rect.Width, $rect.Height)
$g = [System.Drawing.Graphics]::FromImage($destBmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$g.DrawImage($src, (New-Object System.Drawing.Rectangle(0, 0, $destBmp.Width, $destBmp.Height)), $rect, [System.Drawing.GraphicsUnit]::Pixel)

# Save as sponsors_hero_bg_v3.jpg and why_sponsor_hero_bg_v3.jpg
$destBmp.Save("e:\HR\00-html\00-hrwest-2027\03-assets\hero-backgrounds\sponsors_hero_bg_v3.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$destBmp.Save("e:\HR\00-html\00-hrwest-2027\03-assets\hero-backgrounds\why_sponsor_hero_bg_v3.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)

# Also create the .webp placeholder files in 03-assets and 03-images so they can be uploaded to CDN
Copy-Item "e:\HR\00-html\00-hrwest-2027\03-assets\hero-backgrounds\sponsors_hero_bg_v3.jpg" "e:\HR\00-html\00-hrwest-2027\03-assets\hero-backgrounds\sponsors_hero_bg_v3.webp" -Force
Copy-Item "e:\HR\00-html\00-hrwest-2027\03-assets\hero-backgrounds\why_sponsor_hero_bg_v3.jpg" "e:\HR\00-html\00-hrwest-2027\03-assets\hero-backgrounds\why_sponsor_hero_bg_v3.webp" -Force
Copy-Item "e:\HR\00-html\00-hrwest-2027\03-assets\hero-backgrounds\sponsors_hero_bg_v3.webp" "e:\HR\00-html\00-hrwest-2027\03-images\sponsors_hero_bg_v3.webp" -Force
Copy-Item "e:\HR\00-html\00-hrwest-2027\03-assets\hero-backgrounds\why_sponsor_hero_bg_v3.webp" "e:\HR\00-html\00-hrwest-2027\03-images\why_sponsor_hero_bg_v3.webp" -Force

$g.Dispose()
$destBmp.Dispose()
$src.Dispose()

Write-Host "Panoramic 1-2 booth background v3 generated: $($rect.Width) x $($rect.Height)"
