import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import FormInput from "../../components/forms/FormInput";
import { Plus, Trash2, Save } from "lucide-react";

export default function CreateQuotation() {
    const navigate = useNavigate();
    const { id: editId, division } = useParams();

    const DEFAULTS = {
        Business: {
            aboutUs: "Trek Group Business Services is a trusted provider of comprehensive corporate and industrial setup solutions in Qatar. We specialize in guiding investors and entrepreneurs through every stage of company formation, licensing, and operational setup, ensuring compliance with all local laws and regulations. Our expertise extends to supporting industrial projects with end-to-end documentation, approvals, and advisory services.",
            whatWeDo: "Company formation and trade license registration\nIndustrial license applications and approvals\nGovernment liaison and PRO services\nSpecial approval coordination for industrial projects\nComprehensive project documentation and compliance",
            proposalIntro: "Trek Group Business Services proposes to manage the complete setup of a new company in Qatar.\n\nThe company’s commercial activities will be as follows:\n\nActivity 1 – Provision of advertising services and advertising materials production\nProviding advertising and promotional services, including design, development, printing, and production of advertising materials such as banners, signboards, brochures, digital advertisements, promotional items, and related marketing materials in accordance with applicable regulations\n\nActivity 2 - Wholesale of stationery\nEngaging in the wholesale trading and distribution of stationery items including office supplies, paper products, writing instruments, school materials, filing products, and related accessories to retailers, institutions, and commercial establishments in accordance with applicable regulations.",
            financialTerms: "Total Package Cost: QAR 11,000 (all-inclusive)\n\nThis charge includes:\n• Trade name registration\n• Commercial Registration (CR) issuance\n• Trade licence registration\n• All documentation and necessary approvals for company setup\n• Establishment ID issuance\n• Tax registration\n• Ministry of Labour (MOL) registration\n• Ministry of Interior (MOI) update\n\nNote: This activity is subject to obtaining prior approval from the Ministry of Culture – Department of Press and Publication for registration of press and publishing activities. This charge excludes all deposits and other government related charges.",
            clientDuties: "1. Provide required documents for CR approval (QID, Passport, Police Clearance, National Address, Mobile/Email)\n2. Provide office/building space documents for trade licence registration\n3. Responsible for providing and paying all bank-related deposits, requirements, and charges\n4. Submit signatures and info in a timely manner\n5. Arrange and cover all office-related services and costs\n6. Attend any ministry or authority appointments\n7. Ensure accuracy of all submitted documents",
            paymentTerms: "50% advance payment upon acceptance of this proposal.\nRemaining 50% payable upon completion and signing of company formation documentation.\n\nPrices are subject to revision in case of changes to client requirements or government fee structures. All government approval fees shall be paid directly by the client."
        },
        Standard: {
            aboutUs: "",
            whatWeDo: "",
            proposalIntro: "With reference to the above-mentioned subject and your inquiry, please find below our final\nrock bottom prices: -",
            financialTerms: "1. Payment: 50% advance, 30% upon delivery, and 20% upon completion\n2. Delivery: with 15 days from the advance payment.\n3. Above prices are subjected to change against the significant market prices fluctuation.\n4. Offer is valid for 15 Days\n5. This quotation is prepared on the basis of the specifications provided in the scope of works and limited to the same.\n6. All scaffolding, electrical connections, and manlift provisions shall be provided by the Client\n7. The above pricing is based on the specifications provided and limited to the quantities stated above. Any variation on the above specifications or quantities will result in change of price and also effect the delivery period. For any changes required to be made other than the scope of works stated, should be made in writing and need written confirmation in order to carry out the same.\n8. We will not be responsible for delivery arising out of delays in approvals of drawings, samples, payments, any natural calamities or pandemics or any situation that is beyond our control.",
            clientDuties: "",
            paymentTerms: ""
        }
    };

    const [form, setForm] = useState({
        branch: "Contracting", // Contracting, Trading, Business
        project: "",
        client: "",
        refNo: "",
        date: new Date().toISOString().split('T')[0],
        discount: 0,
        ...DEFAULTS.Standard
    });

    useEffect(() => {
        if (division) {
            const branchMap: Record<string, string> = {
                business: "Business",
                trading: "Trading",
                contracting: "Contracting"
            };
            const branch = branchMap[division] || "Contracting";
            setForm(prev => ({
                ...prev,
                branch,
                ...(branch === "Business" ? DEFAULTS.Business : DEFAULTS.Standard)
            }));
        }
    }, [division]);

    // Handle branch change in creation mode
    const handleBranchChange = (newBranch: string) => {
        if (!editId) {
            const defaults = newBranch === "Business" ? DEFAULTS.Business : DEFAULTS.Standard;
            setForm(prev => ({
                ...prev,
                branch: newBranch,
                ...defaults
            }));
        } else {
            setForm(prev => ({ ...prev, branch: newBranch }));
        }
    };

    const [items, setItems] = useState([
        { description: "", quantity: 1, unitPrice: 0 }
    ]);

    useEffect(() => {
        if (editId) {
            const existingQuotations = JSON.parse(localStorage.getItem("trek_quotations") || "[]");
            const found = existingQuotations.find((q: any) => q["Quote ID"] === editId || q.id === editId);
            if (found) {
                setForm({
                    branch: found.branch || "Contracting",
                    project: found.project || "",
                    client: found.client || "",
                    refNo: found.refNo || "",
                    date: found.date ? new Date(found.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                    discount: found.discount || 0,
                    aboutUs: found.aboutUs || form.aboutUs,
                    whatWeDo: found.whatWeDo || form.whatWeDo,
                    proposalIntro: found.proposalIntro || form.proposalIntro,
                    financialTerms: found.financialTerms || form.financialTerms,
                    clientDuties: found.clientDuties || form.clientDuties,
                    paymentTerms: found.paymentTerms || form.paymentTerms,
                });

                if (found.items && found.items.length > 0) {
                    setItems(found.items);
                } else if (found.scopeOfWork) {
                    setItems([{
                        description: found.scopeOfWork,
                        quantity: typeof found.qty !== "undefined" ? found.qty : 1,
                        unitPrice: found.amount || 0
                    }]);
                }
            }
        }
    }, [editId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleItemChange = (index: number, field: string, value: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { description: "", quantity: 1, unitPrice: 0 }]);
    };

    const removeItem = (index: number) => {
        if (items.length > 1) {
            setItems(items.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Calculate totals
        const calculatedItems = items.map(item => ({
            ...item,
            amount: item.quantity * item.unitPrice
        }));

        const totalAmount = calculatedItems.reduce((sum, item) => sum + item.amount, 0);
        const netTotal = totalAmount - form.discount;

        const existingQuotations = JSON.parse(localStorage.getItem("trek_quotations") || "[]");

        if (editId) {
            // Update existing quotation
            const updatedQuotations = existingQuotations.map((q: any) => {
                if (q["Quote ID"] === editId || q.id === editId) {
                    return {
                        ...q,
                        ...form,
                        items: calculatedItems,
                        totalAmount,
                        netTotal,
                        amount: netTotal
                    };
                }
                return q;
            });
            localStorage.setItem("trek_quotations", JSON.stringify(updatedQuotations));
        } else {
            // Create new
            const newQuotation = {
                ...form,
                "Quote ID": `QT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
                Status: "Submitted",
                items: calculatedItems,
                totalAmount,
                netTotal,
                amount: netTotal,
                expiryDate: new Date(new Date(form.date).getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 15 days valid
            };
            localStorage.setItem("trek_quotations", JSON.stringify([newQuotation, ...existingQuotations]));
        }

        const backPath = division ? `/quotations/${division}` : "/quotations";
        navigate(backPath);
    };

    return (
        <div className="p-6">
            <PageHeader
                title={editId ? "Edit Quotation" : "Create Quotation"}
                subtitle="Generate a detailed cost estimate for Business, Contracting or Trading"
            />

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm max-w-4xl mt-6">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Header Details */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Basic Information</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Company Branch</label>
                                <select
                                    name="branch"
                                    value={form.branch}
                                    onChange={(e) => handleBranchChange(e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500"
                                >
                                    <option value="Business">Business Services</option>
                                    <option value="Contracting">Trek Group Contracting</option>
                                    <option value="Trading">Trek Group Trading</option>
                                </select>
                            </div>
                            <FormInput label="Date" type="date" name="date" value={form.date} onChange={handleChange} required />
                            <FormInput label="Client / To" name="client" value={form.client} placeholder="e.g. HSBC" onChange={handleChange} required />
                            <FormInput label="Project Name" name="project" value={form.project} placeholder="e.g. ALWAAAB RESIDENCY MAIN ENTRANCE" onChange={handleChange} required />
                            <FormInput label="Reference (Optional)" name="refNo" value={form.refNo} placeholder="e.g. TGC/G/JN/054" onChange={handleChange} />
                        </div>
                    </div>

                    {/* Items Table */}
                    <div>
                        <div className="flex justify-between items-end mb-4 border-b pb-2">
                            <h3 className="text-lg font-bold text-slate-800">Products / Services</h3>
                            <button type="button" onClick={addItem} className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 font-medium">
                                <Plus size={16} /> Add Item
                            </button>
                        </div>

                        <div className="space-y-3">
                            {items.map((item, index) => (
                                <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="flex-1">
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Description (Product Type)</label>
                                        <input
                                            type="text"
                                            value={item.description}
                                            onChange={(e) => handleItemChange(index, "description", e.target.value)}
                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md"
                                            placeholder="Supply and installation of..."
                                            required
                                        />
                                    </div>
                                    <div className="w-24">
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">QTY</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleItemChange(index, "quantity", parseFloat(e.target.value) || 0)}
                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="w-32">
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Unit Price</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={item.unitPrice}
                                            onChange={(e) => handleItemChange(index, "unitPrice", parseFloat(e.target.value) || 0)}
                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="w-32">
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total</label>
                                        <div className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-md text-slate-600 font-medium text-right">
                                            {(item.quantity * item.unitPrice).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="pt-6">
                                        <button
                                            type="button"
                                            onClick={() => removeItem(index)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-md transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Totals & Discount */}
                    <div className="flex justify-end pt-4">
                        <div className="w-64 space-y-3">
                            <div className="flex justify-between items-center text-sm font-medium text-slate-600">
                                <span>Subtotal</span>
                                <span>{items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-medium text-slate-600">
                                <span>Discount (Flat)</span>
                                <input
                                    type="number"
                                    min="0"
                                    value={form.discount}
                                    onChange={(e) => setForm({ ...form, discount: parseFloat(e.target.value) || 0 })}
                                    className="w-24 px-2 py-1 text-right bg-slate-50 border border-slate-200 rounded-md"
                                />
                            </div>
                            <div className="flex justify-between items-center text-lg font-black text-slate-900 pt-2 border-t">
                                <span>Net Total</span>
                                <span>{(items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0) - form.discount).toLocaleString()} QAR</span>
                            </div>
                        </div>
                    </div>

                    {/* Proposal Content Customization */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-black text-slate-800 border-b-2 border-brand-500 pb-2">Proposal Content (Customizable)</h3>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">About Us</label>
                            <textarea
                                name="aboutUs"
                                value={form.aboutUs}
                                onChange={handleChange as any}
                                rows={4}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 text-sm leading-relaxed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">What We Do (One item per line)</label>
                            <textarea
                                name="whatWeDo"
                                value={form.whatWeDo}
                                onChange={handleChange as any}
                                rows={5}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 text-sm leading-relaxed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Proposal Introduction & Activities</label>
                            <textarea
                                name="proposalIntro"
                                value={form.proposalIntro}
                                onChange={handleChange as any}
                                rows={10}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 text-sm leading-relaxed"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Financial & Commercial Terms</label>
                                <textarea
                                    name="financialTerms"
                                    value={form.financialTerms}
                                    onChange={handleChange as any}
                                    rows={8}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 text-sm leading-relaxed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Client Duties</label>
                                <textarea
                                    name="clientDuties"
                                    value={form.clientDuties}
                                    onChange={handleChange as any}
                                    rows={8}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 text-sm leading-relaxed"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Payment Terms & Notes</label>
                            <textarea
                                name="paymentTerms"
                                value={form.paymentTerms}
                                onChange={handleChange as any}
                                rows={5}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 text-sm leading-relaxed"
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t flex justify-end">
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-brand-600 text-white px-8 py-3 rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200 font-bold"
                        >
                            <Save size={18} />
                            {editId ? "Update Quotation" : "Generate Quotation"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
