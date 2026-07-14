import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import PixelBlast from "./Animation/BgPixelBlast";
export default function Layout() {
  return (
   <div
      className="font-mono bg-bg text-text rounded-[10px] border border-border overflow-hidden min-h-[740px] flex flex-col relative"
      style={{ fontFamily: "'JetBrains Mono','Fira Code',ui-monospace,'SFMono-Regular',Menlo,Consolas,monospace" }}
    >
      {/* teal-purple glow behind game panel */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: "50%",
          right: "8%",
          width: "600px",
          height: "600px",
          transform: "translateY(-50%)",
          background:
            "radial-gradient(circle at 35% 30%, rgba(79,216,196,0.55) 0%, rgba(79,216,196,0.25) 25%, transparent 55%), radial-gradient(circle at 65% 70%, rgba(124,92,255,0.45) 0%, rgba(124,92,255,0.2) 30%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      {/* vertical stripes across the whole page */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 34px)",
        }}
      />

      <Header />

      <div className="relative z-[1] flex-1 flex flex-col min-h-0">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
