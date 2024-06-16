import { markdownToStyledHtml } from "@/app/lib/markdown";

export default function Content({
  content,
  cssFilePath,
}: {
  content: string;
  cssFilePath: string;
}) {
  return (
    <div
      className="flex flex-col mb-20"
      dangerouslySetInnerHTML={{
        __html: markdownToStyledHtml(content, cssFilePath),
      }}
    />
  );
}