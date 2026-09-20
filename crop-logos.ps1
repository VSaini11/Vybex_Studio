Add-Type -AssemblyName System.Drawing

function Trim-Image($srcPath, $dstPath) {
    $bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
    $minX = $bmp.Width; $maxX = 0; $minY = $bmp.Height; $maxY = 0
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        for ($x = 0; $x -lt $bmp.Width; $x++) {
            $c = $bmp.GetPixel($x, $y)
            if ($c.A -gt 15) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    $w = $maxX - $minX + 1
    $h = $maxY - $minY + 1
    
    # Crop to content rectangle
    $rect = New-Object System.Drawing.Rectangle($minX, $minY, $w, $h)
    $cropped = $bmp.Clone($rect, $bmp.PixelFormat)
    $cropped.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    $bmp.Dispose()
    
    return "Src: $srcPath (${bmp.Width}x${bmp.Height}) -> Cropped: $dstPath (${w}x${h}) ContentBounds: X:$minX..$maxX Y:$minY..$maxY"
}

$msg1 = Trim-Image "d:\startup-landing-page\public\image (1).png" "d:\startup-landing-page\public\amazon-clean-crop.png"
$msg2 = Trim-Image "d:\startup-landing-page\public\vybex-new-transparent.png" "d:\startup-landing-page\public\vybex-clean-crop.png"

Set-Content -Path "d:\startup-landing-page\out.txt" -Value "$msg1`n$msg2"
