import DataTable from "../../components/DataTable";
import PageHeader from "../../components/PageHeader";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

function InventoryMovements() {

  const columns = [
    "Product",
    "Type",
    "Quantity",
    "Reference",
    "Date"
  ];

  const data = [
    {
      Product: "Glass Panel",
      Type: "Stock In",
      Quantity: "+50",
      Reference: "PO-001",
      Date: "2026-03-06"
    },
    {
      Product: "Glass Panel",
      Type: "Stock Out",
      Quantity: "-10",
      Reference: "SO-002",
      Date: "2026-03-07"
    }
  ];

  return (
    <>

      <PageHeader
        title="Inventory Movements"
        action={
          <Link to="/create-stock-movement">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
              <Plus size={16} />
              Add Movement
            </button>
          </Link>
        }
      />

      <DataTable columns={columns} data={data} />

    </>
  );
}

export default InventoryMovements;