import DataTable from "../../components/DataTable";
import PageHeader from "../../components/PageHeader";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

function ChartOfAccounts() {

  const columns = [
    "Account Code",
    "Account Name",
    "Type",
    "Balance"
  ];

  const data = [
    {
      "Account Code": "1001",
      "Account Name": "Cash",
      Type: "Asset",
      Balance: "QAR 12,000"
    },
    {
      "Account Code": "2001",
      "Account Name": "Accounts Payable",
      Type: "Liability",
      Balance: "QAR 5,000"
    }
  ];

  return (
    <>

      <PageHeader
        title="Chart of Accounts"
        action={
          <Link to="/create-account">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
              <Plus size={16}/>
              Create Account
            </button>
          </Link>
        }
      />

      <DataTable columns={columns} data={data} />

    </>
  );
}

export default ChartOfAccounts;