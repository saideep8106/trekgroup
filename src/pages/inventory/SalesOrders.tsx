import DataTable from "../../components/DataTable";

function SalesOrders() {

  const columns = [
    "Order ID",
    "Customer",
    "Total",
    "Status"
  ];

  const data = [
    {
      "Order ID": "SO-001",
      Customer: "XYZ Company",
      Total: "QAR 2500",
      Status: "Completed"
    }
  ];

  return (
    <>

      <h1 className="text-2xl font-semibold mb-6">
        Sales Orders
      </h1>

      <DataTable columns={columns} data={data} />

    </>
  );
}

export default SalesOrders;