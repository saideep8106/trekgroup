import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, Building2, CreditCard, FileText, Paperclip } from "lucide-react";

export default function ExpenseDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [expense, setExpense] = useState<any>(null);

    useEffect(() => {
        const persisted = JSON.parse(localStorage.getItem("trek_expenses") || "[]");
        const found = persisted.find((e: any) => e.id === id);
        if (found) setExpense(found);
    }, [id]);

    if (!expense) {
        return <div className="p-6 text-center text-slate-500">Expense not found.</div>;
    }

    const divisionLabel =
        expense.divisionLabel ||
        (expense.referenceType === "contracting"
            ? "Contracting Services"
            : expense.referenceType === "trading"
                ? "Trading Services"
                : expense.referenceType === "business"
                    ? "Business Proposal Services"
                    : "General Expense");

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            {/* Top Bar */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-white rounded-full transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Expense Details</h1>
                    <p className="text-sm text-slate-500">{expense.id}</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header Card */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-brand-600 to-indigo-600 p-6 text-white">
                        <p className="text-sm opacity-80 font-medium uppercase tracking-wider mb-1">Amount</p>
                        <p className="text-4xl font-black">
                            QAR{" "}
                            {parseFloat(expense.amount || 0).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </p>
                        <p className="text-sm mt-2 opacity-70">{expense.expenseName || expense.description}</p>
                    </div>

                    {/* Detail Grid */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                        <DetailRow icon={<Calendar size={18} />} label="Date" value={expense.date || "-"} />
                        <DetailRow icon={<Tag size={18} />} label="Category" value={expense.category || "-"} />
                        <DetailRow icon={<Building2 size={18} />} label="Division" value={divisionLabel} />
                        <DetailRow icon={<CreditCard size={18} />} label="Payment Method" value={expense.paymentMethod || "-"} />
                        <DetailRow icon={<FileText size={18} />} label="Vendor" value={expense.vendor || "-"} />
                        {expense.referenceId && (
                            <DetailRow icon={<FileText size={18} />} label="Linked Reference" value={expense.referenceId} />
                        )}
                    </div>
                </div>

                {/* Attachment */}
                {expense.attachment && (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Attachment</h3>
                        <div className="flex items-center gap-3 bg-brand-50 border border-brand-200 rounded-xl px-4 py-3">
                            <Paperclip size={18} className="text-brand-600" />
                            <span className="text-sm font-medium text-brand-700 flex-1 truncate">
                                {expense.attachment}
                            </span>
                        </div>
                    </div>
                )}

                {/* Notes */}
                {expense.notes && (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Notes</h3>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{expense.notes}</p>
                    </div>
                )}

                {/* Meta */}
                {expense.createdAt && (
                    <p className="text-center text-xs text-slate-400">
                        Created on {new Date(expense.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </p>
                )}
            </div>
        </div>
    );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                {icon}
            </div>
            <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</p>
                <p className="text-sm font-semibold text-slate-800">{value}</p>
            </div>
        </div>
    );
}
