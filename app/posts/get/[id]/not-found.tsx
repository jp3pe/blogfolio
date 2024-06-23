import Link from "next/link";

export default function notFound() {
  return (
    <div className="h-screen flex justify-center items-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      {/* TODO: Go Back에 대해서 실제 이전 URL로 이동하는 로직 추가하기 */}
      <Link
        href="/posts/get"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </div>
  );
}
