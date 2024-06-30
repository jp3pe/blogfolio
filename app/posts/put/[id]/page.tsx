import { updatePost } from "@/app/lib/actions";
import { fetchPost } from "@/app/lib/db";
import { GoBack, SubmitButton } from "@/app/ui/buttons";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);
  if (!post) {
    notFound();
  }
  const updatePostWithId = updatePost.bind(null, post?.id ?? "");

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
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg h-12 px-4"
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
            rows={10}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-50 px-4 py-2"
            required
          ></textarea>
        </div>
        <Link href={`/posts/get/${post?.id}`}>
          <GoBack text="Go back" />
        </Link>
        <SubmitButton text="Submit" />
      </form>
    </main>
  );
}
