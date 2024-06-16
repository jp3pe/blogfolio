import Header from "@/app/ui/header";
import { fetchAllPosts } from "@/app/lib/db";
import Image from "next/image";
import path from "path";
import Content from "@/app/ui/content";

const cssFilePath = path.resolve(process.cwd(), "app/ui/post.module.css");

export default async function Post() {
  const posts = await fetchAllPosts();

  return (
    <main>
      {posts.map((post) => (
        <article key={post.id}>
          <Header title={post.title} updated_at={post.updated_at} />
          <Image
            src="/image-sample.webp"
            alt="sample image"
            width={500}
            height={500}
            className="m-auto mb-5"
          />
          <Content content={post.content ?? ""} cssFilePath={cssFilePath} />
        </article>
      ))}
    </main>
  );
}
