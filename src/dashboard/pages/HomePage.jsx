import React, { useEffect, useState } from "react";
// import axios from "axios";
import toast from "react-hot-toast";
import axioss from "../../axiosConfig";

function HomePage() {
  /* ================= HERO SECTION STATE ================= */
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [temp, setTemp] = useState({});

  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [canUpdate, setCanUpdate] = useState(false);

  /* ================= ABOUT SECTION STATE ================= */
  const [about, setAbout] = useState(null);
  const [aboutLoading, setAboutLoading] = useState(true);
  const [aboutEdit, setAboutEdit] = useState(false);
  const [aboutTemp, setAboutTemp] = useState({});

  const [aboutHistory, setAboutHistory] = useState([]);
  const [aboutRedo, setAboutRedo] = useState([]);
  const [aboutCanUpdate, setAboutCanUpdate] = useState(false);

  /* ================= INDUSTRIES SECTION STATE ================= */
  const [industries, setIndustries] = useState([]);
  const [indEdit, setIndEdit] = useState(false);
  const [indTemp, setIndTemp] = useState([]);

  const [indHistory, setIndHistory] = useState([]);
  const [indRedo, setIndRedo] = useState([]);
  const [indCanUpdate, setIndCanUpdate] = useState(false);

  /* ================= SERVICE SECTION STATE ================= */
  const [services, setServices] = useState([]);
  const [serviceLoading, setServiceLoading] = useState(true);

  const [serviceEdit, setServiceEdit] = useState(false);
  const [serviceTemp, setServiceTemp] = useState([]);

  const [serviceHistory, setServiceHistory] = useState([]);
  const [serviceRedo, setServiceRedo] = useState([]);
  const [serviceCanUpdate, setServiceCanUpdate] = useState(false);

  /* ================= SOLUTIONS SECTION STATE ================= */
  const [solutions, setSolutions] = useState([]);
  const [solLoading, setSolLoading] = useState(true);

  const [solEdit, setSolEdit] = useState(false);
  const [solTemp, setSolTemp] = useState([]);

  const [solHistory, setSolHistory] = useState([]);
  const [solRedo, setSolRedo] = useState([]);
  const [solCanUpdate, setSolCanUpdate] = useState(false);

  /* ================= CTA SECTION STATE ================= */
  const [cta, setCta] = useState(null);
  const [ctaLoading, setCtaLoading] = useState(true);

  const [ctaEdit, setCtaEdit] = useState(false);
  const [ctaTemp, setCtaTemp] = useState({});

  const [ctaHistory, setCtaHistory] = useState([]);
  const [ctaRedo, setCtaRedo] = useState([]);
  const [ctaCanUpdate, setCtaCanUpdate] = useState(false);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    //HERO DATA FETCH
    axioss
      .get("/api/home/hero")
      .then((res) => {
        setHero(res.data);
        setHistory([res.data]);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load data");
        setLoading(false);
      });

    //ABOUT DATA FETCH
    axioss
      .get("/api/home/about")
      .then((res) => {
        setAbout(res.data);
        setAboutHistory([res.data]);
        setAboutLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load About data");
        setAboutLoading(false);
      });

    //INDUSTRIES DATA FETCH
    axioss
      .get("/api/home/industries")
      .then((res) => {
        setIndustries(res.data);
        setIndHistory([res.data]);
      })
      .catch(() => toast.error("Failed to load Industries"));

    //SERVICES DATA FETCH
    axioss
      .get("/api/home/services")
      .then((res) => {
        setServices(res.data);
        setServiceHistory([res.data]);
        setServiceLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load Service data");
        setServiceLoading(false);
      });

    //SOLUTIONS DATA FETCH
    axioss
      .get("/api/home/solutions")
      .then((res) => {
        setSolutions(res.data);
        setSolHistory([res.data]);
        setSolLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load Solutions data");
        setSolLoading(false);
      });

    //CTA DATA FETCH
    axioss
      .get("/api/home/cta")
      .then((res) => {
        setCta(res.data);
        setCtaHistory([res.data]);
        setCtaLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load CTA section");
        setCtaLoading(false);
      });
  }, []);

  /* ================= HERO HANDLERS ================= */
  const startEdit = () => {
    setTemp(hero);
    setEditMode(true);
  };

  const cancelEdit = () => {
    setEditMode(false);
  };

  const handleSave = () => {
    axioss
      .put("/api/home/hero", temp)
      .then((res) => {
        setHero(res.data);
        setEditMode(false);
        toast.success("Saved successfully");

        setHistory((prev) => [...prev, res.data]);
        setRedoStack([]);
        setCanUpdate(false);
      })
      .catch(() => {
        toast.error("Save failed");
      });
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    const prev = history[history.length - 2];
    const current = history[history.length - 1];

    setHero(prev);
    setHistory((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [current, ...prev]);
    setCanUpdate(true);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];

    setHero(next);
    setHistory((prev) => [...prev, next]);
    setRedoStack((prev) => prev.slice(1));
    setCanUpdate(true);
  };

  const handleUpdate = () => {
    axioss
      .put("/api/home/hero", hero)
      .then((res) => {
        setHero(res.data);
        setHistory([res.data]);
        setRedoStack([]);
        setCanUpdate(false);
        toast.success("Updated successfully");
      })
      .catch(() => toast.error("Update failed"));
  };

  const updateField = (name, value) => {
    setTemp({ ...temp, [name]: value });
  };

  /* ================= ABOUT HANDLERS ================= */
  const startAboutEdit = () => {
    setAboutTemp(about);
    setAboutEdit(true);
  };

  const cancelAboutEdit = () => {
    setAboutEdit(false);
  };

  const updateAboutField = (name, value) => {
    setAboutTemp({ ...aboutTemp, [name]: value });
  };

  const handleAboutSave = () => {
    axioss
      .put("/api/home/about", aboutTemp)
      .then((res) => {
        setAbout(res.data);
        setAboutEdit(false);
        toast.success("Saved successfully");

        setAboutHistory((prev) => [...prev, res.data]);
        setAboutRedo([]);
        setAboutCanUpdate(false);
      })
      .catch(() => toast.error("Save failed"));
  };

  const handleAboutUndo = () => {
    if (aboutHistory.length <= 1) return;

    const prev = aboutHistory[aboutHistory.length - 2];
    const curr = aboutHistory[aboutHistory.length - 1];

    setAbout(prev);
    setAboutHistory((prev) => prev.slice(0, -1));
    setAboutRedo((stack) => [curr, ...stack]);
    setAboutCanUpdate(true);
  };

  const handleAboutRedo = () => {
    if (aboutRedo.length === 0) return;

    const next = aboutRedo[0];

    setAbout(next);
    setAboutHistory((prev) => [...prev, next]);
    setAboutRedo((prev) => prev.slice(1));
    setAboutCanUpdate(true);
  };

  const handleAboutUpdate = () => {
    axioss
      .put("/api/home/about", about)
      .then((res) => {
        setAbout(res.data);
        setAboutHistory([res.data]);
        setAboutRedo([]);
        setAboutCanUpdate(false);
        toast.success("Updated successfully");
      })
      .catch(() => toast.error("Update failed"));
  };

  /* ================= INDUSTRIES HANDLERS ================= */
  const startIndEdit = () => {
    setIndTemp(JSON.parse(JSON.stringify(industries))); // deep clone
    setIndEdit(true);
  };

  const cancelIndEdit = () => {
    setIndEdit(false);
  };

  const updateIndField = (index, name, value) => {
    const updated = [...indTemp];
    updated[index] = { ...updated[index], [name]: value };
    setIndTemp(updated);
  };

  const handleIndSave = async () => {
    try {
      const updated = [...indTemp];

      for (let i = 0; i < updated.length; i++) {
        const row = updated[i];

        const res = await axioss.put(
          `/api/home/industries/${row.id}`,
          row
        );

        updated[i] = res.data;
      }

      setIndustries(updated);
      setIndTemp(updated);
      setIndEdit(false);
      toast.success("Industries saved");

      setIndHistory((prev) => [...prev, updated]);
      setIndRedo([]);
      setIndCanUpdate(false);
    } catch (e) {
      console.error(e);
      toast.error("Save failed");
    }
  };

  const handleIndUndo = () => {
    if (indHistory.length <= 1) return;

    const prev = indHistory[indHistory.length - 2];
    const curr = indHistory[indHistory.length - 1];

    setIndustries(prev);
    setIndHistory((h) => h.slice(0, -1));
    setIndRedo((stack) => [curr, ...stack]);
    setIndCanUpdate(true);
  };

  const handleIndRedo = () => {
    if (indRedo.length === 0) return;

    const next = indRedo[0];

    setIndustries(next);
    setIndHistory((prev) => [...prev, next]);
    setIndRedo((prev) => prev.slice(1));
    setIndCanUpdate(true);
  };

  const handleIndUpdate = async () => {
    try {
      const updatedList = [];

      for (const item of industries) {
        const res = await axioss.put(
          `/api/home/industries/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }

      setIndustries(updatedList);
      toast.success("Updated successfully");
      setIndCanUpdate(false);
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  /* ================= Service Handles ================= */
  const startServiceEdit = () => {
    setServiceTemp(JSON.parse(JSON.stringify(services)));
    setServiceEdit(true);
  };

  const cancelServiceEdit = () => {
    setServiceEdit(false);
  };

  const updateServiceField = (index, name, value) => {
    const updated = [...serviceTemp];
    updated[index][name] = value;
    setServiceTemp(updated);
  };

  const handleServiceSave = async () => {
    try {
      const updatedList = [];
      for (const item of serviceTemp) {
        const res = await axioss.put(
          `/api/home/services/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }

      setServices(updatedList);
      setServiceEdit(false);
      toast.success("Saved successfully");

      setServiceHistory((prev) => [...prev, updatedList]);
      setServiceRedo([]);
      setServiceCanUpdate(false);
    } catch {
      toast.error("Save failed");
    }
  };

  const handleServiceUndo = () => {
    if (serviceHistory.length <= 1) return;

    const prev = serviceHistory[serviceHistory.length - 2];
    const curr = serviceHistory[serviceHistory.length - 1];

    setServices(prev);
    setServiceHistory((h) => h.slice(0, -1));
    setServiceRedo((r) => [curr, ...r]);
    setServiceCanUpdate(true);
  };

  const handleServiceRedo = () => {
    if (serviceRedo.length === 0) return;

    const next = serviceRedo[0];

    setServices(next);
    setServiceHistory((h) => [...h, next]);
    setServiceRedo((r) => r.slice(1));
    setServiceCanUpdate(true);
  };

  const handleServiceUpdate = async () => {
    try {
      const updatedList = [];
      for (const item of services) {
        const res = await axioss.put(
          `/api/home/services/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }

      setServices(updatedList);
      setServiceHistory([updatedList]);
      setServiceRedo([]);
      setServiceCanUpdate(false);
      toast.success("Updated successfully");
    } catch {
      toast.error("Update failed");
    }
  };

  /* ================= SOLUTIONS HANDLERS ================= */
  const startSolEdit = () => {
    setSolTemp(JSON.parse(JSON.stringify(solutions)));
    setSolEdit(true);
  };

  const cancelSolEdit = () => {
    setSolEdit(false);
  };

  const updateSolField = (index, name, value) => {
    const updated = [...solTemp];
    updated[index][name] = value;
    setSolTemp(updated);
  };

  const handleSolSave = async () => {
    try {
      const updatedList = [];

      for (const item of solTemp) {
        const res = await axioss.put(
          `/api/home/solutions/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }

      setSolutions(updatedList);
      setSolEdit(false);
      toast.success("Saved successfully");

      setSolHistory((prev) => [...prev, updatedList]);
      setSolRedo([]);
      setSolCanUpdate(false);
    } catch {
      toast.error("Save failed");
    }
  };

  const handleSolUndo = () => {
    if (solHistory.length <= 1) return;

    const prev = solHistory[solHistory.length - 2];
    const curr = solHistory[solHistory.length - 1];

    setSolutions(prev);
    setSolHistory((h) => h.slice(0, -1));
    setSolRedo((r) => [curr, ...r]);
    setSolCanUpdate(true);
  };

  const handleSolRedo = () => {
    if (solRedo.length === 0) return;

    const next = solRedo[0];

    setSolutions(next);
    setSolHistory((h) => [...h, next]);
    setSolRedo((r) => r.slice(1));
    setSolCanUpdate(true);
  };

  const handleSolUpdate = async () => {
    try {
      const updatedList = [];

      for (const item of solutions) {
        const res = await axioss.put(
          `/api/home/solutions/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }

      setSolutions(updatedList);
      setSolHistory([updatedList]);
      setSolRedo([]);
      setSolCanUpdate(false);
      toast.success("Updated successfully");
    } catch {
      toast.error("Update failed");
    }
  };

  /* ================= CTA HANDLERS ================= */
  const startCtaEdit = () => {
    setCtaTemp(cta);
    setCtaEdit(true);
  };

  const cancelCtaEdit = () => {
    setCtaEdit(false);
  };

  const updateCtaField = (name, value) => {
    setCtaTemp({ ...ctaTemp, [name]: value });
  };

  const handleCtaSave = () => {
    axioss
      .put(`/api/home/cta/${ctaTemp.id}`, ctaTemp)
      .then((res) => {
        setCta(res.data);
        setCtaEdit(false);
        toast.success("Saved successfully");

        setCtaHistory((prev) => [...prev, res.data]);
        setCtaRedo([]);
        setCtaCanUpdate(false);
      })
      .catch((err) =>{
        console.error(err);
        toast.error("Save failed");
      });
  };

  const handleCtaUndo = () => {
    if (ctaHistory.length <= 1) return;

    const prev = ctaHistory[ctaHistory.length - 2];
    const curr = ctaHistory[ctaHistory.length - 1];

    setCta(prev);
    setCtaHistory((h) => h.slice(0, -1));
    setCtaRedo((r) => [curr, ...r]);
    setCtaCanUpdate(true);
  };

  const handleCtaRedo = () => {
    if (ctaRedo.length === 0) return;

    const next = ctaRedo[0];

    setCta(next);
    setCtaHistory((h) => [...h, next]);
    setCtaRedo((r) => r.slice(1));
    setCtaCanUpdate(true);
  };

  const handleCtaUpdate = () => {
    axioss
      .put(`/api/home/cta/${ctaTemp.id}`, cta)
      .then((res) => {
        setCta(res.data);
        setCtaHistory([res.data]);
        setCtaRedo([]);
        setCtaCanUpdate(false);
        toast.success("Updated successfully");
      })
      .catch(() => toast.error("Update failed"));
  };

  if (loading || aboutLoading) {
    return <div className="p-6 text-lg">Loading…</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Home Page</h1>

      {/* ================= HERO SECTION ================= */}
      <h1 className="text-2xl font-bold mb-6">Hero Section</h1>

      <table className="min-w-full border border-gray-300 divide-y bg-white">
        <tbody>
          <tr>
            <td className="p-3 font-semibold border w-40">Title</td>
            <td className="p-3 border">
              {editMode ? (
                <input
                  value={temp.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="border p-2 w-full rounded"
                />
              ) : (
                hero.title
              )}
            </td>
          </tr>

          <tr>
            <td className="p-3 font-semibold border">Subtitle</td>
            <td className="p-3 border">
              {editMode ? (
                <input
                  value={temp.subtitle}
                  onChange={(e) => updateField("subtitle", e.target.value)}
                  className="border p-2 w-full rounded"
                />
              ) : (
                hero.subtitle
              )}
            </td>
          </tr>

          <tr>
            <td className="p-3 font-semibold border">CTA Text</td>
            <td className="p-3 border">
              {editMode ? (
                <input
                  value={temp.ctaText}
                  onChange={(e) => updateField("ctaText", e.target.value)}
                  className="border p-2 w-full rounded"
                />
              ) : (
                hero.ctaText
              )}
            </td>
          </tr>

          <tr>
            <td className="p-3 font-semibold border">CTA URL</td>
            <td className="p-3 border">
              {editMode ? (
                <input
                  value={temp.ctaUrl}
                  onChange={(e) => updateField("ctaUrl", e.target.value)}
                  className="border p-2 w-full rounded"
                />
              ) : (
                hero.ctaUrl
              )}
            </td>
          </tr>

          <tr>
            <td className="p-3 font-semibold border">Background Image</td>
            <td className="p-3 border">
              {editMode ? (
                <input
                  value={temp.backgroundImage}
                  onChange={(e) =>
                    updateField("backgroundImage", e.target.value)
                  }
                  className="border p-2 w-full rounded"
                />
              ) : (
                hero.backgroundImage
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex gap-4 mt-5">
        {!editMode ? (
          <>
            <button
              onClick={startEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleUndo}
              disabled={history.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleUpdate}
              disabled={!canUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelEdit}
              className="px-5 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* ================= ABOUT SECTION ================= */}
      <h1 className="text-2xl font-bold mt-10 mb-6">About Section</h1>

      <table className="min-w-full border border-gray-300 divide-y bg-white">
        <tbody>
          <tr>
            <td className="p-3 font-semibold border w-40">Title</td>
            <td className="p-3 border">
              {aboutEdit ? (
                <input
                  value={aboutTemp.title}
                  onChange={(e) => updateAboutField("title", e.target.value)}
                  className="border p-2 w-full rounded"
                />
              ) : (
                about?.title
              )}
            </td>
          </tr>

          <tr>
            <td className="p-3 font-semibold border">Paragraph 1</td>
            <td className="p-3 border">
              {aboutEdit ? (
                <textarea
                  value={aboutTemp.paragraph1}
                  onChange={(e) =>
                    updateAboutField("paragraph1", e.target.value)
                  }
                  className="border p-2 w-full rounded"
                  rows={3}
                />
              ) : (
                about?.paragraph1
              )}
            </td>
          </tr>

          <tr>
            <td className="p-3 font-semibold border">Paragraph 2</td>
            <td className="p-3 border">
              {aboutEdit ? (
                <textarea
                  value={aboutTemp.paragraph2}
                  onChange={(e) =>
                    updateAboutField("paragraph2", e.target.value)
                  }
                  className="border p-2 w-full rounded"
                  rows={3}
                />
              ) : (
                about?.paragraph2
              )}
            </td>
          </tr>

          {/* <tr>
            <td className="p-3 font-semibold border">Audiences JSON</td>
            <td className="p-3 border">
              {aboutEdit ? (
                <textarea
                  value={aboutTemp.audiences_json}
                  onChange={(e) =>
                    updateAboutField("audiences_json", e.target.value)
                  }
                  className="border p-2 w-full rounded"
                  rows={3}
                />
              ) : (
                about?.audiences_json
              )}
            </td>
          </tr> */}

          <tr>
            <td className="p-3 font-semibold border">Quote</td>
            <td className="p-3 border">
              {aboutEdit ? (
                <input
                  value={aboutTemp.quote}
                  onChange={(e) => updateAboutField("quote", e.target.value)}
                  className="border p-2 w-full rounded"
                />
              ) : (
                about?.quote
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex gap-4 mt-5">
        {!aboutEdit ? (
          <>
            <button
              onClick={startAboutEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleAboutUndo}
              disabled={aboutHistory.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleAboutRedo}
              disabled={aboutRedo.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleAboutUpdate}
              disabled={!aboutCanUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleAboutSave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelAboutEdit}
              className="px-5 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* ================= INDUSTRIES SECTION ================= */}
      <h1 className="text-2xl font-bold mt-10 mb-6">Industries Section</h1>

      <div className="overflow-auto">
      <table className=" min-w-full border border-gray-300 divide-y bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">Main Title</th>
            <th className="p-3 border">Title</th>
            <th className="p-3 border">Description</th>
            <th className="p-3 border">Key Title</th>
            <th className="p-3 border">Key 1</th>
            <th className="p-3 border">Key 2</th>
            <th className="p-3 border">Key 3</th>
          </tr>
        </thead>

        <tbody>
          {indEdit
            ? indTemp.map((item, index) => (
                <tr key={item.id}>
                  <td className="p-3 border">
                    <input
                      value={item?.mainTitle || ""}
                      onChange={(e) =>
                        updateIndField(index, "mainTitle", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  </td>
                  <td className="p-3 border">
                    <input
                      value={item?.title || ""}
                      onChange={(e) =>
                        updateIndField(index, "title", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  </td>

                  <td className="p-3 border">
                    <textarea
                      value={item?.description || ""}
                      onChange={(e) =>
                        updateIndField(index, "description", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                      rows={3}
                    />
                  </td>


                  <td className="p-3 border">
                    <input
                      value={item?.keyTitle || ""}
                      onChange={(e) =>
                        updateIndField(index, "keyTitle", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  </td>

                  <td className="p-3 border">
                    <input
                      value={item?.key1 || ""}
                      onChange={(e) =>
                        updateIndField(index, "key1", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  </td>

                  <td className="p-3 border">
                    <input
                      value={item?.key2 || ""}
                      onChange={(e) =>
                        updateIndField(index, "key2", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  </td>

                  <td className="p-3 border">
                    <input
                      value={item?.key3 || ""}
                      onChange={(e) =>
                        updateIndField(index, "key3", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  </td>
                </tr>
              ))
            : industries?.map((item) => (
                <tr key={item.id}>
                  <td className="p-3 border">{item.mainTitle}</td>
                  <td className="p-3 border">{item.title}</td>
                  <td className="p-3 border">{item.description}</td>
                  <td className="p-3 border">{item.keyTitle}</td>
                  <td className="p-3 border">{item.key1}</td>
                  <td className="p-3 border">{item.key2}</td>
                  <td className="p-3 border">{item.key3}</td>
                </tr>
              ))}
        </tbody>
      </table>
      </div>

      <div className="flex gap-4 mt-5">
        {!indEdit ? (
          <>
            <button
              onClick={startIndEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleIndUndo}
              disabled={indHistory.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleIndRedo}
              disabled={indRedo.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleIndUpdate}
              disabled={!indCanUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleIndSave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelIndEdit}
              className="px-5 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* ================= SERVICE SECTION ================= */}
      <h1 className="text-2xl font-bold mt-10 mb-6">Service Section</h1>

      <table className="min-w-full border border-gray-300 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border w-16">ID</th>
            <th className="p-3 border w-60">Title</th>
            <th className="p-3 border w-60">Description</th>
            <th className="p-3 border">Service Text</th>
          </tr>
        </thead>

        <tbody>
          {(serviceEdit ? serviceTemp : services).map((item, index) => (
            <tr key={item.id} className="border">
              <td className="p-3 border">{item.id}</td>

              <td className="p-3 border">
                {serviceEdit ? (
                  <input
                    value={item?.title || ""}
                    onChange={(e) =>
                      updateServiceField(index, "title", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  item.title || "-"
                )}
              </td>

              <td className="p-3 border">
                {serviceEdit ? (
                  <textarea
                    value={item?.description || ""}
                    onChange={(e) =>
                      updateServiceField(index, "description", e.target.value)
                    }
                    rows={2}
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  item.description || "-"
                )}
              </td>

              <td className="p-3 border">
                {serviceEdit ? (
                  <textarea
                    value={item.serviceText || ""}
                    onChange={(e) =>
                      updateServiceField(index, "serviceText", e.target.value)
                    }
                    rows={2}
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  item.serviceText
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-4 mt-5">
        {!serviceEdit ? (
          <>
            <button
              onClick={startServiceEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleServiceUndo}
              disabled={serviceHistory.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleServiceRedo}
              disabled={serviceRedo.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleServiceUpdate}
              disabled={!serviceCanUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleServiceSave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelServiceEdit}
              className="px-5 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* ================= SOLUTIONS SECTION ================= */}
      <h1 className="text-2xl font-bold mt-10 mb-6">Solutions Section</h1>

      <table className="min-w-full border border-gray-300 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border w-16">ID</th>
            <th className="p-3 border w-60">Main Title</th>
            <th className="p-3 border w-60">Title</th>
            <th className="p-3 border">Description</th>
          </tr>
        </thead>

        <tbody>
          {(solEdit ? solTemp : solutions).map((item, index) => (
            <tr key={item.id} className="border">
              <td className="p-3 border">{item.id}</td>

              <td className="p-3 border">
                {solEdit ? (
                  <input
                    value={item.mainTitle || ""}
                    onChange={(e) =>
                      updateSolField(index, "mainTitle", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  item.mainTitle || "-"
                )}
              </td>

              <td className="p-3 border">
                {solEdit ? (
                  <input
                    value={item.title || ""}
                    onChange={(e) =>
                      updateSolField(index, "title", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  item.title || "-"
                )}
              </td>

              <td className="p-3 border">
                {solEdit ? (
                  <textarea
                    rows={2}
                    value={item.description || ""}
                    onChange={(e) =>
                      updateSolField(index, "description", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  item.description || "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-4 mt-5">
        {!solEdit ? (
          <>
            <button
              onClick={startSolEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleSolUndo}
              disabled={solHistory.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleSolRedo}
              disabled={solRedo.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleSolUpdate}
              disabled={!solCanUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSolSave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelSolEdit}
              className="px-5 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* ================= CTA SECTION ================= */}
      <h1 className="text-2xl font-bold mt-10 mb-6">CTA Section</h1>

      <table className="min-w-full border border-gray-300 bg-white">
        <tbody>
          <tr>
            <td className="p-3 font-semibold border w-40">Title</td>
            <td className="p-3 border">
              {ctaEdit ? (
                <input
                  value={ctaTemp.title || ""}
                  onChange={(e) => updateCtaField("title", e.target.value)}
                  className="border p-2 w-full rounded"
                />
              ) : (
                cta?.title
              )}
            </td>
          </tr>

          <tr>
            <td className="p-3 font-semibold border">Description</td>
            <td className="p-3 border">
              {ctaEdit ? (
                <textarea
                  value={ctaTemp.description || ""}
                  onChange={(e) =>
                    updateCtaField("description", e.target.value)
                  }
                  className="border p-2 w-full rounded"
                  rows={3}
                />
              ) : (
                cta?.description
              )}
            </td>
          </tr>

          <tr>
            <td className="p-3 font-semibold border">Button Text</td>
            <td className="p-3 border">
              {ctaEdit ? (
                <input
                  value={ctaTemp.buttonText || ""}
                  onChange={(e) => updateCtaField("buttonText", e.target.value)}
                  className="border p-2 w-full rounded"
                />
              ) : (
                cta?.buttonText
              )}
            </td>
          </tr>

          <tr>
            <td className="p-3 font-semibold border">Button Link</td>
            <td className="p-3 border">
              {ctaEdit ? (
                <input
                  value={ctaTemp.buttonLink || ""}
                  onChange={(e) => updateCtaField("buttonLink", e.target.value)}
                  className="border p-2 w-full rounded"
                />
              ) : (
                cta?.buttonLink
              )}
            </td>
          </tr>
        </tbody>
      </table>

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
}

export default HomePage;
