import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(data?.user);
    if (data?.user) {
      router.push("/");
    }
  });
  return (
    <main className="grid h-screen w-screen place-items-center">
      <h1 className="text-7xl font-bold underline">
        Europe Ambulance Kezelőfelület
      </h1>

      <button className="btn-secondary btn" onClick={() => void signIn()}>
        Jelentkezz be
      </button>
    </main>
  );
}
