export default function Add() {
  return (
    <div className="mx-auto w-3/4 rounded p-4 text-white opacity-80">
      <h1 className="text-2xl">Létrehozás</h1>
      <form className="flex flex-col gap-4 pt-2">
        <div className="form-control grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          <label className="input-group-sm input-group input-group-vertical">
            <span>Vezetéknév</span>
            <input
              type="text"
              placeholder="Molnár"
              className="input-bordered input input-sm"
            />
          </label>

          <label className="input-group-sm input-group input-group-vertical">
            <span>Keresztnév</span>
            <input
              type="text"
              placeholder="Géza"
              className="input-bordered input input-sm"
            />
          </label>

          <label className="input-group-sm input-group input-group-vertical">
            <span>Email</span>
            <input
              type="text"
              placeholder="molnar.geza@gmail.com"
              className="input-bordered input input-sm"
            />
          </label>

          <label className="input-group-sm input-group input-group-vertical">
            <span>Telefonszám</span>
            <input
              type="text"
              placeholder="+36 20 123 4567"
              className="input-bordered input input-sm"
            />
          </label>
          <label className="input-group-xs input-group input-group-vertical">
            <span>Nem</span>
            <select className="select select-sm">
              <option value={0}>Férfi</option>
              <option value={1}>Nő</option>
            </select>
          </label>
        </div>
        <div className="divider">Igazolványok</div>
        <div className="form-control grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          <label className="input-group-sm input-group input-group-vertical">
            <span>Igazolvány típusa</span>
            <select className="select select-sm w-full">
              <option value={0}>Személyi igazolvány</option>
              <option value={1}>Jogosítvány</option>
              <option value={2}>Útlevél</option>
            </select>
          </label>

          <label className="input-group-sm input-group input-group-vertical">
            <span>Igazolvány száma</span>
            <input
              type="text"
              placeholder="123456AB"
              className="input-bordered input input-sm w-full"
            />
          </label>
          <label className="input-group-sm input-group input-group-vertical">
            <span>Taj száma</span>
            <input
              type="text"
              placeholder="123-456-789"
              className="input-bordered input input-sm w-full"
            />
          </label>
        </div>
        <div className="divider">Lakcím</div>
        <div className="form-control grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          <label className="input-group-sm input-group input-group-vertical">
            <span>Irányítószám</span>
            <input className="input input-sm" placeholder="1234" />
          </label>

          <label className="input-group-sm input-group input-group-vertical">
            <span>Város</span>
            <input
              type="text"
              placeholder="Budapest"
              className="input-bordered input input-sm w-full"
            />
          </label>
          <label className="input-group-sm input-group input-group-vertical">
            <span>Cím</span>
            <input
              type="text"
              placeholder="Teszt utca 2."
              className="input-bordered input input-sm w-full"
            />
          </label>
        </div>
        <div className="divider">Mintavétel cím</div>
        <div className="form-control grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          <label className="input-group-sm input-group input-group-vertical">
            <span>Irányítószám</span>
            <input className="input input-sm" placeholder="1234" />
          </label>

          <label className="input-group-sm input-group input-group-vertical">
            <span>Város</span>
            <input
              type="text"
              placeholder="Budapest"
              className="input-bordered input input-sm w-full"
            />
          </label>
          <label className="input-group-sm input-group input-group-vertical">
            <span>Cím</span>
            <input
              type="text"
              placeholder="Teszt utca 2."
              className="input-bordered input input-sm w-full"
            />
          </label>
        </div>
        <div className="divider">Számlázási cím</div>
        <div className="form-control grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          <label className="input-group-sm input-group input-group-vertical">
            <span>Irányítószám</span>
            <input className="input input-sm" placeholder="1234" />
          </label>

          <label className="input-group-sm input-group input-group-vertical">
            <span>Város</span>
            <input
              type="text"
              placeholder="Budapest"
              className="input-bordered input input-sm w-full"
            />
          </label>
          <label className="input-group-sm input-group input-group-vertical">
            <span>Cím</span>
            <input
              type="text"
              placeholder="Teszt utca 2."
              className="input-bordered input input-sm w-full"
            />
          </label>
        </div>
      </form>
    </div>
  );
}
