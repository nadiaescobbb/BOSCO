$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:3333/')
$listener.Start()
Write-Host 'BOSCO dev server running at http://localhost:3333/' -ForegroundColor Green

$mimeTypes = @{
    '.html' = 'text/html; charset=utf-8'
    '.css'  = 'text/css; charset=utf-8'
    '.js'   = 'application/javascript; charset=utf-8'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.jpeg' = 'image/jpeg'
    '.webp' = 'image/webp'
    '.svg'  = 'image/svg+xml'
}

while ($listener.IsListening) {
    $ctx  = $listener.GetContext()
    $req  = $ctx.Request
    $res  = $ctx.Response

    $urlPath = $req.Url.LocalPath
    if ($urlPath -eq '/') { $urlPath = '/index.html' }

    $localPath = 'c:\BOSCO' + $urlPath.Replace('/', '\')

    if (Test-Path $localPath -PathType Leaf) {
        $bytes = [System.IO.File]::ReadAllBytes($localPath)
        $ext   = [System.IO.Path]::GetExtension($localPath)
        $mime  = $mimeTypes[$ext]
        if (-not $mime) { $mime = 'application/octet-stream' }
        $res.ContentType = $mime
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $res.StatusCode = 404
        $body = [Text.Encoding]::UTF8.GetBytes('Not found')
        $res.ContentLength64 = $body.Length
        $res.OutputStream.Write($body, 0, $body.Length)
    }
    $res.Close()
}
