import { useEffect, useMemo, useState } from "react";

import PagePixelBg from "../components/PagePixelBg";

import "../components/projects.css";



function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:5000/api/project");

        if (!res.ok) {
          throw new Error(`Failed to fetch projects: ${res.status}`);
        }

        const data = await res.json();

        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Could not load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const toAbsoluteUrl = (raw = "") => {
  const v = String(raw).trim();
  if (!v) return "";
  if (/^https?:\/\//i.test(v)) return v;
  return `https://${v}`;
};


  const cleanText = (value = "") =>
    String(value).trim().replace(/\s+/g, " ");



  const visibleProjects = useMemo(() => {
    return [...projects]
      .filter((p) => Number.isInteger(Number(p?.id)))
      .filter((p) => Number(p.id) >= 1 && Number(p.id) <= 10)
      .sort((a, b) => Number(a.id) - Number(b.id))
      .map((p) => ({
        key: p?._id || p?.id,
        id: Number(p.id),
        title: cleanText(p?.title || "Untitled Project"),
        description: cleanText(p?.description || "No description provided."),
        stack: Array.isArray(p?.stack) ? p.stack.filter(Boolean) : [],
        imageUrl: toAbsoluteUrl(p?.imageUrl || ""),
        githubUrl: toAbsoluteUrl(p?.githubUrl || ""),
        liveUrl: toAbsoluteUrl(p?.liveUrl || "")
      }));
  }, [projects]);



  if (loading) {
    return (
      <section className="projects-page page-with-bg">
        <PagePixelBg />

        <div className="page-content-layer">
          <h1 className="projects-title">Projects</h1>
          <p className="projects-msg">Loading projects...</p>
        </div>
      </section>
    );
  }



  if (error) {
    return (
      <section className="projects-page page-with-bg">
        <PagePixelBg />

        <div className="page-content-layer">
          <h1 className="projects-title">Projects</h1>
          <p className="projects-msg projects-err">{error}</p>
        </div>
      </section>
    );
  }



  return (
    <section className="projects-page page-with-bg">
      <PagePixelBg />

      <div className="page-content-layer">
        <h1 className="projects-title">Projects</h1>

        <div className="projects-list">
          {visibleProjects.map((p) => (
            <article key={p.key} className="project-screen">
              <div className="project-card">
                <div className="project-image-wrap">
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="project-image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="project-image-fallback">No Image</div>
                  )}
                </div>

                <div className="project-content">
                  <h2 className="project-name">{p.title}</h2>

                  <p className="project-description">{p.description}</p>

                  <div className="project-stack">
                    {p.stack.length > 0 ? (
                      p.stack.map((tech, idx) => (
                        <span key={`${p.id}-${tech}-${idx}`} className="stack-chip">
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="stack-chip">No stack added</span>
                    )}
                  </div>

                  <div className="project-links">
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link"
                      >
                        GitHub
                      </a>
                    )}

                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link"
                      >
                        Live URL
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}



export default Projects;