"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.back();
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [router]);

  return (
    <section className="flex flex-col items-center justify-center">
      <Image src="/notfound.svg" width={550} height={550} alt="404" className="object-center" />

      <h1 className="text-xl font-bold text-center text-gray-500">Oops..Page Not Found, We Send You Back To Your Journey In a Few Seconds!</h1>
    </section>
  );
}
