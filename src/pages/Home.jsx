import { useState } from "react";
import { profile } from "../data/portfolioData";
import SnakeGame from "../components/SnakeGame";
import useMediaQuery from "../hooks/useMediaQuery";
import ShinyText from "../components/Animation/ShinyText";
import Cubes from "../components/Animation/Cube";

export default function Home() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [gameCompleted, setGameCompleted] = useState(false);

  const breadcrumbStyle = {
    padding: "0 18px",
    height: 32,
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #1c2634",
    fontSize: "12px",
    color: "#5eead4",
  };

  return (
    <>
      {/* mobile breadcrumb */}
      {!isDesktop && <div style={breadcrumbStyle}>_hello</div>}

      <div className="flex-1 flex flex-col md:grid md:grid-cols-2 gap-10 md:items-center px-4 md:px-12 py-6 md:py-10 min-h-0">
        {/* hero text — first on mobile, left on desktop */}
        <div className="order-1 md:order-1  ">
          <div className="mb-20 " >
            <div className="text-teal text-[14px] mb-[6px]">Hi all. I am</div>
            <div className="font-bold  text-[clamp(26px,6vw,38px)]  tracking-[-0.5px] text-text leading-[1.15] break-words">
              {/* {profile.name} */}
            <ShinyText 
              text={profile.name}
              speed={1.2}
              delay={0}
              color="#ffffff"
              shineColor="#000000"
              spread={45}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
            />
            </div>
            <div className="text-[#4fa8ff] text-[clamp(15px,2.5vw,18px)] mt-2">
              <span className="text-text-faint mr-[6px]">&gt;</span>
              {profile.title}
            </div>

            <div className="mt-[30px] md:mt-[40px] text-[clamp(12px,2.5vw,13px)] leading-[1.9] text-text-dim">
              {!gameCompleted && (
                <>
                  <div className="text-text-faint">
                    // scroll down and complete the game to continue
                  </div>
                  <div className="text-text-faint">// find my profile on Github:</div>
                  <div className="break-all opacity-40 select-none">
                    <span className="text-[#c792ea]">const</span> githubLink ={" "}
                    <span className="text-teal break-all">
                      "{profile.github}"
                    </span>
                  </div>
                </>
              )}
              {gameCompleted && (
                <>
                  <div className="text-text-faint">// find my profile on Github:</div>
                  <div className="break-all">
                    <span className="text-[#c792ea]">const</span> githubLink ={" "}
                    <span
                      className="text-teal underline cursor-pointer break-all"
                      onClick={() => window.open(profile.github, "_blank")}
                    >
                      "{profile.github}"
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-between sm:justify-start" style={{ height: '200px' }}>
            <Cubes 
              gridSize={4}
              maxAngle={45}
              radius={3}
              borderStyle="3px dashed #5eead4"
              faceColor="#1a1a2e"
              rippleColor="#c792ea"
              rippleSpeed={0.5}
              autoAnimate
              rippleOnClick
            />
          </div>
        </div>

        {/* game widget — second on mobile, right on desktop */}
        <div className="order-2 md:order-2 md:flex md:justify-center ">
          <SnakeGame
            onContinue={() => {}}
            onGameCompleted={() => setGameCompleted(true)}
          />
          
        </div>
        
      </div>
    </>
  );
}
