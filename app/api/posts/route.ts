import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  const tag = searchParams.get('tag');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '6');
  const offset = (page - 1) * limit;

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  let query = supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      content,
      featured_image,
      tags,
      published_at,
      created_at,
      updated_at,
      author:profiles(name, avatar_url)
    `)
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (search) {
    query = query.or(`title.ilike.%${search}%, content.ilike.%${search}%`);
  }

  if (tag) {
    query = query.contains('tags', [tag]);
  }

  const { data: posts, error } = await query.range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { title, content, excerpt, tags, featured_image, published } = body;

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const { data: post, error } = await supabase
    .from('posts')
    .insert({
      title,
      slug,
      content,
      excerpt,
      tags,
      featured_image,
      published,
      author_id: user.id,
      published_at: published ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ post });
}