"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function handleClick() {
    router.push("/room/1");
  }
  return (
    <div>
      <h1>Go to room</h1>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
