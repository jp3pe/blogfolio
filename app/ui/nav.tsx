import Image from "next/image";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">Blogfolio</h1>
      <ul className="flex gap-4 items-center">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li className="relative h-10 w-10">
          <Image
            src="/profile-sample.webp"
            alt="User Profile sample image"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </li>
      </ul>
    </nav>
  );
}
