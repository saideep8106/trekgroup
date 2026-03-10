import DataTable from "../../components/DataTable";
import { Link } from "react-router-dom";

function ClientJobs() {

  const columns = [
    "Job ID",
    "Service",
    "Status",
    "Due Date"
  ];

  const data = [
    {
      "Job ID": "JOB-001",
      Service: "Visa Renewal",
      Status: "Under Process",
      "Due Date": "2026-03-20",
      Actions: (
        <Link to="/job-details" className="text-brand-600 hover:underline text-sm font-medium">
          View Details
        </Link>
      )
    }
  ];

  const allColumns = [...columns, "Actions"];

  return (
    <>
      <h1 className="text-xl font-semibold mb-6">
        My Jobs
      </h1>

      <DataTable columns={allColumns} data={data} />
    </>
  );

}

export default ClientJobs;