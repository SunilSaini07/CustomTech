import React, { useEffect, useState } from "react";
// import axioss from "axioss";
import toast from "react-hot-toast";
import axioss from "../../axiosConfig";

const ServicesPage = () => {
  // ================= STATE =================
  const [serviceHero, setServiceHero] = useState({});
  const [serviceHeroTemp, setServiceHeroTemp] = useState({});
  const [serviceHeroLoading, setServiceHeroLoading] = useState(true);

  const [serviceHeroEdit, setServiceHeroEdit] = useState(false);

  const [serviceHeroHistory, setServiceHeroHistory] = useState([]);
  const [serviceHeroRedo, setServiceHeroRedo] = useState([]);
  const [serviceHeroCanUpdate, setServiceHeroCanUpdate] = useState(false);

  // ================= FETCH =================
  useEffect(() => {
    axioss
      .get("/api/services/hero")
      .then((res) => {
        setServiceHero(res.data[0]);
        setServiceHeroHistory([res.data[0]]);
        setServiceHeroLoading(false);
      })
      .catch(() => setServiceHeroLoading(false));
  }, []);

  // ================= EDIT =================
  const startServiceHeroEdit = () => {
    setServiceHeroTemp({ ...serviceHero });
    setServiceHeroEdit(true);
  };

  const cancelServiceHeroEdit = () => setServiceHeroEdit(false);

  const updateServiceHeroField = (field, value) => {
    setServiceHeroTemp((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ================= SAVE =================
  const handleServiceHeroSave = async () => {
    try {
      const res = await axioss.put(
        `/api/services/hero/${serviceHero.id}`,
        serviceHeroTemp
      );

      setServiceHero(res.data);
      setServiceHeroHistory((h) => [...h, res.data]);
      setServiceHeroRedo([]);
      setServiceHeroEdit(false);
      setServiceHeroCanUpdate(false);
      toast.success("Saved successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save changes.");
    }
  };

  // ================= UNDO =================
  const handleServiceHeroUndo = () => {
    if (serviceHeroHistory.length <= 1) return;

    const previous = serviceHeroHistory[serviceHeroHistory.length - 2];
    const current = serviceHeroHistory[serviceHeroHistory.length - 1];

    setServiceHero(previous);
    setServiceHeroHistory((h) => h.slice(0, -1));
    setServiceHeroRedo((r) => [current, ...r]);
    setServiceHeroCanUpdate(true);
  };

  // ================= REDO =================
  const handleServiceHeroRedo = () => {
    if (serviceHeroRedo.length === 0) return;

    const next = serviceHeroRedo[0];
    setServiceHero(next);
    setServiceHeroHistory((h) => [...h, next]);
    setServiceHeroRedo((r) => r.slice(1));
    setServiceHeroCanUpdate(true);
  };

  // ================= UPDATE =================
  const handleServiceHeroUpdate = async () => {
    try {
      const res = await axioss.put(
        `/api/services/hero/${serviceHero.id}`,
        serviceHero
      );

      setServiceHero(res.data);
      setServiceHeroHistory([res.data]);
      setServiceHeroRedo([]);
      setServiceHeroCanUpdate(false);
      toast.success("Updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update changes.");
    }
  };

  const [serviceCards, setServiceCards] = useState([]);
  const [scTemp, setScTemp] = useState([]);
  const [scEdit, setScEdit] = useState(false);
  const [scLoading, setScLoading] = useState(true);
  const [scHistory, setScHistory] = useState([]);
  const [scRedo, setScRedo] = useState([]);
  const [scCanUpdate, setScCanUpdate] = useState(false);

  // FETCH
  useEffect(() => {
    axioss
      .get("/api/services/cards")
      .then((res) => {
        setServiceCards(res.data);
        setScHistory([res.data]);
        setScLoading(false);
      })
      .catch(() => setScLoading(false));
  }, []);

  // EDIT
  const startScEdit = () => {
    setScTemp(JSON.parse(JSON.stringify(serviceCards)));
    setScEdit(true);
  };

  const cancelScEdit = () => setScEdit(false);

  const updateScField = (index, field, value) => {
    const updated = [...scTemp];
    updated[index][field] = value;
    setScTemp(updated);
  };

  // SAVE
  const handleScSave = async () => {
    try {
      const updatedList = [];
      for (const item of scTemp) {
        const res = await axioss.put(
          `/api/services/cards/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }
      setServiceCards(updatedList);
      setScTemp([]);
      setScEdit(false);
      setScHistory((prev) => [...prev, updatedList]);
      setScRedo([]);
      setScCanUpdate(false);
      toast.success("Saved successfully");
    } catch {
      toast.error("Save failed");
    }
  };

  // ================= UNDO =================
  const handleScUndo = () => {
    if (scHistory.length <= 1) return;

    const previous = scHistory[scHistory.length - 2];
    const current = scHistory[scHistory.length - 1];

    setServiceCards(previous);
    setScHistory((h) => h.slice(0, -1));
    setScRedo((r) => [current, ...r]);
    setScCanUpdate(true);
  };

  // ================= REDO =================
  const handleScRedo = () => {
    if (scRedo.length === 0) return;

    const next = scRedo[0];

    setServiceCards(next);
    setScHistory((h) => [...h, next]);
    setScRedo((r) => r.slice(1));
    setScCanUpdate(true);
  };

  // ================= UPDATE =================
  const handleScUpdate = async () => {
    try {
      const updatedList = [];

      for (const item of serviceCards) {
        const res = await axioss.put(
          `/api/services/cards/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }

      setServiceCards(updatedList);
      setScHistory([updatedList]);
      setScRedo([]);
      setScCanUpdate(false);
      toast.success("Updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update changes.");
    }
  };

  // ================= STATES =================
  const [cta, setCta] = useState({});
  const [ctaTemp, setCtaTemp] = useState({});
  const [ctaLoading, setCtaLoading] = useState(true);

  const [ctaEdit, setCtaEdit] = useState(false);
  const [ctaCanUpdate, setCtaCanUpdate] = useState(false);

  const [ctaHistory, setCtaHistory] = useState([]);
  const [ctaRedo, setCtaRedo] = useState([]);

  // ================= FETCH CTA =================
  useEffect(() => {
    const fetchCta = async () => {
      try {
        const res = await axioss.get("/api/services/cta");
        setCta(res.data);
        setCtaHistory([res.data]);
      } catch (error) {
        console.error(error);
      } finally {
        setCtaLoading(false);
      }
    };

    fetchCta();
  }, []);

  // ================= UPDATE TEMP FIELD =================
  const updateCtaField = (key, value) => {
    setCtaTemp((prev) => ({ ...prev, [key]: value }));
    setCtaCanUpdate(true);
  };

  // ================= START EDIT =================
  const startCtaEdit = () => {
    setCtaTemp({ ...cta });
    setCtaEdit(true);
  };

  // ================= CANCEL EDIT =================
  const cancelCtaEdit = () => {
    setCtaEdit(false);
    setCtaTemp({});
    setCtaCanUpdate(false);
  };

  // ================= SAVE EDIT  =================
  const handleCtaSave = async () => {
    try {
      const res = await axioss.put(
        `/api/services/cta/${ctaTemp.id}`,
        ctaTemp
      );

      setCta(res.data);
      setCtaHistory((h) => [...h, res.data]);
      setCtaRedo([]);
      setCtaEdit(false);
      setCtaCanUpdate(false);
      toast.success("Saved successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save changes.");
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

  // ================= UPDATE TO API =================
  const handleCtaUpdate = async () => {
    try {
      const res = await axioss.put(
        `/api/services/cta/${cta.id}`,
        cta
      );

      setCta(res.data);
      setCtaHistory([res.data]);
      setCtaRedo([]);
      setCtaCanUpdate(false);

      toast.success("Updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update CTA section.");
    }
  };

  return (
    <div className="p-10">
      {/* ================= SERVICE PAGE HERO SECTION ================= */}
      <h1 className="text-2xl font-bold mt-10 mb-6"> Hero Section </h1>

      {serviceHeroLoading ? (
        <p>Loading...</p>
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
            <tr className="border">
              <td className="p-3 border">{serviceHero.id}</td>

              {/* Title */}
              <td className="p-3 border">
                {serviceHeroEdit ? (
                  <input
                    value={serviceHeroTemp.title || ""}
                    onChange={(e) =>
                      updateServiceHeroField("title", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  serviceHero.title
                )}
              </td>

              {/* Description */}
              <td className="p-3 border">
                {serviceHeroEdit ? (
                  <textarea
                    rows={4}
                    value={serviceHeroTemp.description || ""}
                    onChange={(e) =>
                      updateServiceHeroField("description", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  <pre className="whitespace-pre-wrap">
                    {serviceHero.description}
                  </pre>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* ================= BUTTONS ================= */}
      <div className="flex gap-4 mt-5">
        {!serviceHeroEdit ? (
          <>
            <button
              onClick={startServiceHeroEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleServiceHeroUndo}
              disabled={serviceHeroHistory.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleServiceHeroRedo}
              disabled={serviceHeroRedo.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleServiceHeroUpdate}
              disabled={!serviceHeroCanUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleServiceHeroSave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelServiceHeroEdit}
              className="px-5 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* ================= SERVICE CARDS SECTION ================= */}
      <h1 className="text-2xl font-bold mt-10 mb-6">Service Cards Section</h1>

      {scLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border w-16">ID</th>
              <th className="p-3 border w-64">Title</th>
              <th className="p-3 border w-1000">Description</th>
              <th className="p-3 border w-60">Feature 1</th>
              <th className="p-3 border w-60">Feature 2</th>
              <th className="p-3 border w-60">Feature 3</th>
              <th className="p-3 border w-60">Feature 4</th>
              <th className="p-3 border w-50">Button Text</th>
              <th className="p-3 border w-50">Button Link</th>
            </tr>
          </thead>

          <tbody>
            {(scEdit ? scTemp : serviceCards).map((item, index) => (
              <tr key={item.id} className="border">
                <td className="p-3 border">{item.id}</td>

                {/* Title */}
                <td className="p-3 border">
                  {scEdit ? (
                    <input
                      value={item.title || ""}
                      onChange={(e) =>
                        updateScField(index, "title", e.target.value)
                      }
                      className="border p-2 w-auto rounded"
                    />
                  ) : (
                    item.title
                  )}
                </td>

                {/* Description */}
                <td className="p-3 border">
                  {scEdit ? (
                    <textarea
                      rows={3}
                      value={item.description || ""}
                      onChange={(e) =>
                        updateScField(index, "description", e.target.value)
                      }
                      className="border p-2 w-auto rounded"
                    />
                  ) : (
                    <pre className="whitespace-pre-wrap">
                      {item.description}
                    </pre>
                  )}
                </td>

                {/* Features */}
                <td className="p-3 border">
                  {scEdit ? (
                    <input
                      value={item.feature_1 || ""}
                      onChange={(e) =>
                        updateScField(index, "feature_1", e.target.value)
                      }
                      className="border p-2 w-auto rounded"
                    />
                  ) : (
                    item.feature_1 || "-"
                  )}
                </td>
                <td className="p-3 border">
                  {scEdit ? (
                    <input
                      value={item.feature_2 || ""}
                      onChange={(e) =>
                        updateScField(index, "feature_2", e.target.value)
                      }
                      className="border p-2 w-auto rounded"
                    />
                  ) : (
                    item.feature_2 || "-"
                  )}
                </td>
                <td className="p-3 border">
                  {scEdit ? (
                    <input
                      value={item.feature_3 || ""}
                      onChange={(e) =>
                        updateScField(index, "feature_3", e.target.value)
                      }
                      className="border p-2 w-auto rounded"
                    />
                  ) : (
                    item.feature_3 || "-"
                  )}
                </td>
                <td className="p-3 border">
                  {scEdit ? (
                    <input
                      value={item.feature_4 || ""}
                      onChange={(e) =>
                        updateScField(index, "feature_4", e.target.value)
                      }
                      className="border p-2 w-auto rounded"
                    />
                  ) : (
                    item.feature_4 || "-"
                  )}
                </td>

                {/* Button Text */}
                <td className="p-3 border">
                  {scEdit ? (
                    <input
                      value={item.buttonText || ""}
                      onChange={(e) =>
                        updateScField(index, "buttonText", e.target.value)
                      }
                      className="border p-2 w-auto rounded"
                    />
                  ) : (
                    item.buttonText
                  )}
                </td>

                {/* Button Link */}
                <td className="p-3 border">
                  {scEdit ? (
                    <input
                      value={item.buttonLink || ""}
                      onChange={(e) =>
                        updateScField(index, "buttonLink", e.target.value)
                      }
                      className="border p-2 w-auto rounded"
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

      {/* ================= BUTTONS ================= */}
      <div className="flex gap-4 mt-5">
        {!scEdit ? (
          <>
            <button
              onClick={startScEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleScUndo}
              disabled={scHistory.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleScRedo}
              disabled={scRedo.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleScUpdate}
              disabled={!scCanUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleScSave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelScEdit}
              className="px-5 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* =============== CTA SECTION TITLE =============== */}
      <h1 className="text-2xl font-bold mt-10 mb-6">CTA Section</h1>

      {ctaLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border w-16">ID</th>
              <th className="p-3 border w-64">Title</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border w-64">Button Text</th>
              <th className="p-3 border w-64">Button Link</th>
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

      {/* =============== BUTTONS =============== */}
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

export default ServicesPage;
