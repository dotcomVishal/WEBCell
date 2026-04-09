import { useEffect, useMemo, useState } from "react";
import "../components/gallery.css";

function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:5000/api/gallery");
        if (!res.ok) throw new Error(`Failed to fetch gallery: ${res.status}`);

        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Could not load gallery");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const clean = (v = "") => String(v).trim();

  const photos = useMemo(() => {
    return items
      .map((item, idx) => ({
        key: item?._id || `${idx}-${item?.imageUrl || "img"}`,
        imageUrl: clean(item?.imageUrl || ""),
        caption: clean(item?.description || item?.caption || "")
      }))
      .filter((p) => p.imageUrl);
  }, [items]);

  if (loading) {
    return (
      <section className="gallery-page">
        <h1 className="gallery-title">Gallery</h1>
        <p className="gallery-msg">Loading gallery...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="gallery-page">
        <h1 className="gallery-title">Gallery</h1>
        <p className="gallery-msg gallery-err">{error}</p>
      </section>
    );
  }

  return (
    <section className="gallery-page">
      <h1 className="gallery-title">Gallery</h1>

      <div className="gallery-masonry">
        {photos.map((photo) => (
          <figure className="gallery-item" key={photo.key}>
            <img src={photo.imageUrl} alt={photo.caption || "Gallery image"} loading="lazy" />
            {photo.caption && <figcaption>{photo.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Gallery;