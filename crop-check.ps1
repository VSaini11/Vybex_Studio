Add-Type -AssemblyName System.Drawing
$amazonPath = "d:\startup-landing-page\public\image (1).png"
$vybexPath = "d:\startup-landing-page\public\vybex-new-transparent.png"

function Get-Bounds($path) {
    $bmp = [System.Drawing.Bitmap]::FromFile($path)
    $minX = $bmp.Width; $maxX = 0; $minY = $bmp.Height; $maxY = 0
    for ($y = 0; $y -lt $bmp.Height; $y += 2) {
        for ($x = 0; $x -lt $bmp.Width; $x += 2) {
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
    Write-Output "$path : ImgSize=$($bmp.Width)x$($bmp.Height), ContentBounds=X:$minX..$maxX Y:$minY..$maxY, ContentSize=${w}x${h}"
    $bmp.Dispose()
    return @{ MinX=$minX; MaxX=$maxX; MinY=$minY; MaxY=$maxY; Width=$w; Height=$h }
}

$aBounds = Get-Bounds $amazonPath
$vBounds = Get-Bounds $vybexPath
