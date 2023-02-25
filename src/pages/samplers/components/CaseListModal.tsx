import { StateEnum, StateEnumLevel } from "@/schema/StateSchema";
import { getFullname } from "@/services/StringService";
import { api, RouterOutputs } from "@/utils/api";
import Image from "next/image";

export default function CaseListModal({
  id,
  sampler,
  refetch,
}: {
  id: string;
  sampler: RouterOutputs["sampler"]["getAll"][0];
  refetch: any;
}) {
  const remove = api.sampler.getOffCase.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <>
      <div className="modal text-left" id={id + "-cases"}>
        <div className="modal-box relative">
          <a href="#" className="btn-sm btn-circle btn absolute right-2 top-2">
            ✕
          </a>
          <div className="flex justify-between text-lg font-bold">
            <p>Munkák</p>
            <p className="pr-5">{sampler.cases.length}</p>
          </div>

          {sampler.cases.length > 0 ? (
            sampler.cases.map((caseEl) => (
              <div key={caseEl.id} className="mt-3 rounded bg-base-300 p-2">
                <div className="flex justify-between">
                  <p>{getFullname(caseEl.client)}</p>
                  <div
                    className={`badge-sm sm:badge-md badge-${
                      StateEnumLevel[caseEl.state]
                    } badge`}
                  >
                    {StateEnum[caseEl.state]}
                  </div>
                </div>
                <p className="text-sm">Ár: 123 ft</p>
                <div className="text-sm">
                  <p>Tesztek</p>
                  <div className="grid grid-cols-2 p-1 text-xs">
                    <p>PCR: 1db</p>
                    <p>Szerológiai: 1db</p>
                  </div>
                </div>

                <div className="mt-3 flex justify-end">
                  <button
                    className="btn-error btn-xs btn"
                    onClick={() =>
                      remove.mutate({
                        caseId: caseEl.id,
                        samplerId: sampler.id,
                      })
                    }
                  >
                    Eltávolítás
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>
              <Image
                alt="Nincs adat"
                src="/illustrations/no-data.svg"
                width={450}
                height={450}
              />
              <h1 className="text-center text-3xl">Sajnos nincsenek munkák</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
