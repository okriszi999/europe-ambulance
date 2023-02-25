import { formatDate } from "@/services/DateService";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { api, RouterOutputs } from "@/utils/api";
import ModifyModal from "./ModifyModal";
import CaseListModal from "./CaseListModal";
import Image from "next/image";

export default function DataPanel({
  samplers,
  refetch,
}: {
  samplers: RouterOutputs["sampler"]["getAll"][number][] | undefined;
  refetch: any;
}) {
  const [animationParent] = useAutoAnimate();
  const delSampler = api.sampler.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });
  return (
    <div className="mt-5" ref={animationParent}>
      {samplers !== undefined && samplers.length > 0 ? (
        <table className="mx-auto w-full text-center">
          <thead>
            <tr className="text-left">
              <th>Név</th>
              <th>Email</th>
              <th>Felvéve</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="">
            {/* row 1 */}
            {samplers?.map((sampler) => (
              <tr className="m-1">
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{sampler?.name}</div>
                    </div>
                  </div>
                </td>
                <td className="text-left">{sampler?.email}</td>
                <td className="text-left">{formatDate(sampler?.createdAt)}</td>
                <th className="m-1 grid grid-cols-2 gap-1">
                  <a
                    href={"#" + sampler?.id + "-cases"}
                    className="btn-primary btn-xs btn"
                  >
                    Munkák
                  </a>

                  <a
                    href={"#" + sampler?.id + "-modify"}
                    className="btn-warning btn-xs btn"
                  >
                    Módosítás
                  </a>
                  <button
                    onClick={() => delSampler.mutate({ id: sampler.id })}
                    className="btn-error btn-xs btn"
                  >
                    Törlés
                  </button>
                </th>
                <ModifyModal sampler={sampler} refetch={refetch} />
                <CaseListModal
                  refetch={refetch}
                  id={sampler.id}
                  sampler={sampler}
                />
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex w-full flex-col items-center">
          <Image
            alt="Nincsenek mintavevők"
            src="/illustrations/no-users.png"
            height={600}
            width={600}
          />
          <p className="text-3xl">Nincsenek mintavevők</p>
        </div>
      )}
    </div>
  );
}
