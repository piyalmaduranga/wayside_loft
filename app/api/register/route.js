import { signupSchema } from "@/app/_lib/zodSchemas";
import { createGuest, getGuestByEmailDirect } from "@/app/_lib/supabase/guests";
import { hashSync } from "bcryptjs";
import { createLog } from "@/app/_lib/supabase/logs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { fullname, email, password, confirm_password } = body;

    // Validate request body with Zod schema
    const validation = signupSchema.safeParse({
      fullname,
      email,
      password,
      confirm_password,
    });

    if (!validation.success) {
      const fieldErrors = {};
      validation.error.errors.forEach((err) => {
        fieldErrors[err.path[0] ?? "unknown"] = err.message;
      });
      return Response.json({ success: false, errors: fieldErrors }, { status: 400 });
    }

    // Check if the guest already exists
    const existingGuest = await getGuestByEmailDirect(email);
    if (existingGuest) {
      return Response.json(
        { success: false, error: "Email address already exists!" },
        { status: 400 }
      );
    }

    // Generate avatar and insert new guest
    const avatar = `https://ui-avatars.com/api/?name=${fullname.replace(
      " ",
      "+"
    )}&background=161616&color=F1F1F1`;

    await createGuest(fullname, email, avatar, hashSync(password, 10));

    try {
      await createLog("auth", `New signup: ${email}`);
    } catch (logErr) {
      console.error("Failed to create signup log", logErr?.message ?? logErr);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json({ success: false, error: "An unexpected error occurred." }, { status: 500 });
  }
}
