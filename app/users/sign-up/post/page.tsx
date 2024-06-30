import { SubmitButton } from "@/app/ui/buttons";

// TODO: 회원가입 input에 사용되는 component를 공통된 컴포넌트로 리펙토링
export default function Home() {
  return (
    <div className="max-w-md mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-6">회원가입</h1>
      <form action="" className="space-y-4">
        <div>
          <label
            htmlFor="user_id"
            className="block text-sm font-medium text-gray-700"
          >
            사용자 ID:
          </label>
          <input
            type="text"
            name="user_id"
            id="user_id"
            //     value={formData.user_id}
            //     onChange={handleChange}
            required
            className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            이메일:
          </label>
          <input
            type="email"
            id="email"
            value=""
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            비밀번호:
          </label>
          <input
            type="password"
            id="password"
            value=""
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            사용자 이름:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            //     value={formData.username}
            //     onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        {/* <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          회원가입
        </button> */}
        <SubmitButton text="회원가입" />
      </form>
    </div>
  );
}
