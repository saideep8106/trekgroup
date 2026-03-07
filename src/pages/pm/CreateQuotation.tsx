import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import FormInput from "../../components/forms/FormInput";

export default function CreateQuotation() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        project: "",
        client: "",
        amount: "",
        expiryDate: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newQuotation = {
            ...form,
            "Quote ID": `QT-2026-${Math.floor(100 + Math.random() * 900)}`,
            Status: "Submitted"
        };

        const existingQuotations = JSON.parse(localStorage.getItem("trek_quotations") || "[]");
        localStorage.setItem("trek_quotations", JSON.stringify([...existingQuotations, newQuotation]));

        console.log("Quotation Saved:", newQuotation);
        navigate("/quotations");
    };

    return (
        <div className="p-6">
            <PageHeader
                title="Create Quotation"
                subtitle="Generate a new project cost estimate"
            />

            <div className="bg-white p-6 rounded-xl border shadow-sm max-w-3xl mt-6">
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                    <FormInput
                        label="Project Name"
                        name="project"
                        value={form.project}
                        placeholder="Project Name"
                        onChange={handleChange}
                    />

                    <FormInput
                        label="Client Name"
                        name="client"
                        value={form.client}
                        placeholder="Client Name"
                        onChange={handleChange}
                    />

                    <FormInput
                        label="Amount"
                        name="amount"
                        value={form.amount}
                        placeholder="QAR 0.00"
                        onChange={handleChange}
                    />

                    <FormInput
                        label="Expiry Date"
                        type="date"
                        name="expiryDate"
                        value={form.expiryDate}
                        onChange={handleChange}
                    />

                    <div className="col-span-2 mt-4">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Save Quotation
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
