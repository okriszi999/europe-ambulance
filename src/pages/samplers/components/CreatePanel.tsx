import { api } from "@/utils/api";
import { useForm } from "react-hook-form";

export default function CreatePanel({ refetch }: { refetch: any }) {
  const { register, handleSubmit } = useForm();
  const { mutate } = api.sampler.create.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  async function onSubmit(data: any) {
    console.log(data);
    mutate({
      name: data.name,
      email: data.email,
    });
  }
  return (
    <div className="dropdown-left dropdown">
      <label tabIndex={0} className="btn m-1">
        Hozzáadás
      </label>
      <div
        tabIndex={0}
        className=" card-compact dropdown-content card w-64 bg-primary p-2 text-primary-content shadow"
      >
        <div className="card-body">
          <h3 className="card-title">Hozzáadás!</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-primary-content">Neve</span>
              </label>
              <input
                placeholder="Kis Lajos"
                className="input-ghost input input-sm"
                {...register("name", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-primary-content">Email</span>
              </label>
              <input
                type="email"
                placeholder="kis.lajos@gmail.com"
                className="input-ghost input input-sm"
                {...register("email", { required: true })}
              />
            </div>
            <input
              type="submit"
              className="btn-accent btn-sm btn mt-3 w-full"
              value="Hozzáadás"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
