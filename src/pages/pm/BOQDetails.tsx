import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { ArrowLeft, Printer, Download, Plus } from "lucide-react";

export default function BOQDetails() {
    const { id = "BOQ-2026-001" } = useParams();
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
                title={`BOQ Details: ${id}`}
                subtitle="Itemized material estimations and project quantities"
                action={
                    <div className="flex gap-3">
                        <button className="bg-white border text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                            <Printer size={16} /> Print
                        </button>
                        <button className="bg-white border text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                            <Download size={16} /> Export
                        </button>
                        <button className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 flex items-center gap-2">
                            <Plus size={16} /> Add Item
                        </button>
                    </div>
                }
            />

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <p className="text-xs text-gray-400 font-semibold uppercase">Project</p>
                            <p className="text-sm text-gray-800 font-bold mt-1">Luxury Villa Construction</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-semibold uppercase">Client</p>
                            <p className="text-sm text-gray-800 font-bold mt-1">Al Thani Estates</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-semibold uppercase">Status</p>
                            <div className="mt-1">
                                <StatusBadge status="Under Process" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="text-left px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Item Description</th>
                                <th className="text-center px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Quantity</th>
                                <th className="text-center px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">UOM</th>
                                <th className="text-right px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Rate</th>
                                <th className="text-right px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {[
                                { desc: "Clear Glass Panel - 12mm", qty: 250, uom: "Sqm", rate: "120", total: "30,000" },
                                { desc: "Aluminum Extrusion Profiles", qty: 1500, uom: "kg", rate: "45", total: "67,500" },
                                { desc: "Structural Sealant", qty: 45, uom: "Boxes", rate: "450", total: "20,250" },
                                { desc: "Installation Sundries", qty: 1, uom: "Lot", rate: "5000", total: "5,000" },
                            ].map((item, i) => (
                                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-gray-700 font-medium">{item.desc}</td>
                                    <td className="px-6 py-4 text-center text-gray-600">{item.qty}</td>
                                    <td className="px-6 py-4 text-center text-gray-600">{item.uom}</td>
                                    <td className="px-6 py-4 text-right text-gray-600">QAR {item.rate}</td>
                                    <td className="px-6 py-4 text-right text-gray-900 font-bold">QAR {item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-brand-50/30 border-t border-brand-100">
                                <td colSpan={4} className="px-6 py-4 text-right font-bold text-gray-700">Net Estimated Total</td>
                                <td className="px-6 py-4 text-right font-bold text-brand-600 text-lg">QAR 122,750</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}
