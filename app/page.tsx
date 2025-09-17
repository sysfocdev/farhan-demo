import Link from "next/link";

function Home() {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div>Welcome to the Home page!</div>
      <Link href="/admin/dashboard" className=" hover:underline cursor-pointer">
        Go to Admin Panel
      </Link>
    </div>
  );
}

export default Home;
