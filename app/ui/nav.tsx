import Image from "next/image";
import { FaPen } from "react-icons/fa";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">Blogfolio</h1>
      <ul className="flex gap-4 items-center">
        <li>
          <FaPen className="inline mr-2" />
          Write
        </li>
        <li>About</li>
        <li>Contact</li>
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
