import { signOut, useSession } from "next-auth/react";
import { RoleEnum } from "@/schema/RoleSchema";
import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function Navigation() {
  const { data } = useSession();

  const user = data?.user;
  console.log(user);
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a href="/">Lista</a>
            </li>
            <li>
              <a href="/case/add">Hozzáadás</a>
            </li>
            <li>
              <a href="/samplers">Mintavevők</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn-ghost btn text-xl normal-case">Europe Ambulance</a>
      </div>
      <div className="navbar-end gap-3">
        <div className="dropdown dropdown-end dropdown-hover no-animation">
          <label tabIndex={0} className="btn m-1 flex  items-center gap-3">
            <div className="hidden text-right sm:block">
              <p>{user?.name?.split(" ")[0]}</p>

              <p className="text-xs">
                {user?.role !== undefined && RoleEnum[user?.role]}
              </p>
            </div>
            <div className="avatar">
              <div className="circle w-8 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                <img src={user?.image || "/images/default_user.avif"} />
              </div>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <p className="flex justify-between">
                Profilom
                <UserCircleIcon className="h-6 w-6 text-gray-500" />
              </p>
            </li>
            <li onClick={() => void signOut()}>
              <p className="flex justify-between">
                Kilépés
                <ArrowRightOnRectangleIcon className="h-6 w-6 text-gray-500" />
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
