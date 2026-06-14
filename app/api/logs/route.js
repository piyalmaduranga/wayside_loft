import { NextResponse } from 'next/server';
import { getRiskySupabaseClient } from '@/app/_lib/supabase/supabaseRiskyClient';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');
    const order = url.searchParams.get('order') === 'asc' ? 'asc' : 'desc';
    const rangeStart = url.searchParams.get('rangeStart');
    const rangeEnd = url.searchParams.get('rangeEnd');

    let query = getRiskySupabaseClient().from('logs').select('*').order('id', { ascending: order === 'asc' });

    if (!isNaN(Number(rangeStart)) && !isNaN(Number(rangeEnd))) {
      query = query.range(Number(rangeStart), Number(rangeEnd));
    } else if (!isNaN(Number(offset)) && !isNaN(Number(limit))) {
      query = query.range(Number(offset), Number(offset) + Number(limit) - 1);
    }

    const { data, error } = await query;
    if (error) return NextResponse.json({ status: 'error', message: error.message, error }, { status: 500 });

    return NextResponse.json({ status: 'success', count: Array.isArray(data) ? data.length : 1, data });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { category = null, description } = body;

    if (!description) return NextResponse.json({ status: 'error', message: 'description is required' }, { status: 422 });

    const { data, error } = await getRiskySupabaseClient()
      .from('logs')
      .insert([{ category, description }])
      .select();

    if (error) return NextResponse.json({ status: 'error', message: error.message, error }, { status: 500 });

    return NextResponse.json({ status: 'success', data: data?.[0] ?? null }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
