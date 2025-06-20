"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "./_components/Navbar";

export default function Home() {
  const router = useRouter();

  function handleClick() {
    router.push("/room/1");
  }
  return (
    <div>
      <Navbar/>
      <h1>Go to room</h1>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
