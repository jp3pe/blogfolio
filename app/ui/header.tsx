export default function Header() {
  return (
    <header className="flex flex-col justify-between items-start p-4 bg-white w-full">
      <h1 className="text-4xl font-bold text-left break-words">
        주말 여행 추천: 경기도 가평
      </h1>
      <div className="mt-4">
        <p>Written on: 2024-06-09</p>
      </div>
    </header>
  );
}
