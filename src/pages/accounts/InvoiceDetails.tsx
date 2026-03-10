import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Printer, Edit } from "lucide-react";
import StatusBadge from "../../components/StatusBadge";
import { useAuth } from "../../context/AuthContext";

export default function InvoiceDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [invoice, setInvoice] = useState<any>(null);

    const isClient = user?.role === "CLIENT";

    useEffect(() => {
        const persisted = JSON.parse(localStorage.getItem("trek_invoices") || "[]");
        const found = persisted.find((i: any) => i.id === id);
        if (found) {
            setInvoice(found);
        }
    }, [id]);

    if (!invoice) {
        return <div className="p-6 text-center">Invoice not found.</div>;
    }

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center mb-6 no-print">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-white rounded-full transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-2xl font-bold">Invoice: {invoice.invoiceNo}</h1>
                    <StatusBadge status={invoice.status} />
                </div>
                <div className="flex gap-3">
                    {!isClient && (
                        <button onClick={() => navigate(`/create-invoice/${id}`)} className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-slate-50 transition">
                            <Edit size={16} />
                            Edit
                        </button>
                    )}
                    <button onClick={handlePrint} className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition shadow-sm">
                        <Printer size={16} />
                        Print / Download PDF
                    </button>
                </div>
            </div>

            {/* Invoice Card - Matching Image Format */}
            <div className="max-w-[800px] mx-auto bg-[#E6E6FA] shadow-sm border border-slate-200 overflow-hidden print:shadow-none print:border-none print:m-0 print:bg-white">

                {/* Header Section */}
                <div className="bg-white p-6 flex justify-between items-start border-b-4 border-[#C8A2C8]">
                    <div className="bg-[#1A1A40] p-4 flex flex-col items-center">
                        <div className="w-16 h-16 mb-2 bg-white rounded flex items-center justify-center p-1">
                            <img src="/logo.png" alt="TREK GROUP" className="w-full h-full object-contain" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/60?text=LOGO')} />
                        </div>
                        <span className="text-white text-sm font-bold tracking-widest text-center">TREK GROUP<br /><span className="text-[10px] font-medium uppercase tracking-tighter opacity-80">Contracting</span></span>
                    </div>

                    <div className="text-left text-[11px] font-bold space-y-1">
                        <h2 className="text-xl font-black tracking-tight text-[#1A1A40] mb-2 uppercase">Trek Group Contracting</h2>
                        <div className="grid grid-cols-[80px_1fr]">
                            <span>MOB</span>
                            <span>: +974 3051 6559 / 7171 6559</span>
                        </div>
                        <div className="grid grid-cols-[80px_1fr]">
                            <span>EMAIL</span>
                            <span>: info@trekgroups.com</span>
                        </div>
                        <div className="grid grid-cols-[80px_1fr]">
                            <span>WEB</span>
                            <span>: www.trekgroups.com</span>
                        </div>
                        <div className="grid grid-cols-[80px_1fr]">
                            <span>Location</span>
                            <span>: Al Azizya -Doha -Qatar</span>
                        </div>
                    </div>
                </div>

                {/* Info Box */}
                <div className="p-10 text-sm font-bold text-slate-800 space-y-6">
                    <div className="space-y-2">
                        <div className="grid grid-cols-[100px_1fr]">
                            <span>Date</span>
                            <span>: {new Date(invoice.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).replace(/(\d+)/, '$1th')}</span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr]">
                            <span>Ref.</span>
                            <span>: TGC/G/JN/{invoice.invoiceNo.split('-').pop()}</span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr]">
                            <span>To</span>
                            <span>: {invoice.refNo || "30808484"}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-[100px_1fr] text-base font-black uppercase text-[#1A1A40]">
                        <span>PROJECT</span>
                        <span>: {invoice.refNo ? `Reference ${invoice.refNo}` : "Lusial shope"}</span>
                    </div>

                    <div className="space-y-4">
                        <p>Dear sir</p>
                        <p className="font-medium leading-tight">with reference to the above-mentioned project and your inquiry for the Glass work, please find below our final rock bottom prices: -</p>
                    </div>

                    {/* Table */}
                    <table className="w-full border-collapse border border-slate-400">
                        <thead className="bg-slate-100 uppercase text-[12px] tracking-tight">
                            <tr>
                                <th className="border border-slate-400 px-3 py-2 text-center w-[60%]">Product Type</th>
                                <th className="border border-slate-400 px-3 py-2 text-center">QTY</th>
                                <th className="border border-slate-400 px-3 py-2 text-center">UNIT PRICE</th>
                                <th className="border border-slate-400 px-3 py-2 text-center">Unite Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.items && invoice.items.length > 0 ? (
                                invoice.items.map((item: any, idx: number) => (
                                    <tr key={idx} className="bg-white">
                                        <td className="border border-slate-400 px-3 py-3 text-[11px] leading-tight font-medium">
                                            {item.description}
                                        </td>
                                        <td className="border border-slate-400 px-3 py-3 text-center">{item.quantity}</td>
                                        <td className="border border-slate-400 px-3 py-3 text-right"></td>
                                        <td className="border border-slate-400 px-3 py-3 text-center">{parseFloat(item.amount).toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-white">
                                    <td className="border border-slate-400 px-3 py-3 text-[11px] leading-tight font-medium">Supply and installation of 6 mm blue reflection tempered glass with silicone</td>
                                    <td className="border border-slate-400 px-3 py-3 text-center">1</td>
                                    <td className="border border-slate-400 px-3 py-3 text-right"></td>
                                    <td className="border border-slate-400 px-3 py-3 text-center">{parseFloat(invoice.amount).toLocaleString()}</td>
                                </tr>
                            )}
                            {/* Totals Section In Table */}
                            <tr className="bg-white font-black uppercase">
                                <td className="border border-slate-400 px-3 py-2">TOTAL</td>
                                <td className="border border-slate-400"></td>
                                <td className="border border-slate-400"></td>
                                <td className="border border-slate-400 px-3 py-2 text-center">{parseFloat(invoice.amount).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Footer / Terms */}
                    <div className="space-y-4 pt-4">
                        <h3 className="underline font-black uppercase text-[13px]">Terms & Condition:</h3>
                        <ol className="text-[11px] font-bold list-decimal pl-5 space-y-1">
                            <li><span className="font-black">Payment:</span> 50% advance, 30% upon delivery, and 20% upon completion</li>
                            <li><span className="font-black">Delivery:</span> with 15 days from the advance payment.</li>
                            <li>Above prices are subjected to change against the significant market prices fluctuation.</li>
                            <li><span className="font-black">Offer is valid for 15 Days</span></li>
                            <li>This quotation is prepared on the basis of the specifications provided in the scope of works and limited to the same.</li>
                            <li>Electrical provisions and floor carpet to be provided by the client.</li>
                            <li>The above pricing is based on the specifications provided and limited to the quantities stated above. Any variation on the above specifications or quantities will result in change of price and also effect the delivery period. For any changes required to be made other than the scope of works stated, should be made in writing and need written confirmation in order to carry out the same.</li>
                            <li>We will not be responsible for delivery arising out of delays in approvals of drawings, samples, payments, any natural calamities or pandemics or any situation that is beyond our control.</li>
                        </ol>
                    </div>

                    {/* Signature Row */}
                    <div className="pt-6 space-y-1">
                        <p className="font-black text-[13px]">Best regards,</p>
                        <p className="font-black text-[13px]">Mr. Afzal</p>
                        <p className="font-bold text-[12px]">Contracting Manager</p>
                        <p className="font-bold text-[12px]">(+974) 7171 6559</p>
                        <p className="font-bold text-[12px]">Email: info@trekgroups.com</p>
                    </div>
                </div>
            </div>

            <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0; padding: 0; }
          .bg-slate-50 { background: white !important; }
          .p-6 { padding: 0 !important; }
          .max-w-[800px] { max-width: 100% !important; border: none !important; }
          .bg-[#E6E6FA] { background: white !important; }
        }
      `}</style>
        </div>
    );
}
