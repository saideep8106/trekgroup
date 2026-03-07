
function Permissions() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Permissions</h1>

      <div className="bg-white p-6 rounded shadow">

        <div className="mb-4">
          <label className="block mb-1 font-medium">Select Role</label>
          <select className="border p-2 rounded w-64">
            <option>Super Admin</option>
            <option>Accounts</option>
            <option>Project Manager</option>
            <option>Client</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">

          <label className="flex items-center gap-2">
            <input type="checkbox"/>
            View Users
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox"/>
            Create Users
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox"/>
            Manage Projects
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox"/>
            Create Invoices
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox"/>
            View Reports
          </label>

        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-6">
          Save Permissions
        </button>

      </div>
    </>
  );
}

export default Permissions;