import PageHeader from "../../components/PageHeader";
import FormInput from "../../components/forms/FormInput";
import FormSelect from "../../components/forms/FormSelect";

function CreateAccount() {

  return (

    <>

      <PageHeader title="Create Account" />

      <div className="bg-white p-6 rounded-xl border shadow-sm grid grid-cols-2 gap-6">

        <FormInput label="Account Code" placeholder="1001" />

        <FormInput label="Account Name" placeholder="Cash" />

        <FormSelect
          label="Account Type"
          options={[
            "Asset",
            "Liability",
            "Income",
            "Expense",
            "Equity"
          ]}
        />

      </div>

      <div className="mt-6">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
          Save Account
        </button>
      </div>

    </>

  );
}

export default CreateAccount;