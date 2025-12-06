import React, { useEffect, useState } from "react";
// import axioss from "axioss";
import toast from "react-hot-toast";
import axioss from "../../axiosConfig";

const AboutPage = () => {
  // ================= ABOUT HERO SECTION STATE =================
  const [aboutHero, setAboutHero] = useState(null);
  const [aboutHeroTemp, setAboutHeroTemp] = useState({});
  const [aboutHeroLoading, setAboutHeroLoading] = useState(true);

  const [aboutHeroEdit, setAboutHeroEdit] = useState(false);

  const [aboutHeroHistory, setAboutHeroHistory] = useState([]);
  const [aboutHeroRedo, setAboutHeroRedo] = useState([]);
  const [aboutHeroCanUpdate, setAboutHeroCanUpdate] = useState(false);

  // ================= FETCH ABOUT HERO =================
  useEffect(() => {
    axioss
      .get("/api/about/hero")
      .then((res) => {
        setAboutHero(res.data); // API returns a single object
        setAboutHeroHistory([res.data]);
        setAboutHeroLoading(false);
      })
      .catch(() => setAboutHeroLoading(false));
  }, []);

  // ================= EDIT MODE =================
  const startAboutHeroEdit = () => {
    setAboutHeroTemp({ ...aboutHero });
    setAboutHeroEdit(true);
  };

  const cancelAboutHeroEdit = () => setAboutHeroEdit(false);

  const updateAboutHeroField = (field, value) => {
    setAboutHeroTemp((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ================= SAVE =================
  const handleAboutHeroSave = async () => {
    try {
      const res = await axioss.put(
        `/api/about/hero/${aboutHero.id}`,
        aboutHeroTemp
      );

      setAboutHero(res.data);
      setAboutHeroHistory((h) => [...h, res.data]);
      setAboutHeroRedo([]);
      setAboutHeroEdit(false);
      setAboutHeroCanUpdate(false);
      toast.success("Saved successfully.");
    } catch {
      toast.error("Failed to save hero changes.");
    }
  };

  // ================= UNDO =================
  const handleAboutHeroUndo = () => {
    if (aboutHeroHistory.length <= 1) return;

    const previous = aboutHeroHistory[aboutHeroHistory.length - 2];
    const current = aboutHeroHistory[aboutHeroHistory.length - 1];

    setAboutHero(previous);
    setAboutHeroHistory((h) => h.slice(0, -1));
    setAboutHeroRedo((r) => [current, ...r]);
    setAboutHeroCanUpdate(true);
  };

  // ================= REDO =================
  const handleAboutHeroRedo = () => {
    if (aboutHeroRedo.length === 0) return;

    const next = aboutHeroRedo[0];
    setAboutHero(next);
    setAboutHeroHistory((h) => [...h, next]);
    setAboutHeroRedo((r) => r.slice(1));
    setAboutHeroCanUpdate(true);
  };

  // ================= UPDATE =================
  const handleAboutHeroUpdate = async () => {
    try {
      const res = await axioss.put(
        `/api/about/hero/${aboutHero.id}`,
        aboutHero
      );

      setAboutHero(res.data);
      setAboutHeroHistory([res.data]);
      setAboutHeroRedo([]);
      setAboutHeroCanUpdate(false);
      toast.success("Updated successfully.");
    } catch {
      toast.error("Failed to update hero.");
    }
  };

  // ================= OUR MISSION SECTION STATE =================
  const [mission, setMission] = useState(null);
  const [missionTemp, setMissionTemp] = useState({});
  const [missionLoading, setMissionLoading] = useState(true);

  const [missionEdit, setMissionEdit] = useState(false);

  const [missionHistory, setMissionHistory] = useState([]);
  const [missionRedo, setMissionRedo] = useState([]);
  const [missionCanUpdate, setMissionCanUpdate] = useState(false);

  // ================= FETCH MISSION =================
  useEffect(() => {
    axioss
      .get("/api/about/mission")
      .then((res) => {
        setMission(res.data);
        setMissionHistory([res.data]);
        setMissionLoading(false);
      })
      .catch(() => setMissionLoading(false));
  }, []);

  // ================= EDIT MODE =================
  const startMissionEdit = () => {
    setMissionTemp({ ...mission });
    setMissionEdit(true);
  };

  const cancelMissionEdit = () => setMissionEdit(false);

  const updateMissionField = (field, value) => {
    setMissionTemp((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ================= SAVE =================
  const handleMissionSave = async () => {
    try {
      const res = await axioss.put(
        `/api/about/mission/${mission.id}`,
        missionTemp
      );

      setMission(res.data);
      setMissionHistory((h) => [...h, res.data]);
      setMissionRedo([]);
      setMissionEdit(false);
      setMissionCanUpdate(false);
      toast.success("Mission saved.");
    } catch {
      toast.error("Failed to save mission.");
    }
  };

  // ================= UNDO =================
  const handleMissionUndo = () => {
    if (missionHistory.length <= 1) return;

    const previous = missionHistory[missionHistory.length - 2];
    const current = missionHistory[missionHistory.length - 1];

    setMission(previous);
    setMissionHistory((h) => h.slice(0, -1));
    setMissionRedo((r) => [current, ...r]);
    setMissionCanUpdate(true);
  };

  // ================= REDO =================
  const handleMissionRedo = () => {
    if (missionRedo.length === 0) return;

    const next = missionRedo[0];
    setMission(next);
    setMissionHistory((h) => [...h, next]);
    setMissionRedo((r) => r.slice(1));
    setMissionCanUpdate(true);
  };

  // ================= UPDATE =================
  const handleMissionUpdate = async () => {
    try {
      const res = await axioss.put(
        `/api/about/mission/${mission.id}`,
        mission
      );

      setMission(res.data);
      setMissionHistory([res.data]);
      setMissionRedo([]);
      setMissionCanUpdate(false);
      toast.success("Mission updated.");
    } catch {
      toast.error("Failed to update mission.");
    }
  };

  // ================= ABOUT VALUES SECTION STATE =================
  const [values, setValues] = useState(null);
  const [valuesTemp, setValuesTemp] = useState({});
  const [valuesLoading, setValuesLoading] = useState(true);

  const [valuesEdit, setValuesEdit] = useState(false);

  const [valuesHistory, setValuesHistory] = useState([]);
  const [valuesRedo, setValuesRedo] = useState([]);
  const [valuesCanUpdate, setValuesCanUpdate] = useState(false);

  // ================= FETCH VALUES =================
  useEffect(() => {
    axioss
      .get("/api/about/values")
      .then((res) => {
        setValues(res.data);
        setValuesHistory([res.data]);
        setValuesLoading(false);
      })
      .catch(() => setValuesLoading(false));
  }, []);

  // ================= EDIT MODE =================
  const startValuesEdit = () => {
    setValuesTemp({ ...values });
    setValuesEdit(true);
  };

  const cancelValuesEdit = () => setValuesEdit(false);

  const updateValuesField = (field, value) => {
    setValuesTemp((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ================= SAVE =================
  const handleValuesSave = async () => {
    try {
      const res = await axioss.put(
        `/api/about/values/${values.id}`,
        valuesTemp
      );

      setValues(res.data);
      setValuesHistory((h) => [...h, res.data]);
      setValuesRedo([]);
      setValuesEdit(false);
      setValuesCanUpdate(false);
      toast.success("Saved successfully.");
    } catch {
      toast.error("Failed to save values.");
    }
  };

  // ================= UNDO =================
  const handleValuesUndo = () => {
    if (valuesHistory.length <= 1) return;

    const previous = valuesHistory[valuesHistory.length - 2];
    const current = valuesHistory[valuesHistory.length - 1];

    setValues(previous);
    setValuesHistory((h) => h.slice(0, -1));
    setValuesRedo((r) => [current, ...r]);
    setValuesCanUpdate(true);
  };

  // ================= REDO =================
  const handleValuesRedo = () => {
    if (valuesRedo.length === 0) return;

    const next = valuesRedo[0];
    setValues(next);
    setValuesHistory((h) => [...h, next]);
    setValuesRedo((r) => r.slice(1));
    setValuesCanUpdate(true);
  };

  // ================= UPDATE =================
  const handleValuesUpdate = async () => {
    try {
      const res = await axioss.put(
        `/api/about/values/${values.id}`,
        values
      );

      setValues(res.data);
      setValuesHistory([res.data]);
      setValuesRedo([]);
      setValuesCanUpdate(false);
      toast.success("Updated successfully.");
    } catch {
      toast.error("Failed to update values.");
    }
  };

  // ================= ABOUT VALUES CARDS SECTION STATE =================
  const [valueCards, setValueCards] = useState([]);
  const [valueCardsTemp, setValueCardsTemp] = useState([]);
  const [valueCardsLoading, setValueCardsLoading] = useState(true);

  const [valueCardsEdit, setValueCardsEdit] = useState(false);

  const [valueCardsHistory, setValueCardsHistory] = useState([]);
  const [valueCardsRedo, setValueCardsRedo] = useState([]);
  const [valueCardsCanUpdate, setValueCardsCanUpdate] = useState(false);

  // ================= FETCH VALUE CARDS =================
  useEffect(() => {
    axioss
      .get("/api/about/cards")
      .then((res) => {
        setValueCards(res.data);
        setValueCardsHistory([res.data]);
        setValueCardsLoading(false);
      })
      .catch(() => setValueCardsLoading(false));
  }, []);

  // ================= EDIT MODE =================
  const startValueCardsEdit = () => {
    setValueCardsTemp(JSON.parse(JSON.stringify(valueCards)));
    setValueCardsEdit(true);
  };

  const cancelValueCardsEdit = () => setValueCardsEdit(false);

  const updateValueCardsField = (index, field, value) => {
    const updated = [...valueCardsTemp];
    updated[index][field] = value;
    setValueCardsTemp(updated);
  };

  // ================= SAVE =================
  const handleValueCardsSave = async () => {
    try {
      const updatedList = [];

      for (const item of valueCardsTemp) {
        const res = await axioss.put(
          `/api/about/cards/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }

      setValueCards(updatedList);
      setValueCardsHistory((h) => [...h, updatedList]);
      setValueCardsRedo([]);
      setValueCardsEdit(false);
      setValueCardsCanUpdate(false);
      toast.success("Saved successfully.");
    } catch {
      toast.error("Failed to save cards.");
    }
  };

  // ================= UNDO =================
  const handleValueCardsUndo = () => {
    if (valueCardsHistory.length <= 1) return;

    const previous = valueCardsHistory[valueCardsHistory.length - 2];
    const current = valueCardsHistory[valueCardsHistory.length - 1];

    setValueCards(previous);
    setValueCardsHistory((h) => h.slice(0, -1));
    setValueCardsRedo((r) => [current, ...r]);
    setValueCardsCanUpdate(true);
  };

  // ================= REDO =================
  const handleValueCardsRedo = () => {
    if (valueCardsRedo.length === 0) return;

    const next = valueCardsRedo[0];
    setValueCards(next);
    setValueCardsHistory((h) => [...h, next]);
    setValueCardsRedo((r) => r.slice(1));
    setValueCardsCanUpdate(true);
  };

  // ================= UPDATE =================
  const handleValueCardsUpdate = async () => {
    try {
      const updatedList = [];

      for (const item of valueCards) {
        const res = await axioss.put(
          `/api/about/cards/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }

      setValueCards(updatedList);
      setValueCardsHistory([updatedList]);
      setValueCardsRedo([]);
      setValueCardsCanUpdate(false);
      toast.success("Updated successfully.");
    } catch {
      toast.error("Update successfully.");
    }
  };

  // ================= ABOUT CTA SECTION STATE =================
  const [aboutCTA, setAboutCTA] = useState([]);
  const [aboutCTATemp, setAboutCTATemp] = useState([]);
  const [aboutCTALoading, setAboutCTALoading] = useState(true);

  const [aboutCTAEdit, setAboutCTAEdit] = useState(false);

  const [aboutCTAHistory, setAboutCTAHistory] = useState([]);
  const [aboutCTARedo, setAboutCTARedo] = useState([]);
  const [aboutCTACanUpdate, setAboutCTACanUpdate] = useState(false);

  // ================= FETCH CTA =================
  useEffect(() => {
    axioss
      .get("/api/about/cta")
      .then((res) => {
        setAboutCTA(res.data);
        setAboutCTAHistory([res.data]);
        setAboutCTALoading(false);
        console.log(res.data);
      })
      .catch(() => setAboutCTALoading(false));
  }, []);

  // ================= EDIT MODE =================
  const startAboutCTAEdit = () => {
    setAboutCTATemp(JSON.parse(JSON.stringify(aboutCTA)));
    setAboutCTAEdit(true);
  };

  const cancelAboutCTAEdit = () => setAboutCTAEdit(false);

  const updateAboutCTAField = (index, field, value) => {
    const updated = [...aboutCTATemp];
    updated[index][field] = value;
    setAboutCTATemp(updated);
  };

  // ================= SAVE =================
  const handleAboutCTASave = async () => {
    try {
      const updatedList = [];

      for (const item of aboutCTATemp) {
        const res = await axioss.put(
          `/api/about/cta/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }

      setAboutCTA(updatedList);
      setAboutCTAHistory((h) => [...h, updatedList]);
      setAboutCTARedo([]);
      setAboutCTAEdit(false);
      setAboutCTACanUpdate(false);
      toast.success("Saved successfully.");
    } catch {
      toast.error("Failed to save CTA.");
    }
  };

  // ================= UNDO =================
  const handleAboutCTAUndo = () => {
    if (aboutCTAHistory.length <= 1) return;

    const previous = aboutCTAHistory[aboutCTAHistory.length - 2];
    const current = aboutCTAHistory[aboutCTAHistory.length - 1];

    setAboutCTA(previous);
    setAboutCTAHistory((h) => h.slice(0, -1));
    setAboutCTARedo((r) => [current, ...r]);
    setAboutCTACanUpdate(true);
  };

  // ================= REDO =================
  const handleAboutCTARedo = () => {
    if (aboutCTARedo.length === 0) return;

    const next = aboutCTARedo[0];
    setAboutCTA(next);
    setAboutCTAHistory((h) => [...h, next]);
    setAboutCTARedo((r) => r.slice(1));
    setAboutCTACanUpdate(true);
  };

  // ================= UPDATE =================
  const handleAboutCTAUpdate = async () => {
    try {
      const updatedList = [];

      for (const item of aboutCTA) {
        const res = await axioss.put(
          `/api/about/cta/${item.id}`,
          item
        );
        updatedList.push(res.data);
      }

      setAboutCTA(updatedList);
      setAboutCTAHistory([updatedList]);
      setAboutCTARedo([]);
      setAboutCTACanUpdate(false);
      toast.success("Updated successfully.");
    } catch {
      toast.error("Failed to update CTA.");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">About Page</h1>
      {/* ================= ABOUT HERO SECTION ================= */}
      <h2 className="text-2xl font-bold mt-10 mb-6">Hero Section</h2>

      {aboutHeroLoading ? (
        <p>Loading...</p>
      ) : !aboutHero ? (
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
            <tr className="border">
              <td className="p-3 border">{aboutHero.id}</td>

              {/* Title */}
              <td className="p-3 border">
                {aboutHeroEdit ? (
                  <input
                    value={aboutHeroTemp.title || ""}
                    onChange={(e) =>
                      updateAboutHeroField("title", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  aboutHero.title
                )}
              </td>

              {/* Description */}
              <td className="p-3 border">
                {aboutHeroEdit ? (
                  <textarea
                    rows={3}
                    value={aboutHeroTemp.description || ""}
                    onChange={(e) =>
                      updateAboutHeroField("description", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  <pre className="whitespace-pre-wrap">
                    {aboutHero.description}
                  </pre>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* ================= BUTTONS ================= */}
      <div className="flex gap-4 mt-5">
        {!aboutHeroEdit ? (
          <>
            <button
              onClick={startAboutHeroEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleAboutHeroUndo}
              disabled={aboutHeroHistory.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleAboutHeroRedo}
              disabled={aboutHeroRedo.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleAboutHeroUpdate}
              disabled={!aboutHeroCanUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleAboutHeroSave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelAboutHeroEdit}
              className="px-5 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* ================= OUR MISSION SECTION ================= */}
      <h2 className="text-2xl font-bold mt-10 mb-6">Our Mission Section</h2>

      {missionLoading ? (
        <p>Loading...</p>
      ) : !mission ? (
        <p>No mission data found.</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border w-16">ID</th>
              <th className="p-3 border w-64">Title</th>
              <th className="p-3 border w-64">Button Text</th>
              <th className="p-3 border w-64">Button Link</th>
              <th className="p-3 border w-72">Image URL</th>
              <th className="p-3 border">Description 1</th>
              <th className="p-3 border">Description 2</th>
              {/* <th className="p-3 border w-52">Updated At</th> */}
            </tr>
          </thead>

          <tbody>
            <tr className="border">
              <td className="p-3 border">{mission.id}</td>

              {/* TITLE */}
              <td className="p-3 border">
                {missionEdit ? (
                  <input
                    value={missionTemp.title || ""}
                    onChange={(e) =>
                      updateMissionField("title", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  mission.title
                )}
              </td>

              {/* BUTTON TEXT */}
              <td className="p-3 border">
                {missionEdit ? (
                  <input
                    value={missionTemp.buttonText || ""}
                    onChange={(e) =>
                      updateMissionField("buttonText", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  mission.buttonText
                )}
              </td>

              {/* BUTTON LINK */}
              <td className="p-3 border">
                {missionEdit ? (
                  <input
                    value={missionTemp.buttonLink || ""}
                    onChange={(e) =>
                      updateMissionField("buttonLink", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  mission.buttonLink
                )}
              </td>

              {/* IMAGE URL */}
              <td className="p-3 border">
                {missionEdit ? (
                  <input
                    value={missionTemp.imageUrl || ""}
                    onChange={(e) =>
                      updateMissionField("imageUrl", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  <img
                    src={mission.imageUrl}
                    alt="Mission"
                    className="w-16 h-16 object-contain mx-auto"
                  />
                )}
              </td>

              {/* DESCRIPTION 1 */}
              <td className="p-3 border">
                {missionEdit ? (
                  <textarea
                    rows={3}
                    value={missionTemp.description1 || ""}
                    onChange={(e) =>
                      updateMissionField("description1", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  mission.description1 || "-"
                )}
              </td>

              {/* DESCRIPTION 2 */}
              <td className="p-3 border">
                {missionEdit ? (
                  <textarea
                    rows={3}
                    value={missionTemp.description2 || ""}
                    onChange={(e) =>
                      updateMissionField("description2", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  mission.description2 || "-"
                )}
              </td>

              {/* UPDATED AT */}
              {/* <td className="p-3 border text-gray-600">
                {new Date(mission.updatedAt).toLocaleString()}
              </td> */}
            </tr>
          </tbody>
        </table>
      )}

      {/* ================= BUTTONS ================= */}
      <div className="flex gap-4 mt-5">
        {!missionEdit ? (
          <>
            <button
              onClick={startMissionEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleMissionUndo}
              disabled={missionHistory.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleMissionRedo}
              disabled={missionRedo.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleMissionUpdate}
              disabled={!missionCanUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleMissionSave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelMissionEdit}
              className="px-5 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* ================= VALUES SECTION ================= */}
      <h2 className="text-2xl font-bold mt-10 mb-6">Values Section</h2>

      {valuesLoading ? (
        <p>Loading...</p>
      ) : !values ? (
        <p>No values data found.</p>
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
              <td className="p-3 border">{values.id}</td>

              {/* Title */}
              <td className="p-3 border">
                {valuesEdit ? (
                  <input
                    value={valuesTemp.title || ""}
                    onChange={(e) => updateValuesField("title", e.target.value)}
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  values.title
                )}
              </td>

              {/* Description */}
              <td className="p-3 border">
                {valuesEdit ? (
                  <textarea
                    rows={3}
                    value={valuesTemp.description || ""}
                    onChange={(e) =>
                      updateValuesField("description", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                ) : (
                  <pre className="whitespace-pre-wrap">
                    {values.description}
                  </pre>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* ================= BUTTONS ================= */}
      <div className="flex gap-4 mt-5">
        {!valuesEdit ? (
          <>
            <button
              onClick={startValuesEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleValuesUndo}
              disabled={valuesHistory.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleValuesRedo}
              disabled={valuesRedo.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleValuesUpdate}
              disabled={!valuesCanUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleValuesSave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelValuesEdit}
              className="px-5 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* ================= VALUE CARDS SECTION ================= */}
      <h2 className="text-2xl font-bold mt-10 mb-6">Values Cards Section</h2>

      {valueCardsLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border w-16">ID</th>
              <th className="p-3 border w-64">Title</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border w-48">Icon</th>
            </tr>
          </thead>

          <tbody>
            {(valueCardsEdit ? valueCardsTemp : valueCards).map(
              (item, index) => (
                <tr key={item.id} className="border">
                  <td className="p-3 border">{item.id}</td>

                  {/* Title */}
                  <td className="p-3 border">
                    {valueCardsEdit ? (
                      <input
                        value={item.title || ""}
                        onChange={(e) =>
                          updateValueCardsField(index, "title", e.target.value)
                        }
                        className="border p-2 w-full rounded"
                      />
                    ) : (
                      item.title
                    )}
                  </td>

                  {/* Description */}
                  <td className="p-3 border">
                    {valueCardsEdit ? (
                      <textarea
                        rows={3}
                        value={item.description || ""}
                        onChange={(e) =>
                          updateValueCardsField(
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

                  {/* Icon */}
                  <td className="p-3 border">
                    {valueCardsEdit ? (
                      <input
                        value={item.icon || ""}
                        onChange={(e) =>
                          updateValueCardsField(index, "icon", e.target.value)
                        }
                        className="border p-2 w-full rounded"
                      />
                    ) : (
                      item.icon
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}

      {/* ================= BUTTONS ================= */}
      <div className="flex gap-4 mt-5">
        {!valueCardsEdit ? (
          <>
            <button
              onClick={startValueCardsEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleValueCardsUndo}
              disabled={valueCardsHistory.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleValueCardsRedo}
              disabled={valueCardsRedo.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleValueCardsUpdate}
              disabled={!valueCardsCanUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleValueCardsSave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelValueCardsEdit}
              className="px-5 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* ================= ABOUT CTA SECTION ================= */}
      <h2 className="text-2xl font-bold mt-10 mb-6">
        About Page - CTA Section
      </h2>

      {aboutCTALoading ? (
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
            </tr>
          </thead>

          <tbody>
            {(aboutCTAEdit ? aboutCTATemp : aboutCTA).map((item, index) => (
              <tr key={item.id} className="border">
                <td className="p-3 border">{item.id}</td>

                {/* Title */}
                <td className="p-3 border">
                  {aboutCTAEdit ? (
                    <input
                      value={item.title || ""}
                      onChange={(e) =>
                        updateAboutCTAField(index, "title", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    item.title
                  )}
                </td>

                {/* Description */}
                <td className="p-3 border">
                  {aboutCTAEdit ? (
                    <textarea
                      rows={3}
                      value={item.description || ""}
                      onChange={(e) =>
                        updateAboutCTAField(
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

                {/* Button Text */}
                <td className="p-3 border">
                  {aboutCTAEdit ? (
                    <input
                      value={item.buttonText || ""}
                      onChange={(e) =>
                        updateAboutCTAField(index, "buttonText", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    item.buttonText
                  )}
                </td>

                {/* Button Link */}
                <td className="p-3 border">
                  {aboutCTAEdit ? (
                    <input
                      value={item.buttonLink || ""}
                      onChange={(e) =>
                        updateAboutCTAField(index, "buttonLink", e.target.value)
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

      {/* ================= BUTTONS ================= */}
      <div className="flex gap-4 mt-5">
        {!aboutCTAEdit ? (
          <>
            <button
              onClick={startAboutCTAEdit}
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleAboutCTAUndo}
              disabled={aboutCTAHistory.length <= 1}
              className="px-5 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Undo
            </button>

            <button
              onClick={handleAboutCTARedo}
              disabled={aboutCTARedo.length === 0}
              className="px-5 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              Redo
            </button>

            <button
              onClick={handleAboutCTAUpdate}
              disabled={!aboutCTACanUpdate}
              className="px-5 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleAboutCTASave}
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={cancelAboutCTAEdit}
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

export default AboutPage;
