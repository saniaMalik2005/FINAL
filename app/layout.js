import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FitLogProvider } from "@/context/FitLogContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>
          <Navbar />

          {children}

          <Footer />

          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#111111",
                color: "#ffffff",
                border: "1px solid #ccff00",
              },
            }}
          />
        </FitLogProvider>
      </body>
    </html>
  );
}