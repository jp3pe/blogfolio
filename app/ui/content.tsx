import { markdownToStyledHtml } from "@/app/lib/markdown";

const truncateLength = 200;

export default function Content({
  content,
  cssFilePath,
  isDetailPage = false,
}: {
  content: string;
  cssFilePath: string;
  isDetailPage: boolean;
}) {
  return (
    <div
      className="flex flex-col mb-20"
      dangerouslySetInnerHTML={{
        __html: markdownToStyledHtml(
          isDetailPage
            ? content
            : content.substring(0, truncateLength) + "... ",
          cssFilePath
        ),
      }}
    />
  );
}
