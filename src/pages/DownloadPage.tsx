import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

const DownloadPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-2xl font-bold text-center">Matrix v18.6</h1>
          
          <div className="space-y-4">
            <Button variant="default" className="w-full">
              Download Exe
            </Button>
            
            <Button variant="secondary" className="w-full">
              Read Tutorial
            </Button>
          </div>

          <div className="space-y-4">
            <p className="text-center text-pink-500">
              You can use any APK(playstore,amazon) for Supreme,Essential and Streamer
            </p>
            <Button variant="default" className="w-full bg-teal-500 hover:bg-teal-600">
              Download FF for Supreme,Essential and Streamer
            </Button>
          </div>

          <div className="space-y-4">
            <p className="text-center text-pink-500">
              You must use our recommended free fire apk to use external
            </p>
            <Button variant="default" className="w-full bg-teal-500 hover:bg-teal-600">
              Download Recommended FF for External
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DownloadPage;