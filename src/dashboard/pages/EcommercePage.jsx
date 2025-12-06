import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const EcommercePage = () => {
  // ================= ECOMMERCE HERO STATE =================
  const [ecomHero, setEcomHero] = useState([]);
  const [ecomHeroTemp, setEcomHeroTemp] = useState([]);
  const [ecomHeroLoading, setEcomHeroLoading] = useState(true);

  const [ecomHeroEdit, setEcomHeroEdit] = useState(false);

  const [ecomHeroHistory, setEcomHeroHistory] = useState([]);
  const [ecomHeroRedo, setEcomHeroRedo] = useState([]);
  const [ecomHeroCanUpdate, setEcomHeroCanUpdate] = useState(false);

  // ================= FETCH DATA =================
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/ecommerce/hero")
      .then((res) => {
        setEcomHero(res.data);
        setEcomHeroHistory([res.data]);
        setEcomHeroLoading(false);
      })
      .catch(() => setEcomHeroLoading(false));
  }, []);

  // ================= EDIT =================
  const startEcomHeroEdit = () => {
    setEcomHeroTemp(JSON.parse(JSON.stringify(ecomHero)));
    setEcomHeroEdit(true);
  };

  const cancelEcomHeroEdit = () => setEcomHeroEdit(false);

  const updateEcomHeroField = (index, field, value) => {
    const updated = [...ecomHeroTemp];
    updated[index][field] = value;
    setEcomHeroTemp(updated);
  };

  // ================= SAVE =================
  const handleEcomHeroSave = async () => {
    try {
      const updatedList = [];

      for (const item of ecomHeroTemp) {
        const res = await axios.put(
          `http://localhost:8080/api/ecommerce/hero/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }

      setEcomHero(updatedList);
      setEcomHeroHistory((h) => [...h, updatedList]);
      setEcomHeroRedo([]);
      setEcomHeroEdit(false);
      setEcomHeroCanUpdate(false);
      toast.success("Saved successfully.");
    } catch {
      toast.error("Failed to save.");
    }
  };

  // ================= UNDO =================
  const handleEcomHeroUndo = () => {
    if (ecomHeroHistory.length <= 1) return;

    const previous = ecomHeroHistory[ecomHeroHistory.length - 2];
    const current = ecomHeroHistory[ecomHeroHistory.length - 1];

    setEcomHero(previous);
    setEcomHeroHistory((h) => h.slice(0, -1));
    setEcomHeroRedo((r) => [current, ...r]);
    setEcomHeroCanUpdate(true);
  };

  // ================= REDO =================
  const handleEcomHeroRedo = () => {
    if (ecomHeroRedo.length === 0) return;

    const next = ecomHeroRedo[0];
    setEcomHero(next);
    setEcomHeroHistory((h) => [...h, next]);
    setEcomHeroRedo((r) => r.slice(1));
    setEcomHeroCanUpdate(true);
  };

  // ================= UPDATE =================
  const handleEcomHeroUpdate = async () => {
    try {
      const updatedList = [];

      for (const item of ecomHero) {
        const res = await axios.put(
          `http://localhost:8080/api/ecommerce/hero/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }

      setEcomHero(updatedList);
      setEcomHeroHistory([updatedList]);
      setEcomHeroRedo([]);
      setEcomHeroCanUpdate(false);
      toast.success("Updated successfully.");
    } catch {
      toast.error("Failed to update.");
    }
  };

  // ================= CORE FEATURES STATE =================
  const [coreFeatures, setCoreFeatures] = useState([]);
  const [coreFeaturesTemp, setCoreFeaturesTemp] = useState([]);
  const [coreFeaturesLoading, setCoreFeaturesLoading] = useState(true);

  const [coreFeaturesEdit, setCoreFeaturesEdit] = useState(false);

  const [coreFeaturesHistory, setCoreFeaturesHistory] = useState([]);
  const [coreFeaturesRedo, setCoreFeaturesRedo] = useState([]);
  const [coreFeaturesCanUpdate, setCoreFeaturesCanUpdate] = useState(false);

  // ================= FETCH DATA =================
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/ecommerce/core")
      .then((res) => {
        setCoreFeatures(res.data);
        setCoreFeaturesHistory([res.data]);
        setCoreFeaturesLoading(false);
      })
      .catch(() => setCoreFeaturesLoading(false));
  }, []);

  // ================= EDIT =================
  const startCoreFeaturesEdit = () => {
    setCoreFeaturesTemp(JSON.parse(JSON.stringify(coreFeatures)));
    setCoreFeaturesEdit(true);
  };

  const cancelCoreFeaturesEdit = () => setCoreFeaturesEdit(false);

  const updateCoreFeatureField = (index, field, value) => {
    const updated = [...coreFeaturesTemp];
    updated[index][field] = value;
    setCoreFeaturesTemp(updated);
  };

  // ================= SAVE =================
  const handleCoreFeaturesSave = async () => {
    try {
      const updatedList = [];

      for (const item of coreFeaturesTemp) {
        const res = await axios.put(
          `http://localhost:8080/api/ecommerce/core/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }

      setCoreFeatures(updatedList);
      setCoreFeaturesHistory((h) => [...h, updatedList]);
      setCoreFeaturesRedo([]);
      setCoreFeaturesEdit(false);
      setCoreFeaturesCanUpdate(false);
      toast.success("Saved successfully.");
    } catch {
      toast.error("Failed to save Core Features.");
    }
  };

  // ================= UNDO =================
  const handleCoreFeaturesUndo = () => {
    if (coreFeaturesHistory.length <= 1) return;

    const previous = coreFeaturesHistory[coreFeaturesHistory.length - 2];
    const current = coreFeaturesHistory[coreFeaturesHistory.length - 1];

    setCoreFeatures(previous);
    setCoreFeaturesHistory((h) => h.slice(0, -1));
    setCoreFeaturesRedo((r) => [current, ...r]);
    setCoreFeaturesCanUpdate(true);
  };

  // ================= REDO =================
  const handleCoreFeaturesRedo = () => {
    if (coreFeaturesRedo.length === 0) return;

    const next = coreFeaturesRedo[0];
    setCoreFeatures(next);
    setCoreFeaturesHistory((h) => [...h, next]);
    setCoreFeaturesRedo((r) => r.slice(1));
    setCoreFeaturesCanUpdate(true);
  };

  // ================= UPDATE =================
  const handleCoreFeaturesUpdate = async () => {
    try {
      const updatedList = [];

      for (const item of coreFeatures) {
        const res = await axios.put(
          `http://localhost:8080/api/ecommerce/core/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }

      setCoreFeatures(updatedList);
      setCoreFeaturesHistory([updatedList]);
      setCoreFeaturesRedo([]);
      setCoreFeaturesCanUpdate(false);
      toast.success("Updated successfully.");
    } catch {
      toast.error("Failed to update Core Features.");
    }
  };

  // ================= ADVANCED MODULES STATE =================
  const [advancedModules, setAdvancedModules] = useState([]);
  const [advancedModulesTemp, setAdvancedModulesTemp] = useState([]);
  const [advancedModulesLoading, setAdvancedModulesLoading] = useState(true);

  const [advancedModulesEdit, setAdvancedModulesEdit] = useState(false);

  const [advancedModulesHistory, setAdvancedModulesHistory] = useState([]);
  const [advancedModulesRedo, setAdvancedModulesRedo] = useState([]);
  const [advancedModulesCanUpdate, setAdvancedModulesCanUpdate] =
    useState(false);

  // ================= FETCH DATA =================
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/ecommerce/modules")
      .then((res) => {
        setAdvancedModules(res.data);
        setAdvancedModulesHistory([res.data]);
        setAdvancedModulesLoading(false);
      })
      .catch(() => setAdvancedModulesLoading(false));
  }, []);

  // ================= EDIT =================
  const startAdvancedModulesEdit = () => {
    setAdvancedModulesTemp(JSON.parse(JSON.stringify(advancedModules)));
    setAdvancedModulesEdit(true);
  };

  const cancelAdvancedModulesEdit = () => setAdvancedModulesEdit(false);

  const updateAdvancedModuleField = (index, field, value) => {
    const updated = [...advancedModulesTemp];
    updated[index][field] = value;
    setAdvancedModulesTemp(updated);
  };

  // ================= SAVE =================
  const handleAdvancedModulesSave = async () => {
    try {
      const updatedList = [];
      for (const item of advancedModulesTemp) {
        const res = await axios.put(
          `http://localhost:8080/api/ecommerce/modules/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }
      setAdvancedModules(updatedList);
      setAdvancedModulesHistory((h) => [...h, updatedList]);
      setAdvancedModulesRedo([]);
      setAdvancedModulesEdit(false);
      setAdvancedModulesCanUpdate(false);
      toast.success("Saved successfully.");
    } catch {
      toast.error("Failed to save Advanced Modules.");
    }
  };

  // ================= UNDO =================
  const handleAdvancedModulesUndo = () => {
    if (advancedModulesHistory.length <= 1) return;

    const previous = advancedModulesHistory[advancedModulesHistory.length - 2];
    const current = advancedModulesHistory[advancedModulesHistory.length - 1];

    setAdvancedModules(previous);
    setAdvancedModulesHistory((h) => h.slice(0, -1));
    setAdvancedModulesRedo((r) => [current, ...r]);
    setAdvancedModulesCanUpdate(true);
  };

  // ================= REDO =================
  const handleAdvancedModulesRedo = () => {
    if (advancedModulesRedo.length === 0) return;

    const next = advancedModulesRedo[0];
    setAdvancedModules(next);
    setAdvancedModulesHistory((h) => [...h, next]);
    setAdvancedModulesRedo((r) => r.slice(1));
    setAdvancedModulesCanUpdate(true);
  };

  // ================= UPDATE =================
  const handleAdvancedModulesUpdate = async () => {
    try {
      const updatedList = [];
      for (const item of advancedModules) {
        const res = await axios.put(
          `http://localhost:8080/api/ecommerce/modules/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }
      setAdvancedModules(updatedList);
      setAdvancedModulesHistory([updatedList]);
      setAdvancedModulesRedo([]);
      setAdvancedModulesCanUpdate(false);
      toast.success("Updated successfully.");
    } catch {
      toast.error("Failed to update Advanced Modules.");
    }
  };

  // ================= CTA SECTION STATE =================
  const [ctaSection, setCtaSection] = useState({});
  const [ctaSectionTemp, setCtaSectionTemp] = useState({});
  const [ctaLoading, setCtaLoading] = useState(true);

  const [ctaEdit, setCtaEdit] = useState(false);

  const [ctaHistory, setCtaHistory] = useState([]);
  const [ctaRedo, setCtaRedo] = useState([]);
  const [ctaCanUpdate, setCtaCanUpdate] = useState(false);

  // ================= FETCH DATA =================
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/ecommerce/cta")
      .then((res) => {
        setCtaSection(res.data[0]);
        setCtaHistory([res.data[0]]);
        setCtaLoading(false);
      })
      .catch(() => setCtaLoading(false));
  }, []);

  // ================= EDIT =================
  const startCtaEdit = () => {
    setCtaSectionTemp({ ...ctaSection });
    setCtaEdit(true);
  };

  const cancelCtaEdit = () => setCtaEdit(false);

  const updateCtaField = (field, value) => {
    setCtaSectionTemp((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ================= SAVE =================
  const handleCtaSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/ecommerce/cta/${ctaSection.id}`,
        ctaSectionTemp
      );
      setCtaSection(res.data);
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

    setCtaSection(previous);
    setCtaHistory((h) => h.slice(0, -1));
    setCtaRedo((r) => [current, ...r]);
    setCtaCanUpdate(true);
  };

  // ================= REDO =================
  const handleCtaRedo = () => {
    if (ctaRedo.length === 0) return;

    const next = ctaRedo[0];
    setCtaSection(next);
    setCtaHistory((h) => [...h, next]);
    setCtaRedo((r) => r.slice(1));
    setCtaCanUpdate(true);
  };

  // ================= UPDATE =================
  const handleCtaUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/ecommerce/cta/${ctaSection.id}`,
        ctaSection
      );
      setCtaSection(res.data);
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
      <h1 className="text-3xl font-bold mb-6">Ecommerce Page</h1>
      {/* ================= ECOMMERCE HERO SECTION TABLE ================= */}
      <h2 className="text-2xl font-bold mt-10 mb-6">Hero Section</h2>
      {ecomHeroLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              {/* <th className="p-3 border w-14">ID</th> */}
              <th className="p-3 border w-64">Title</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border w-48">Button 1 Text</th>
              <th className="p-3 border w-48">Button 1 Link</th>
              <th className="p-3 border w-48">Button 2 Text</th>
              <th className="p-3 border w-48">Button 2 Link</th>
              {/* <th className="p-3 border w-56">Updated At</th> */}
            </tr>
          </thead>

          <tbody>
            {(ecomHeroEdit ? ecomHeroTemp : ecomHero).map((item, index) => (
              <tr key={item.id} className="border">
                {/* <td className="p-3 border">{item.id}</td> */}

                {/* Title */}
                <td className="p-3 border">
                  {ecomHeroEdit ? (
                    <input
                      value={item.title || ""}
                      onChange={(e) =>
                        updateEcomHeroField(index, "title", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    item.title
                  )}
                </td>

                {/* Description */}
                <td className="p-3 border">
                  {ecomHeroEdit ? (
                    <textarea
                      rows={3}
                      value={item.description || ""}
                      onChange={(e) =>
                        updateEcomHeroField(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="border p-2 w-auto rounded"
                    />
                  ) : (
                    <pre className="whitespace-pre-wrap">
                      {item.description}
                    </pre>
                  )}
                </td>

                {/* Button 1 Text */}
                <td className="p-3 border">
                  {ecomHeroEdit ? (
                    <input
                      value={item.button1Text || ""}
                      onChange={(e) =>
                        updateEcomHeroField(
                          index,
                          "button1Text",
                          e.target.value
                        )
                      }
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    item.button1Text
                  )}
                </td>

                {/* Button 1 Link */}
                <td className="p-3 border">
                  {ecomHeroEdit ? (
                    <input
                      value={item.button1Link || ""}
                      onChange={(e) =>
                        updateEcomHeroField(
                          index,
                          "button1Link",
                          e.target.value
                        )
                      }
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    item.button1Link
                  )}
                </td>

                {/* Button 2 Text */}
                <td className="p-3 border">
                  {ecomHeroEdit ? (
                    <input
                      value={item.button2Text || ""}
                      onChange={(e) =>
                        updateEcomHeroField(
                          index,
                          "button2Text",
                          e.target.value
                        )
                      }
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    item.button2Text
                  )}
                </td>

                {/* Button 2 Link */}
                <td className="p-3 border">
                  {ecomHeroEdit ? (
                    <input
                      value={item.button2Link || ""}
                      onChange={(e) =>
                        updateEcomHeroField(
                          index,
                          "button2Link",
                          e.target.value
                        )
                      }
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    item.button2Link
                  )}
                </td>

                {/* Updated At */}
                {/* <td className="p-3 border text-gray-600">
                  {new Date(item.updatedAt).toLocaleString()}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* ================= BUTTONS ================= */}
      <div className="flex gap-4 mt-5">
        {!ecomHeroEdit ? (
          <>
            <button
              onClick={startEcomHeroEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleEcomHeroUndo}
              disabled={ecomHeroHistory.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleEcomHeroRedo}
              disabled={ecomHeroRedo.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleEcomHeroUpdate}
              disabled={!ecomHeroCanUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEcomHeroSave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelEcomHeroEdit}
              className="px-5 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* ================= CORE FEATURES TABLE ================= */}
      <h2 className="text-2xl font-bold mt-10 mb-6">Core Features Section</h2>
      {coreFeaturesLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border w-14">ID</th>
              <th className="p-3 border w-64">Title</th>
              <th className="p-3 border">Feature Text</th>
              <th className="p-3 border w-56">Updated At</th>
            </tr>
          </thead>

          <tbody>
            {(coreFeaturesEdit ? coreFeaturesTemp : coreFeatures).map(
              (item, index) => (
                <tr key={item.id} className="border">
                  <td className="p-3 border">{item.id}</td>

                  {/* Title (always same for all rows but editable) */}
                  <td className="p-3 border">
                    {coreFeaturesEdit ? (
                      <input
                        value={item.title || ""}
                        onChange={(e) =>
                          updateCoreFeatureField(index, "title", e.target.value)
                        }
                        className="border p-2 w-full rounded"
                      />
                    ) : (
                      item.title
                    )}
                  </td>

                  {/* Feature Text */}
                  <td className="p-3 border">
                    {coreFeaturesEdit ? (
                      <textarea
                        rows={2}
                        value={item.featureText || ""}
                        onChange={(e) =>
                          updateCoreFeatureField(
                            index,
                            "featureText",
                            e.target.value
                          )
                        }
                        className="border p-2 w-full rounded"
                      />
                    ) : (
                      <pre className="whitespace-pre-wrap">
                        {item.featureText}
                      </pre>
                    )}
                  </td>

                  {/* Updated At */}
                  <td className="p-3 border">
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
        {!coreFeaturesEdit ? (
          <>
            <button
              onClick={startCoreFeaturesEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleCoreFeaturesUndo}
              disabled={coreFeaturesHistory.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleCoreFeaturesRedo}
              disabled={coreFeaturesRedo.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleCoreFeaturesUpdate}
              disabled={!coreFeaturesCanUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleCoreFeaturesSave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelCoreFeaturesEdit}
              className="px-5 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* ================= ADVANCED MODULES TABLE ================= */}
      <h2 className="text-2xl font-bold mt-10 mb-6">Advanced Modules</h2>
      {advancedModulesLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border w-14">ID</th>
              <th className="p-3 border w-48">Title</th>
              <th className="p-3 border">Module Text</th>
              <th className="p-3 border w-56">Updated At</th>
            </tr>
          </thead>

          <tbody>
            {(advancedModulesEdit ? advancedModulesTemp : advancedModules).map(
              (item, index) => (
                <tr key={item.id} className="border">
                  <td className="p-3 border">{item.id}</td>

                  {/* Title */}
                  <td className="p-3 border">
                    {advancedModulesEdit ? (
                      <input
                        value={item.title}
                        onChange={(e) =>
                          updateAdvancedModuleField(
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

                  {/* Module Text */}
                  <td className="p-3 border">
                    {advancedModulesEdit ? (
                      <textarea
                        rows={2}
                        value={item.moduleText}
                        onChange={(e) =>
                          updateAdvancedModuleField(
                            index,
                            "moduleText",
                            e.target.value
                          )
                        }
                        className="border p-2 w-full rounded"
                      />
                    ) : (
                      <pre className="whitespace-pre-wrap">
                        {item.moduleText}
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
        {!advancedModulesEdit ? (
          <>
            <button
              onClick={startAdvancedModulesEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleAdvancedModulesUndo}
              disabled={advancedModulesHistory.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleAdvancedModulesRedo}
              disabled={advancedModulesRedo.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleAdvancedModulesUpdate}
              disabled={!advancedModulesCanUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleAdvancedModulesSave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelAdvancedModulesEdit}
              className="px-5 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* ================= CTA SECTION TABLE ================= */}
      <h2 className="text-2xl font-bold mt-10 mb-6">CTA Section</h2>

      {ctaLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border w-16">ID</th>
              <th className="p-3 border w-64">Title</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border w-56">Button Text</th>
              <th className="p-3 border w-56">Button Link</th>
              <th className="p-3 border w-56">Updated At</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border">
              <td className="p-3 border">{ctaSection.id}</td>

              {/* Title */}
              <td className="p-3 border">
                {ctaEdit ? (
                  <input
                    value={ctaSectionTemp.title || ""}
                    onChange={(e) => updateCtaField("title", e.target.value)}
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  ctaSection.title
                )}
              </td>

              {/* Description */}
              <td className="p-3 border">
                {ctaEdit ? (
                  <textarea
                    rows={3}
                    value={ctaSectionTemp.description || ""}
                    onChange={(e) =>
                      updateCtaField("description", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  <pre className="whitespace-pre-wrap">
                    {ctaSection.description}
                  </pre>
                )}
              </td>

              {/* Button Text */}
              <td className="p-3 border">
                {ctaEdit ? (
                  <input
                    value={ctaSectionTemp.buttonText || ""}
                    onChange={(e) =>
                      updateCtaField("buttonText", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  ctaSection.buttonText
                )}
              </td>

              {/* Button Link */}
              <td className="p-3 border">
                {ctaEdit ? (
                  <input
                    value={ctaSectionTemp.buttonLink || ""}
                    onChange={(e) =>
                      updateCtaField("buttonLink", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  ctaSection.buttonLink
                )}
              </td>

              {/* Updated At */}
              <td className="p-3 border text-gray-600">
                {ctaSection.updatedAt
                  ? new Date(ctaSection.updatedAt).toLocaleString()
                  : "-"}
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* ================= BUTTONS ================= */}
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

export default EcommercePage;
