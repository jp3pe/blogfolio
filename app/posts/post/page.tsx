import { insertPost } from "@/app/lib/actions";
import { GoBack, SubmitButton } from "@/app/ui/buttons";
import { TextArea, TextInput } from "@/app/ui/inputs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white max-w-[680px] mx-auto">
      <form action={insertPost} className="w-full max-w-[501px]">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <TextInput id="title" name="title" required />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <TextArea id="content" name="content" rows={10} required />
        </div>
        <Link href={`/posts/get`}>
          <GoBack text="Go back" />
        </Link>
        <SubmitButton text="Submit" />
      </form>
    </main>
  );
}
