export default function Header({
  title,
  updated_at,
}: {
  title: string;
  updated_at: Date;
}) {
  return (
    <header className="flex flex-col justify-between items-start bg-white w-full mb-10">
      <h1 className="text-4xl font-bold text-left break-words">{title}</h1>
      <div className="mt-4">
        <p>
          Update on:{" "}
          {updated_at.toISOString().replace(/T/, " ").replace(/\..+/, "")}
        </p>
      </div>
    </header>
  );
}
