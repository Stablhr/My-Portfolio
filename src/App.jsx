import { useScrollSpy } from "./hooks/useScrollSpy";
import { BackgroundGlow } from "./components/layout/BackgroundGlow";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Resume } from "./components/sections/Resume";
import { Contact } from "./components/sections/Contact";

const SECTION_IDS = ["home", "about", "projects", "resume", "contact"];

export default function App() {
  const activeSection = useScrollSpy(SECTION_IDS);

  return (
    <>
      <BackgroundGlow />
      <Navbar activeSection={activeSection} />
      <main id="main" role="main">
        <Home />
        <About />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
