import Header from "@/app/ui/header";
import Image from "next/image";

import Content from "@/app/ui/content";
import path from "path";
import { PostType } from "../lib/definitions";
import Link from "next/link";

const cssFilePath = path.resolve(process.cwd(), "app/ui/post.module.css");

export default async function Post(props: {
  post: PostType;
  isDetailPage?: boolean;
}) {
  const { post, isDetailPage = false } = props;
  return (
    <main>
      <article key={post.id}>
        <Link href={`/posts/get/${post.id}`}>
          <Header title={post.title} updated_at={post.updated_at} />
        </Link>
        <Image
          src="/image-sample.webp"
          alt="sample image"
          width={500}
          height={500}
          className="m-auto mb-5"
        />
        <Content
          content={post.content ?? ""}
          cssFilePath={cssFilePath}
          isDetailPage={isDetailPage}
        />
      </article>
    </main>
  );
}
