import { fetchPost } from "@/app/lib/db";
import { DeletePost } from "@/app/ui/buttons";
import Post from "@/app/ui/post";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-white max-w-[680px] mx-auto">
      <div className="flex justify-start w-full mb-2">
        <DeletePost id={post.id} />
      </div>
      <Post key={post.id} post={post} isDetailPage={true} />
    </main>
  );
}
