import DataTable from "../../components/DataTable";

function ProfitReport() {

  const columns = [
    "Product",
    "Purchase Price",
    "Selling Price",
    "Profit"
  ];

  const data = [
    {
      Product: "Glass Panel",
      "Purchase Price": "QAR 50",
      "Selling Price": "QAR 80",
      Profit: "QAR 30"
    }
  ];

  return (
    <>

      <h1 className="text-2xl font-semibold mb-6">
        Profit Tracking
      </h1>

      <DataTable columns={columns} data={data} />

    </>
  );
}

export default ProfitReport;