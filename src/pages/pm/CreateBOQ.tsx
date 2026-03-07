import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import FormInput from "../../components/forms/FormInput";

export default function CreateBOQ() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        project: "",
        client: "",
        totalAmount: "",
        status: "Pending",
        date: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newBOQ = {
            ...form,
            ID: `BOQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            Status: "Pending" // Raw status for storage, will be mapped to StatusBadge in table
        };

        const existingBOQs = JSON.parse(localStorage.getItem("trek_boqs") || "[]");
        localStorage.setItem("trek_boqs", JSON.stringify([...existingBOQs, newBOQ]));

        console.log("BOQ Saved:", newBOQ);
        navigate("/boq");
    };

    return (
        <div className="p-6">
            <PageHeader
                title="Create BOQ"
                subtitle="Generate a new Bill of Quantities for a project"
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
                        label="Total Amount"
                        name="totalAmount"
                        value={form.totalAmount}
                        placeholder="Total Amount"
                        onChange={handleChange}
                    />

                    <FormInput
                        label="Date"
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                    />

                    <div className="col-span-2 mt-4">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Save BOQ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}