import StatCard from "../../components/StatCard";
import PageHeader from "../../components/PageHeader";
import { Package, AlertTriangle, TrendingUp } from "lucide-react";

function InventoryDashboard() {

  return (

    <>

      <PageHeader title="Inventory Dashboard" />

      <div className="grid grid-cols-3 gap-6">

        <StatCard
          title="Total Products"
          value="120"
          icon={<Package />}
        />

        <StatCard
          title="Low Stock Items"
          value="8"
          icon={<AlertTriangle />}
        />

        <StatCard
          title="Stock Value"
          value="QAR 45,000"
          icon={<TrendingUp />}
        />

      </div>

    </>

  );

}

export default InventoryDashboard;