import { signIn } from "next-auth/react";

export default function Login() {
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
