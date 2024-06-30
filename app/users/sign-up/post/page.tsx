import { signUp } from "@/app/lib/actions";
import { SubmitButton } from "@/app/ui/buttons";
import { TextInput } from "@/app/ui/inputs";

export default function Home() {
  return (
    <div className="max-w-md mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-6">회원가입</h1>
      <form action={signUp} className="space-y-4">
        <div>
          <label
            htmlFor="user_id"
            className="block text-sm font-medium text-gray-700"
          >
            사용자 ID:
          </label>
          <TextInput id="user_id" name="user_id" required />
        </div>
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
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            사용자 이름:
          </label>
          <TextInput id="username" name="username" required />
        </div>
        <SubmitButton text="회원가입" />
      </form>
    </div>
  );
}
