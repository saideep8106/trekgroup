import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import FormInput from "../../components/forms/FormInput";
import FormTextarea from "../../components/forms/FormTextarea";
import { ArrowLeft, Upload, X } from "lucide-react";

const EXPENSE_CATEGORIES = [
  "Office Rent",
  "Materials & Supplies",
  "Salaries & Wages",
  "Transportation",
  "Equipment Rental",
  "Subcontractor Fees",
  "Utilities",
  "Insurance",
  "Maintenance & Repairs",
  "Marketing & Advertising",
  "Legal & Professional",
  "Miscellaneous",
];

const PAYMENT_METHODS = [
  "Cash",
  "Bank Transfer",
  "Credit Card",
  "Debit Card",
  "Cheque",
  "Online Payment",
];

const REFERENCE_TYPES = [
  { value: "general", label: "General Expense" },
  { value: "contracting", label: "Contracting Services" },
  { value: "trading", label: "Trading Services" },
  { value: "business", label: "Business Proposal Services" },
];

function CreateExpense() {
  const navigate = useNavigate();
  const [attachmentName, setAttachmentName] = useState("");
  const [referenceOptions, setReferenceOptions] = useState<any[]>([]);

  const [form, setForm] = useState({
    expenseName: "",
    category: "",
    referenceType: "general",
    referenceId: "",
    amount: "",
    vendor: "",
    paymentMethod: "",
    date: new Date().toISOString().split("T")[0],
    attachment: "",
    notes: "",
  });

  // Load reference options based on referenceType
  useEffect(() => {
    if (form.referenceType === "general") {
      setReferenceOptions([]);
      setForm((prev) => ({ ...prev, referenceId: "" }));
      return;
    }

    if (form.referenceType === "contracting" || form.referenceType === "trading") {
      // Load projects and quotations for contracting/trading
      const projects = JSON.parse(localStorage.getItem("trek_projects") || "[]");
      const quotations = JSON.parse(localStorage.getItem("trek_quotations") || "[]");
      const filtered = quotations.filter(
        (q: any) => (q.branch || "").toLowerCase() === form.referenceType
      );
      const options = [
        ...projects.map((p: any) => ({
          id: p.id,
          label: `Project: ${p.name}`,
        })),
        ...filtered.map((q: any) => ({
          id: q.id || q["Quote ID"],
          label: `Quote: ${q.project} - ${q.client}`,
        })),
      ];
      setReferenceOptions(options);
    } else if (form.referenceType === "business") {
      // Load business proposals
      const proposals = JSON.parse(localStorage.getItem("trek_proposals") || "[]");
      const options = proposals.map((p: any) => ({
        id: p.id,
        label: `Proposal: ${p.title || p.clientName || p.id}`,
      }));
      setReferenceOptions(options);
    }
  }, [form.referenceType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachmentName(file.name);
      // Store file name as metadata (localStorage can't store actual files)
      setForm((prev) => ({ ...prev, attachment: file.name }));
    }
  };

  const removeAttachment = () => {
    setAttachmentName("");
    setForm((prev) => ({ ...prev, attachment: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense = {
      ...form,
      id: `EXP-${Date.now()}`,
      createdAt: new Date().toISOString(),
      divisionLabel:
        REFERENCE_TYPES.find((r) => r.value === form.referenceType)?.label || "General Expense",
    };
    const existing = JSON.parse(localStorage.getItem("trek_expenses") || "[]");
    localStorage.setItem("trek_expenses", JSON.stringify([...existing, newExpense]));
    navigate("/expenses");
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white rounded-full transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <PageHeader
          title="Add New Expense"
          subtitle="Record a new company or project expense"
        />
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Basic Info */}
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
              Expense Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Expense Name *"
                name="expenseName"
                value={form.expenseName}
                onChange={handleChange}
                placeholder="e.g. Glass Panel Purchase"
                required
              />

              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Category *</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="border rounded-lg px-3 py-2 w-full outline-none focus:ring-2 focus:ring-brand-500 transition-shadow bg-white"
                >
                  <option value="">Select Category</option>
                  {EXPENSE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <FormInput
                label="Amount (QAR) *"
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="0.00"
                required
              />

              <FormInput
                label="Expense Date *"
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Section 2: Vendor & Payment */}
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
              Vendor & Payment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Vendor / Payee *"
                name="vendor"
                value={form.vendor}
                onChange={handleChange}
                placeholder="e.g. Al Jazeera Glass Co."
                required
              />

              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Payment Method *</label>
                <select
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleChange}
                  required
                  className="border rounded-lg px-3 py-2 w-full outline-none focus:ring-2 focus:ring-brand-500 transition-shadow bg-white"
                >
                  <option value="">Select Payment Method</option>
                  {PAYMENT_METHODS.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Reference / Linking */}
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
              Link to Division / Project
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Reference Type</label>
                <select
                  name="referenceType"
                  value={form.referenceType}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 w-full outline-none focus:ring-2 focus:ring-brand-500 transition-shadow bg-white"
                >
                  {REFERENCE_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {form.referenceType !== "general" && (
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-600">
                    Link to Project / Proposal
                  </label>
                  <select
                    name="referenceId"
                    value={form.referenceId}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 w-full outline-none focus:ring-2 focus:ring-brand-500 transition-shadow bg-white"
                  >
                    <option value="">-- None --</option>
                    {referenceOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Section 4: Attachment & Notes */}
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
              Attachment & Notes
            </h3>

            {/* File Upload */}
            <div className="mb-5">
              <label className="text-sm text-gray-600 mb-1 block">
                Attach Bill / Receipt
              </label>
              {!attachmentName ? (
                <label className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 rounded-xl p-6 cursor-pointer hover:border-brand-400 hover:bg-brand-50/30 transition-all group">
                  <Upload
                    size={20}
                    className="text-slate-400 group-hover:text-brand-500 transition-colors"
                  />
                  <span className="text-sm text-slate-500 group-hover:text-brand-600">
                    Click to upload a file
                  </span>
                  <input
                    type="file"
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="flex items-center gap-3 bg-brand-50 border border-brand-200 rounded-xl px-4 py-3">
                  <span className="text-sm font-medium text-brand-700 flex-1 truncate">
                    📎 {attachmentName}
                  </span>
                  <button
                    type="button"
                    onClick={removeAttachment}
                    className="p-1 text-brand-400 hover:text-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            <FormTextarea
              label="Notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any additional details about this expense..."
              rows={3}
            />
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="bg-brand-600 text-white px-8 py-2.5 rounded-lg hover:bg-brand-700 transition-colors font-medium shadow-sm"
            >
              Save Expense
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateExpense;