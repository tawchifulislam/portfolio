import { NextResponse } from 'next/server';
import { getProfile } from '@/lib/cms';

// stable address that always points to the current resume
export const revalidate = 300;

export async function GET() {
  const { personalInfo } = await getProfile();

  if (!personalInfo.resume) {
    return new NextResponse('Not found', { status: 404 });
  }

  return NextResponse.redirect(personalInfo.resume, 302);
}
