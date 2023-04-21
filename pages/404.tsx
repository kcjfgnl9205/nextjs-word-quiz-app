import Link from "next/link";


export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-40 px-4">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-8">페이지를 찾을 수 없습니다.</p>
      <Link href="/" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Go back home</Link>
    </div>
  );
}
