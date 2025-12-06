import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const IndustriesPage = () => {
  /* ================= HERO SECTION STATE ================= */
  const [hero, setHero] = useState(null);
  const [heroLoading, setHeroLoading] = useState(true);

  const [heroEdit, setHeroEdit] = useState(false);
  const [heroTemp, setHeroTemp] = useState({});

  const [heroHistory, setHeroHistory] = useState([]);
  const [heroRedo, setHeroRedo] = useState([]);
  const [heroCanUpdate, setHeroCanUpdate] = useState(false);

  /* ================= FETCH ================= */
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/industries/hero")
      .then((res) => {
        setHero(res.data);
        setHeroHistory([res.data]);
        setHeroLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load Hero section");
        setHeroLoading(false);
      });
  }, []);

  /* ================= EDIT MODE ================= */
  const startHeroEdit = () => {
    setHeroTemp(JSON.parse(JSON.stringify(hero)));
    setHeroEdit(true);
  };

  const cancelHeroEdit = () => {
    setHeroEdit(false);
  };

  /* ================= FIELD UPDATE ================= */
  const updateHeroField = (name, value) => {
    setHeroTemp((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= SAVE ================= */
  const handleHeroSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/industries/hero/${heroTemp.id}`,
        heroTemp
      );

      setHero(res.data);
      setHeroEdit(false);
      toast.success("Saved successfully");

      setHeroHistory((prev) => [...prev, res.data]);
      setHeroRedo([]);
      setHeroCanUpdate(false);
    } catch {
      toast.error("Save failed");
    }
  };

  /* ================= UNDO ================= */
  const handleHeroUndo = () => {
    if (heroHistory.length <= 1) return;

    const prev = heroHistory[heroHistory.length - 2];
    const curr = heroHistory[heroHistory.length - 1];

    setHero(prev);
    setHeroHistory((h) => h.slice(0, -1));
    setHeroRedo((r) => [curr, ...r]);
    setHeroCanUpdate(true);
  };

  /* ================= REDO ================= */
  const handleHeroRedo = () => {
    if (heroRedo.length === 0) return;

    const next = heroRedo[0];

    setHero(next);
    setHeroHistory((h) => [...h, next]);
    setHeroRedo((r) => r.slice(1));
    setHeroCanUpdate(true);
  };

  /* ================= UPDATE (PUT again) ================= */
  const handleHeroUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/industries/hero/${hero.id}`,
        hero
      );

      setHero(res.data);
      setHeroHistory([res.data]);
      setHeroRedo([]);
      setHeroCanUpdate(false);
      toast.success("Updated successfully");
    } catch {
      toast.error("Update failed");
    }
  };

  /* ================= INDUSTRY SECTION STATE ================= */
  const [industry, setIndustry] = useState([]);
  const [indLoading, setIndLoading] = useState(true);

  const [indEdit, setIndEdit] = useState(false);
  const [indTemp, setIndTemp] = useState([]);

  const [indHistory, setIndHistory] = useState([]);
  const [indRedo, setIndRedo] = useState([]);
  const [indCanUpdate, setIndCanUpdate] = useState(false);

  /* ================= FETCH ================= */
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/industries/industry")
      .then((res) => {
        setIndustry(res.data);
        setIndHistory([res.data]);
        setIndLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load Industry section");
        setIndLoading(false);
      });
  }, []);

  /* ================= EDIT MODE ================= */
  const startIndEdit = () => {
    setIndTemp(JSON.parse(JSON.stringify(industry)));
    setIndEdit(true);
  };

  const cancelIndEdit = () => {
    setIndEdit(false);
  };

  /* ================= FIELD UPDATE ================= */
  const updateIndField = (index, name, value) => {
    const updated = [...indTemp];
    updated[index][name] = value;
    setIndTemp(updated);
  };

  /* ================= SAVE ================= */
  const handleIndSave = async () => {
    try {
      const updatedList = [];

      for (const item of indTemp) {
        const res = await axios.put(
          `http://localhost:8080/api/industries/industry/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }

      setIndustry(updatedList);
      setIndEdit(false);
      toast.success("Saved successfully");

      setIndHistory((prev) => [...prev, updatedList]);
      setIndRedo([]);
      setIndCanUpdate(false);
    } catch {
      toast.error("Save failed");
    }
  };

  /* ================= UNDO ================= */
  const handleIndUndo = () => {
    if (indHistory.length <= 1) return;

    const prev = indHistory[indHistory.length - 2];
    const curr = indHistory[indHistory.length - 1];

    setIndustry(prev);
    setIndHistory((h) => h.slice(0, -1));
    setIndRedo((r) => [curr, ...r]);
    setIndCanUpdate(true);
  };

  /* ================= REDO ================= */
  const handleIndRedo = () => {
    if (indRedo.length === 0) return;

    const next = indRedo[0];

    setIndustry(next);
    setIndHistory((h) => [...h, next]);
    setIndRedo((r) => r.slice(1));
    setIndCanUpdate(true);
  };

  /* ================= UPDATE (PUT again) ================= */
  const handleIndUpdate = async () => {
    try {
      const updatedList = [];

      for (const item of industry) {
        const res = await axios.put(
          `http://localhost:8080/api/industries/industry/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }

      setIndustry(updatedList);
      setIndHistory([updatedList]);
      setIndRedo([]);
      setIndCanUpdate(false);
      toast.success("Updated successfully");
    } catch {
      toast.error("Update failed");
    }
  };

  /* ================= VISUAL CARD SECTION STATE ================= */
  const [visualCards, setVisualCards] = useState([]);
  const [vcLoading, setVcLoading] = useState(true);

  const [vcEdit, setVcEdit] = useState(false);
  const [vcTemp, setVcTemp] = useState([]);

  const [vcHistory, setVcHistory] = useState([]);
  const [vcRedo, setVcRedo] = useState([]);
  const [vcCanUpdate, setVcCanUpdate] = useState(false);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/industries/card")
      .then((res) => {
        setVisualCards(res.data);
        setVcHistory([res.data]);
        setVcLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load Visual Card data");
        setVcLoading(false);
      });
  }, []);

  /* ================= EDIT HANDLING ================= */
  const startVcEdit = () => {
    setVcTemp(JSON.parse(JSON.stringify(visualCards)));
    setVcEdit(true);
  };

  const cancelVcEdit = () => {
    setVcEdit(false);
  };

  const updateVcField = (index, name, value) => {
    const updated = [...vcTemp];
    updated[index][name] = value;
    setVcTemp(updated);
  };

  /* ================= SAVE (PUT EACH CARD) ================= */
  const handleVcSave = async () => {
    try {
      const updatedList = [];

      for (const card of vcTemp) {
        const res = await axios.put(
          `http://localhost:8080/api/industries/card/${card.id}`,
          card
        );
        updatedList.push(res.data);
      }

      setVisualCards(updatedList);
      setVcEdit(false);
      toast.success("Saved successfully");

      setVcHistory((prev) => [...prev, updatedList]);
      setVcRedo([]);
      setVcCanUpdate(false);
    } catch {
      toast.error("Save failed");
    }
  };

  /* ================= UNDO / REDO ================= */
  const handleVcUndo = () => {
    if (vcHistory.length <= 1) return;

    const prev = vcHistory[vcHistory.length - 2];
    const curr = vcHistory[vcHistory.length - 1];

    setVisualCards(prev);
    setVcHistory((h) => h.slice(0, -1));
    setVcRedo((r) => [curr, ...r]);
    setVcCanUpdate(true);
  };

  const handleVcRedo = () => {
    if (vcRedo.length === 0) return;

    const next = vcRedo[0];

    setVisualCards(next);
    setVcHistory((h) => [...h, next]);
    setVcRedo((r) => r.slice(1));
    setVcCanUpdate(true);
  };

  /* ================= UPDATE ================= */
  const handleVcUpdate = async () => {
    try {
      const updatedList = [];

      for (const card of visualCards) {
        const res = await axios.put(
          `http://localhost:8080/api/industries/card/${card.id}`,
          card
        );
        updatedList.push(res.data);
      }

      setVisualCards(updatedList);
      setVcHistory([updatedList]);
      setVcRedo([]);
      setVcCanUpdate(false);

      toast.success("Updated successfully");
    } catch {
      toast.error("Update failed");
    }
  };

  /* ================= CTA SECTION STATE ================= */
  const [ctaData, setCtaData] = useState([]);
  const [ctaLoading, setCtaLoading] = useState(true);

  const [ctaEdit, setCtaEdit] = useState(false);
  const [ctaTemp, setCtaTemp] = useState([]);

  const [ctaHistory, setCtaHistory] = useState([]);
  const [ctaRedo, setCtaRedo] = useState([]);
  const [ctaCanUpdate, setCtaCanUpdate] = useState(false);

  /* ================= FETCH CTA DATA ================= */
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/industries/cta")
      .then((res) => {
        setCtaData(res.data);
        setCtaHistory([res.data]);
        setCtaLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load CTA data");
        setCtaLoading(false);
      });
  }, []);

  /* ================= EDIT HANDLING ================= */
  const startCtaEdit = () => {
    setCtaTemp(JSON.parse(JSON.stringify(ctaData)));
    setCtaEdit(true);
  };

  const cancelCtaEdit = () => setCtaEdit(false);

  const updateCtaField = (index, name, value) => {
    const updated = [...ctaTemp];
    updated[index][name] = value;
    setCtaTemp(updated);
  };

  /* ================= SAVE ================= */
  const handleCtaSave = async () => {
    try {
      const updatedList = [];
      for (const item of ctaTemp) {
        const res = await axios.put(
          `http://localhost:8080/api/industries/cta/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }
      setCtaData(updatedList);
      setCtaEdit(false);
      setCtaHistory((prev) => [...prev, updatedList]);
      setCtaRedo([]);
      setCtaCanUpdate(false);
      toast.success("Saved successfully");
    } catch {
      toast.error("Save failed");
    }
  };

  /* ================= UNDO / REDO ================= */
  const handleCtaUndo = () => {
    if (ctaHistory.length <= 1) return;
    const prev = ctaHistory[ctaHistory.length - 2];
    const curr = ctaHistory[ctaHistory.length - 1];
    setCtaData(prev);
    setCtaHistory((h) => h.slice(0, -1));
    setCtaRedo((r) => [curr, ...r]);
    setCtaCanUpdate(true);
  };

  const handleCtaRedo = () => {
    if (ctaRedo.length === 0) return;
    const next = ctaRedo[0];
    setCtaData(next);
    setCtaHistory((h) => [...h, next]);
    setCtaRedo((r) => r.slice(1));
    setCtaCanUpdate(true);
  };

  /* ================= UPDATE ALL ================= */
  const handleCtaUpdate = async () => {
    try {
      const updatedList = [];
      for (const item of ctaData) {
        const res = await axios.put(
          `http://localhost:8080/api/industries/cta/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }
      setCtaData(updatedList);
      setCtaHistory([updatedList]);
      setCtaRedo([]);
      setCtaCanUpdate(false);
      toast.success("Updated successfully");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-10 ">
      <h1 className="text-3xl font-bold mb-6">Industries Page</h1>

      {/* ================= HERO SECTION ================= */}
      <h1 className="text-2xl font-bold mt-10 mb-6">Hero Section</h1>

      {heroLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border w-16">ID</th>
              <th className="p-3 border w-60">Title</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border w-52">Updated At</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border">
              <td className="p-3 border">{hero.id}</td>

              <td className="p-3 border">
                {heroEdit ? (
                  <input
                    value={heroTemp.title || ""}
                    onChange={(e) => updateHeroField("title", e.target.value)}
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  hero.title
                )}
              </td>

              <td className="p-3 border">
                {heroEdit ? (
                  <textarea
                    rows={3}
                    value={heroTemp.description || ""}
                    onChange={(e) =>
                      updateHeroField("description", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  hero.description
                )}
              </td>

              <td className="p-3 border text-gray-600">
                {new Date(hero.updatedAt).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      )}

      <div className="flex gap-4 mt-5">
        {!heroEdit ? (
          <>
            <button
              onClick={startHeroEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleHeroUndo}
              disabled={heroHistory.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleHeroRedo}
              disabled={heroRedo.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleHeroUpdate}
              disabled={!heroCanUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleHeroSave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelHeroEdit}
              className="px-5 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* ================= INDUSTRY SECTION (VERTICAL TABLES) ================= */}
      <h1 className="text-2xl font-bold mt-10 mb-6">Industry Section</h1>

      {(indEdit ? indTemp : industry).map((item, index) => (
        <table
          key={item.id}
          className="min-w-full border border-gray-300 bg-white mb-8"
        >
          <tbody>
            {/* ID */}
            {/* <tr>
              <th className="p-3 border w-48 text-left bg-gray-100">ID</th>
              <td className="p-3 border">{item.id}</td>
            </tr> */}

            {/* Title */}
            <tr>
              <th className="p-3 border bg-gray-100 text-left">Title</th>
              <td className="p-3 border">
                {indEdit ? (
                  <input
                    value={item.title || ""}
                    onChange={(e) =>
                      updateIndField(index, "title", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  item.title
                )}
              </td>
            </tr>

            {/* Sub Title */}
            <tr>
              <th className="p-3 border bg-gray-100 text-left">Sub Title</th>
              <td className="p-3 border">
                {indEdit ? (
                  <input
                    value={item.subTitle || ""}
                    onChange={(e) =>
                      updateIndField(index, "subTitle", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  item.subTitle
                )}
              </td>
            </tr>

            {/* Description */}
            <tr>
              <th className="p-3 border bg-gray-100 text-left">Description</th>
              <td className="p-3 border">
                {indEdit ? (
                  <textarea
                    rows={3}
                    value={item.description || ""}
                    onChange={(e) =>
                      updateIndField(index, "description", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  item.description
                )}
              </td>
            </tr>

            {/* Key Title */}
            <tr>
              <th className="p-3 border bg-gray-100 text-left">Key Title</th>
              <td className="p-3 border">
                {indEdit ? (
                  <input
                    value={item.keyTitle || ""}
                    onChange={(e) =>
                      updateIndField(index, "keyTitle", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  item.keyTitle
                )}
              </td>
            </tr>

            {/* Key Text 1–5 */}
            {["keyText1", "keyText2", "keyText3", "keyText4", "keyText5"].map(
              (key) => (
                <tr key={key}>
                  <th className="p-3 border bg-gray-100 text-left">
                    {key.replace("keyText", "Key Text ")}
                  </th>
                  <td className="p-3 border">
                    {indEdit ? (
                      <input
                        value={item[key] || ""}
                        onChange={(e) =>
                          updateIndField(index, key, e.target.value)
                        }
                        className="border p-2 w-full rounded"
                      />
                    ) : (
                      item[key]
                    )}
                  </td>
                </tr>
              )
            )}

            {/* Note */}
            <tr>
              <th className="p-3 border bg-gray-100 text-left">Note</th>
              <td className="p-3 border">
                {indEdit ? (
                  <textarea
                    rows={2}
                    value={item.note || ""}
                    onChange={(e) =>
                      updateIndField(index, "note", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  item.note
                )}
              </td>
            </tr>

            {/* Buttons Row */}
            <tr>
              <td colSpan={2} className="p-3 border">
                <div className="flex gap-3">
                  {!indEdit ? (
                    <>
                      <button
                        onClick={startIndEdit}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={handleIndUndo}
                        disabled={indHistory.length <= 1}
                        className="px-4 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
                      >
                        Undo
                      </button>

                      <button
                        onClick={handleIndRedo}
                        disabled={indRedo.length === 0}
                        className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
                      >
                        Redo
                      </button>

                      <button
                        onClick={handleIndUpdate}
                        disabled={!indCanUpdate}
                        className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
                      >
                        Update
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleIndSave}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                      >
                        Save
                      </button>

                      <button
                        onClick={cancelIndEdit}
                        className="px-4 py-2 bg-gray-500 text-white rounded"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      ))}

      {/* ================= VISUAL CARDS SECTION ================= */}
      <h1 className="text-2xl font-bold mt-10 mb-6">Visual Card Section</h1>

      {vcLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border w-16">ID</th>
              <th className="p-3 border w-60">Title</th>
              <th className="p-3 border w-96">Description</th>
              <th className="p-3 border w-60">Button Text</th>
              <th className="p-3 border w-60">Button Link</th>
            </tr>
          </thead>

          <tbody>
            {(vcEdit ? vcTemp : visualCards).map((item, index) => (
              <tr key={item.id} className="border">
                <td className="p-3 border">{item.id}</td>

                {/* Title */}
                <td className="p-3 border">
                  {vcEdit ? (
                    <input
                      value={item.title || ""}
                      onChange={(e) =>
                        updateVcField(index, "title", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    item.title
                  )}
                </td>

                {/* Description */}
                <td className="p-3 border">
                  {vcEdit ? (
                    <textarea
                      rows={2}
                      value={item.description || ""}
                      onChange={(e) =>
                        updateVcField(index, "description", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    item.description
                  )}
                </td>

                {/* Button Text */}
                <td className="p-3 border">
                  {vcEdit ? (
                    <input
                      value={item.buttonText || ""}
                      onChange={(e) =>
                        updateVcField(index, "buttonText", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    item.buttonText
                  )}
                </td>

                {/* Button Link */}
                <td className="p-3 border">
                  {vcEdit ? (
                    <input
                      value={item.buttonLink || ""}
                      onChange={(e) =>
                        updateVcField(index, "buttonLink", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    item.buttonLink
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex gap-4 mt-5">
        {!vcEdit ? (
          <>
            <button
              onClick={startVcEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleVcUndo}
              disabled={vcHistory.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleVcRedo}
              disabled={vcRedo.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleVcUpdate}
              disabled={!vcCanUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleVcSave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelVcEdit}
              className="px-5 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>
      {/* ================= CTA SECTION ================= */}
      <h1 className="text-2xl font-bold mt-10 mb-6">CTA Section</h1>

      {ctaLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border w-16">ID</th>
              <th className="p-3 border w-72">Title</th>
              <th className="p-3 border w-96">Description</th>
              <th className="p-3 border w-60">Button Text</th>
              <th className="p-3 border w-60">Button Link</th>
            </tr>
          </thead>

          <tbody>
            {(ctaEdit ? ctaTemp : ctaData).map((item, index) => (
              <tr key={item.id} className="border">
                <td className="p-3 border">{item.id}</td>

                {/* Title */}
                <td className="p-3 border">
                  {ctaEdit ? (
                    <input
                      value={item.title || ""}
                      onChange={(e) =>
                        updateCtaField(index, "title", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    item.title
                  )}
                </td>

                {/* Description */}
                <td className="p-3 border">
                  {ctaEdit ? (
                    <textarea
                      rows={2}
                      value={item.description || ""}
                      onChange={(e) =>
                        updateCtaField(index, "description", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    item.description
                  )}
                </td>

                {/* Button Text */}
                <td className="p-3 border">
                  {ctaEdit ? (
                    <input
                      value={item.buttonText || ""}
                      onChange={(e) =>
                        updateCtaField(index, "buttonText", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    item.buttonText
                  )}
                </td>

                {/* Button Link */}
                <td className="p-3 border">
                  {ctaEdit ? (
                    <input
                      value={item.buttonLink || ""}
                      onChange={(e) =>
                        updateCtaField(index, "buttonLink", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    item.buttonLink
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ================= Buttons Outside ================= */}
      <div className="flex gap-4 mt-5">
        {!ctaEdit ? (
          <>
            <button
              onClick={startCtaEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleCtaUndo}
              disabled={ctaHistory.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleCtaRedo}
              disabled={ctaRedo.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleCtaUpdate}
              disabled={!ctaCanUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleCtaSave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelCtaEdit}
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

export default IndustriesPage;
