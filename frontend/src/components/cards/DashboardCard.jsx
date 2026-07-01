export default function DashboardCard({
  title,
  value,
  color,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border-l-8"
      style={{ borderColor: color }}
    >

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h1 className="text-5xl font-bold mt-4">
        {value}
      </h1>

    </div>
  );
}