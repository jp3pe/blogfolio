import { fetchPost } from "@/app/lib/db";
import Post from "@/app/ui/post";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white max-w-[680px] mx-auto">
      <Post
        id={post.id}
        title={post.title}
        content={post.content}
        created_at={post.created_at}
        updated_at={post.updated_at}
      />
    </main>
  );
}
