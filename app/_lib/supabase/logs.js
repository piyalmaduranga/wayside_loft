import supabase, { supabaseWithToken } from './db';
import { getRiskySupabaseClient } from './supabaseRiskyClient';

// Create a new log entry (server-only privileged insert)
export async function createLog(category = null, description = '') {
  if (!description) throw new Error('description is required');

  const { data, error } = await getRiskySupabaseClient()
    .from('logs')
    .insert([
      {
        category,
        description,
      },
    ])
    .select();

  if (error) {
    console.error('createLog error', error);
    throw error;
  }

  return data?.[0] ?? null;
}

// Fetch logs (RLS aware if using public supabase client). Supports pagination.
export async function getLogs({ limit, offset, rangeStart, rangeEnd, order = 'desc' } = {}) {
  try {
    let query = supabase.from('logs').select('*');

    query = query.order('id', { ascending: order === 'asc' });

    if (!isNaN(Number(rangeStart)) && !isNaN(Number(rangeEnd))) {
      query = query.range(Number(rangeStart), Number(rangeEnd));
    } else if (!isNaN(Number(offset)) && !isNaN(Number(limit))) {
      query = query.range(Number(offset), Number(offset) + Number(limit) - 1);
    }

    const { data, error } = await query;
    if (error) {
      console.error('getLogs supabase error', error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error('getLogs error', err?.message ?? err);
    return null;
  }
}
