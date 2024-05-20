import AboutSection from "./components/Sections/AboutSection";
import ContactSection from "./components/Sections/ContactSection";
import { HeroSection } from "./components/Sections/HeroSection";
import Navbar from "./components/Navbar";
import ProjectSection from "./components/Sections/ProjectSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <link rel="icon" href="/icons/icon.ico" sizes="any" />
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <ContactSection />
      </div>
    </main>
  );
}
