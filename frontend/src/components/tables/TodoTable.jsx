export default function TodoTable() {

  const todos = [
    {
      id: 1,
      title: "Kerjakan UAS PSS",
      category: "Kuliah",
      priority: "High",
      status: "Pending",
      deadline: "2026-07-10",
    },
    {
      id: 2,
      title: "Belajar Django",
      category: "Belajar",
      priority: "Medium",
      status: "Completed",
      deadline: "2026-07-12",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4 text-left">Title</th>

            <th className="p-4 text-left">Category</th>

            <th className="p-4 text-left">Priority</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-left">Deadline</th>

            <th className="p-4 text-center">Action</th>

          </tr>

        </thead>

        <tbody>

          {todos.map((todo) => (

            <tr key={todo.id} className="border-t">

              <td className="p-4">{todo.title}</td>

              <td className="p-4">{todo.category}</td>

              <td className="p-4">

                <span className={`px-3 py-1 rounded-full text-white ${
                  todo.priority === "High"
                    ? "bg-red-500"
                    : todo.priority === "Medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}>
                  {todo.priority}
                </span>

              </td>

              <td className="p-4">

                <span className={`px-3 py-1 rounded-full text-white ${
                  todo.status === "Completed"
                    ? "bg-green-500"
                    : "bg-orange-500"
                }`}>
                  {todo.status}
                </span>

              </td>

              <td className="p-4">
                {todo.deadline}
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