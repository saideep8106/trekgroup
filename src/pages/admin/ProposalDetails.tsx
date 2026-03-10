import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Printer, Send } from "lucide-react";
import StatusBadge from "../../components/StatusBadge";
import { useAuth } from "../../context/AuthContext";

export default function ProposalDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [proposal, setProposal] = useState<any>(null);

    const hasFullAccess = user?.role === "SUPER_ADMIN" || user?.role === "PROJECT_MANAGER";

    useEffect(() => {
        const persistedProposals = JSON.parse(localStorage.getItem("trek_proposals") || "[]");
        const found = persistedProposals.find((p: any) => p.id === id);
        if (found) {
            setProposal(found);
        }
    }, [id]);

    if (!proposal) {
        return (
            <div className="p-6 text-center">
                <p>Proposal not found.</p>
                <button onClick={() => navigate("/proposals")} className="text-brand-600 mt-4 underline">
                    Back to Proposals
                </button>
            </div>
        );
    }

    const handlePrint = () => {
        window.print();
    };

    const Watermark = ({ isDark = false }: { isDark?: boolean }) => (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
            <img
                src="/logo.png"
                alt="Watermark"
                className={`w-[60%] max-w-[500px] object-contain ${isDark ? 'opacity-[0.02] invert' : 'opacity-[0.04]'}`}
            />
        </div>
    );

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            {/* Top Action Bar (No Print) */}
            <div className="flex justify-between items-center mb-6 no-print">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-200 bg-white rounded-full transition-colors shadow-sm">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold">{proposal.proposalNo}</h1>
                    </div>
                    <StatusBadge status={proposal.status} />
                </div>
                <div className="flex gap-3">
                    {hasFullAccess && (
                        <button onClick={() => navigate(`/edit-proposal/${id}`)} className="flex items-center gap-2 px-4 py-2 border bg-white rounded-lg hover:bg-slate-50 transition shadow-sm font-medium">
                            <Edit size={16} />
                            Edit
                        </button>
                    )}
                    <button onClick={handlePrint} className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition shadow-sm font-medium">
                        <Printer size={16} />
                        Generate PDF / Print
                    </button>
                    {hasFullAccess && (
                        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm font-medium">
                            <Send size={16} />
                            Send to Client
                        </button>
                    )}
                </div>
            </div>

            {/* A4 Document Container */}
            <div className="max-w-[800px] mx-auto bg-white shadow-lg border border-slate-200 print:shadow-none print:border-none print:m-0 print:max-w-none text-slate-800 font-sans">

                {/* --- PAGE 1: COVER PAGE --- */}
                <div className="page-break flex flex-col justify-center min-h-[1050px] p-16 relative bg-slate-50 border-b-8 border-brand-900 print:min-h-screen overflow-hidden">
                    <Watermark />

                    {/* Top Big Logo */}
                    <div className="absolute top-16 right-16 w-64">
                        <img src="/logo.png" alt="Company Logo" className="w-full h-auto object-contain drop-shadow-md" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/200?text=LOGO')} />
                    </div>

                    <div className="mt-48 space-y-8 relative z-10">
                        <h1 className="text-6xl font-black text-brand-900 uppercase tracking-tighter leading-none">{proposal.title || "Business Proposal"}</h1>

                        <div className="space-y-2 border-l-4 border-brand-500 pl-6 py-2">
                            <p className="text-xl font-medium text-slate-500 uppercase tracking-widest">Prepared For</p>
                            <p className="text-4xl font-bold text-slate-900">{proposal.preparedFor || proposal.clientName}</p>
                            {proposal.clientName !== proposal.preparedFor && (
                                <p className="text-2xl font-medium text-slate-600">{proposal.clientName}</p>
                            )}
                        </div>

                        <div className="pt-32">
                            <p className="text-2xl font-bold text-brand-700">{proposal.year || new Date().getFullYear()}</p>
                            <p className="text-xl font-black text-slate-900 uppercase tracking-widest mt-2">Trek Group Business Services</p>
                        </div>
                    </div>
                </div>

                {/* --- COMMON HEADER FOR SUBSEQUENT PAGES --- */}
                <div className="hidden print:block fixed top-0 w-full p-8 text-xs text-slate-400 font-bold tracking-widest uppercase text-right border-b opacity-50">
                    Trek Group Business Services | {proposal.clientName}
                </div>

                {/* --- PAGE 2: ABOUT COMPANY --- */}
                <div className="page-break p-16 min-h-[1050px] print:min-h-screen flex flex-col justify-center relative overflow-hidden bg-white">
                    <Watermark />
                    <div className="flex items-center gap-4 mb-10 relative z-10">
                        <div className="w-12 h-1 bg-brand-500"></div>
                        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">About Company</h2>
                    </div>
                    <div className="text-lg text-slate-700 leading-loose whitespace-pre-wrap font-medium relative z-10">
                        {proposal.aboutCompany}
                    </div>
                </div>

                {/* --- PAGE 3: SERVICES PROVIDED --- */}
                <div className="page-break p-16 min-h-[1050px] print:min-h-screen flex flex-col justify-center bg-slate-50 relative overflow-hidden">
                    <Watermark />
                    <div className="flex items-center gap-4 mb-12 relative z-10">
                        <div className="w-12 h-1 bg-brand-500"></div>
                        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Services Provided</h2>
                    </div>
                    <ul className="space-y-6 relative z-10">
                        {proposal.services?.map((service: string, idx: number) => (
                            <li key={idx} className="flex gap-4 items-start bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                                <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-black flex-shrink-0 mt-1">
                                    {idx + 1}
                                </div>
                                <p className="text-xl text-slate-800 font-bold leading-relaxed">{service}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* --- PAGE 4: OUR PROPOSAL --- */}
                <div className="page-break p-16 min-h-[1050px] print:min-h-screen flex flex-col justify-center relative overflow-hidden bg-white">
                    <Watermark />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-bl-full z-0"></div>
                    <div className="flex items-center gap-4 mb-10 relative z-10">
                        <div className="w-12 h-1 bg-brand-500"></div>
                        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Our Proposal</h2>
                    </div>
                    <div className="text-xl text-slate-700 leading-loose whitespace-pre-wrap font-medium border-l-4 border-slate-200 pl-8 py-4 relative z-10 bg-white/50 backdrop-blur-sm">
                        {proposal.proposalDescription}
                    </div>
                </div>

                {/* --- PAGE 5: ACTIVITIES --- */}
                <div className="page-break p-16 min-h-[1050px] print:min-h-screen flex flex-col relative overflow-hidden bg-slate-50">
                    <Watermark />
                    <div className="flex items-center gap-4 mb-12 mt-12 relative z-10">
                        <div className="w-12 h-1 bg-brand-500"></div>
                        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Activities</h2>
                    </div>
                    <div className="space-y-8 flex-1 relative z-10">
                        {proposal.activities?.map((activity: any, idx: number) => (
                            <div key={idx} className="border-b-2 border-slate-100 pb-8 last:border-0">
                                <h3 className="text-2xl font-black text-brand-800 mb-3 flex items-center gap-3">
                                    <span className="text-slate-300">{(idx + 1).toString().padStart(2, '0')}.</span>
                                    {activity.title}
                                </h3>
                                <p className="text-lg text-slate-600 pl-11">{activity.description}</p>
                            </div>
                        ))}
                        {(!proposal.activities || proposal.activities.length === 0) && (
                            <p className="text-lg text-slate-400 italic">No specific activities listed.</p>
                        )}
                    </div>
                </div>

                {/* --- PAGE 6: FINANCIAL & COMMERCIAL TERMS --- */}
                <div className="page-break p-16 min-h-[1050px] print:min-h-screen flex flex-col justify-center bg-slate-900 text-white relative overflow-hidden">
                    <Watermark isDark={true} />
                    <div className="flex items-center gap-4 mb-16 relative z-10">
                        <div className="w-12 h-1 bg-brand-500"></div>
                        <h2 className="text-4xl font-black text-white uppercase tracking-tight">Commercial Terms</h2>
                    </div>

                    <div className="bg-white text-slate-900 p-10 rounded-2xl shadow-xl mb-10 relative z-10">
                        <h3 className="text-xl font-bold tracking-widest text-slate-400 uppercase mb-2">Package</h3>
                        <p className="text-3xl font-black text-slate-900 mb-8">{proposal.packageName || "Setup Package"}</p>

                        <div className="flex justify-between items-end border-t border-slate-200 pt-8 mt-8">
                            <p className="text-xl font-bold uppercase tracking-widest text-slate-500">Total Investment</p>
                            <p className="text-5xl font-black text-brand-600">QAR {parseFloat(proposal.totalPackageCost || 0).toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-12 mt-10">
                        <div>
                            <h4 className="text-xl font-bold text-brand-300 mb-4 border-b border-white/20 pb-2">Included Services</h4>
                            <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                                {proposal.includedServices || "As detailed in 'Services Provided' section."}
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-xl font-bold text-rose-300 mb-4 border-b border-white/20 pb-2">Exclusions</h4>
                                <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                                    {proposal.exclusions || "None specified."}
                                </div>
                            </div>
                            {proposal.financialNotes && (
                                <div>
                                    <h4 className="text-lg font-bold text-brand-200 mb-2">Notes</h4>
                                    <div className="text-slate-400 text-sm whitespace-pre-wrap leading-relaxed">
                                        {proposal.financialNotes}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- PAGE 7: CLIENT DUTIES + PAYMENT TERMS --- */}
                <div className="page-break p-16 min-h-[1050px] print:min-h-screen flex flex-col justify-center relative overflow-hidden bg-white">
                    <Watermark />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-8 h-1 bg-brand-500"></div>
                                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Client Duties</h2>
                            </div>
                            <div className="text-lg text-slate-700 leading-loose whitespace-pre-wrap p-8 bg-slate-50 rounded-xl border border-slate-100">
                                {proposal.clientDuties || "Client must provide all necessary documentation in a timely manner."}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-8 h-1 bg-brand-500"></div>
                                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Payment Terms</h2>
                            </div>
                            <div className="text-lg text-slate-700 leading-loose whitespace-pre-wrap p-8 bg-brand-50 rounded-xl border border-brand-100 font-bold">
                                {proposal.paymentTerms}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- PAGE 8: THANK YOU & CONTACT --- */}
                <div className="page-break p-16 min-h-[1050px] print:min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden bg-brand-900 text-white">
                    <Watermark isDark={true} />
                    <div className="w-48 h-auto mb-16 relative z-10">
                        <img src="/logo.png" alt="Company Logo" className="w-full h-auto object-contain drop-shadow-2xl" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/200?text=LOGO')} />
                    </div>

                    <h2 className="text-6xl font-black uppercase tracking-tight mb-6 relative z-10">Thank You</h2>
                    <p className="text-2xl text-brand-200 font-medium max-w-2xl mb-24 leading-relaxed relative z-10">We look forward to a successful partnership and are ready to answer any questions you may have.</p>

                    <div className="grid grid-cols-2 gap-x-20 gap-y-10 text-left w-full max-w-3xl border-t border-brand-700/50 pt-16 relative z-10">
                        <div>
                            <p className="text-sm font-bold text-brand-400 uppercase tracking-widest mb-1">Mobile</p>
                            <p className="text-2xl font-bold">+974 3051 6559</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-brand-400 uppercase tracking-widest mb-1">Email</p>
                            <p className="text-2xl font-bold">info@trekgroups.com</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-brand-400 uppercase tracking-widest mb-1">Website</p>
                            <p className="text-2xl font-bold">www.trekgroups.com</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-brand-400 uppercase tracking-widest mb-1">Location</p>
                            <p className="text-2xl font-bold">Al Azizya - Doha - Qatar</p>
                        </div>
                    </div>
                </div>

            </div>

            <style>{`
        @media print {
          title { display: none; }
          .no-print { display: none !important; }
          body { 
            background: white !important; 
            margin: 0; 
            padding: 0; 
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .bg-slate-50 { background-color: #f8fafc !important; }
          .bg-slate-900 { background-color: #0f172a !important; color: white !important; }
          .bg-brand-900 { background-color: #1e1b4b !important; color: white !important; }
          .bg-brand-50 { background-color: #eef2ff !important; }
          .bg-brand-100 { background-color: #e0e7ff !important; }
          .text-white { color: white !important; }
          .page-break { 
            page-break-after: always;
            break-after: page;
            height: 100vh !important;
            min-height: 100vh !important;
            box-sizing: border-box;
          }
          @page {
            size: A4;
            margin: 0;
          }
          .p-6 { padding: 0 !important; }
        }
      `}</style>
        </div>
    );
}
