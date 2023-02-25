import { api } from "@/utils/api";
import { Sampler } from "@prisma/client";
import { useForm } from "react-hook-form";

export default function ModifyModal({
  sampler,
  refetch,
}: {
  sampler: Sampler;
  refetch: any;
}) {
  const update = api.sampler.modify.useMutation({
    onSuccess: () => {
      refetch();
    },
  });
  const { handleSubmit, register } = useForm();

  function onSubmit(data: any) {
    update.mutate({
      name: data.name,
      email: data.email,
      id: sampler.id,
    });
  }

  return (
    <>
      <div className="modal" id={sampler.id + "-modify"}>
        <div className="modal-box relative">
          <a href="#" className="btn-sm btn-circle btn absolute right-2 top-2">
            ✕
          </a>
          <h3 className="text-left text-lg font-bold">
            {sampler.name} módosítása
          </h3>
          <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control text-left">
              <label className="label-text">Név</label>
              <input
                className="input input-sm"
                defaultValue={sampler.name}
                {...register("name")}
              />
            </div>
            <div className="form-control text-left">
              <label className="label-text">Email</label>
              <input
                className="input input-sm"
                defaultValue={sampler.email}
                {...register("email")}
              />
            </div>
            <div className="modal-action">
              <button
                type="submit"
                className={`btn-success btn-sm btn cursor-pointer ${
                  update.isLoading ? "loading" : ""
                }`}
              >
                {update.isLoading ? "Töltés.." : "Mentés"}
              </button>

              <a href="#" className="btn-error btn-sm btn">
                Kilépés
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
