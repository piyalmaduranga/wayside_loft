import supabase, { supabaseWithToken } from "./db";

import { getRiskySupabaseClient } from "./supabaseRiskyClient";
export async function getGuestById(id) {
  let request = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/guests?id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_KEY}`,
      },
    }
  );

  const response = await request.json();

  const { data: guests, error } = response;

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return guests;
}

export async function getGuestByEmail(email) {
  let request = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/guests?email=${email}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_KEY}`,
      },
    }
  );

  const response = await request.json();

  const { data: guests, error } = response;

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) {
    console.log({ error: error });
    throw new Error(error?.messagse ?? "Failed to fetch guest");
  }

  return guests;
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
