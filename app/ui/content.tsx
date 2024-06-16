import Image from "next/image";
import H2 from "@/app/ui/h2";
import P from "@/app/ui/p";
import { fetchAllPosts } from "@/app/lib/db";

export type H2Type = {
  title: string;
};

export type PType = {
  content: string;
};

export default async function Content() {
  const posts = await fetchAllPosts();

  return (
    <article className="flex flex-col">
      {posts.map((post, index) => (
        <div key={index}>
          <H2 h2={{ title: post.title }} />
          <Image
            src="/image-sample.webp"
            alt="sample image"
            width={500}
            height={500}
            className="m-auto mb-5"
          />
          <P
            p={{
              content: post.content ?? "",
            }}
          ></P>
        </div>
      ))}
    </article>
  );
}
