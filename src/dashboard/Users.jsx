import React, { useEffect, useState } from "react";
// import axios from "axios";
import axioss from "../axiosConfig";

function Users() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("msgid");
  const [sortOrder, setSortOrder] = useState("asc");

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [toast, setToast] = useState("");

  const API = "https://customtectlab-backend.up.railway.app/api/contacts";

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const loadUsers = () => {
    axioss
      .get(API)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error loading users:", err));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = (id) => {
    axioss
      .delete(`${API}/${id}`)
      .then(() => {
        loadUsers();
        showToast("User deleted");
      })
      .catch(() => showToast("Delete failed"));
  };

  const startEdit = (user) => {
    setEditing(user.msgid);
    setForm({
      fullname: user.fullname,
      email: user.email,
      message: user.message,
    });
  };

  const saveUpdate = () => {
    axioss
      .put(`${API}/${editing}`, form)
      .then(() => {
        setEditing(null);
        loadUsers();
        showToast("User updated");
      })
      .catch(() => showToast("Update failed"));
  };

  const filtered = users
    .filter(
      (u) =>
        u.fullname.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];

      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Message  List</h1>

      <input
        type="text"
        placeholder="Search by name or email..."
        className="border p-2 my-3 w-80"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="min-w-full border border-gray-300 divide-y divide-gray-300 mt-3">
        <thead className="bg-gray-100">
          <tr>
            {[
              { field: "msgid", label: "ID" },
              { field: "fullname", label: "Full Name" },
              { field: "email", label: "Email" },
              { field: "message", label: "Message" },
            ].map((col) => (
              <th
                key={col.field}
                onClick={() => toggleSort(col.field)}
                className="px-3 py-2 text-left font-semibold cursor-pointer"
              >
                {col.label}{" "}
                {sortField === col.field && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
            ))}

            <th className="px-3 py-2 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginated.map((user) => (
            <tr key={user.msgid} className="hover:bg-gray-50">
              <td className="px-3 py-2 border">{user.msgid}</td>
              <td className="px-3 py-2 border">{user.fullname}</td>
              <td className="px-3 py-2 border">{user.email}</td>
              <td className="px-3 py-2 border">{user.message}</td>

              <td className="px-3 py-2 border space-x-3">
                <button
                  onClick={() => startEdit(user)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteUser(user.msgid)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-4 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {editing && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl mb-4">Edit User</h3>

            <input
              type="text"
              className="border p-2 w-full mb-2"
              value={form.fullname}
              onChange={(e) => setForm({ ...form, fullname: e.target.value })}
            />

            <input
              type="email"
              className="border p-2 w-full mb-2"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <textarea
              className="border p-2 w-full mb-2"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={saveUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            background: "#333",
            color: "white",
            padding: "12px 18px",
            borderRadius: "6px",
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}

export default Users;
