import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormTextarea from "../../components/forms/FormTextarea";
import FormInput from "../../components/forms/FormInput";
import PageHeader from "../../components/PageHeader";

function CreateProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    purchasePrice: "",
    sellingPrice: "",
    stockQuantity: "",
    minStock: "",
    supplier: "",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      ...form,
      id: Math.floor(Math.random() * 1000).toString()
    };
    const existing = JSON.parse(localStorage.getItem("trek_products") || "[]");
    localStorage.setItem("trek_products", JSON.stringify([...existing, newProduct]));
    navigate("/products");
  };

  return (
    <div className="p-6">
      <PageHeader title="Create Product" subtitle="Add a new item to the inventory" />

      <div className="bg-white p-6 rounded-xl border shadow-sm grid grid-cols-2 gap-6 mt-6">
        <FormInput
          label="Product Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Glass Panel"
          required
        />

        <FormInput
          label="Purchase Price (QAR)"
          type="number"
          name="purchasePrice"
          value={form.purchasePrice}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Selling Price (QAR)"
          type="number"
          name="sellingPrice"
          value={form.sellingPrice}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Stock Quantity"
          type="number"
          name="stockQuantity"
          value={form.stockQuantity}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Minimum Stock Level"
          type="number"
          name="minStock"
          value={form.minStock}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Supplier"
          name="supplier"
          value={form.supplier}
          onChange={handleChange}
          placeholder="Supplier Name"
        />

        <div className="col-span-2">
          <FormTextarea
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Product details..."
          />
        </div>

        <div className="col-span-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;