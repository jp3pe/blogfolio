import { updatePost } from "@/app/lib/actions";
import { fetchPost } from "@/app/lib/db";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);
  if (!post) {
    notFound();
  }
  const updatePostWithId = updatePost.bind(null, post?.id ?? "");

  // TODO: value를 사용하기 때문에 사용자의 브라우저에서 <input> 태그에 대한 내용을 수정할 수 없는 문제 해결하기
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white max-w-[680px] mx-auto">
      <form action={updatePostWithId} className="w-full max-w-[501px]">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={post?.title ?? ""}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            defaultValue={post?.content ?? ""}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
