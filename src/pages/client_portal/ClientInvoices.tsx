import ClientLayout from "../../layouts/ClientLayout";
import DataTable from "../../components/DataTable";
import { Link } from "react-router-dom";

function ClientInvoices() {

  const columns = [
    "Invoice",
    "Amount",
    "Status",
    "Date"
  ];

  const data = [
    {
      Invoice: "INV-001",
      Amount: "QAR 1200",
      Status: "Pending",
      Date: "2026-03-05",
      Actions: (
        <Link to="/client/invoices" className="text-brand-600 hover:underline text-sm font-medium">
          View Detail
        </Link>
      )
    }
  ];

  const allColumns = [...columns, "Actions"];

  return (

    <ClientLayout>

      <h1 className="text-xl font-semibold mb-6">
        My Invoices
      </h1>

      <DataTable columns={allColumns} data={data} />

    </ClientLayout>

  );

}

export default ClientInvoices;