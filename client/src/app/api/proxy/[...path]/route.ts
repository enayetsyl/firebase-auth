import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request, { params }: { params: { path: string[] } }) {
  return proxyRequest(request, params);
}

export async function POST(request: Request, { params }: { params: { path: string[] } }) {
  return proxyRequest(request, params);
}

export async function PUT(request: Request, { params }: { params: { path: string[] } }) {
  return proxyRequest(request, params);
}

export async function DELETE(request: Request, { params }: { params: { path: string[] } }) {
  return proxyRequest(request, params);
}

async function proxyRequest(request: Request, params: { path: string[] }) {
  const path = (await params).path.join('/');
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';
  const url = `${backendUrl}/api/v1/${path}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (sessionCookie) {
    headers['Authorization'] = `Bearer ${sessionCookie}`;
  }

  try {
    const body = request.method !== 'GET' && request.method !== 'HEAD' ? await request.text() : undefined;

    const response = await fetch(url, {
      method: request.method,
      headers,
      body,
    });

    const data = await response.json();

    const nextResponse = NextResponse.json(data, { status: response.status });

    // Forward Set-Cookie header
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
      nextResponse.headers.set('set-cookie', setCookie);
    }

    return nextResponse;
  } catch (error) {
    console.error('Proxy Error:', error);
    return NextResponse.json({ error: 'Proxy Error' }, { status: 500 });
  }
}
