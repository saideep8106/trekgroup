import PageHeader from "../../components/PageHeader";

function ProfitLoss() {

  return (

    <>

      <PageHeader title="Profit & Loss Report" />

      <div className="bg-white p-6 rounded-xl border shadow-sm">

        <table className="w-full text-sm">

          <tbody>

            <tr className="border-b">
              <td className="py-2">Total Revenue</td>
              <td className="text-right">QAR 50,000</td>
            </tr>

            <tr className="border-b">
              <td className="py-2">Total Expenses</td>
              <td className="text-right">QAR 20,000</td>
            </tr>

            <tr className="font-semibold">
              <td className="py-2">Net Profit</td>
              <td className="text-right">QAR 30,000</td>
            </tr>

          </tbody>

        </table>

      </div>

    </>

  );
}

export default ProfitLoss;