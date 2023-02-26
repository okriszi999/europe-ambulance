import { StateEnum, StateEnumLevel } from "@/schema/StateSchema";
import { formatDate } from "@/services/DateService";
import { getFullname } from "@/services/StringService";
import { api } from "@/utils/api";

export default function Data() {
  const { data: cases } = api.case.getAll.useQuery();
  return (
    <main className="mx-auto mt-3 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cases && cases.length > 0
        ? cases.map((caseEl) => (
            <div className="indicator w-full">
              <span
                className={`badge-none indicator ${
                  caseEl.seen || "badge-success badge"
                } indicator-item`}
              >
                {caseEl.seen || "Új"}
              </span>
              <div
                className="card-bordered card w-full bg-base-300 text-white"
                key={caseEl.id}
              >
                <div className="card-body">
                  <div className="card-title flex justify-between">
                    <p>{getFullname(caseEl.client)}</p>
                    <div
                      className={`badge-sm sm:badge-md badge-${
                        StateEnumLevel[caseEl.state]
                      } badge`}
                    >
                      {StateEnum[caseEl.state]}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div>
                      <p>Lakhely:</p>
                      <p className="text-sm">{`${caseEl.client?.address?.liveZip}, ${caseEl.client?.address?.liveCity} ${caseEl.client?.address?.liveAddress}`}</p>
                    </div>
                    <div>
                      <p>Születésnap:</p>
                      <p className="text-sm">{formatDate(caseEl.birthday)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        : "nincs"}
    </main>
  );
}
