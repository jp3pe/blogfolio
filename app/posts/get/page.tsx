import { fetchAllPosts } from "@/app/lib/db";
import Post from "@/app/ui/post";

export default async function Home() {
  const posts = await fetchAllPosts();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white max-w-[680px] mx-auto">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </main>
  );
}
