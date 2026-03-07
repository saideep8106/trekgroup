import StatCard from "../../components/StatCard";
import { Folder, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import ChartCard from "../../components/ChartCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useActivity, formatTimeAgo } from "../../context/ActivityContext";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const projectStatusData = [
    { name: "Active", value: 8 },
    { name: "Completed", value: 12 },
    { name: "On Hold", value: 2 },
];

const COLORS = ["#6366f1", "#10b981", "#f59e0b"];

const initialJobs = [
    { id: "JOB-101", project: "Villa A-21", task: "Glass Installation", deadline: "Tomorrow", priority: "High", path: "/jobs" },
    { id: "JOB-105", project: "Office Tower 2", task: "Frame Fitting", deadline: "Jun 15", priority: "Medium", path: "/jobs" },
    { id: "JOB-112", project: "Beach Resort", task: "Material Delivery", deadline: "Jun 18", priority: "Low", path: "/jobs" },
];

export default function PMDashboard() {
    const { activities } = useActivity();
    const projectMoments = activities.filter(a => a.category === 'project').slice(0, 5);

    const [stats, setStats] = useState({
        projects: 8,
        jobs: 14,
        completed: 45,
        overdue: 3
    });
    const [jobs, setJobs] = useState(initialJobs);

    useEffect(() => {
        const persistedProjects = JSON.parse(localStorage.getItem("trek_projects") || "[]");
        const persistedJobs = JSON.parse(localStorage.getItem("trek_jobs") || "[]");

        setStats(prev => ({
            ...prev,
            projects: 8 + persistedProjects.length,
            jobs: 14 + persistedJobs.length
        }));

        const formattedPersisted = persistedJobs.map((j: any) => ({
            id: j.jobId,
            project: j.clientName,
            task: j.serviceType,
            deadline: j.dueDate,
            priority: "Medium"
        }));

        setJobs([...initialJobs, ...formattedPersisted]);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Project Manager Dashboard
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Monitor project progress and job assignments.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link to="/create-project" className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                        <Plus size={16} /> New Project
                    </Link>
                    <Link to="/create-job" className="bg-white border hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                        Assign Job
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <Link to="/projects">
                    <StatCard
                        title="Active Projects"
                        value={stats.projects.toString()}
                        icon={<Folder size={20} className="text-brand-500" />}
                        trend={{ value: "+2 this month", positive: true }}
                    />
                </Link>
                <Link to="/jobs">
                    <StatCard
                        title="Ongoing Jobs"
                        value={stats.jobs.toString()}
                        icon={<Clock size={20} className="text-blue-500" />}
                    />
                </Link>
                <Link to="/jobs">
                    <StatCard
                        title="Completed Jobs"
                        value={stats.completed.toString()}
                        icon={<CheckCircle size={20} className="text-emerald-500" />}
                    />
                </Link>
                <Link to="/jobs">
                    <StatCard
                        title="Overdue Tasks"
                        value={stats.overdue.toString()}
                        icon={<AlertTriangle size={20} className="text-rose-500" />}
                    />
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <ChartCard title="Project Distribution">
                    <div className="flex justify-end mb-2 -mt-8">
                        <Link to="/projects" className="text-[10px] text-brand-600 font-medium hover:underline">Manage All</Link>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={projectStatusData}
                                dataKey="value"
                                innerRadius={60}
                                outerRadius={80}
                            >
                                {projectStatusData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-col gap-2 mt-4">
                        {projectStatusData.map((item, i) => (
                            <div key={item.name} className="flex items-center justify-between text-xs transition-colors hover:text-brand-600 cursor-pointer" onClick={() => window.location.href = '/projects'}>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                    <span>{item.name}</span>
                                </div>
                                <span className="font-semibold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </ChartCard>

                <div className="card-hover p-5 border border-gray-100 bg-white rounded-xl flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-gray-800">Project Moments</h2>
                        <Clock size={16} className="text-gray-400" />
                    </div>

                    {projectMoments.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center py-4 flex-1">No recent project moments.</p>
                    ) : (
                        <ul className="space-y-4 flex-1">
                            {projectMoments.map((moment, i) => (
                                <Link key={i} to={moment.path} className="block group">
                                    <li className="flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-blue-500" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-700 group-hover:text-brand-600 transition-colors">
                                                <span className="font-semibold">{moment.action}</span>
                                                {moment.subject && ` - ${moment.subject}`}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">{formatTimeAgo(moment.time)} by {moment.performingUser}</p>
                                        </div>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    )}

                    <Link to="/jobs" className="block text-center mt-6 text-xs text-brand-600 font-medium hover:underline">
                        View All Tasks
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5">
                <div className="card-hover p-5 border border-gray-100 bg-white rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-gray-800">Active Jobs & Deadlines</h2>
                        <Link to="/jobs" className="text-xs text-brand-600 font-medium hover:underline">Manage All</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left pb-3 text-xs font-semibold text-gray-500 uppercase">Job ID</th>
                                    <th className="text-left pb-3 text-xs font-semibold text-gray-500 uppercase">Project</th>
                                    <th className="text-left pb-3 text-xs font-semibold text-gray-500 uppercase">Deadline</th>
                                    <th className="text-left pb-3 text-xs font-semibold text-gray-500 uppercase">Priority</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {jobs.map((job) => (
                                    <tr key={job.id} className="hover:bg-brand-50/30 transition-colors group cursor-pointer" onClick={() => window.location.href = job.path || '/jobs'}>
                                        <td className="py-3 font-medium text-brand-600 group-hover:underline">{job.id}</td>
                                        <td className="py-3 text-gray-700">{job.project}</td>
                                        <td className="py-3 text-gray-600">{job.deadline}</td>
                                        <td className="py-3">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${job.priority === 'High' ? 'bg-rose-100 text-rose-600' :
                                                job.priority === 'Medium' ? 'bg-amber-100 text-amber-600' :
                                                    'bg-blue-100 text-blue-600'
                                                }`}>
                                                {job.priority}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
