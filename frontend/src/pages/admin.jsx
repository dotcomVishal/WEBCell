import { useEffect, useMemo, useState } from "react";
import PixelBlast from "../components/PixelBlast";
import "../components/admin.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

function Admin() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });

  const [team, setTeam] = useState([]);
  const [projects, setProjects] = useState([]);
  const [gallery, setGallery] = useState([]);

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [teamForm, setTeamForm] = useState({
    id: "",
    Name: "",
    Role: "",
    linked: "",
    image: null
  });

  const [projectForm, setProjectForm] = useState({
    id: "",
    title: "",
    description: "",
    stack: "",
    githubUrl: "",
    liveUrl: "",
    image: null
  });

  const [galleryForm, setGalleryForm] = useState({
    description: "",
    image: null
  });

  const clean = (v = "") => String(v).trim();

  const getToken = () => localStorage.getItem("devcell_admin_token") || "";

  const authHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchAll = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      setStatusMsg("");

      const [teamRes, projectRes, galleryRes] = await Promise.all([
        fetch(`${API_BASE}/api/team`),
        fetch(`${API_BASE}/api/project`),
        fetch(`${API_BASE}/api/gallery`)
      ]);

      const teamData = teamRes.ok ? await teamRes.json() : [];
      const projectData = projectRes.ok ? await projectRes.json() : [];
      const galleryData = galleryRes.ok ? await galleryRes.json() : [];

      setTeam(Array.isArray(teamData) ? teamData : []);
      setProjects(Array.isArray(projectData) ? projectData : []);
      setGallery(Array.isArray(galleryData) ? galleryData : []);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    setIsAuthed(Boolean(token));
    setCheckingToken(false);
  }, []);

  useEffect(() => {
    if (!isAuthed) return;
    fetchAll();
  }, [isAuthed]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setErrorMsg("");
      setStatusMsg("Signing in...");

      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: clean(loginForm.username),
          password: loginForm.password
        })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.token) {
        throw new Error(data?.error || "Login failed");
      }

      localStorage.setItem("devcell_admin_token", data.token);
      setIsAuthed(true);
      setStatusMsg("Login successful.");
    } catch (err) {
      console.error(err);
      setStatusMsg("");
      setErrorMsg(err.message || "Invalid credentials.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("devcell_admin_token");
    setIsAuthed(false);
    setStatusMsg("");
    setErrorMsg("");
  };

  const sortedTeam = useMemo(
    () => [...team].sort((a, b) => Number(a?.id || 9999) - Number(b?.id || 9999)),
    [team]
  );

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => Number(a?.id || 9999) - Number(b?.id || 9999)),
    [projects]
  );

  const submitTeam = async (e) => {
    e.preventDefault();

    try {
      setStatusMsg("Saving team...");
      setErrorMsg("");

      const fd = new FormData();
      fd.append("id", String(Number(teamForm.id)));
      fd.append("Name", clean(teamForm.Name));
      fd.append("Role", clean(teamForm.Role));
      fd.append("linked", clean(teamForm.linked));
      if (teamForm.image) fd.append("image", teamForm.image);

      const res = await fetch(`${API_BASE}/api/team`, {
        method: "POST",
        headers: {
          ...authHeaders()
        },
        body: fd
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Team save failed");

      setTeamForm({
        id: "",
        Name: "",
        Role: "",
        linked: "",
        image: null
      });

      setStatusMsg("Team member saved.");
      fetchAll();
    } catch (err) {
      console.error(err);
      setStatusMsg("");
      setErrorMsg(err.message || "Could not save team member.");
    }
  };

  const submitProject = async (e) => {
    e.preventDefault();

    try {
      setStatusMsg("Saving project...");
      setErrorMsg("");

      const fd = new FormData();
      fd.append("id", String(Number(projectForm.id)));
      fd.append("title", clean(projectForm.title));
      fd.append("description", clean(projectForm.description));
      fd.append("stack", clean(projectForm.stack));
      fd.append("githubUrl", clean(projectForm.githubUrl));
      fd.append("liveUrl", clean(projectForm.liveUrl));
      if (projectForm.image) fd.append("image", projectForm.image);

      const res = await fetch(`${API_BASE}/api/project`, {
        method: "POST",
        headers: {
          ...authHeaders()
        },
        body: fd
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Project save failed");

      setProjectForm({
        id: "",
        title: "",
        description: "",
        stack: "",
        githubUrl: "",
        liveUrl: "",
        image: null
      });

      setStatusMsg("Project saved.");
      fetchAll();
    } catch (err) {
      console.error(err);
      setStatusMsg("");
      setErrorMsg(err.message || "Could not save project.");
    }
  };

  const submitGallery = async (e) => {
    e.preventDefault();

    try {
      setStatusMsg("Saving gallery photo...");
      setErrorMsg("");

      const fd = new FormData();
      fd.append("description", clean(galleryForm.description));
      if (galleryForm.image) fd.append("image", galleryForm.image);

      const res = await fetch(`${API_BASE}/api/gallery`, {
        method: "POST",
        headers: {
          ...authHeaders()
        },
        body: fd
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Gallery save failed");

      setGalleryForm({
        description: "",
        image: null
      });

      setStatusMsg("Gallery photo saved.");
      fetchAll();
    } catch (err) {
      console.error(err);
      setStatusMsg("");
      setErrorMsg(err.message || "Could not save gallery item.");
    }
  };

  if (checkingToken) {
    return (
      <section className="admin-page">
        <div className="admin-bg">
          <PixelBlast
            variant="square"
            pixelSize={5}
            color="#B19EEF"
            patternScale={1.5}
            patternDensity={0.35}
            pixelSizeJitter={0.4}
            enableRipples
            rippleSpeed={1.2}
            rippleThickness={0.12}
            rippleIntensityScale={1.4}
            liquid={false}
            speed={1.2}
            edgeFade={0.03}
            transparent
          />
        </div>

        <div className="admin-auth-card">
          <h1>DEV.cell Admin</h1>
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (!isAuthed) {
    return (
      <section className="admin-page">
        <div className="admin-bg">
          <PixelBlast
            variant="square"
            pixelSize={5}
            color="#B19EEF"
            patternScale={1.5}
            patternDensity={0.35}
            pixelSizeJitter={0.4}
            enableRipples
            rippleSpeed={1.2}
            rippleThickness={0.12}
            rippleIntensityScale={1.4}
            liquid={false}
            speed={1.2}
            edgeFade={0.03}
            transparent
          />
        </div>

        <div className="admin-auth-card">
          <h1>DEV.cell Admin</h1>
          <p>Sign in to continue</p>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="username"
              value={loginForm.username}
              onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
              required
            />

            <input
              type="password"
              placeholder="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              required
            />

            <button type="submit">Login</button>
          </form>

          {statusMsg && <span className="admin-status">{statusMsg}</span>}
          {errorMsg && <span className="admin-error">{errorMsg}</span>}
        </div>
      </section>
    );
  }

  return (
    <section className="admin-page">
      <div className="admin-bg">
        <PixelBlast
          variant="square"
          pixelSize={5}
          color="#B19EEF"
          patternScale={1.5}
          patternDensity={0.35}
          pixelSizeJitter={0.4}
          enableRipples
          rippleSpeed={1.2}
          rippleThickness={0.12}
          rippleIntensityScale={1.4}
          liquid={false}
          speed={1.2}
          edgeFade={0.03}
          transparent
        />
      </div>

      <div className="admin-wrap">
        <div className="admin-head">
          <h1>DEV.cell / devadmin</h1>

          <div className="admin-head-actions">
            <button onClick={fetchAll} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {statusMsg && <p className="admin-status">{statusMsg}</p>}
        {errorMsg && <p className="admin-error">{errorMsg}</p>}

        <div className="admin-grid">
          <section className="admin-panel">
            <h2>Team</h2>

            <form onSubmit={submitTeam} className="admin-form">
              <input
                placeholder="id"
                value={teamForm.id}
                onChange={(e) => setTeamForm({ ...teamForm, id: e.target.value })}
                required
              />
              <input
                placeholder="name"
                value={teamForm.Name}
                onChange={(e) => setTeamForm({ ...teamForm, Name: e.target.value })}
                required
              />
              <input
                placeholder="role"
                value={teamForm.Role}
                onChange={(e) => setTeamForm({ ...teamForm, Role: e.target.value })}
                required
              />
              <input
                placeholder="linked"
                value={teamForm.linked}
                onChange={(e) => setTeamForm({ ...teamForm, linked: e.target.value })}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setTeamForm({ ...teamForm, image: e.target.files?.[0] || null })}
              />
              <button type="submit">Save Team Member</button>
            </form>

            <div className="admin-list">
              {sortedTeam.map((m) => (
                <div className="admin-item" key={m._id || `${m.id}-${m.Name}`}>
                  <strong>{m.id}. {m.Name}</strong>
                  <span>{m.Role}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="admin-panel">
            <h2>Projects</h2>

            <form onSubmit={submitProject} className="admin-form">
              <input
                placeholder="id"
                value={projectForm.id}
                onChange={(e) => setProjectForm({ ...projectForm, id: e.target.value })}
                required
              />
              <input
                placeholder="title"
                value={projectForm.title}
                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                required
              />
              <textarea
                placeholder="description"
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                required
              />
              <input
                placeholder="stack (comma separated)"
                value={projectForm.stack}
                onChange={(e) => setProjectForm({ ...projectForm, stack: e.target.value })}
              />
              <input
                placeholder="githubUrl"
                value={projectForm.githubUrl}
                onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
              />
              <input
                placeholder="liveUrl"
                value={projectForm.liveUrl}
                onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProjectForm({ ...projectForm, image: e.target.files?.[0] || null })}
              />
              <button type="submit">Save Project</button>
            </form>

            <div className="admin-list">
              {sortedProjects.map((p) => (
                <div className="admin-item" key={p._id || `${p.id}-${p.title}`}>
                  <strong>{p.id}. {p.title}</strong>
                  <span>{p.description}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="admin-panel">
            <h2>Gallery</h2>

            <form onSubmit={submitGallery} className="admin-form">
              <textarea
                placeholder="description"
                value={galleryForm.description}
                onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.files?.[0] || null })}
              />
              <button type="submit">Add Gallery Photo</button>
            </form>

            <div className="admin-list">
              {gallery.map((g, i) => (
                <div className="admin-item" key={g._id || `${i}-${g.imageUrl}`}>
                  <strong>Photo {i + 1}</strong>
                  <span>{g.description}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Admin;
