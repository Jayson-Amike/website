import React, { useEffect, useState, useMemo } from "react";
import supabase from "../../../supabaseClient";

const InventoryTable = () => {
  const [careers, setCareers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  // 🔍 Filters
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: careerData } = await supabase
          .from("careers")
          .select(`
            id,
            name,
            price,
            inventory,
            careerfieldcategories (
              id,
              name
            )
          `)
          .order("id", { ascending: false });

        const { data: categoryData } = await supabase
          .from("careerfieldcategories")
          .select("id, name")
          .order("name");

        setCareers(careerData || []);
        setCategories(categoryData || []);
      } catch (error) {
        console.error("Error loading inventory:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // ✅ FILTERED DATA
  const filteredCareers = useMemo(() => {
    return careers.filter((career) => {
      const matchesSearch = career.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" ||
        career.careerfieldcategories?.id === categoryFilter;

      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "in" && career.inventory > 0) ||
        (stockFilter === "out" && career.inventory <= 0);

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [careers, search, categoryFilter, stockFilter]);

  const startEdit = (career) => {
    setEditingId(career.id);
    setEditValues({
      name: career.name,
      price: career.price,
      inventory: career.inventory,
      careerfieldcategories: career.careerfieldcategories?.id || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  const saveEdit = async (id) => {
    try {
      const { error } = await supabase
        .from("careers")
        .update({
          name: editValues.name,
          price: Number(editValues.price),
          inventory: Number(editValues.inventory),
          careerfieldcategories: editValues.careerfieldcategories,
        })
        .eq("id", id);

      if (error) throw error;

      setCareers((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                ...editValues,
                careerfieldcategories: categories.find(
                  (cat) => cat.id === editValues.careerfieldcategories
                ),
              }
            : c
        )
      );

      cancelEdit();
    } catch (error) {
      console.error("Error saving career:", error);
    }
  };

  if (loading) return <p>Loading inventory...</p>;

  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      <h2>Careers Inventory</h2>

      <div style={cardStyle}>
        {/* 🔍 FILTER BAR */}
        <div style={filterBarStyle}>
          <input
            placeholder="Search careers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={inputStyle}
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={inputStyle}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            style={inputStyle}
          >
            <option value="all">All Stock</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>

        <table style={tableStyle}>
          <thead>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Inventory</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCareers.map((career) => {
              const isEditing = editingId === career.id;

              return (
                <tr key={career.id}>
                  <td>{career.id}</td>

                  <td>
                    {isEditing ? (
                      <input
                        value={editValues.name}
                        onChange={(e) =>
                          setEditValues({ ...editValues, name: e.target.value })
                        }
                      />
                    ) : (
                      career.name
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <select
                        value={editValues.careerfieldcategories}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            careerfieldcategories: e.target.value,
                          })
                        }
                      >
                        <option value="">Select</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      career.careerfieldcategories?.name || "—"
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editValues.price}
                        onChange={(e) =>
                          setEditValues({ ...editValues, price: e.target.value })
                        }
                      />
                    ) : (
                      `$${Number(career.price).toFixed(2)}`
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editValues.inventory}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            inventory: e.target.value,
                          })
                        }
                      />
                    ) : (
                      career.inventory
                    )}
                  </td>

                  <td>
                    <span
                      style={{
                        color: career.inventory > 0 ? "#4caf50" : "#f44336",
                      }}
                    >
                      {career.inventory > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>

                  <td>
                    {isEditing ? (
                      <>
                        <button style={saveButtonStyle} onClick={() => saveEdit(career.id)}>
                          Save
                        </button>
                        <button style={cancelButtonStyle} onClick={cancelEdit}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button style={editButtonStyle} onClick={() => startEdit(career)}>
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* 🎨 Styles */

const cardStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const filterBarStyle = {
  display: "flex",
  gap: "12px",
  marginBottom: "16px",
};

const inputStyle = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const baseButtonStyle = {
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  fontSize: "13px",
  fontWeight: 500,
  cursor: "pointer",
  marginRight: "6px",
};

const editButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: "#2196f3",
  color: "#fff",
};

const saveButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: "#4caf50",
  color: "#fff",
};

const cancelButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: "#e0e0e0",
  color: "#333",
};

export default InventoryTable;
