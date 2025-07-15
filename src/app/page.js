import Link from "next/link";

export default function Home() {
  return (
    <>
      <h4 className="text-3xl text-green-500">

        <Link href="/products">Products</Link>
      </h4>
    </>
  );
}
