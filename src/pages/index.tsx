import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import Navigation from "@/components/Navigation";
import Login from "@/components/auth/Login";
import Statistics from "@/components/Statistics";
import Search from "@/components/Search";

const Home: NextPage = () => {
  const { data } = useSession();

  if (data?.user === undefined) return <Login />;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <Navigation />
        <div className="align-items-center  grid p-8">
          <Statistics />
          <Search />
        </div>
      </main>
    </>
  );
};

export default Home;
