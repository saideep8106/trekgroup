import DataTable from "../../components/DataTable";

function PurchaseOrders() {

  const columns = [
    "PO Number",
    "Supplier",
    "Total",
    "Status"
  ];

  const data = [
    {
      "PO Number": "PO-001",
      Supplier: "ABC Supplier",
      Total: "QAR 5000",
      Status: "Pending"
    }
  ];

  return (
    <>

      <h1 className="text-2xl font-semibold mb-6">
        Purchase Orders
      </h1>

      <DataTable columns={columns} data={data} />

    </>
  );
}

export default PurchaseOrders;