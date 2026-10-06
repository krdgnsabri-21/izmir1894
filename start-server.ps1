# Lightweight zero-dependency local web server for İzmir Vilayeti 1894 Map (Leaflet)
$port = 8082
$url = "http://localhost:$port/"
$baseDir = $PSScriptRoot
if (-not $baseDir) { $baseDir = (Get-Location).Path }

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Izmir Vilayeti 1894 (Vital Cuinet - Dijital harita: Sabri Karadogan)" -ForegroundColor Yellow
Write-Host " Adres: $url" -ForegroundColor Green
Write-Host " Tarayicinizda acmak icin bekleyin (Durdurmak icin: Ctrl+C)" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)

try {
    $listener.Start()
} catch {
    Write-Host "Port $port mesgul olabilir, alternatif port deneniyor..." -ForegroundColor Yellow
    $port = 8889
    $url = "http://localhost:$port/"
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add($url)
    $listener.Start()
}

Start-Process $url

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".png"  = "image/png"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($path)) { $path = "index.html" }
        $filePath = Join-Path $baseDir $path.Replace('/', '\')

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $response.ContentType = $mime
            $response.Headers.Add("Access-Control-Allow-Origin", "*")

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 - Dosya Bulunamadi: $path")
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
