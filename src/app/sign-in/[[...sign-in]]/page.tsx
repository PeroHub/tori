"use client";

import { SignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const [returnUrl, setReturnUrl] = useState("/");

  useEffect(() => {
    // Set the return URL after component mounts
    setReturnUrl(window.location.href);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <SignIn afterSignInUrl={returnUrl} redirectUrl={returnUrl} />
    </div>
  );
}
