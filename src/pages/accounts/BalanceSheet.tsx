import PageHeader from "../../components/PageHeader";

function BalanceSheet() {

  return (

    <>

      <PageHeader title="Balance Sheet" />

      <div className="bg-white p-6 rounded-xl border shadow-sm">

        <table className="w-full text-sm">

          <tbody>

            <tr className="border-b">
              <td className="py-2">Assets</td>
              <td className="text-right">QAR 100,000</td>
            </tr>

            <tr className="border-b">
              <td className="py-2">Liabilities</td>
              <td className="text-right">QAR 40,000</td>
            </tr>

            <tr className="font-semibold">
              <td className="py-2">Equity</td>
              <td className="text-right">QAR 60,000</td>
            </tr>

          </tbody>

        </table>

      </div>

    </>

  );
}

export default BalanceSheet;