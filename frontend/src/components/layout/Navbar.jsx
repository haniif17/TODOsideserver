export default function Navbar() {

  return (

    <header className="bg-white h-20 shadow flex items-center justify-between px-8">

      <div>

        <h1 className="text-3xl font-bold">

          Dashboard

        </h1>

      </div>

      <div className="flex items-center gap-4">

        <div className="text-right">

          <h3 className="font-semibold">

            Admin

          </h3>

          <p className="text-sm text-gray-500">

            Todo Management

          </p>

        </div>

        <img
          src="https://ui-avatars.com/api/?name=Admin"
          className="rounded-full w-12 h-12"
        />

      </div>

    </header>

  );

}