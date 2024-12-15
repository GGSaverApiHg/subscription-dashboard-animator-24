import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { Footer } from "@/components/Footer";

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;