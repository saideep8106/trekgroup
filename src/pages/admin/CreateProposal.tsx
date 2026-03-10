import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import FormInput from "../../components/forms/FormInput";
import { Plus, Trash2, Save, ArrowLeft, FileEdit, LayoutTemplate, CheckCircle2 } from "lucide-react";
import { useActivity } from "../../context/ActivityContext";

interface Activity {
    id: string;
    title: string;
    description: string;
}

const SectionCard = ({ title, children, number }: any) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="bg-brand-100 text-brand-700 text-sm w-6 h-6 flex items-center justify-center rounded-full font-black">{number}</span>
            {title}
        </h3>
        {children}
    </div>
);

export default function CreateProposal() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { logActivity } = useActivity();
    const isEditing = !!id;

    const defaultAboutText = "Trek Group Business Services is a trusted provider of comprehensive corporate and industrial setup solutions in Qatar. We specialize in guiding investors and entrepreneurs through every stage of company formation, licensing, and operational setup, ensuring compliance with all local laws and regulations. Our expertise extends to supporting industrial projects with end-to-end documentation, approvals, and advisory services.";
    const defaultServices = [
        "Company formation and trade license registration",
        "Industrial license applications and approvals",
        "Government liaison and PRO services",
        "Special approval coordination for industrial projects",
        "Comprehensive project documentation and compliance"
    ];
    const defaultProposalDesc = "Trek Group Business Services proposes to manage the complete setup of a new company in Qatar.";
    const defaultPaymentTerms = "50% advance\n50% after completion";

    // --- PREDEFINED TEMPLATES ---
    const proposalTemplates = [
        {
            id: "company-formation",
            name: "Company Formation Setup",
            icon: "🏢",
            description: "Standard end-to-end company registration and setup in Qatar.",
            data: {
                title: "Company Formation Proposal",
                aboutCompany: defaultAboutText,
                proposalDescription: "Trek Group Business Services proposes to manage the complete setup and registration of a new W.L.L. company in Qatar, handling all governmental and legal requirements.",
                services: ["Trade Name Reservation", "Commercial Registration (CR)", "Trade License (Baladiya)", "Computer Card (Establishment ID)", "Tax Card Registration"],
                activities: [{ id: "1", title: "Document Drafting", description: "Drafting Articles of Association (AOA) and finalizing signatures." }, { id: "2", title: "Ministry Approvals", description: "Securing necessary approvals from the Ministry of Commerce & Industry." }],
                packageName: "Comprehensive Company Formation",
                totalPackageCost: 15000,
                includedServices: "All government fees for the first year, typing center charges, and PRO service charges.",
                exclusions: "Office rent, sponsor fees, and third-party attestations.",
                financialNotes: "Prices are subject to change based on specific activity requirements.",
                paymentTerms: "50% Advance Payment\n50% Upon Issuance of CR",
                clientDuties: "Provide valid passport copies, Qatar IDs (if applicable), and execute POA to our PRO."
            }
        },
        {
            id: "pro-services",
            name: "Annual PRO Services",
            icon: "🤝",
            description: "Retainer agreement for continuous government liaison and visa processing.",
            data: {
                title: "Annual PRO Services Agreement",
                aboutCompany: defaultAboutText,
                proposalDescription: "Trek Group proposes an annual retainer for all PRO, immigration, and labor department services required for your company's smooth operation.",
                services: ["Visa Processing (Work, Visit, Family)", "Residency Permit (RP) Renewals", "Labor Quota Approvals", "Company Document Renewals", "Health Card Processing"],
                activities: [{ id: "1", title: "Dedicated PRO Assignment", description: "Assignment of a dedicated PRO for daily liaison tasks." }, { id: "2", title: "Monthly Reporting", description: "Detailed monthly status report on all processed documents." }],
                packageName: "Annual PRO Retainer",
                totalPackageCost: 36000,
                includedServices: "Unlimited transaction processing, dedicated account manager, free document pickup/drop-off.",
                exclusions: "Actual government fees and penalties (billed separately at cost).",
                financialNotes: "Billed monthly or quarterly as preferred.",
                paymentTerms: "Post-dated cheques (PDCs) for the annual contract.",
                clientDuties: "Ensure timely availability of funds for government fees and provide necessary signatures."
            }
        },
        {
            id: "industrial-license",
            name: "Industrial Licensing",
            icon: "🏭",
            description: "Specialized approvals for manufacturing and industrial facilities.",
            data: {
                title: "Industrial Licensing Proposal",
                aboutCompany: defaultAboutText,
                proposalDescription: "Trek Group will facilitate the complex approval processes required to secure your industrial license, including environmental and safety clearances.",
                services: ["Initial Industrial Approval", "Environmental Clearance", "Civil Defense Approval", "Customs Exemption Processing", "Final Industrial License"],
                activities: [{ id: "1", title: "Feasibility Study Review", description: "Aligning your feasibility study with Ministry requirements." }, { id: "2", title: "Site Inspection Coordination", description: "Managing government inspections at the designated facility." }],
                packageName: "Industrial Setup Package",
                totalPackageCost: 45000,
                includedServices: "All primary approvals up to the issuance of the preliminary industrial license.",
                exclusions: "Engineering drawings, environmental consultant fees, and physical facility modifications.",
                financialNotes: "Does not include land allocation fees or utilities.",
                paymentTerms: "40% Advance Payment\n40% Upon Initial Approval\n20% Upon Final Certification",
                clientDuties: "Provide detailed technical specifications, machinery lists, and approved factory layouts."
            }
        },
        {
            id: "feasibility-study",
            name: "Feasibility & Consulting",
            icon: "📊",
            description: "Comprehensive market analysis and financial feasibility studies.",
            data: {
                title: "Business Feasibility Study",
                aboutCompany: defaultAboutText,
                proposalDescription: "Trek Group proposes a detailed feasibility study to assess the market viability, operational requirements, and financial forecasting for your proposed business venture in Qatar.",
                services: ["Market Research & Competitor Analysis", "Financial Modeling & Forecasting", "Operational Plan Development", "Risk Assessment & Mitigation", "Final Investor Deck Preparation"],
                activities: [{ id: "1", title: "Data Collection", description: "Gathering primary and secondary market data." }, { id: "2", title: "Financial Projection", description: "Creating 5-year financial models including ROI and breakeven analysis." }],
                packageName: "Comprehensive Consulting Package",
                totalPackageCost: 25000,
                includedServices: "Complete feasibility report document (PDF and Print), presentation slides, and two rounds of revisions.",
                exclusions: "Implementation of the business plan and physical marketing activities.",
                financialNotes: "Cost may vary if highly specialized industry data purchasing is required.",
                paymentTerms: "50% Advance Payment\n25% Upon First Draft\n25% Upon Final Delivery",
                clientDuties: "Provide clear business concept, target audience details, and initial capital estimates."
            }
        },
        {
            id: "visa-processing",
            name: "Premium Visa Package",
            icon: "✈️",
            description: "Bulk visa processing for expatriate staff and executive management.",
            data: {
                title: "Executive Visa & Immigration Services",
                aboutCompany: defaultAboutText,
                proposalDescription: "Trek Group offers an expedited and hassle-free solution for processing bulk employment visas, family sponsorships, and executive residency permits.",
                services: ["Employment Visa Processing", "Family Residency Sponsorship", "Medical Commission Booking", "Fingerprint & Biometrics Coordination", "VIP QID Issuance"],
                activities: [{ id: "1", title: "Document Verification", description: "Checking all academic certificates and police clearances prior to submission." }, { id: "2", title: "VIP Concierge", description: "Accompanying executives to medical and fingerprinting centers." }],
                packageName: "Premium Immigration Setup",
                totalPackageCost: 12000,
                includedServices: "Processing of up to 10 employment visas and 2 executive family sponsorships. Includes our VIP concierge service.",
                exclusions: "Actual government portal fees, medical test fees, and ticket bookings.",
                financialNotes: "Government fees will be requested as an advance deposit based on the nationality quota.",
                paymentTerms: "100% Agency Fee Advance\nGovernment Fees as requested per transaction",
                clientDuties: "Provide attested educational certificates, clear passport copies, and signed employment contracts."
            }
        },
        {
            id: "local-sponsorship",
            name: "Corporate Sponsorship",
            icon: "🤝",
            description: "Secure local Qatari representation for foreign branch entities.",
            data: {
                title: "Corporate Local Sponsorship Agreement",
                aboutCompany: defaultAboutText,
                proposalDescription: "Trek Group will act as your secure and silent Corporate Local Sponsor (51% shareholder / Service Agent), ensuring full compliance with Qatari commercial law while protecting your operational control and profits.",
                services: ["Drafting Protective Corporate Agreements", "Shareholder Representation at Ministry", "Bank Account Signatory Facilitation", "Annual Commercial Registration Renewal", "Silent Partner Guarantee"],
                activities: [{ id: "1", title: "Legal Structuring", description: "Drafting side agreements protecting the foreign investor's operational rights." }, { id: "2", title: "Notary Public Execution", description: "Finalizing the sponsorship contract at the Ministry of Justice." }],
                packageName: "Annual Corporate Sponsorship",
                totalPackageCost: 50000,
                includedServices: "Annual sponsorship fee granting the foreign entity 100% financial and operational control.",
                exclusions: "Daily PRO services, trade license renewal fees, and external legal consulting.",
                financialNotes: "This is a recurring annual fee. First year is payable upon signing the AOA.",
                paymentTerms: "100% Advance Payment upon Notary execution.",
                clientDuties: "Provide corporate documents of the parent company attested by the Qatar Embassy."
            }
        }
    ];

    const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

    const applyTemplate = (templateId: string) => {
        const template = proposalTemplates.find(t => t.id === templateId);
        if (!template) return;

        const confirmed = window.confirm("Are you sure you want to apply this template? It will overwrite your current form data.");
        if (!confirmed) return;

        setActiveTemplate(templateId);

        // Update Form
        setForm(prev => ({
            ...prev,
            title: template.data.title,
            aboutCompany: template.data.aboutCompany,
            proposalDescription: template.data.proposalDescription,
            packageName: template.data.packageName,
            totalPackageCost: template.data.totalPackageCost,
            includedServices: template.data.includedServices,
            exclusions: template.data.exclusions,
            financialNotes: template.data.financialNotes,
            paymentTerms: template.data.paymentTerms,
            clientDuties: template.data.clientDuties,
        }));

        // Update Arrays
        setServices(template.data.services);
        setActivities(template.data.activities);
    };

    const [form, setForm] = useState({
        proposalNo: `PROP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        status: "Draft",

        // SECTION 1: Cover Page
        preparedFor: "",
        clientName: "",
        year: new Date().getFullYear().toString(),
        title: "Business Proposal",

        // SECTION 2: About Company
        aboutCompany: defaultAboutText,

        // SECTION 4: Our Proposal
        proposalDescription: defaultProposalDesc,

        // SECTION 6: Financial & Commercial Terms
        packageName: "",
        totalPackageCost: 0,
        includedServices: "",
        exclusions: "",
        financialNotes: "",

        // SECTION 7: Client Duties
        clientDuties: "",

        // SECTION 8: Payment Terms
        paymentTerms: defaultPaymentTerms,
    });

    // SECTION 3: Services Provided
    const [services, setServices] = useState<string[]>(defaultServices);

    // SECTION 5: Activities
    const [activities, setActivities] = useState<Activity[]>([
        { id: "1", title: "", description: "" }
    ]);

    useEffect(() => {
        if (isEditing) {
            const persistedProposals = JSON.parse(localStorage.getItem("trek_proposals") || "[]");
            const proposal = persistedProposals.find((p: any) => p.id === id);
            if (proposal) {
                setForm(proposal);
                if (proposal.services) setServices(proposal.services);
                if (proposal.activities) setActivities(proposal.activities);
            }
        }
    }, [id, isEditing]);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.type === "number" ? parseFloat(e.target.value) || 0 : e.target.value;
        setForm({ ...form, [e.target.name]: value });
    };

    const handleServiceChange = (index: number, value: string) => {
        const newServices = [...services];
        newServices[index] = value;
        setServices(newServices);
    };

    const addService = () => setServices([...services, ""]);
    const removeService = (index: number) => setServices(services.filter((_, i) => i !== index));

    const handleActivityChange = (index: number, field: keyof Activity, value: string) => {
        const newActivities = [...activities];
        newActivities[index] = { ...newActivities[index], [field]: value };
        setActivities(newActivities);
    };

    const addActivity = () => setActivities([...activities, { id: Date.now().toString(), title: "", description: "" }]);
    const removeActivity = (index: number) => setActivities(activities.filter((_, i) => i !== index));

    const handleSubmit = (e: React.FormEvent, isDraft: boolean = false) => {
        e.preventDefault();
        const finalStatus = isDraft ? "Draft" : form.status;

        const proposalData = {
            ...form,
            status: finalStatus,
            id: isEditing ? id : `prop-${Date.now()}`,
            services,
            activities,
            amount: form.totalPackageCost, // For list view backward compatibility
            client: form.clientName,       // For list view backward compatibility
            date: new Date().toISOString().split("T")[0]
        };

        const existingProposals = JSON.parse(localStorage.getItem("trek_proposals") || "[]");
        let updatedProposals;

        if (isEditing) {
            updatedProposals = existingProposals.map((p: any) => p.id === id ? proposalData : p);
        } else {
            updatedProposals = [...existingProposals, proposalData];
        }

        localStorage.setItem("trek_proposals", JSON.stringify(updatedProposals));
        logActivity(`${isEditing ? "Updated" : "Created"} Proposal ${form.proposalNo}`, "admin", "/proposals", form.proposalNo);
        navigate(isDraft ? "/draft-proposals" : "/proposals");
    };

    return (
        <div className="p-6 max-w-5xl mx-auto pb-24">
            <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-200 bg-slate-100 rounded-full transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <PageHeader
                        title={isEditing ? "Edit Business Proposal" : "Create Business Proposal"}
                        subtitle="Build a comprehensive proposal structure"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm font-bold text-slate-600">Status:</label>
                    <select name="status" value={form.status} onChange={handleFormChange} className="border px-3 py-1.5 rounded-lg bg-white font-medium">
                        <option value="Draft">Draft</option>
                        <option value="Sent">Sent</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* --- TEMPLATES SECTION --- */}
            {!isEditing && (
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <LayoutTemplate size={18} className="text-brand-600" />
                        <h2 className="text-lg font-bold text-slate-800">Quick Start Templates</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {proposalTemplates.map((template) => (
                            <div
                                key={template.id}
                                onClick={() => applyTemplate(template.id)}
                                className={`cursor-pointer p-4 rounded-xl border-2 transition-all relative overflow-hidden flex flex-col gap-2 ${activeTemplate === template.id
                                    ? "border-brand-500 bg-brand-50 shadow-md ring-2 ring-brand-200"
                                    : "border-slate-100 bg-white hover:border-brand-200 hover:shadow-sm"
                                    }`}
                            >
                                {activeTemplate === template.id && (
                                    <div className="absolute top-4 right-4 text-brand-600">
                                        <CheckCircle2 size={20} />
                                    </div>
                                )}
                                <div className="text-2xl">{template.icon}</div>
                                <h3 className={`font-bold ${activeTemplate === template.id ? 'text-brand-800' : 'text-slate-800'}`}>
                                    {template.name}
                                </h3>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    {template.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">

                <SectionCard number="1" title="Cover Page">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="Prepared For" name="preparedFor" value={form.preparedFor} onChange={handleFormChange} placeholder="e.g. Mr. ANWAR" required />
                        <FormInput label="Client Company Name" name="clientName" value={form.clientName} onChange={handleFormChange} required />
                        <FormInput label="Year" name="year" value={form.year} onChange={handleFormChange} required />
                        <FormInput label="Proposal Title" name="title" value={form.title} onChange={handleFormChange} required />
                        <FormInput label="Proposal ID (Auto)" name="proposalNo" value={form.proposalNo} disabled />
                    </div>
                </SectionCard>

                <SectionCard number="2" title="About Company">
                    <p className="text-xs text-slate-500 mb-2 font-medium">This text is pre-filled but can be edited if needed.</p>
                    <textarea
                        name="aboutCompany"
                        value={form.aboutCompany}
                        onChange={handleFormChange}
                        rows={5}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 text-sm leading-relaxed"
                    />
                </SectionCard>

                <SectionCard number="3" title="Services Provided (What We Do)">
                    <div className="space-y-3">
                        {services.map((service, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <input
                                    type="text"
                                    value={service}
                                    onChange={(e) => handleServiceChange(index, e.target.value)}
                                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500"
                                    placeholder="Service description"
                                />
                                <button type="button" onClick={() => removeService(index)} className="p-2 text-slate-400 hover:text-red-500 bg-slate-50 rounded-lg">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addService} className="flex items-center gap-1 text-sm font-bold text-brand-600 hover:text-brand-800 mt-2">
                            <Plus size={16} /> Add Another Service
                        </button>
                    </div>
                </SectionCard>

                <SectionCard number="4" title="Our Proposal">
                    <textarea
                        name="proposalDescription"
                        value={form.proposalDescription}
                        onChange={handleFormChange}
                        rows={3}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 text-sm"
                    />
                </SectionCard>

                <SectionCard number="5" title="Activities">
                    <div className="space-y-4">
                        {activities.map((activity, index) => (
                            <div key={activity.id} className="p-4 border border-slate-100 bg-slate-50 rounded-lg flex gap-4 items-start relative group">
                                <div className="flex-1 space-y-3">
                                    <input
                                        type="text"
                                        value={activity.title}
                                        onChange={(e) => handleActivityChange(index, "title", e.target.value)}
                                        placeholder={`Activity ${index + 1} Title (e.g. Academic tutoring services)`}
                                        className="w-full px-3 py-2 border rounded-lg font-medium"
                                    />
                                    <textarea
                                        value={activity.description}
                                        onChange={(e) => handleActivityChange(index, "description", e.target.value)}
                                        placeholder="Activity Description (optional)"
                                        rows={2}
                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                    />
                                </div>
                                <button type="button" onClick={() => removeActivity(index)} className="p-2 mt-1 text-slate-400 hover:text-red-500 bg-white shadow-sm rounded-lg opacity-50 group-hover:opacity-100 transition">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addActivity} className="flex items-center gap-1 text-sm font-bold text-brand-600 hover:text-brand-800">
                            <Plus size={16} /> Add Activity
                        </button>
                    </div>
                </SectionCard>

                <SectionCard number="6" title="Financial & Commercial Terms">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <FormInput label="Package Name" name="packageName" value={form.packageName} onChange={handleFormChange} placeholder="e.g. Complete Setup Package" />
                        <FormInput label="Total Package Cost (QAR)" name="totalPackageCost" type="number" value={form.totalPackageCost} onChange={handleFormChange} />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-slate-700 block mb-1">Included Services</label>
                            <textarea name="includedServices" value={form.includedServices} onChange={handleFormChange} rows={3} className="w-full px-3 py-2 border rounded-lg" placeholder="List included services..." />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-slate-700 block mb-1">Exclusions</label>
                            <textarea name="exclusions" value={form.exclusions} onChange={handleFormChange} rows={2} className="w-full px-3 py-2 border rounded-lg" placeholder="List exclusions..." />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-slate-700 block mb-1">Financial Notes</label>
                            <textarea name="financialNotes" value={form.financialNotes} onChange={handleFormChange} rows={2} className="w-full px-3 py-2 border rounded-lg" placeholder="Additional notes..." />
                        </div>
                    </div>
                </SectionCard>

                <SectionCard number="7" title="Client Duties">
                    <textarea
                        name="clientDuties"
                        value={form.clientDuties}
                        onChange={handleFormChange}
                        rows={4}
                        placeholder="e.g. Passport copies, Qatar ID, Police clearance..."
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500"
                    />
                </SectionCard>

                <SectionCard number="8" title="Payment Terms">
                    <textarea
                        name="paymentTerms"
                        value={form.paymentTerms}
                        onChange={handleFormChange}
                        rows={3}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 font-medium"
                    />
                </SectionCard>

                {/* Global form actions fixed at bottom */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t flex justify-end gap-4 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)] z-20">
                    <button
                        type="button"
                        onClick={(e) => handleSubmit(e, true)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 transition"
                    >
                        <FileEdit size={18} />
                        Save as Draft
                    </button>
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-8 py-2.5 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition shadow-lg"
                    >
                        <Save size={18} />
                        {isEditing ? "Update Proposal" : "Save Proposal & Preview"}
                    </button>
                </div>
            </form>
        </div>
    );
}
