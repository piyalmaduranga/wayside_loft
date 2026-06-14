import supabase, { supabaseWithToken } from "./db";

import { getRiskySupabaseClient } from "./supabaseRiskyClient";
export async function getGuestById(id) {
  // Prefer direct DB query via `fetchGuests` which uses the Supabase client
  const data = await fetchGuests({ id, select: '*' });
  return data ?? null;
}

export async function getGuestByEmail(email) {
  const data = await fetchGuests({ email, select: '*' });
  if (!data) throw new Error('Failed to fetch guest');
  return data;
}

// Direct fetch from Supabase (uses the public `supabase` client and the guests_view)
// Supports optional filters: email, id, select fields, pagination (from,to) and ordering
export async function fetchGuests({ email, id, select = '*', from, to, order = 'desc' } = {}) {
  try {
    let query = supabase.from('guests_view').select(select);

    if (email) query = query.eq('email', email).single();
    if (id) query = query.eq('id', id).single();

    if (!isNaN(Number(from)) && !isNaN(Number(to))) {
      query = query.range(Number(from), Number(to));
    }

    query = query.order('id', { ascending: order === 'asc' });

    const { data, error } = await query;

    if (error) {
      console.log('fetchGuests supabase error', error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error('fetchGuests error', err?.message ?? err);
    return null;
  }
}

// Call Supabase REST endpoint directly (useful for external scripts or debugging)
export async function fetchGuestsRest({ select = '*', limit, offset, rangeStart, rangeEnd, order = 'desc' } = {}) {
  const base = `${process.env.NEXT_PUBLIC_SUPABASE_URL.replace(/\/$/, '')}/rest/v1/guests_view`;
  const url = new URL(base);
  if (select) url.searchParams.set('select', select);
  if (order) url.searchParams.set('order', `id.${order}`);
  if (!isNaN(Number(limit))) url.searchParams.set('limit', String(limit));
  if (!isNaN(Number(offset))) url.searchParams.set('offset', String(offset));

  const headers = {
    apikey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_KEY}`,
  };

  // Prefer Range header when provided
  if (!isNaN(Number(rangeStart)) && !isNaN(Number(rangeEnd))) {
    headers.Range = `${rangeStart}-${rangeEnd}`;
    headers.Prefer = 'count=exact';
  }

  const res = await fetch(url.toString(), { headers });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Supabase REST error ${res.status}: ${body}`);
  }
  return res.json();
}

// For use in server-side auth callbacks (signIn, session) where no JWT token exists yet.
// Uses the service role key directly to bypass the /api/guests auth requirement.
export async function getGuestByEmailDirect(email) {
  const { data: guest, error } = await getRiskySupabaseClient()
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  if (error && !error.details?.includes("0 rows")) {
    console.log({ error });
    throw new Error(error.message ?? "Failed to fetch guest by email");
  }

  return guest ?? null;
}

export async function getGuestByIdDirect(id) {
  const { data: guest, error } = await getRiskySupabaseClient()
    .from("guests")
    .select("*")
    .eq("id", id)
    .single();

  if (error && !error.details?.includes("0 rows")) {
    console.log({ error });
    throw new Error(error.message ?? "Failed to fetch guest by id");
  }

  return guest ?? null;
}

export async function getFullGuestByEmail(email) {
  // THIS REQUEST WILL GET THE USER INCLUDING THE PASSWORD FOR SIGN IN PUROSES
  let { data: guests, error } = await getRiskySupabaseClient()
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return guests;
}

export async function updateGuest(
  supabaseAccessToken,
  id,
  name,
  nationality,
  countryFlag,
  phone,
  email,
  nationalID
) {
  const { data, error } = await supabaseWithToken(supabaseAccessToken)
    .from("guests")
    .update({
      fullname: name,
      nationality,
      phone,
      email,
      countryFlag,
      nationalID,
    })
    .eq("id", id)
    .select();

  console.log({ data });

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) {
    console.log("supa error");
    console.log(error);
  }

  return data;
}

export async function updateGuestDirect(
  id,
  name,
  nationality,
  countryFlag,
  phone,
  email,
  nationalID
) {
  const { data, error } = await getRiskySupabaseClient()
    .from("guests")
    .update({
      fullname: name,
      nationality,
      phone,
      email,
      countryFlag,
      nationalID,
    })
    .eq("id", id)
    .select();

  if (error) {
    console.error("updateGuestDirect error:", error);
  }

  return data;
}

export async function updateGuestWithPwd(
  supabaseAccessToken,
  id,
  name,
  nationality,
  countryFlag,
  phone,
  email,
  password
) {
  const { data, error } = await supabaseWithToken(supabaseAccessToken)
    .from("guests")
    .update({
      fullname: name,
      nationality,
      phone,
      email,
      countryFlag,
      password,
    })
    .eq("id", id)
    .select();

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) {
    console.log("supa error");
    console.log(error);
  }

  return data;
}

export async function createGuest(
  fullname,
  email,
  avatar = "",
  password = "",
  phone = "",
  nationality = "",
  countryFlag = "",
  nationalID = ""
) {
  const { data, error } = await getRiskySupabaseClient()
    .from("guests")
    .insert([
      {
        fullname,
        email,
        phone,
        avatar,
        nationality,
        countryFlag,
        nationalID,
        password,
      },
    ])
    .select();

  if (error) {
    console.log("ERROR SUPABASE");
    console.log(error);
  }

  return data;
}
