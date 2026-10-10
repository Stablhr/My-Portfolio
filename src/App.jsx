import { useState, useEffect, useRef } from "react";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { BackgroundGlow } from "./components/layout/BackgroundGlow";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Resume } from "./components/sections/Resume";
import { Contact } from "./components/sections/Contact";
import { OptionsModal } from "./components/sections/OptionsModal";
import { ExitModal } from "./components/sections/ExitModal";
import { OptionsProvider } from "./context/OptionsContext";

const SECTION_IDS = ["home", "about", "projects", "resume", "contact"];

function AppContent() {
  const activeSection = useScrollSpy(SECTION_IDS);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const homeRef = useRef(null);

  const handleStart = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOptions = () => setOptionsOpen(true);
  const handleExit = () => setExitOpen(true);

  return (
    <>
      <BackgroundGlow />
      <Navbar activeSection={activeSection} />
      <main id="main" role="main">
        <Home
          ref={homeRef}
          onStart={handleStart}
          onOptions={handleOptions}
          onExit={handleExit}
        />
        <About />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <OptionsModal open={optionsOpen} onClose={() => setOptionsOpen(false)} />
      <ExitModal open={exitOpen} onClose={() => setExitOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <OptionsProvider>
      <AppContent />
    </OptionsProvider>
  );
}