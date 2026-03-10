import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Briefcase, FileText, Receipt, Folder } from "lucide-react";
import StatusBadge from "../../components/StatusBadge";
import DataTable from "../../components/DataTable";

export default function ClientDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("overview");

    // Associated Data
    const [jobs, setJobs] = useState<any[]>([]);
    const [invoices, setInvoices] = useState<any[]>([]);
    const [proposals, setProposals] = useState<any[]>([]);
    const [documents, setDocuments] = useState<any[]>([]);

    useEffect(() => {
        // Fetch Client
        const initialClients = [
            { id: "CLI-001", Name: "Ahmed Ali", Email: "ahmed@email.com", Phone: "+974 5555 1234", Company: "ABC Trading" },
            { id: "CLI-002", Name: "Mohammed Khan", Email: "mkhan@email.com", Phone: "+974 6666 5678", Company: "City Builders" }
        ];
        const persistedClients = JSON.parse(localStorage.getItem("trek_clients") || "[]");
        const allClients = [...initialClients, ...persistedClients.map((item: any) => ({
            ...item, Name: item.name, Email: item.email, Phone: item.phone, Company: item.company
        }))];

        const foundClient = allClients.find(c => c.id === id);
        if (foundClient) {
            setClient(foundClient);

            // Fetch Associated Data based on Client Name
            const clientName = foundClient.Name || foundClient.name;

            // Proposals
            const allProposals = JSON.parse(localStorage.getItem("trek_proposals") || "[]");
            const clientProposals = allProposals.filter((p: any) => p.clientName === clientName || p.preparedFor === clientName);
            setProposals(clientProposals.map((p: any) => ({
                id: p.id,
                "Proposal ID": p.proposalNo,
                "Title": p.title,
                "Amount": `QAR ${parseFloat(p.totalPackageCost || 0).toLocaleString()}`,
                "Status": <StatusBadge status={p.status} />,
                "Date": new Date(p.createdAt).toLocaleDateString(),
                "Actions": (
                    <button onClick={() => navigate(`/proposal-details/${p.id}`)} className="text-brand-600 hover:text-brand-800 font-medium">
                        View
                    </button>
                )
            })));

            // Invoices
            const allInvoices = JSON.parse(localStorage.getItem("trek_invoices") || "[]");
            const clientInvoices = allInvoices.filter((i: any) => i.clientName === clientName);
            setInvoices(clientInvoices.map((i: any) => ({
                id: i.id,
                "Invoice No": i.invoiceNo,
                "Amount": `QAR ${parseFloat(i.amount || 0).toLocaleString()}`,
                "Status": <StatusBadge status={i.status} />,
                "Date": new Date(i.date).toLocaleDateString(),
                "Actions": (
                    <button onClick={() => navigate(`/invoice-details/${i.id}`)} className="text-brand-600 hover:text-brand-800 font-medium">
                        View
                    </button>
                )
            })));

            // Jobs (Mock data for now as Jobs table might vary)
            const allJobs = JSON.parse(localStorage.getItem("trek_jobs") || "[]");
            const cJobs = allJobs.filter((j: any) => j.clientName === clientName);
            setJobs(cJobs.map((j: any) => ({
                id: j.id,
                "Job ID": j.jobNo,
                "Title": j.title,
                "Status": <StatusBadge status={j.status} />,
                "Actions": <span className="text-slate-400">View</span> // navigate to job details when ready
            })));

            // Documents (Mock data)
            setDocuments([
                { id: "1", "File Name": "CR_Copy.pdf", "Type": "Legal", "Date": "2025-10-12" },
                { id: "2", "File Name": "Passport_Copy.pdf", "Type": "Identity", "Date": "2025-10-12" }
            ]);
        }
    }, [id, navigate]);

    if (!client) {
        return <div className="p-6">Client not found.</div>;
    }

    const tabs = [
        { id: "overview", label: "Overview", icon: FileText },
        { id: "proposals", label: "Proposals", icon: FileText },
        { id: "invoices", label: "Invoices", icon: Receipt },
        { id: "jobs", label: "Jobs", icon: Briefcase },
        { id: "documents", label: "Documents", icon: Folder }
    ];

    return (
        <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-200 bg-white rounded-full transition-colors shadow-sm">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{client.Name}</h1>
                    <p className="text-slate-500">{client.Company}</p>
                </div>
            </div>

            {/* Profile Summary */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                    <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">Email</p>
                    <p className="font-semibold text-slate-800">{client.Email}</p>
                </div>
                <div>
                    <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">Phone</p>
                    <p className="font-semibold text-slate-800">{client.Phone}</p>
                </div>
                <div>
                    <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">Company</p>
                    <p className="font-semibold text-slate-800">{client.Company}</p>
                </div>
                <div>
                    <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">Client ID</p>
                    <p className="font-semibold text-slate-800">{client.id}</p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${isActive ? "border-brand-600 text-brand-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                        >
                            <Icon size={16} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                {activeTab === "overview" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 bg-slate-50 rounded-lg border border-slate-100">
                            <h3 className="text-slate-500 font-medium mb-2">Total Proposals</h3>
                            <p className="text-3xl font-bold text-slate-800">{proposals.length}</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-lg border border-slate-100">
                            <h3 className="text-slate-500 font-medium mb-2">Total Invoices</h3>
                            <p className="text-3xl font-bold text-slate-800">{invoices.length}</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-lg border border-slate-100">
                            <h3 className="text-slate-500 font-medium mb-2">Active Jobs</h3>
                            <p className="text-3xl font-bold text-slate-800">{jobs.length}</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-lg border border-slate-100">
                            <h3 className="text-slate-500 font-medium mb-2">Documents</h3>
                            <p className="text-3xl font-bold text-slate-800">{documents.length}</p>
                        </div>
                    </div>
                )}

                {activeTab === "proposals" && (
                    <div>
                        <h2 className="text-lg font-bold mb-4">Client Proposals</h2>
                        {proposals.length > 0 ? (
                            <DataTable columns={["Proposal ID", "Title", "Amount", "Status", "Date", "Actions"]} data={proposals} />
                        ) : <p className="text-slate-500">No proposals found for this client.</p>}
                    </div>
                )}

                {activeTab === "invoices" && (
                    <div>
                        <h2 className="text-lg font-bold mb-4">Client Invoices</h2>
                        {invoices.length > 0 ? (
                            <DataTable columns={["Invoice No", "Amount", "Status", "Date", "Actions"]} data={invoices} />
                        ) : <p className="text-slate-500">No invoices found for this client.</p>}
                    </div>
                )}

                {activeTab === "jobs" && (
                    <div>
                        <h2 className="text-lg font-bold mb-4">Client Jobs</h2>
                        {jobs.length > 0 ? (
                            <DataTable columns={["Job ID", "Title", "Status", "Actions"]} data={jobs} />
                        ) : <p className="text-slate-500">No jobs found for this client.</p>}
                    </div>
                )}

                {activeTab === "documents" && (
                    <div>
                        <h2 className="text-lg font-bold mb-4">Client Documents</h2>
                        {documents.length > 0 ? (
                            <DataTable columns={["File Name", "Type", "Date"]} data={documents} />
                        ) : <p className="text-slate-500">No documents found for this client.</p>}
                    </div>
                )}
            </div>
        </div>
    );
}
