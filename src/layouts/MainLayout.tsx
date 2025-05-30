import { useState } from "react";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingFinished = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-300 relative">
      {isLoading ? (
        <LoadingScreen onFinished={handleLoadingFinished} />
      ) : (
        <>
          <Navbar />
          <main>{children}</main>
        </>
      )}
    </div>
  );
};

export default MainLayout;
