import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs'

const MIME_TYPES: Record<string, string> =  {
  '.html': 'text/html',
  '.htm': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  
  // Bilder
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.bmp': 'image/bmp',
  '.tiff': 'image/tiff',
  '.tif': 'image/tiff',
  
  // Schriftarten
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject',
  
  // Audio
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  
  // Video
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ogv': 'video/ogg',
  
  // Dokumente
  '.pdf': 'application/pdf',
  '.zip': 'application/zip',
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathParts } = await params;
  const filePath = pathParts.join('/');
  const fullPath = path.join(process.cwd(), 'public', 'static', filePath);

  if (!fs.existsSync(fullPath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // Binärdateien (Bilder, Schriftarten, etc.) als Buffer lesen
  const isBinary = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.ico', '.bmp', 
                    '.tiff', '.tif', '.woff', '.woff2', '.ttf', '.otf', '.eot',
                    '.mp3', '.wav', '.ogg', '.mp4', '.webm', '.ogv', '.pdf', '.zip']
                    .includes(ext);

  if (isBinary) {
    const content = fs.readFileSync(fullPath);
    return new NextResponse(content, {
      headers: { 'Content-Type': contentType },
    });
  } else {
    const content = fs.readFileSync(fullPath, 'utf-8');
    return new NextResponse(content, {
      headers: { 'Content-Type': contentType },
    });
  }
}