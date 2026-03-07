import DataTable from "../../components/DataTable";

function LowStock() {

  const columns = [
    "Product",
    "Stock",
    "Minimum Stock"
  ];

  const data = [
    {
      Product: "Aluminum Frame",
      Stock: "5",
      "Minimum Stock": "10"
    }
  ];

  return (
    <>

      <h1 className="text-2xl font-semibold mb-6">
        Low Stock Alerts
      </h1>

      <DataTable columns={columns} data={data} />

    </>
  );
}

export default LowStock;