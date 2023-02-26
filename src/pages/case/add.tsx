import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";

import { z } from "zod";
import { CreateCaseSchema } from "@/schema/CreateCaseSchema";
import { api } from "@/utils/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export default function Add() {
  const [sameSamplerAddress, setSameSamplerAddress] = useState(false);
  const [sameBillingAddress, setSameBillingAddress] = useState(false);
  const [isCompanyBilled, setIsCompanyBilled] = useState(true);

  const createCase = api.case.create.useMutation({
    onError: (e) => {
      console.log(e);
      toast.error(
        <div>
          <p>
            [{e.data?.httpStatus}]{e.message.split("|")[1]}
          </p>
          <p>{e.message.split("|")[0]}</p>
        </div>
      );
    },
    onMutate: () => {
      toast.info(
        <div>
          Létrehozás..
          <progress className="progress w-56"></progress>
        </div>
      );
    },
    onSuccess: () => {
      toast.success(<div className="loading">Létrehozva</div>);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<z.infer<typeof CreateCaseSchema>>();

  async function onSubmit(data: z.infer<typeof CreateCaseSchema>) {
    if (sameSamplerAddress) {
      data.address.sample.zip = data.address.home.zip;
      data.address.sample.city = data.address.home.city;
      data.address.sample.address = data.address.home.address;
    }

    if (sameBillingAddress) {
      data.address.billing.zip = data.address.home.zip;
      data.address.billing.city = data.address.home.city;
      data.address.billing.address = data.address.home.address;
    }

    if (!isCompanyBilled) {
      data.company = undefined;
    }

    data.identification.taj = data.identification.taj.replace("-", " ");

    data.gender = data.gender ? true : false;
    data.identification.type = +data.identification.type;
    data.birthday = new Date(data.birthday);

    await createCase.mutate(data);
  }
  return (
    <div className="mx-auto w-3/4 rounded p-4 text-white opacity-80">
      <h1 className="text-2xl">Létrehozás</h1>
      <form
        className="flex flex-col gap-4 pt-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-control grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          <label className="input-group-sm input-group input-group-vertical">
            <span className="flex justify-between p-0">
              <span>Vezetéknév</span>
              <ErrorMessage
                errors={errors}
                name="firstName"
                render={({ message }) => (
                  <p className="badge-error badge pr-2">{message}</p>
                )}
              />
            </span>
            <input
              {...register("firstName", {
                required: "Nem lehet üres",
                minLength: {
                  value: 3,
                  message: "Minimum 3 karakter",
                },
              })}
              type="text"
              placeholder="Molnár"
              className="input-bordered input input-sm"
            />
          </label>

          <label className="input-group-sm input-group input-group-vertical">
            <span className="flex justify-between p-0">
              <span>Keresztnév</span>
              <ErrorMessage
                errors={errors}
                name="lastName"
                render={({ message }) => (
                  <p className="badge-error badge pr-2">{message}</p>
                )}
              />
            </span>
            <input
              {...register("lastName", {
                required: "Nem lehet üres",
                minLength: {
                  value: 3,
                  message: "Minimum 3 karakter",
                },
              })}
              type="text"
              placeholder="Géza"
              className="input-bordered input input-sm"
            />
          </label>

          <label className="input-group-sm input-group input-group-vertical">
            <span className="flex justify-between p-0">
              <span>Email</span>
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <p className="badge-error badge pr-2">{message}</p>
                )}
              />
            </span>
            <input
              {...register("email", {
                required: "Nem lehet üres",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Hibás email cím",
                },
              })}
              type="text"
              placeholder="molnar.geza@gmail.com"
              className="input-bordered input input-sm"
            />
          </label>

          <label className="input-group-sm input-group input-group-vertical">
            <span className="flex justify-between p-0">
              <span>Telefonszám</span>
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <p className="badge-error badge pr-2">{message}</p>
                )}
              />
            </span>
            <input
              {...register("phoneNumber", { required: "Nem lehet üres" })}
              type="text"
              placeholder="+36 20 123 4567"
              className="input-bordered input input-sm"
            />
          </label>
          <label className="input-group-sm input-group input-group-vertical">
            <span>Nem</span>
            <select
              {...register("gender")}
              className="select-bordered select select-sm"
            >
              <option value={0}>Férfi</option>
              <option value={1}>Nő</option>
            </select>
          </label>
          <label className="input-group-sm input-group input-group-vertical">
            <span className="flex justify-between p-0">
              <span>Születésnap</span>
              <ErrorMessage
                errors={errors}
                name="birthday"
                render={({ message }) => (
                  <p className="badge-error badge pr-2">{message}</p>
                )}
              />
            </span>
            <input
              {...register("birthday", { required: "Nem lehet üres" })}
              type="date"
              defaultValue={dayjs().format("YYYY-MM-DD")}
              className="input-bordered input input-sm"
            />
          </label>
        </div>
        <div className="divider">Igazolványok</div>
        <div className="form-control grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className="input-group-sm input-group input-group-vertical">
            <span>Igazolvány típusa</span>
            <select
              {...register("identification.type")}
              className="select-bordered select select-sm w-full"
            >
              <option value={0}>Személyi igazolvány</option>
              <option value={1}>Jogosítvány</option>
              <option value={2}>Útlevél</option>
            </select>
          </label>

          <label className="input-group-sm input-group input-group-vertical">
            <span className="flex justify-between p-0">
              <span>Igazolvány száma</span>
              <ErrorMessage
                errors={errors}
                name="identification.number"
                render={({ message }) => (
                  <p className="badge-error badge pr-2">{message}</p>
                )}
              />
            </span>
            <input
              {...register("identification.number", {
                required: "Nem lehet üres",
              })}
              type="text"
              placeholder="123456AB"
              className="input-bordered input input-sm w-full"
            />
          </label>
          <label className="input-group-sm input-group input-group-vertical">
            <span className="flex justify-between p-0">
              <span>Taj száma</span>
              <ErrorMessage
                errors={errors}
                name="identification.taj"
                render={({ message }) => (
                  <p className="badge-error badge pr-2">{message}</p>
                )}
              />
            </span>

            <input
              {...register("identification.taj", {
                required: "Nem lehet üres",
                pattern: {
                  value: /[0-9]{3}[ -]?[0-9]{3}[ -][0-9]{3}/,
                  message: "Hibás formátum.",
                },
              })}
              maxLength={11}
              type="text"
              placeholder="123 456 789"
              className="input-bordered input input-sm w-full"
            />
          </label>
        </div>
        <div className="divider">Lakcím</div>
        <div className="form-control grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className="input-group-sm input-group input-group-vertical">
            <span className="flex justify-between p-0">
              <span>Irányítószám</span>
              <ErrorMessage
                errors={errors}
                name="address.home.zip"
                render={({ message }) => (
                  <p className="badge-error badge pr-2">{message}</p>
                )}
              />
            </span>
            <input
              {...register("address.home.zip", {
                required: "Nem lehet üres",
              })}
              className="input-bordered input input-sm"
              placeholder="1234"
            />
          </label>

          <label className="input-group-sm input-group input-group-vertical">
            <span className="flex justify-between p-0">
              <span>Város</span>
              <ErrorMessage
                errors={errors}
                name="address.home.city"
                render={({ message }) => (
                  <p className="badge-error badge pr-2">{message}</p>
                )}
              />
            </span>
            <input
              {...register("address.home.city", { required: "Nem lehet üres" })}
              type="text"
              placeholder="Budapest"
              className="input-bordered input input-sm w-full"
            />
          </label>
          <label className="input-group-sm input-group input-group-vertical">
            <span className="flex justify-between p-0">
              <span>Cím</span>
              <ErrorMessage
                errors={errors}
                name="address.home.address"
                render={({ message }) => (
                  <p className="badge-error badge pr-2">{message}</p>
                )}
              />
            </span>
            <input
              {...register("address.home.address", {
                required: "Nem lehet üres",
              })}
              type="text"
              placeholder="Teszt utca 2."
              className="input-bordered input input-sm w-full"
            />
          </label>
        </div>
        <div className="flex justify-between">
          <div>Mintavétel cím</div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-2">Megegyezik a lakcímmel</span>
              <input
                type="checkbox"
                className="toggle"
                onChange={() => setSameSamplerAddress(!sameSamplerAddress)}
                checked={sameSamplerAddress}
              />
            </label>
          </div>
        </div>
        <div className="form-control grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className="input-group-sm input-group input-group-vertical">
            <span className="flex justify-between p-0">
              <span>Irányítószám</span>
              <ErrorMessage
                errors={errors}
                name="address.sample.zip"
                render={({ message }) => (
                  <p className="badge-error badge pr-2">{message}</p>
                )}
              />
            </span>
            <input
              disabled={sameSamplerAddress}
              {...register("address.sample.zip", { minLength: 0 })}
              defaultValue={
                sameSamplerAddress
                  ? getValues("address.home.zip").toString()
                  : ""
              }
              type="text"
              className={`input-bordered input input-sm ${
                sameSamplerAddress ? "input-disabled" : ""
              }`}
              placeholder="1234"
            />
          </label>

          <label className="input-group-sm input-group input-group-vertical">
            <span className="flex justify-between p-0">
              <span>Város</span>
              <ErrorMessage
                errors={errors}
                name="address.sample.city"
                render={({ message }) => (
                  <p className="badge-error badge pr-2">{message}</p>
                )}
              />
            </span>
            <input
              disabled={sameSamplerAddress}
              {...register("address.sample.city", { minLength: 0 })}
              defaultValue={
                sameSamplerAddress ? getValues("address.home.city") : ""
              }
              type="text"
              placeholder="Budapest"
              className={`input-bordered input input-sm ${
                sameSamplerAddress ? "input-disabled" : ""
              }`}
            />
          </label>
          <label className="input-group-sm input-group input-group-vertical">
            <span className="flex justify-between p-0">
              <span>Cím</span>
              <ErrorMessage
                errors={errors}
                name="address.sample.address"
                render={({ message }) => (
                  <p className="badge-error badge pr-2">{message}</p>
                )}
              />
            </span>
            <input
              disabled={sameSamplerAddress}
              {...register("address.sample.address", { minLength: 0 })}
              value={
                sameSamplerAddress ? getValues("address.home.address") : ""
              }
              type="text"
              placeholder="Teszt utca 2."
              className={`input-bordered input input-sm ${
                sameSamplerAddress ? "input-disabled" : ""
              }`}
            />
          </label>
        </div>
        <div className="flex justify-between">
          <div>Számlázási cím</div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-2">Megegyezik a lakcímmel</span>
              <input
                type="checkbox"
                className="toggle"
                onChange={() => setSameBillingAddress(!sameBillingAddress)}
                checked={sameBillingAddress}
              />
            </label>
          </div>
        </div>
        <div className="form-control grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className="input-group-sm input-group input-group-vertical">
            <span className="flex justify-between p-0">
              <span>Irányítószám</span>
              <ErrorMessage
                errors={errors}
                name="address.billing.address"
                render={({ message }) => (
                  <p className="badge-error badge pr-2">{message}</p>
                )}
              />
            </span>
            <input
              disabled={sameBillingAddress}
              {...register("address.billing.zip", { minLength: 0 })}
              type="text"
              defaultValue={
                sameBillingAddress ? getValues("address.home.zip") : ""
              }
              className={`input-bordered input input-sm ${
                sameBillingAddress ? "input-disabled" : ""
              }`}
              placeholder="1234"
            />
          </label>

          <label className="input-group-sm input-group input-group-vertical">
            <span className="flex justify-between p-0">
              <span>Város</span>
              <ErrorMessage
                errors={errors}
                name="address.billing.city"
                render={({ message }) => (
                  <p className="badge-error badge pr-2">{message}</p>
                )}
              />
            </span>
            <input
              disabled={sameBillingAddress}
              {...register("address.billing.city", { minLength: 0 })}
              defaultValue={
                sameBillingAddress ? getValues("address.home.city") : ""
              }
              type="text"
              placeholder="Budapest"
              className={`input-bordered input input-sm ${
                sameBillingAddress ? "input-disabled" : ""
              }`}
            />
          </label>
          <label className="input-group-sm input-group input-group-vertical">
            <span className="flex justify-between p-0">
              <span>Cím</span>
              <ErrorMessage
                errors={errors}
                name="address.billing.address"
                render={({ message }) => (
                  <p className="badge-error badge pr-2">{message}</p>
                )}
              />
            </span>
            <input
              disabled={sameBillingAddress}
              {...register("address.billing.address", { minLength: 0 })}
              defaultValue={
                sameBillingAddress ? getValues("address.home.address") : ""
              }
              type="text"
              placeholder="Teszt utca 2."
              className={`input-bordered input input-sm ${
                sameBillingAddress ? "input-disabled" : ""
              }`}
            />
          </label>
        </div>
        <div className="flex justify-between">
          <div>Cég adatai</div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-2">Cég számlázza?</span>
              <input
                type="checkbox"
                className="toggle"
                onChange={() => setIsCompanyBilled(!isCompanyBilled)}
                checked={isCompanyBilled}
              />
            </label>
          </div>
        </div>
        <div className="form-control grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className="input-group-sm input-group input-group-vertical">
            <span>Cég neve</span>
            <input
              disabled={!isCompanyBilled}
              {...register("company.name")}
              className="input-bordered input input-sm"
              placeholder="Kell a teszt kft."
            />
          </label>

          <label className="input-group-sm input-group input-group-vertical">
            <span>Cég székhelye</span>
            <input
              disabled={!isCompanyBilled}
              {...register("company.headquarters")}
              type="text"
              placeholder="1234, Budapest Pöttyös utca 2."
              className="input-bordered input input-sm w-full"
            />
          </label>
          <label className="input-group-sm input-group input-group-vertical">
            <span>Cég Adószáma</span>
            <input
              disabled={!isCompanyBilled}
              {...register("company.taxNumber")}
              type="text"
              placeholder="12345678-1-12"
              className="input-bordered input input-sm w-full"
            />
          </label>
        </div>
        <input
          type="submit"
          className={`btn-primary btn ${
            createCase.isError ? "btn-error" : ""
          } ${createCase.isSuccess ? "btn-success" : ""} ${
            createCase.isLoading ? "loading" : ""
          }`}
          value="Mentés"
        />
      </form>
    </div>
  );
}
