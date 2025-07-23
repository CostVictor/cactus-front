"use client";

import useAuthState from "@/hooks/context/useAuth";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/navigation/Sidebar";
import Section from "@/components/layout/Section";

import DetailsPanel from "./_subcomponents/DetailsPanel";

const EmployeeContent = () => {
  return (
    <Section id="recordEmployee">
      <DetailsPanel />
    </Section>
  );
};

const ClientContent = () => {
  return <>Client</>;
};

export default function RecordPage() {
  const { user, isAuthenticated } = useAuthState();

  if (isAuthenticated) {
    return (
      <>
        <Header />
        <main>
          {user?.role === "employee" ? <EmployeeContent /> : <ClientContent />}
        </main>
        <Sidebar />
      </>
    );
  }

  return;
}
