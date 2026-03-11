"use client";

import { useFormState, useFormStatus } from "react-dom";
import { subscribeAction } from "@/app/_lib/actions";
import { useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button disabled={pending} type="submit">
            {pending ? "SUBMITTING..." : "SUBMIT"}
        </button>
    );
}

export default function NewsletterForm({ className }) {
    const [state, formAction] = useFormState(subscribeAction, { success: false, message: "" });
    const formRef = useRef(null);

    useEffect(() => {
        if (state?.success && state?.message) {
            toast.success(state.message);
            formRef.current?.reset();
        } else if (state?.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <>
            <form ref={formRef} action={formAction} className={className}>
                <input type="email" name="email" placeholder="Enter Your Email" required />
                <SubmitButton />
            </form>
        </>
    );
}
