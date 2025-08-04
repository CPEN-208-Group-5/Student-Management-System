export default function Fees() {
  const fees = [
    { semester: "2024/2025 - Semester 1", amount_due: 1500, amount_paid: 1000, status: "PARTIAL" },
    { semester: "2023/2024 - Semester 2", amount_due: 1500, amount_paid: 1500, status: "PAID" },
    { semester: "2023/2024 - Semester 1", amount_due: 1500, amount_paid: 0, status: "UNPAID" },
    { semester: "2022/2023 - Semester 2", amount_due: 1500, amount_paid: 1500, status: "PAID" },
  ];

  const statusStyles = {
    PAID: "bg-green-100 text-green-700 border-green-300",
    PARTIAL: "bg-yellow-100 text-yellow-700 border-yellow-300",
    UNPAID: "bg-red-100 text-red-700 border-red-300",
  };

  return (
    <div className="space-y-6 shadow-md">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-blue-100 text-xs text-left uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Semester</th>
              <th className="px-6 py-3">Due</th>
              <th className="px-6 py-3">Paid</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{fee.semester}</td>
                <td className="px-6 py-4">GH₵{fee.amount_due}</td>
                <td className="px-6 py-4">GH₵{fee.amount_paid}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full border font-bold text-xs ${statusStyles[fee.status]}`}>
                    {fee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}