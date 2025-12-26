//console.log("(GET api/files) process:", typeof process);
// It seems that per default an "Edge" api used that does not support console.log, filesystem access etc.
// Need to export these two to make sure that the "node" api is used.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getAllFiles(dirPath: string, arrayOfFiles: string[] = [], basePath: string = ''): string[] {
  const files = fs.readdirSync(dirPath);

  //console.log("dirPath", dirPath, " -- files ", files);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles, path.join(basePath, file));
    } else {
      arrayOfFiles.push(path.join(basePath, file));
    }
  });

  return arrayOfFiles;
}

export async function GET() {
  console.log("GET api/files");

  const publicDir = path.join(process.cwd(), 'public', 'static');
  
  if (!fs.existsSync(publicDir)) {
    console.log("Warning: The public dir $publicDir does not exist. No files cannot be retrieved. publicDir=", publicDir);
    return NextResponse.json({ files: [] });
  }

  const files = getAllFiles(publicDir);

  return NextResponse.json({ files });
}