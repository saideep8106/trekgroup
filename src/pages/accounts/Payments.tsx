
function Payments() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payments</h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          + Record Payment
        </button>
      </div>

      <div className="bg-white shadow rounded">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Payment ID</th>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Invoice</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-3">PAY-001</td>
              <td className="p-3">ABC Company</td>
              <td className="p-3">INV-001</td>
              <td className="p-3">QAR 1200</td>
              <td className="p-3">2026-03-06</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Payments;