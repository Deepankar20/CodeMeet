
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="w-screen bg-[#1a1a1a]">
      <div className="h-[10vh] flex items-center justify-between p-8 shadow-md">
        <button
          className="flex items-center text-[2rem] font-semibold"
          onClick={() => router.push("/")}
        >
          CodeMeet
        </button>

        <div className="flex items-center gap-[2vw]">
          <button
            onClick={() => router.push("/home")}
            className="border p-[0.65rem] hover:bg-slate-100 hover:text-black"
          >
            Home
          </button>

          <div className=" ">
            Start
          </div>
        </div>
      </div>
    </nav>
  );
}
