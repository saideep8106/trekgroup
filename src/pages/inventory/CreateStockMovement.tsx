import PageHeader from "../../components/PageHeader";
import FormInput from "../../components/forms/FormInput";
import FormSelect from "../../components/forms/FormSelect";

function CreateStockMovement() {

  return (
    <>

      <PageHeader title="Stock Movement" />

      <div className="bg-white p-6 rounded-xl border shadow-sm grid grid-cols-2 gap-6">

        <FormInput
          label="Product Name"
          placeholder="Glass Panel"
        />

        <FormSelect
          label="Movement Type"
          options={["Stock In", "Stock Out"]}
        />

        <FormInput
          label="Quantity"
          type="number"
        />

        <FormInput
          label="Reference"
          placeholder="PO-001 / SO-002"
        />

      </div>

      <div className="mt-6">

        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
          Save Movement
        </button>

      </div>

    </>
  );
}

export default CreateStockMovement;