import { deletePost } from "@/app/lib/actions";
import Link from "next/link";

export function DeletePost({ id }: { id: string }) {
  const deletePostWithId = deletePost.bind(null, id);

  return (
    <form action={deletePostWithId}>
      <button className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
        Delete
      </button>
    </form>
  );
}

export function UpdatePost({ id }: { id: string }) {
  return (
    <Link href={`/posts/put/${id}`}>
      <button className="inline-flex justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
        Modify
      </button>
    </Link>
  );
}

export function SubmitPost({
  type,
  text,
}: {
  type: "submit" | "reset" | "button";
  text: string;
}) {
  return (
    <button
      type={type}
      className="inline-flex justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    >
      {text}
    </button>
  );
}
