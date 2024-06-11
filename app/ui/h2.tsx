import { H2Type } from "@/app/ui/content";

type H2Props = {
  h2: H2Type;
};

export default function H2({ h2 }: H2Props) {
  const { title } = h2;
  
  return (
    <h2 className="mt-10 mb-5 text-2xl font-bold text-left break-words">
	{title}
    </h2>
  );
}
