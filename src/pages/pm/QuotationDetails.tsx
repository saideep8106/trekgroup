import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { ArrowLeft, Printer, Send, Clock, DollarSign } from "lucide-react";

export default function QuotationDetails() {
    const { id = "QT-2026-452" } = useParams();
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-brand-600 mb-2 transition-colors"
            >
                <ArrowLeft size={16} /> Back
            </button>

            <PageHeader
                title={`Quotation: ${id}`}
                subtitle="Review financial proposal and project terms"
                action={
                    <div className="flex gap-3">
                        <button className="bg-white border text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                            <Printer size={16} /> Print
                        </button>
                        <button className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 flex items-center gap-2">
                            <Send size={16} /> Send to Client
                        </button>
                    </div>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Proposal Summary</h3>
                            <StatusBadge status="Submitted" />
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-400 font-semibold uppercase">Valid Until</p>
                                    <p className="text-sm text-gray-800 font-medium">Apr 01, 2026</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-semibold uppercase">Total Amount</p>
                                    <p className="text-sm text-brand-600 font-bold">QAR 2,450,000</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-semibold uppercase">Scope of Work</p>
                                <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                                    Comprehensive glazing and aluminum works for the main villa structure.
                                    Includes supply, installation, and 12-month maintenance warranty.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Cost Breakdown</h3>
                        <div className="space-y-3">
                            {[
                                { title: "Material Costs", amount: "1,850,000" },
                                { title: "Labor & Installation", amount: "450,000" },
                                { title: "Logistics & Sundries", amount: "150,000" },
                            ].map((row, i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                    <span className="text-sm text-gray-600">{row.title}</span>
                                    <span className="text-sm font-bold text-gray-800 uppercase">QAR {row.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Activity Log</h3>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <Clock size={16} className="text-blue-500 mt-1" />
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Quotation Created</p>
                                    <p className="text-xs text-gray-400">Mar 01, 2026</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Send size={16} className="text-emerald-500 mt-1" />
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Sent to Client</p>
                                    <p className="text-xs text-gray-400">Mar 02, 2026</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-brand-600 p-6 rounded-xl shadow-lg text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <DollarSign size={24} />
                            <h3 className="text-lg font-bold">Quick Approval</h3>
                        </div>
                        <p className="text-sm text-brand-100 mb-4 leading-relaxed">
                            Once the client approves, this will automatically generate a draft project contract.
                        </p>
                        <button className="w-full bg-white text-brand-600 py-2 rounded-lg font-bold text-sm hover:bg-brand-50 transition-colors">
                            Approve Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
