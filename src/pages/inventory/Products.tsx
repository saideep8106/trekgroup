import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import PageHeader from "../../components/PageHeader";
import { Link } from "react-router-dom";
import { Plus, Trash2, Eye, Edit } from "lucide-react";

function Products() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const initialProducts = [
      { id: "1", name: "Glass Panel", purchasePrice: "50", sellingPrice: "80", stockQuantity: "120" },
      { id: "2", name: "Aluminum Frame", purchasePrice: "30", sellingPrice: "60", stockQuantity: "120" }
    ];
    const persistedProducts = JSON.parse(localStorage.getItem("trek_products") || "[]");

    const formattedData = [...initialProducts, ...persistedProducts].map(product => ({
      ...product,
      "Product": product.name,
      "Purchase Price": `QAR ${product.purchasePrice}`,
      "Selling Price": `QAR ${product.sellingPrice}`,
      "Stock": (
        <span className={`font-medium ${parseInt(product.stockQuantity) < 10 ? 'text-red-600' : 'text-green-600'}`}>
          {product.stockQuantity}
        </span>
      ),
      "Actions": (
        <div className="flex gap-2">
          <Link to="/products" className="p-1 text-slate-400 hover:text-brand-600 transition-colors">
            <Eye size={16} />
          </Link>
          <Link to="/products" className="p-1 text-slate-400 hover:text-amber-600 transition-colors">
            <Edit size={16} />
          </Link>
          {product.id !== "1" && product.id !== "2" && (
            <button
              onClick={() => handleDelete(product.id)}
              className="p-1 text-slate-400 hover:text-red-600 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )
    }));

    setProducts(formattedData);
  }, []);

  const handleDelete = (id: string) => {
    const persistedProducts = JSON.parse(localStorage.getItem("trek_products") || "[]");
    const filtered = persistedProducts.filter((p: any) => p.id !== id);
    localStorage.setItem("trek_products", JSON.stringify(filtered));
    window.location.reload();
  };

  const columns = ["Product", "Purchase Price", "Selling Price", "Stock", "Actions"];

  return (
    <div className="p-6">
      <PageHeader
        title="Products"
        subtitle="Manage inventory items and stock levels"
        action={
          <Link to="/create-product">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              <Plus size={16} />
              Add Product
            </button>
          </Link>
        }
      />

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 mt-6">
        <DataTable columns={columns} data={products} />
      </div>
    </div>
  );
}

export default Products;