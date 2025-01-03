import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-white dark:bg-gray-900",
          },
        }}
      />
    </div>
  );
}
