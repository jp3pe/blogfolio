"use client";

import { signIn } from "@/app/lib/actions";
import { Button } from "@/app/ui/buttons";
import { TextInput } from "@/app/ui/inputs";
import { useFormState, useFormStatus } from "react-dom";

function LoginButton() {
  const { pending } = useFormStatus();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <Button
      type="submit"
      onClick={handleClick}
      ariaDisabled={pending}
      className="bg-gray-700 hover:bg-gray-600 focus:ring-gray-500"
    >
      Login
    </Button>
  );
}

export default function Page() {
  const [errorMessage, dispatch] = useFormState(signIn, undefined);
  return (
    <div className="max-w-md mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-6">로그인</h1>
      <form action={dispatch} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            이메일:
          </label>
          <TextInput id="email" name="email" type="email" required />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            비밀번호:
          </label>
          <TextInput type="password" id="password" name="password" required />
        </div>
        {errorMessage && typeof errorMessage === "string" && (
          <div className="text-red-500 text-sm">
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        )}
        <LoginButton />
      </form>
    </div>
  );
}
