import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const validUsername = process.env.USERNAME;
  const validPasswordHash = process.env.PASSWORD_HASH;

  console.log("(POST api/login) process:", typeof process);

  if (username !== validUsername || !bcrypt.compareSync(password, validPasswordHash!)) {
    if (username !== validUsername)
      console.log("validUsername", validUsername, "username", username);
    if (!bcrypt.compareSync(password, validPasswordHash!))
      console.log("password", password, "validPasswordHash", validPasswordHash);
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(secret);

  const response = NextResponse.json({ success: true });
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 86400,
    path: '/',
  });

  return response;
}