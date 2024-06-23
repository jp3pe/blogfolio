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
      <Post key={post.id} post={post} isDetailPage={true} />
    </main>
  );
}
