import Image from "next/image";
import Link from "next/link";
import { FaPen } from "react-icons/fa";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Link href="/">
        <h1 className="text-2xl font-bold">Blogfolio</h1>
      </Link>
      <ul className="flex gap-4 items-center">
        <li>
          <Link href="/posts/post">
            <FaPen className="inline mr-2" />
            Write
          </Link>
        </li>
        <li>About</li>
        <li>Contact</li>
        <li>Sign in</li>
        <li><Link href="/users/sign-up/post">Sign up</Link></li>
        <li className="relative h-10 w-10">
          <Image
            src="/profile-sample.webp"
            alt="User Profile sample image"
            width={40}
            height={40}
            className="rounded-full"
          />
        </li>
      </ul>
    </nav>
  );
}
