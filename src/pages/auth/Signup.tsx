import { motion } from "framer-motion";
import { useState } from "react";

export default function Signup(){

const [form, setForm] = useState({
name:"",
email:"",
password:"",
company:""
})

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">

<motion.div
 initial={{ opacity:0, y:40 }}
 animate={{ opacity:1, y:0 }}
 className="bg-white p-10 rounded-xl shadow-xl w-[420px]"
>

<h2 className="text-2xl font-bold text-center mb-6">

Create Account

</h2>


<input
placeholder="Full Name"
value={form.name}
onChange={(e) => setForm({...form, name: e.target.value})}
className="w-full border p-3 rounded mb-3"
/>

<input
placeholder="Email"
value={form.email}
onChange={(e) => setForm({...form, email: e.target.value})}
className="w-full border p-3 rounded mb-3"
/>

<input
placeholder="Company"
value={form.company}
onChange={(e) => setForm({...form, company: e.target.value})}
className="w-full border p-3 rounded mb-3"
/>

<input
type="password"
placeholder="Password"
value={form.password}
onChange={(e) => setForm({...form, password: e.target.value})}
className="w-full border p-3 rounded mb-6"
/>


<button className="w-full bg-indigo-600 text-white p-3 rounded-lg">

Sign Up

</button>

</motion.div>

</div>

)
}