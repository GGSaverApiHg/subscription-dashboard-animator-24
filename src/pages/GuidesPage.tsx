import { Header } from "@/components/Header";

const GuidesPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center mb-8">Installation Guide</h1>
          
          <div className="space-y-6">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Step 1: Connect Discord</h2>
              <p>Join our Discord server at: discord.gg/matrixregedit</p>
              <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200">⚠️ Warning: Make sure to join our Discord server first!</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Step 2: Download Panel</h2>
              <p>Download Matrix Panel from the download page</p>
              <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200">⚠️ Warning: Use our recommended Free Fire APK for External!</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Step 3: Install Emulator</h2>
              <p>Download and install a compatible emulator</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Recommended: GameLoop</li>
                <li>Alternative: MEmu Play</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuidesPage;