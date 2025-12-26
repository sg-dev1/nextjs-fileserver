'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function Files() {
  const [files, setFiles] = useState<string[]>([]);
  const router = useRouter();

  //console.log(`basePath=${basePath}`);

  useEffect(() => {
    fetch(`${basePath}/api/files`)
      .then(res => res.json())
      .then(data => setFiles(data.files));
  }, []);

  const logout = async () => {
    await fetch(`${basePath}/api/logout`, { method: 'POST' });
    router.push('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Available Files</h1>
        <button onClick={logout} style={{ padding: '10px 20px' }}>Logout</button>
      </div>
      <ul>
        {files.map(file => (
          <li key={file}>
            <a href={`${basePath}/api/serve/${file}`} target="_blank" rel="noopener noreferrer">
              {file}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}