import { Routes, Route } from "react-router-dom";
import AnimatedCursor from "react-animated-cursor";

import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Team from "./pages/team";
import Projects from "./pages/projects";
import Gallery from "./components/gallery";
import Admin from "./pages/admin";
function App() {
  return (
    <div className="hi">
      <AnimatedCursor
        innerSize={10}
        outerSize={0}
        color="177,158,239"
        innerScale={1}
        trailingSpeed={12}
        innerStyle={{
          borderRadius: "2px",
          boxShadow: `
            0 0 8px rgba(177,158,239,0.8),
            0 0 16px rgba(177,158,239,0.45),
            0 0 24px rgba(177,158,239,0.2)
          `
        }}
        clickables={[
          "a",
          "button",
          ".HoverLetters span",
          ".navbar h1"
        ]}
      />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/devadmin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;