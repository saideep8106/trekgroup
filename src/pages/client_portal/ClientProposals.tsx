import DataTable from "../../components/DataTable";
import { Link } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

function ClientProposals() {
    const [proposals, setProposals] = useState<any[]>([]);

    useEffect(() => {
        // In a real app, we'd filter by client ID from auth context
        const persistedProposals = JSON.parse(localStorage.getItem("trek_proposals") || "[]");

        const formattedData = persistedProposals.map((prop: any) => ({
            ...prop,
            "Proposal No": prop.proposalNo,
            "Service Title": prop.title,
            "Amount": `QAR ${parseFloat(prop.amount).toLocaleString()}`,
            "Status": <StatusBadge status={prop.status} />,
            "Date": prop.date,
            "Actions": (
                <div className="flex gap-3">
                    <Link to={`/proposal-details/${prop.id}`} className="flex items-center gap-1 text-brand-600 hover:text-brand-700 font-medium text-sm">
                        <Eye size={14} /> View Details
                    </Link>
                </div>
            )
        }));

        setProposals(formattedData);
    }, []);

    const columns = ["Proposal No", "Service Title", "Amount", "Status", "Date", "Actions"];

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-xl font-bold">My Proposals</h1>
                    <p className="text-slate-500 text-sm">Review and accept your service proposals</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <DataTable columns={columns} data={proposals} />
                {proposals.length === 0 && (
                    <div className="p-10 text-center text-slate-400">
                        No proposals found.
                    </div>
                )}
            </div>
        </>
    );
}

export default ClientProposals;
