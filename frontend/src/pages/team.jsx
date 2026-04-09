import { useEffect, useMemo, useState } from "react";

import ProfileCard from "../components/ProfileCard";
import PagePixelBg from "../components/PagePixelBg";



function Team() {
  const [members, setMembers] = useState([]);



  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/team");
        const data = await res.json();

        setMembers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch team data:", err);
      }
    };

    fetchTeam();
  }, []);



  const cleanText = (value = "") =>
    String(value)
      .trim()
      .replace(/[;,.]+$/g, "")
      .replace(/\s+/g, " ");



  const cleanedMembers = useMemo(() => {
    return [...members]
      .sort((a, b) => Number(a?.id ?? 9999) - Number(b?.id ?? 9999))
      .slice(0, 6)
      .map((m, idx) => {
        const cleanName = cleanText(m?.Name || `Member ${idx + 1}`);
        const cleanRole = cleanText(m?.Role || "Team Member");
        const cleanLinked = String(m?.linked || "").trim();
        const cleanImage = String(m?.imageUrl || "").trim();

        return {
          key: m?._id || m?.id || idx,
          name: cleanName,
          role: cleanRole,
          handle:
            "@" +
            cleanName
              .toLowerCase()
              .replace(/[^a-z0-9 ]/g, "")
              .replace(/\s+/g, "")
              .slice(0, 16),
          linked: cleanLinked,
          imageUrl: cleanImage
        };
      });
  }, [members]);



  return (
    <section className="team-page page-with-bg">
      <PagePixelBg />

      <div className="page-content-layer">
        <h1 className="team-title">Team</h1>

        <div className="team-grid">
          {cleanedMembers.map((m) => (
            <ProfileCard
              key={m.key}
              name={m.name}
              title={m.role}
              handle={m.handle.replace("@", "")}
              status="Online"
              contactText="Contact Me"
              avatarUrl={m.imageUrl}
              miniAvatarUrl={m.imageUrl}
              showUserInfo
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => {
                if (!m.linked) return;
                window.open(m.linked, "_blank", "noopener,noreferrer");
              }}
              behindGlowColor="hsla(262, 85%, 72%, 0.6)"
              iconUrl="/assets/demo/iconpattern.png"
              behindGlowEnabled
              innerGradient="linear-gradient(145deg,hsla(262, 85%, 72%, 0.55) 0%,hsla(262, 85%, 72%, 0.27) 100%)"
            />
          ))}
        </div>
      </div>
    </section>
  );
}



export default Team;