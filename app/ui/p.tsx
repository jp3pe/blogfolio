import { PType } from "@/app/ui/content";

type PProps = {
  p: PType;
};

export default function P({ p }: PProps) {
  const { content } = p;

  return <p className="text-center">{content}</p>;
}
