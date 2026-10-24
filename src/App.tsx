import React, { useState, useEffect } from "react";
import { Header } from "./components/layout/Header";
import { Hero } from "./components/hero/Hero";
import { ValueProp } from "./components/sections/ValueProp";
import { Courses } from "./components/sections/Courses";
import { Curriculum } from "./components/sections/Curriculum";
import { Team } from "./components/sections/Team";
import { Experience } from "./components/sections/Experience";
import { InstagramCommunity } from "./components/sections/InstagramCommunity";
import { FAQ } from "./components/sections/FAQ";
import { ContactCTA } from "./components/sections/ContactCTA";
import { Footer } from "./components/layout/Footer";
import { EnrollmentModal } from "./components/enrollment/EnrollmentModal";
import { PrivacyModal } from "./components/enrollment/PrivacyModal";
import { AdminApp } from "./components/admin/AdminApp";

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(undefined);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const openEnrollment = (courseId?: string) => {
    setSelectedCourseId(courseId);
    setIsEnrollModalOpen(true);
  };

  const closeEnrollment = () => {
    setIsEnrollModalOpen(false);
    setSelectedCourseId(undefined);
  };

  // Si la ruta es /admin, renderizar el Panel Administrativo Privado
  if (currentPath.startsWith("/admin")) {
    return <AdminApp />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF8] text-slate-900">
      <Header onOpenEnrollment={() => openEnrollment()} />
      <main className="flex-1">
        <Hero onOpenEnrollment={() => openEnrollment()} />
        <ValueProp />
        <Courses onOpenEnrollment={(id) => openEnrollment(id)} />
        <Curriculum />
        <Team />
        <Experience />
        <InstagramCommunity />
        <FAQ />
        <ContactCTA onOpenEnrollment={() => openEnrollment()} />
      </main>
      <Footer onOpenPrivacy={() => setIsPrivacyModalOpen(true)} />

      {/* Modal de Inscripción Global */}
      <EnrollmentModal
        isOpen={isEnrollModalOpen}
        onClose={closeEnrollment}
        preselectedCourseId={selectedCourseId}
      />

      {/* Modal de Política de Privacidad */}
      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
};

export default App;
