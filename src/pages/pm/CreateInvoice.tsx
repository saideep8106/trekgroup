import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import FormInput from "../../components/forms/FormInput";
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import { useActivity } from "../../context/ActivityContext";

interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
}

export default function CreateInvoice() {
    const navigate = useNavigate();
    const { id, division } = useParams();
    const { logActivity } = useActivity();
    const isEditing = !!id;

    const [form, setForm] = useState({
        invoiceNo: `INV-2024-${Math.floor(1000 + Math.random() * 9000)}`,
        client: "",
        refType: "General",
        refNo: "",
        date: new Date().toISOString().split("T")[0],
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "Unpaid",
        taxRate: 0,
        discount: 0,
        notes: "",
        paymentTerms: "Payable within 15 days",
        branch: division ? (division === "business" ? "Business" : division === "trading" ? "Trading" : "Contracting") : "Contracting",
        lpoNo: "",
        salesman: "",
        qid: "",
        address: "",
        advance: 0,
        invoiceType: "Credit"
    });

    const [items, setItems] = useState<InvoiceItem[]>([]);

    const [totals, setTotals] = useState({
        subtotal: 0,
        taxAmount: 0,
        total: 0,
        balance: 0
    });

    useEffect(() => {
        // If referencing a proposal, we might want to pre-fill (mock logic)
        const params = new URLSearchParams(window.location.search);
        const propId = params.get("proposalId");
        if (propId) {
            const proposals = JSON.parse(localStorage.getItem("trek_proposals") || "[]");
            const prop = proposals.find((p: any) => p.id === propId);
            if (prop) {
                setForm(prev => ({ ...prev, client: prop.client, refType: "Proposal", refNo: prop.proposalNo }));
                setItems(prop.items.map((it: any) => ({ ...it, id: Date.now() + Math.random().toString() })));
            }
        }
    }, []);

    useEffect(() => {
        const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
        const taxAmount = (subtotal * (form.taxRate / 100));
        const total = subtotal + taxAmount - form.discount;
        const balance = total - (form.advance || 0);
        setTotals({ subtotal, taxAmount, total, balance });
    }, [items, form.taxRate, form.discount, form.advance]);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
        setForm({ ...form, [e.target.name]: value });
    };

    const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
        const newItems = [...items];
        const item = { ...newItems[index], [field]: value };
        if (field === "quantity" || field === "unitPrice") {
            item.amount = (item.quantity || 0) * (item.unitPrice || 0);
        }
        newItems[index] = item;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { id: Date.now().toString(), description: "", quantity: 1, unitPrice: 0, amount: 0 }]);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const invoiceData = {
            ...form,
            id: isEditing ? id : `inv-${Date.now()}`,
            items,
            ...totals,
            amount: totals.total // for list view
        };

        const existing = JSON.parse(localStorage.getItem("trek_invoices") || "[]");
        const updated = isEditing ? existing.map((i: any) => i.id === id ? invoiceData : i) : [...existing, invoiceData];
        localStorage.setItem("trek_invoices", JSON.stringify(updated));

        logActivity(`${isEditing ? "Updated" : "Created"} Invoice ${form.invoiceNo}`, "finance", "/invoices", form.invoiceNo);

        if (division) {
            navigate(`/quotations/${division}`);
        } else {
            navigate("/invoices");
        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <PageHeader title={isEditing ? "Edit Invoice" : "Create New Invoice"} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white p-6 rounded-xl border shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <FormInput label="Invoice No" name="invoiceNo" value={form.invoiceNo} disabled />

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Client</label>
                        <input
                            name="client"
                            value={form.client}
                            onChange={handleFormChange}
                            className="border p-2 rounded-lg"
                            placeholder="e.g. ABC Company"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Ref Type</label>
                        <input
                            name="refType"
                            value={form.refType}
                            onChange={handleFormChange}
                            className="border p-2 rounded-lg"
                            placeholder="e.g. General, Proposal, Project"
                        />
                    </div>

                    <FormInput label="Ref Number" name="refNo" value={form.refNo} onChange={handleFormChange} placeholder="e.g. PROP-001" />

                    <FormInput label="Invoice Date" name="date" type="date" value={form.date} onChange={handleFormChange} />
                    <FormInput label="Due Date" name="dueDate" type="date" value={form.dueDate} onChange={handleFormChange} />

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Invoice Type</label>
                        <select
                            name="invoiceType"
                            value={form.invoiceType}
                            onChange={handleFormChange}
                            className="border p-2 rounded-lg"
                        >
                            <option value="Credit">Credit</option>
                            <option value="Cash">Cash</option>
                        </select>
                    </div>

                    <FormInput label="LPO No." name="lpoNo" value={form.lpoNo} onChange={handleFormChange} placeholder="e.g. PO1031" />
                    <FormInput label="Salesman" name="salesman" value={form.salesman} onChange={handleFormChange} placeholder="Salesperson name" />
                    <FormInput label="QID" name="qid" value={form.qid} onChange={handleFormChange} placeholder="QID Number" />

                    <div className="md:col-span-2 flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Address</label>
                        <textarea
                            name="address"
                            value={form.address}
                            onChange={handleFormChange}
                            className="border p-2 rounded-lg h-11"
                            placeholder="Client address"
                        />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <div className="flex justify-between mb-4">
                        <h3 className="font-bold">Invoice Items</h3>
                        <button type="button" onClick={addItem} className="text-brand-600 flex items-center gap-1 text-sm font-bold">
                            <Plus size={14} /> Add Item
                        </button>
                    </div>
                    <table className="w-full">
                        <thead className="text-left bg-slate-50 border-y">
                            <tr>
                                <th className="p-2">Description</th>
                                <th className="p-2 w-20 text-center">Qty</th>
                                <th className="p-2 w-32 text-right">Rate</th>
                                <th className="p-2 w-32 text-right">Amount</th>
                                <th className="p-2 w-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, idx) => (
                                <tr key={item.id} className="border-b">
                                    <td className="p-2">
                                        <input className="w-full border-none focus:ring-0" placeholder="Item description" value={item.description} onChange={e => handleItemChange(idx, "description", e.target.value)} />
                                    </td>
                                    <td className="p-2">
                                        <input type="number" className="w-full border-none text-center focus:ring-0" value={item.quantity} onChange={e => handleItemChange(idx, "quantity", parseInt(e.target.value))} />
                                    </td>
                                    <td className="p-2">
                                        <input type="number" className="w-full border-none text-right focus:ring-0" value={item.unitPrice} onChange={e => handleItemChange(idx, "unitPrice", parseFloat(e.target.value))} />
                                    </td>
                                    <td className="p-2 text-right font-medium">QAR {item.amount.toLocaleString()}</td>
                                    <td className="p-2">
                                        <button type="button" onClick={() => removeItem(idx)} className="text-slate-300 hover:text-red-500"><Trash2 size={14} /></button>
                                    </td>
                                </tr>
                            ))}
                            {items.length === 0 && (
                                <tr><td colSpan={5} className="p-8 text-center text-slate-400 italic">No items added. Click "Add Item" to start.</td></tr>
                            )}
                        </tbody>
                    </table>

                    <div className="mt-6 flex justify-end">
                        <div className="w-64 space-y-2">
                            <div className="flex justify-between text-slate-600">
                                <span>Subtotal</span>
                                <span>QAR {totals.subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center gap-4 text-slate-600">
                                <span>Tax (%)</span>
                                <input type="number" name="taxRate" value={form.taxRate} onChange={handleFormChange} className="w-20 text-right border rounded p-1" />
                            </div>
                            <div className="flex justify-between items-center gap-4 text-slate-600 border-b pb-2">
                                <span>Discount</span>
                                <input type="number" name="discount" value={form.discount} onChange={handleFormChange} className="w-20 text-right border rounded p-1" />
                            </div>
                            <div className="flex justify-between text-lg font-bold text-brand-700">
                                <span>Total</span>
                                <span>QAR {totals.total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center gap-4 text-slate-600 border-t pt-2">
                                <span>Advance Paid</span>
                                <input type="number" name="advance" value={form.advance} onChange={handleFormChange} className="w-24 text-right border rounded p-1 font-bold text-brand-600" />
                            </div>
                            <div className="flex justify-between text-xl font-bold text-brand-800 border-t pt-2">
                                <span>Balance Payable</span>
                                <span>QAR {totals.balance?.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button type="button" onClick={() => navigate("/invoices")} className="px-6 py-2 border rounded-lg">Cancel</button>
                    <button type="submit" className="px-8 py-2 bg-brand-600 text-white rounded-lg flex items-center gap-2 hover:bg-brand-700 transition">
                        <Save size={18} /> {isEditing ? "Update Invoice" : "Create Invoice"}
                    </button>
                </div>
            </form>
        </div>
    );
}
