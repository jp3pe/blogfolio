import Content from "@/app/ui/content";
import Header from "@/app/ui/header";
import { Marked } from "@ts-stack/markdown";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { fetchAllPosts } from "@/app/lib/db";
import Image from "next/image";

// 마크다운을 안전한 HTML로 변환하는 함수
const markdownToSafeHtml = (markdown: string): string => {
  const dirtyHtml = Marked.parse(markdown);
  const cleanHtml = DOMPurify(new JSDOM("<!DOCTYPE html>").window).sanitize(
    dirtyHtml
  );
  return cleanHtml;
};

// 안전한 HTML을 렌더링하는 컴포넌트
const SafeMarkdownComponent = ({ content }: { content: string }) => (
  <div className="flex flex-col" dangerouslySetInnerHTML={{ __html: markdownToSafeHtml(content) }} />
);

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
          {/* <Content> */}
          <SafeMarkdownComponent content={post.content ?? ""} />
          {/* </Content> */}
        </article>
      ))}
    </main>
  );
}
