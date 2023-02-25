import { api } from "@/utils/api";
import CreatePanel from "./components/CreatePanel";
import DataPanel from "./components/DataPanel";
import { Bars } from "react-loading-icons";

export default function Samplers() {
  const { data, refetch, isInitialLoading } = api.sampler.getAll.useQuery();
  return (
    <div className="mx-auto w-3/4 rounded p-4 text-white opacity-80">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl">Mintavevők</h1>
        <CreatePanel refetch={refetch} />
      </div>
      <div>
        {isInitialLoading ? (
          <Bars className="mx-auto h-56 w-56" />
        ) : (
          <DataPanel samplers={data} refetch={refetch} />
        )}
      </div>
    </div>
  );
}
