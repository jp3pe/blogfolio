import { deletePost } from "@/app/lib/actions";
import Link from "next/link";

export function Button({
  className,
  type = "button",
  children,
}: {
  className: string;
  type?: "submit" | "reset" | "button";
  children: React.ReactNode;
}) {
  const baseClass =
    "inline-flex justify-center rounded-md border border-transparent mr-2 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
  return (
    <button type={type} className={`${baseClass} ${className}`}>
      {children}
    </button>
  );
}

export function DeletePost({ id }: { id: string }) {
  const deletePostWithId = deletePost.bind(null, id);

  return (
    <form action={deletePostWithId}>
      <Button
        className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
        type="submit"
      >
        Delete
      </Button>
    </form>
  );
}

export function UpdatePost({ id }: { id: string }) {
  return (
    <Link href={`/posts/put/${id}`}>
      <Button className="bg-gray-700 hover:bg-gray-600 focus:ring-gray-500">
        Modify
      </Button>
    </Link>
  );
}

export function SubmitButton({
  text,
}: {
  text: string;
}) {
  return (
    <Button
      type="submit"
      className="bg-gray-700 hover:bg-gray-600 focus:ring-gray-500"
    >
      {text}
    </Button>
  );
}

export function GoBack({text}: {text: string}) {
  return (
    <Button
      type="button"
      className="bg-blue-500 hover:bg-blue-400 focus:ring-blue-300"
    >
      {text}
    </Button>
  );
}
