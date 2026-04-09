import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";

function Team() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        // ADD YOUR BACKEND API LINK HERE
        const res = await fetch("http://localhost:5000/api/team");

        const data = await res.json();
        setMembers(data);
      } catch (err) {
        console.error("Failed to fetch team data:", err);
      }
    };

    fetchTeam();
  }, []);

  return (
    <section className="team-page">
      <h1 className="team-title">Team</h1>

      <div className="team-grid">
        {members.map((m) => (
          <ProfileCard
            key={m._id || m.id}
            name={m.Name}
            title={m.Role}
            handle={m.linked}
            status="Online"
            contactText="Contact Me"
            avatarUrl={m.imageUrl}
            showUserInfo
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => window.open(m.linked, "_blank")}
            behindGlowColor="hsla(12, 100%, 70%, 0.6)"
            iconUrl="/assets/demo/iconpattern.png"
            behindGlowEnabled
            innerGradient="linear-gradient(145deg,hsla(12, 40%, 45%, 0.55) 0%,hsla(120, 60%, 70%, 0.27) 100%)"
          />
        ))}
      </div>
    </section>
  );
}

export default Team;