import React, { useEffect, useState } from "react";
// import axioss from "axioss";
import toast from "react-hot-toast";
import axioss from "../../axiosConfig";

const ContactPage = () => {
  // ================= CONTACT HERO SECTION STATE =================
  const [contactHero, setContactHero] = useState([]);
  const [contactHeroTemp, setContactHeroTemp] = useState([]);
  const [contactHeroLoading, setContactHeroLoading] = useState(true);

  const [contactHeroEdit, setContactHeroEdit] = useState(false);

  const [contactHeroHistory, setContactHeroHistory] = useState([]);
  const [contactHeroRedo, setContactHeroRedo] = useState([]);
  const [contactHeroCanUpdate, setContactHeroCanUpdate] = useState(false);

  // ================= FETCH HERO =================
  useEffect(() => {
    axioss
      .get("/api/contact/hero")
      .then((res) => {
        setContactHero(res.data);
        setContactHeroHistory([res.data]);
        setContactHeroLoading(false);
      })
      .catch(() => setContactHeroLoading(false));
  }, []);

  // ================= EDIT MODE =================
  const startContactHeroEdit = () => {
    setContactHeroTemp(JSON.parse(JSON.stringify(contactHero)));
    setContactHeroEdit(true);
  };

  const cancelContactHeroEdit = () => setContactHeroEdit(false);

  const updateContactHeroField = (index, field, value) => {
    const updated = [...contactHeroTemp];
    updated[index][field] = value;
    setContactHeroTemp(updated);
  };

  // ================= SAVE =================
  const handleContactHeroSave = async () => {
    try {
      const updatedList = [];

      for (const item of contactHeroTemp) {
        const res = await axioss.put(`/api/contact/hero/${item.id}`, item);
        updatedList.push(res.data);
      }

      setContactHero(updatedList);
      setContactHeroHistory((h) => [...h, updatedList]);
      setContactHeroRedo([]);
      setContactHeroEdit(false);
      setContactHeroCanUpdate(false);
      toast.success("Saved successfully.");
    } catch {
      toast.error("Failed to save Hero.");
    }
  };

  // ================= UNDO =================
  const handleContactHeroUndo = () => {
    if (contactHeroHistory.length <= 1) return;

    const previous = contactHeroHistory[contactHeroHistory.length - 2];
    const current = contactHeroHistory[contactHeroHistory.length - 1];

    setContactHero(previous);
    setContactHeroHistory((h) => h.slice(0, -1));
    setContactHeroRedo((r) => [current, ...r]);
    setContactHeroCanUpdate(true);
  };

  // ================= REDO =================
  const handleContactHeroRedo = () => {
    if (contactHeroRedo.length === 0) return;

    const next = contactHeroRedo[0];
    setContactHero(next);
    setContactHeroHistory((h) => [...h, next]);
    setContactHeroRedo((r) => r.slice(1));
    setContactHeroCanUpdate(true);
  };

  // ================= UPDATE =================
  const handleContactHeroUpdate = async () => {
    try {
      const updatedList = [];

      for (const item of contactHero) {
        const res = await axioss.put(`/api/contact/hero/${item.id}`, item);
        updatedList.push(res.data);
      }

      setContactHero(updatedList);
      setContactHeroHistory([updatedList]);
      setContactHeroRedo([]);
      setContactHeroCanUpdate(false);
      toast.success("Updated successfully.");
    } catch {
      toast.error("Failed to update Hero.");
    }
  };

  // ================= ABOUT SECTION STATE =================
  const [aboutSection, setAboutSection] = useState([]);
  const [aboutSectionTemp, setAboutSectionTemp] = useState([]);
  const [aboutSectionLoading, setAboutSectionLoading] = useState(true);

  const [aboutSectionEdit, setAboutSectionEdit] = useState(false);

  const [aboutSectionHistory, setAboutSectionHistory] = useState([]);
  const [aboutSectionRedo, setAboutSectionRedo] = useState([]);
  const [aboutSectionCanUpdate, setAboutSectionCanUpdate] = useState(false);

  // ================= FETCH ABOUT DATA =================
  useEffect(() => {
    axioss
      .get("/api/contact/about")
      .then((res) => {
        setAboutSection(res.data);
        setAboutSectionHistory([res.data]);
        setAboutSectionLoading(false);
      })
      .catch(() => setAboutSectionLoading(false));
  }, []);

  // ================= EDIT MODE =================
  const startAboutSectionEdit = () => {
    setAboutSectionTemp(JSON.parse(JSON.stringify(aboutSection)));
    setAboutSectionEdit(true);
  };

  const cancelAboutSectionEdit = () => setAboutSectionEdit(false);

  const updateAboutSectionField = (index, field, value) => {
    const updated = [...aboutSectionTemp];
    updated[index][field] = value;
    setAboutSectionTemp(updated);
  };

  // ================= SAVE =================
  const handleAboutSectionSave = async () => {
    try {
      const updatedList = [];

      for (const item of aboutSectionTemp) {
        const res = await axioss.put(`/api/contact/about/${item.id}`, item);
        updatedList.push(res.data);
      }

      setAboutSection(updatedList);
      setAboutSectionHistory((h) => [...h, updatedList]);
      setAboutSectionRedo([]);
      setAboutSectionEdit(false);
      setAboutSectionCanUpdate(false);
      toast.success("Saved successfully.");
    } catch {
      toast.error("Failed to save About section.");
    }
  };

  // ================= UNDO =================
  const handleAboutSectionUndo = () => {
    if (aboutSectionHistory.length <= 1) return;

    const previous = aboutSectionHistory[aboutSectionHistory.length - 2];
    const current = aboutSectionHistory[aboutSectionHistory.length - 1];

    setAboutSection(previous);
    setAboutSectionHistory((h) => h.slice(0, -1));
    setAboutSectionRedo((r) => [current, ...r]);
    setAboutSectionCanUpdate(true);
  };

  // ================= REDO =================
  const handleAboutSectionRedo = () => {
    if (aboutSectionRedo.length === 0) return;

    const next = aboutSectionRedo[0];
    setAboutSection(next);
    setAboutSectionHistory((h) => [...h, next]);
    setAboutSectionRedo((r) => r.slice(1));
    setAboutSectionCanUpdate(true);
  };

  // ================= UPDATE =================
  const handleAboutSectionUpdate = async () => {
    try {
      const updatedList = [];

      for (const item of aboutSection) {
        const res = await axioss.put(`/api/contact/about/${item.id}`, item);
        updatedList.push(res.data);
      }

      setAboutSection(updatedList);
      setAboutSectionHistory([updatedList]);
      setAboutSectionRedo([]);
      setAboutSectionCanUpdate(false);
      toast.success("Updated successfully.");
    } catch {
      toast.error("Failed to update About section.");
    }
  };

  // ================= CONTACT INFO CARD STATE =================
  const [contactCards, setContactCards] = useState([]);
  const [contactCardsTemp, setContactCardsTemp] = useState([]);
  const [contactCardsLoading, setContactCardsLoading] = useState(true);

  const [contactCardsEdit, setContactCardsEdit] = useState(false);

  const [contactCardsHistory, setContactCardsHistory] = useState([]);
  const [contactCardsRedo, setContactCardsRedo] = useState([]);
  const [contactCardsCanUpdate, setContactCardsCanUpdate] = useState(false);

  // ================= FETCH CONTACT INFO CARDS =================
  useEffect(() => {
    axioss
      .get("/api/contact/info")
      .then((res) => {
        setContactCards(res.data);
        setContactCardsHistory([res.data]);
        setContactCardsLoading(false);
      })
      .catch(() => setContactCardsLoading(false));
  }, []);

  // ================= EDIT =================
  const startContactCardsEdit = () => {
    setContactCardsTemp(JSON.parse(JSON.stringify(contactCards)));
    setContactCardsEdit(true);
  };

  const cancelContactCardsEdit = () => setContactCardsEdit(false);

  const updateContactCardField = (index, field, value) => {
    const updated = [...contactCardsTemp];
    updated[index][field] = value;
    setContactCardsTemp(updated);
  };

  // ================= SAVE =================
  const handleContactCardsSave = async () => {
    try {
      const updatedList = [];

      for (const card of contactCardsTemp) {
        const res = await axioss.put(`/api/contact/info/${card.id}`, card);
        updatedList.push(res.data);
      }

      setContactCards(updatedList);
      setContactCardsHistory((h) => [...h, updatedList]);
      setContactCardsRedo([]);
      setContactCardsEdit(false);
      setContactCardsCanUpdate(false);
      toast.success("Saved successfully.");
    } catch {
      toast.error("Failed to save.");
    }
  };

  // ================= UNDO =================
  const handleContactCardsUndo = () => {
    if (contactCardsHistory.length <= 1) return;

    const previous = contactCardsHistory[contactCardsHistory.length - 2];
    const current = contactCardsHistory[contactCardsHistory.length - 1];

    setContactCards(previous);
    setContactCardsHistory((h) => h.slice(0, -1));
    setContactCardsRedo((r) => [current, ...r]);
    setContactCardsCanUpdate(true);
  };

  // ================= REDO =================
  const handleContactCardsRedo = () => {
    if (contactCardsRedo.length === 0) return;

    const next = contactCardsRedo[0];
    setContactCards(next);
    setContactCardsHistory((h) => [...h, next]);
    setContactCardsRedo((r) => r.slice(1));
    setContactCardsCanUpdate(true);
  };

  // ================= UPDATE =================
  const handleContactCardsUpdate = async () => {
    try {
      const updatedList = [];

      for (const card of contactCards) {
        const res = await axioss.put(`/api/contact/info/${card.id}`, card);
        updatedList.push(res.data);
      }

      setContactCards(updatedList);
      setContactCardsHistory([updatedList]);
      setContactCardsRedo([]);
      setContactCardsCanUpdate(false);
      toast.success("Updated successfully.");
    } catch {
      toast.error("Failed to update.");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Contact Page</h1>
      {/* ================= CONTACT HERO SECTION ================= */}
      <h2 className="text-2xl font-bold mt-10 mb-6">
        Contact Page - Hero Section
      </h2>

      {contactHeroLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border w-16">ID</th>
              <th className="p-3 border w-64">Title</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border w-52">Updated At</th>
            </tr>
          </thead>

          <tbody>
            {(contactHeroEdit ? contactHeroTemp : contactHero).map(
              (item, index) => (
                <tr key={item.id} className="border">
                  <td className="p-3 border">{item.id}</td>

                  {/* Title */}
                  <td className="p-3 border">
                    {contactHeroEdit ? (
                      <input
                        value={item.title || ""}
                        onChange={(e) =>
                          updateContactHeroField(index, "title", e.target.value)
                        }
                        className="border p-2 w-full rounded"
                      />
                    ) : (
                      item.title
                    )}
                  </td>

                  {/* Description */}
                  <td className="p-3 border">
                    {contactHeroEdit ? (
                      <textarea
                        rows={3}
                        value={item.description || ""}
                        onChange={(e) =>
                          updateContactHeroField(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="border p-2 w-full rounded"
                      />
                    ) : (
                      <pre className="whitespace-pre-wrap">
                        {item.description}
                      </pre>
                    )}
                  </td>

                  {/* Updated At */}
                  <td className="p-3 border text-gray-600">
                    {new Date(item.updatedAt).toLocaleString()}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}

      {/* ================= BUTTONS ================= */}
      <div className="flex gap-4 mt-5">
        {!contactHeroEdit ? (
          <>
            <button
              onClick={startContactHeroEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleContactHeroUndo}
              disabled={contactHeroHistory.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleContactHeroRedo}
              disabled={contactHeroRedo.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleContactHeroUpdate}
              disabled={!contactHeroCanUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleContactHeroSave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelContactHeroEdit}
              className="px-5 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* ================= ABOUT SECTION TABLE ================= */}
      <h2 className="text-2xl font-bold mt-10 mb-6">About Section</h2>

      <div className="overflow-auto">
        {aboutSectionLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full border border-gray-300 bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border w-16">ID</th>
                <th className="p-3 border w-64">Title</th>
                <th className="p-3 border">Description 1</th>
                <th className="p-3 border">Description 2</th>
                <th className="p-3 border w-64">Image URL</th>
                <th className="p-3 border w-56">Button Text</th>
                <th className="p-3 border w-56">Button Link</th>
                {/* <th className="p-3 border w-52">Updated At</th> */}
              </tr>
            </thead>

            <tbody>
              {(aboutSectionEdit ? aboutSectionTemp : aboutSection).map(
                (item, index) => (
                  <tr key={item.id} className="border">
                    <td className="p-3 border">{item.id}</td>

                    {/* Title */}
                    <td className="p-3 border">
                      {aboutSectionEdit ? (
                        <input
                          value={item.title || ""}
                          onChange={(e) =>
                            updateAboutSectionField(
                              index,
                              "title",
                              e.target.value
                            )
                          }
                          className="border p-2 w-full rounded"
                        />
                      ) : (
                        item.title
                      )}
                    </td>

                    {/* Description 1 */}
                    <td className="p-3 border">
                      {aboutSectionEdit ? (
                        <textarea
                          rows={2}
                          value={item.description1 || ""}
                          onChange={(e) =>
                            updateAboutSectionField(
                              index,
                              "description1",
                              e.target.value
                            )
                          }
                          className="border p-2 w-auto rounded"
                        />
                      ) : (
                        <pre className="whitespace-pre-wrap">
                          {item.description1}
                        </pre>
                      )}
                    </td>

                    {/* Description 2 */}
                    <td className="p-3 border">
                      {aboutSectionEdit ? (
                        <textarea
                          rows={2}
                          value={item.description2 || ""}
                          onChange={(e) =>
                            updateAboutSectionField(
                              index,
                              "description2",
                              e.target.value
                            )
                          }
                          className="border p-2 w-auto rounded"
                        />
                      ) : (
                        <pre className="whitespace-pre-wrap">
                          {item.description2}
                        </pre>
                      )}
                    </td>

                    {/* Image URL */}
                    <td className="p-3 border">
                      {aboutSectionEdit ? (
                        <input
                          value={item.imageUrl || ""}
                          onChange={(e) =>
                            updateAboutSectionField(
                              index,
                              "imageUrl",
                              e.target.value
                            )
                          }
                          className="border p-2 w-full rounded"
                        />
                      ) : (
                        <img
                          src={item.imageUrl}
                          alt="About"
                          className="w-16 h-16 object-contain mx-auto"
                        />
                      )}
                    </td>

                    {/* Button Text */}
                    <td className="p-3 border">
                      {aboutSectionEdit ? (
                        <input
                          value={item.buttonText || ""}
                          onChange={(e) =>
                            updateAboutSectionField(
                              index,
                              "buttonText",
                              e.target.value
                            )
                          }
                          className="border p-2 w-full rounded"
                        />
                      ) : (
                        item.buttonText
                      )}
                    </td>

                    {/* Button Link */}
                    <td className="p-3 border">
                      {aboutSectionEdit ? (
                        <input
                          value={item.buttonLink || ""}
                          onChange={(e) =>
                            updateAboutSectionField(
                              index,
                              "buttonLink",
                              e.target.value
                            )
                          }
                          className="border p-2 w-full rounded"
                        />
                      ) : (
                        item.buttonLink
                      )}
                    </td>

                    {/* Updated At */}
                    {/* <td className="p-3 border text-gray-600">
                    {new Date(item.updatedAt).toLocaleString()}
                  </td> */}
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= BUTTONS ================= */}
      <div className="flex gap-4 mt-5">
        {!aboutSectionEdit ? (
          <>
            <button
              onClick={startAboutSectionEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleAboutSectionUndo}
              disabled={aboutSectionHistory.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleAboutSectionRedo}
              disabled={aboutSectionRedo.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleAboutSectionUpdate}
              disabled={!aboutSectionCanUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleAboutSectionSave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelAboutSectionEdit}
              className="px-5 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* ================= CONTACT INFO CARDS TABLE ================= */}
      <h2 className="text-2xl font-bold mt-10 mb-6">Contact Info Cards</h2>

      <div className="overflow-auto">
        {contactCardsLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full border border-gray-300 bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border w-16">ID</th>
                <th className="p-3 border w-52">Title</th>
                <th className="p-3 border w-52">Main Title</th>
                <th className="p-3 border">Info</th>
                <th className="p-3 border w-40">Icon</th>
                <th className="p-3 border w-40">Glow</th>
                {/* <th className="p-3 border w-52">Updated At</th> */}
              </tr>
            </thead>

            <tbody>
              {(contactCardsEdit ? contactCardsTemp : contactCards).map(
                (card, index) => (
                  <tr key={card.id} className="border">
                    <td className="p-3 border">{card.id}</td>

                    {/* Title */}
                    <td className="p-3 border">
                      {contactCardsEdit ? (
                        <input
                          value={card.title || ""}
                          onChange={(e) =>
                            updateContactCardField(
                              index,
                              "title",
                              e.target.value
                            )
                          }
                          className="border p-2 w-full rounded"
                        />
                      ) : (
                        card.title
                      )}
                    </td>

                    {/* Main Title */}
                    <td className="p-3 border">
                      {contactCardsEdit ? (
                        <input
                          value={card.mainTitle || ""}
                          onChange={(e) =>
                            updateContactCardField(
                              index,
                              "mainTitle",
                              e.target.value
                            )
                          }
                          className="border p-2 w-full rounded"
                        />
                      ) : (
                        card.mainTitle
                      )}
                    </td>

                    {/* Info */}
                    <td className="p-3 border">
                      {contactCardsEdit ? (
                        <textarea
                          rows={2}
                          value={card.info || ""}
                          onChange={(e) =>
                            updateContactCardField(
                              index,
                              "info",
                              e.target.value
                            )
                          }
                          className="border p-2 w-full rounded"
                        />
                      ) : (
                        <pre className="whitespace-pre-wrap">{card.info}</pre>
                      )}
                    </td>

                    {/* Icon */}
                    <td className="p-3 border">
                      {contactCardsEdit ? (
                        <input
                          value={card.icon || ""}
                          onChange={(e) =>
                            updateContactCardField(
                              index,
                              "icon",
                              e.target.value
                            )
                          }
                          className="border p-2 w-full rounded"
                        />
                      ) : (
                        card.icon
                      )}
                    </td>

                    {/* Glow */}
                    <td className="p-3 border">
                      {contactCardsEdit ? (
                        <input
                          value={card.glow || ""}
                          onChange={(e) =>
                            updateContactCardField(
                              index,
                              "glow",
                              e.target.value
                            )
                          }
                          className="border p-2 w-full rounded"
                        />
                      ) : (
                        card.glow
                      )}
                    </td>

                    {/* Updated At */}
                    {/* <td className="p-3 border text-gray-600">
                    {new Date(card.updatedAt).toLocaleString()}
                  </td> */}
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= BUTTONS ================= */}
      <div className="flex gap-4 mt-5">
        {!contactCardsEdit ? (
          <>
            <button
              onClick={startContactCardsEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleContactCardsUndo}
              disabled={contactCardsHistory.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleContactCardsRedo}
              disabled={contactCardsRedo.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleContactCardsUpdate}
              disabled={!contactCardsCanUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleContactCardsSave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelContactCardsEdit}
              className="px-5 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
