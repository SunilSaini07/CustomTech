import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SolutionsPage = () => {
  // ================= STATE =================
  const [hero, setHero] = useState(null);
  const [heroTemp, setHeroTemp] = useState({});
  const [heroLoading, setHeroLoading] = useState(true);

  const [heroEdit, setHeroEdit] = useState(false);

  const [heroHistory, setHeroHistory] = useState([]);
  const [heroRedo, setHeroRedo] = useState([]);
  const [heroCanUpdate, setHeroCanUpdate] = useState(false);

  // ================= FETCH HERO =================
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/solutions/hero")
      .then((res) => {
        setHero(res.data); // API returns an object
        setHeroHistory([res.data]); // Track history
        setHeroLoading(false);
      })
      .catch(() => setHeroLoading(false));
  }, []);

  // ================= EDIT MODE =================
  const startHeroEdit = () => {
    setHeroTemp({ ...hero });
    setHeroEdit(true);
  };

  const cancelHeroEdit = () => setHeroEdit(false);

  const updateHeroField = (field, value) => {
    setHeroTemp((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ================= SAVE (PUT TEMP DATA) =================
  const handleHeroSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/solutions/hero/${hero.id}`,
        heroTemp
      );

      setHero(res.data);
      setHeroHistory((h) => [...h, res.data]);
      setHeroRedo([]);
      setHeroEdit(false);
      setHeroCanUpdate(false);
      toast.success("Saved successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save hero changes.");
    }
  };

  // ================= UNDO =================
  const handleHeroUndo = () => {
    if (heroHistory.length <= 1) return;

    const previous = heroHistory[heroHistory.length - 2];
    const current = heroHistory[heroHistory.length - 1];

    setHero(previous);
    setHeroHistory((h) => h.slice(0, -1));
    setHeroRedo((r) => [current, ...r]);
    setHeroCanUpdate(true);
  };

  // ================= REDO =================
  const handleHeroRedo = () => {
    if (heroRedo.length === 0) return;

    const next = heroRedo[0];
    setHero(next);
    setHeroHistory((h) => [...h, next]);
    setHeroRedo((r) => r.slice(1));
    setHeroCanUpdate(true);
  };

  // ================= UPDATE (PUT CURRENT HERO) =================
  const handleHeroUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/solutions/hero/${hero.id}`,
        hero
      );

      setHero(res.data);
      setHeroHistory([res.data]);
      setHeroRedo([]);
      setHeroCanUpdate(false);
      toast.success("Updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update hero.");
    }
  };

  // ================= SOLUTIONS CARDS SECTION STATE =================
  const [cards, setCards] = useState([]);
  const [cardsTemp, setCardsTemp] = useState([]);
  const [cardsLoading, setCardsLoading] = useState(true);

  const [cardsEdit, setCardsEdit] = useState(false);

  const [cardsHistory, setCardsHistory] = useState([]);
  const [cardsRedo, setCardsRedo] = useState([]);
  const [cardsCanUpdate, setCardsCanUpdate] = useState(false);

  // ================= FETCH CARDS =================
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/solutions/cards")
      .then((res) => {
        setCards(res.data);
        setCardsHistory([res.data]);
        setCardsLoading(false);
      })
      .catch(() => setCardsLoading(false));
  }, []);

  // ================= EDIT =================
  const startCardsEdit = () => {
    setCardsTemp(JSON.parse(JSON.stringify(cards)));
    setCardsEdit(true);
  };

  const cancelCardsEdit = () => setCardsEdit(false);

  const updateCardField = (index, field, value) => {
    const updated = [...cardsTemp];
    updated[index][field] = value;
    setCardsTemp(updated);
  };

  // ================= SAVE =================
  const handleCardsSave = async () => {
    try {
      const updatedList = [];

      for (const item of cardsTemp) {
        const res = await axios.put(
          `http://localhost:8080/api/solutions/cards/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }

      setCards(updatedList);
      setCardsHistory((prev) => [...prev, updatedList]);
      setCardsRedo([]);
      setCardsEdit(false);
      setCardsCanUpdate(false);
      toast.success("Saved successfully.");
    } catch {
      toast.error("Save failed.");
    }
  };

  // ================= UNDO =================
  const handleCardsUndo = () => {
    if (cardsHistory.length <= 1) return;

    const previous = cardsHistory[cardsHistory.length - 2];
    const current = cardsHistory[cardsHistory.length - 1];

    setCards(previous);
    setCardsHistory((h) => h.slice(0, -1));
    setCardsRedo((r) => [current, ...r]);
    setCardsCanUpdate(true);
  };

  // ================= REDO =================
  const handleCardsRedo = () => {
    if (cardsRedo.length === 0) return;

    const next = cardsRedo[0];

    setCards(next);
    setCardsHistory((h) => [...h, next]);
    setCardsRedo((r) => r.slice(1));
    setCardsCanUpdate(true);
  };

  // ================= UPDATE =================
  const handleCardsUpdate = async () => {
    try {
      const updatedList = [];

      for (const item of cards) {
        const res = await axios.put(
          `http://localhost:8080/api/solutions/cards/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }

      setCards(updatedList);
      setCardsHistory([updatedList]);
      setCardsRedo([]);
      setCardsCanUpdate(false);
      toast.success("Updated successfully.");
    } catch {
      toast.error("Update failed.");
    }
  };

  // ================= SOLUTIONS CTA SECTION STATE =================
  const [cta, setCta] = useState(null);
  const [ctaTemp, setCtaTemp] = useState({});
  const [ctaLoading, setCtaLoading] = useState(true);

  const [ctaEdit, setCtaEdit] = useState(false);

  const [ctaHistory, setCtaHistory] = useState([]);
  const [ctaRedo, setCtaRedo] = useState([]);
  const [ctaCanUpdate, setCtaCanUpdate] = useState(false);

  // ================= FETCH CTA =================
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/solutions/cta")
      .then((res) => {
        setCta(res.data); // API returns a single object
        setCtaHistory([res.data]);
        setCtaLoading(false);
      })
      .catch(() => setCtaLoading(false));
  }, []);

  // ================= EDIT MODE =================
  const startCtaEdit = () => {
    setCtaTemp({ ...cta });
    setCtaEdit(true);
  };

  const cancelCtaEdit = () => setCtaEdit(false);

  const updateCtaField = (field, value) => {
    setCtaTemp((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ================= SAVE =================
  const handleCtaSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/solutions/cta/${cta.id}`,
        ctaTemp
      );

      setCta(res.data);
      setCtaHistory((h) => [...h, res.data]);
      setCtaRedo([]);
      setCtaEdit(false);
      setCtaCanUpdate(false);
      toast.success("Saved successfully.");
    } catch {
      toast.error("Failed to save CTA.");
    }
  };

  // ================= UNDO =================
  const handleCtaUndo = () => {
    if (ctaHistory.length <= 1) return;

    const previous = ctaHistory[ctaHistory.length - 2];
    const current = ctaHistory[ctaHistory.length - 1];

    setCta(previous);
    setCtaHistory((h) => h.slice(0, -1));
    setCtaRedo((r) => [current, ...r]);
    setCtaCanUpdate(true);
  };

  // ================= REDO =================
  const handleCtaRedo = () => {
    if (ctaRedo.length === 0) return;

    const next = ctaRedo[0];
    setCta(next);
    setCtaHistory((h) => [...h, next]);
    setCtaRedo((r) => r.slice(1));
    setCtaCanUpdate(true);
  };

  // ================= UPDATE =================
  const handleCtaUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/solutions/cta/${cta.id}`,
        cta
      );

      setCta(res.data);
      setCtaHistory([res.data]);
      setCtaRedo([]);
      setCtaCanUpdate(false);
      toast.success("Updated successfully.");
    } catch {
      toast.error("Failed to update CTA.");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Solutions Page</h1>

      {/* ================= HERO SECTION ================= */}
      <h2 className="text-2xl font-bold mt-10 mb-6">Hero Section</h2>

      {heroLoading ? (
        <p>Loading...</p>
      ) : !hero ? (
        <p>No hero data found.</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border w-16">ID</th>
              <th className="p-3 border w-64">Title</th>
              <th className="p-3 border">Description</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="p-3 border">{hero.id}</td>

              {/* Title */}
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

              {/* Description */}
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
                  <pre className="whitespace-pre-wrap">{hero.description}</pre>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* ================= BUTTONS ================= */}
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

      {/* ================= SOLUTIONS CARDS SECTION ================= */}
      <h2 className="text-2xl font-bold mt-10 mb-6">Cards Section</h2>

      {cardsLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border w-16">ID</th>
              <th className="p-3 border w-64">Title</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border w-64">Image URL</th>
              <th className="p-3 border w-40">Background Gradient</th>
            </tr>
          </thead>

          <tbody>
            {(cardsEdit ? cardsTemp : cards).map((item, index) => (
              <tr key={item.id} className="border">
                <td className="p-3 border">{item.id}</td>

                {/* Title */}
                <td className="p-3 border">
                  {cardsEdit ? (
                    <input
                      value={item.title}
                      onChange={(e) =>
                        updateCardField(index, "title", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    item.title
                  )}
                </td>

                {/* Description */}
                <td className="p-3 border">
                  {cardsEdit ? (
                    <textarea
                      rows={3}
                      value={item.description}
                      onChange={(e) =>
                        updateCardField(index, "description", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    <pre className="whitespace-pre-wrap">
                      {item.description}
                    </pre>
                  )}
                </td>

                {/* Image URL */}
                <td className="p-3 border">
                  {cardsEdit ? (
                    <input
                      value={item.imageUrl}
                      onChange={(e) =>
                        updateCardField(index, "imageUrl", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    <img
                      src={item.imageUrl}
                      alt="Solution"
                      className="w-16 h-16 object-contain mx-auto"
                    />
                  )}
                </td>

                {/* Background Gradient */}
                <td className="p-3 border">
                  {cardsEdit ? (
                    <input
                      value={item.bgGradient}
                      onChange={(e) =>
                        updateCardField(index, "bgGradient", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    item.bgGradient
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ================= BUTTONS ================= */}
      <div className="flex gap-4 mt-5">
        {!cardsEdit ? (
          <>
            <button
              onClick={startCardsEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleCardsUndo}
              disabled={cardsHistory.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleCardsRedo}
              disabled={cardsRedo.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleCardsUpdate}
              disabled={!cardsCanUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleCardsSave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelCardsEdit}
              className="px-5 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* ================= SOLUTIONS CTA SECTION ================= */}
      <h2 className="text-2xl font-bold mt-10 mb-6">CTA Section</h2>

      {ctaLoading ? (
        <p>Loading...</p>
      ) : !cta ? (
        <p>No CTA data found.</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border w-16">ID</th>
              <th className="p-3 border w-64">Title</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border w-48">Button Text</th>
              <th className="p-3 border w-48">Button Link</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border">
              <td className="p-3 border">{cta.id}</td>

              {/* Title */}
              <td className="p-3 border">
                {ctaEdit ? (
                  <input
                    value={ctaTemp.title || ""}
                    onChange={(e) => updateCtaField("title", e.target.value)}
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  cta.title
                )}
              </td>

              {/* Description */}
              <td className="p-3 border">
                {ctaEdit ? (
                  <textarea
                    rows={3}
                    value={ctaTemp.description || ""}
                    onChange={(e) =>
                      updateCtaField("description", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  <pre className="whitespace-pre-wrap">{cta.description}</pre>
                )}
              </td>

              {/* Button Text */}
              <td className="p-3 border">
                {ctaEdit ? (
                  <input
                    value={ctaTemp.buttonText || ""}
                    onChange={(e) =>
                      updateCtaField("buttonText", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  cta.buttonText
                )}
              </td>

              {/* Button Link */}
              <td className="p-3 border">
                {ctaEdit ? (
                  <input
                    value={ctaTemp.buttonLink || ""}
                    onChange={(e) =>
                      updateCtaField("buttonLink", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  cta.buttonLink
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* ================= CTA BUTTONS ================= */}
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

export default SolutionsPage;
