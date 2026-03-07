import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StatusBadge from "../../components/StatusBadge";
import PageHeader from "../../components/PageHeader";
import { ArrowLeft, Printer, Send } from "lucide-react";

function InvoiceDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState<any>(null);

    useEffect(() => {
        const initialInvoices = [
            { id: "1", invoiceNo: "INV-001", client: "ABC Company", amount: "1200", status: "Paid", date: "2026-03-01", dueDate: "2026-03-15" },
            { id: "2", invoiceNo: "INV-002", client: "XYZ Ltd", amount: "900", status: "Paid", date: "2026-03-05", dueDate: "2026-03-20" }
        ];
        const persistedInvoices = JSON.parse(localStorage.getItem("trek_invoices") || "[]");
        const allInvoices = [...initialInvoices, ...persistedInvoices];
        const found = allInvoices.find(inv => inv.id === id);
        setInvoice(found);
    }, [id]);

    if (!invoice) return <div className="p-6">Invoice not found.</div>;

    return (
        <div className="p-6">
            <button
                onClick={() => navigate("/invoices")}
                className="flex items-center gap-2 text-gray-500 hover:text-brand-600 mb-6 transition-colors"
            >
                <ArrowLeft size={16} /> Back to Invoices
            </button>

            <PageHeader
                title={`Invoice ${invoice.invoiceNo}`}
                subtitle="Review and manage invoice details"
                action={
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-50">
                            <Printer size={16} /> Print
                        </button>
                        <button className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition">
                            <Send size={16} /> Send to Client
                        </button>
                    </div>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">TREK GROUP</h3>
                                <p className="text-sm text-gray-500">Doha, Qatar</p>
                            </div>
                            <div className="text-right">
                                <StatusBadge status={invoice.status} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-50">
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Billed To</p>
                                <p className="font-bold text-gray-800">{invoice.client}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Invoice Details</p>
                                <p className="text-sm text-gray-400">Date: <span className="text-gray-800 font-medium">{invoice.date || 'N/A'}</span></p>
                                <p className="text-sm text-gray-400">Due: <span className="text-gray-800 font-medium">{invoice.dueDate || 'N/A'}</span></p>
                            </div>
                        </div>

                        <table className="w-full mb-8">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left py-3 text-xs font-semibold text-gray-400 uppercase">Description</th>
                                    <th className="text-right py-3 text-xs font-semibold text-gray-400 uppercase">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-50">
                                    <td className="py-4 text-sm text-gray-700 font-medium">Professional Services / General Work</td>
                                    <td className="py-4 text-right text-sm text-gray-700 font-bold">QAR {invoice.amount}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="flex justify-end">
                            <div className="w-full max-w-xs space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="font-semibold text-gray-800">QAR {invoice.amount}</span>
                                </div>
                                <div className="flex justify-between text-base border-t border-gray-100 pt-3">
                                    <span className="font-bold text-gray-900">Total</span>
                                    <span className="font-bold text-brand-600">QAR {invoice.amount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-4">Payment History</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800">Payment received</p>
                                    <p className="text-xs text-gray-400">March 05, 2026</p>
                                </div>
                                <p className="text-xs font-bold text-emerald-600">QAR {invoice.amount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InvoiceDetails;
