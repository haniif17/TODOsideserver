export default function CategoryTable() {

  const categories = [
    {
      id: 1,
      name: "Kuliah",
      description: "Tugas Kampus",
    },
    {
      id: 2,
      name: "Pribadi",
      description: "Kegiatan Harian",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4 text-left">ID</th>

            <th className="p-4 text-left">Category</th>

            <th className="p-4 text-left">Description</th>

            <th className="p-4 text-center">Action</th>

          </tr>

        </thead>

        <tbody>

          {categories.map((item) => (

            <tr
              key={item.id}
              className="border-t"
            >

              <td className="p-4">
                {item.id}
              </td>

              <td className="p-4">
                {item.name}
              </td>

              <td className="p-4">
                {item.description}
              </td>

              <td className="p-4 text-center">

                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2">
                  Edit
                </button>

                <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}