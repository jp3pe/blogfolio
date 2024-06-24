import { deletePost } from "@/app/lib/actions";

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
