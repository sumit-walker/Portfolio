import { useState, useRef, useEffect, useCallback } from "react";
import useMediaQuery from "../hooks/useMediaQuery";

const CELL = 10;
const COLS = 15;
const ROWS = 18;
const FOOD_TARGET = 8;
const TICK_MS = 140;

function DPadButton({ label, onClick, disabled }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className="w-[38px] md:w-[26px] h-[38px] md:h-[26px] flex items-center justify-center rounded font-mono text-[14px] md:text-[11px]"
      style={{
        background: "#131a2e",
        border: "1px solid #2a3556",
        color: "#7c8aad",
        opacity: disabled ? 0.35 : 1,
        cursor: disabled ? "default" : "pointer",
      }}
    >
      {label}
    </button>
  );
}

function FoodDots({ eaten, total }) {
  return (
    <div className="flex gap-[6px] justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="w-[9px] h-[9px] rounded-full transition-all duration-200"
          style={{
            background: i < eaten ? "#4fd8c4" : "#2a3556",
            boxShadow: i < eaten ? "0 0 8px rgba(79, 216, 196, 0.35)" : "none",
          }}
        />
      ))}
    </div>
  );
}

export default function SnakeGame({ onContinue, onGameCompleted }) {
  const [won, setWon] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const canvasRef = useRef(null);
  const dirRef = useRef({ x: 0, y: -1 });
  const nextDirRef = useRef({ x: 0, y: -1 });
  const snakeRef = useRef([{ x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) }]);
  const foodRef = useRef({ x: 0, y: 0 });
  const intervalRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [eaten, setEaten] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const placeFood = useCallback(() => {
    let pos;
    do {
      pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    } while (snakeRef.current.some((s) => s.x === pos.x && s.y === pos.y));
    foodRef.current = pos;
  }, []);

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#0b1120";
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);

    ctx.fillStyle = "#4fa8ff";
    ctx.beginPath();
    ctx.arc(
      foodRef.current.x * CELL + CELL / 2,
      foodRef.current.y * CELL + CELL / 2,
      CELL / 2 - 1.5,
      0,
      Math.PI * 2
    );
    ctx.fill();

    snakeRef.current.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? "#7ff0dc" : "#4fd8c4";
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
    });
  }, []);

  const resetState = useCallback(() => {
    snakeRef.current = [{ x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) }];
    dirRef.current = { x: 0, y: -1 };
    nextDirRef.current = { x: 0, y: -1 };
    setEaten(0);
    placeFood();
    draw();
  }, [draw, placeFood]);

  const completed = useCallback(() => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setWon(true);
    setTimeout(() => setShowContinue(true), 600);
    onGameCompleted?.();
  }, [onGameCompleted]);

  const tick = useCallback(() => {
    dirRef.current = nextDirRef.current;
    const head = {
      x: snakeRef.current[0].x + dirRef.current.x,
      y: snakeRef.current[0].y + dirRef.current.y,
    };

    if (head.x < 0) head.x = COLS - 1;
    if (head.x >= COLS) head.x = 0;
    if (head.y < 0) head.y = ROWS - 1;
    if (head.y >= ROWS) head.y = 0;

    if (snakeRef.current.some((s) => s.x === head.x && s.y === head.y)) {
      resetState();
      return;
    }

    snakeRef.current = [head, ...snakeRef.current];

    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      setEaten((prev) => {
        const next = prev + 1;
        if (next >= FOOD_TARGET) {
          completed();
        } else {
          placeFood();
        }
        return next;
      });
    } else {
      snakeRef.current.pop();
    }

    draw();
  }, [draw, placeFood, resetState, completed]);

  const start = useCallback(() => {
    setWon(false);
    setShowContinue(false);
    resetState();
    setRunning(true);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(tick, TICK_MS);
  }, [resetState, tick]);

  const stop = useCallback(() => {
    clearInterval(intervalRef.current);
    setRunning(false);
  }, []);

  const handleStart = () => {
    setGameStarted(true);
    start();
  };

  const handlePlayAgain = () => {
    setWon(false);
    setShowContinue(false);
    setGameStarted(false);
    resetState();
  };

  const handleSkip = () => {
    stop();
    setGameStarted(true);
    setWon(true);
    setShowContinue(true);
    onGameCompleted?.();
  };

  const handleContinue = () => {
    onContinue?.();
    setWon(false);
    setShowContinue(false);
    setGameStarted(false);
    resetState();
  };

  const setDirection = useCallback((name) => {
    const map = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
    };
    const d = map[name];
    if (!d) return;
    const current = dirRef.current;
    if (snakeRef.current.length > 1 && d.x === -current.x && d.y === -current.y) return;
    nextDirRef.current = d;
  }, []);

  useEffect(() => {
    resetState();
    return () => clearInterval(intervalRef.current);
  }, []); // eslint-disable-line

  useEffect(() => {
    const handleKey = (e) => {
      const keyMap = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      };
      if (keyMap[e.key] && running) {
        e.preventDefault();
        setDirection(keyMap[e.key]);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [running, setDirection]);

  /* ---------- desktop layout ---------- */
  if (isDesktop) {
    return (
      <div className="shadow-lg shadow-cyan-500/60 flex gap-[18px] bg-[#10162a] border border-[#2a3556] rounded-[10px] p-5">
        <div className="relative w-[190px] bg-[#0b1120] border border-[#1e2740] rounded-[6px] p-[10px] flex flex-col items-center justify-center gap-[14px]">
          <canvas
            ref={canvasRef}
            width={COLS * CELL}
            height={ROWS * CELL}
            className="bg-[#0b1120] rounded"
            style={{ imageRendering: "pixelated" }}
          />
          <button
            onClick={handleStart}
            disabled={running}
            className="bg-[#f0a860] text-[#2b1a05] border-none font-mono font-bold text-[12px] px-[18px] py-2 rounded tracking-[0.02em]"
            style={{ cursor: running ? "not-allowed" : "pointer", opacity: running ? 0.5 : 1 }}
          >
            {gameStarted && !won ? "running..." : won ? "play-again" : "start-game"}
          </button>

          {won && (
            <div className="absolute inset-0 z-[2] bg-[rgba(10,14,23,0.92)] rounded-[6px] flex flex-col items-center justify-center text-center gap-[10px] p-5">
              <h3 className="text-[#4fd8c4] m-0 text-[16px]">// game complete</h3>
              <p className="text-[#7c8aad] text-[12px] m-0 max-w-[240px]">
                Nice work. You cleared the board.
              </p>
              {showContinue && (
                <button
                  onClick={handleContinue}
                  className="mt-2 bg-[#4fd8c4] text-[#06231d] border-none font-mono font-bold text-[11px] px-4 py-2 rounded cursor-pointer"
                >
                  continue →
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between min-w-[140px]">
          <div>
            <div className="text-[11px] text-[#4c5878] leading-[1.6] mb-[14px]">
              // use keyboard<br />// arrows to play
            </div>
            <div className="grid gap-[6px] mb-[22px]" style={{ gridTemplateColumns: "repeat(3, 26px)", gridTemplateRows: "repeat(2, 26px)" }}>
              <div style={{ gridColumn: 2, gridRow: 1 }}>
                <DPadButton label="▲" onClick={() => setDirection("up")} />
              </div>
              <div style={{ gridColumn: 1, gridRow: 2 }}>
                <DPadButton label="◀" onClick={() => setDirection("left")} />
              </div>
              <div style={{ gridColumn: 2, gridRow: 2 }}>
                <DPadButton label="▼" onClick={() => setDirection("down")} />
              </div>
              <div style={{ gridColumn: 3, gridRow: 2 }}>
                <DPadButton label="▶" onClick={() => setDirection("right")} />
              </div>
            </div>
          </div>

          <div>
            <div className="text-[11px] text-[#4c5878] mb-2">// food left</div>
            <FoodDots eaten={eaten} total={FOOD_TARGET} />
            <button
              onClick={handleSkip}
              className="bg-transparent border border-[#2a3556] text-[#7c8aad] font-mono text-[11px] px-4 mt-3 py-[6px] rounded cursor-pointer float-right hover:border-[#4fd8c4] hover:text-[#4fd8c4]"
            >
              skip
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- mobile layout ---------- */
  return (
    <div className="shadow-lg shadow-indigo-500/50 flex flex-col items-center gap-4 w-full bg-[#10162a] border border-[#2a3556] rounded-[10px] px-4 py-5">
      {/* canvas + win overlay */}
      <div className="relative w-full max-w-[200px] bg-[#0b1120] border border-[#1e2740] rounded-[6px] p-[10px] flex flex-col items-center">
        <canvas
          ref={canvasRef}
          width={COLS * CELL}
          height={ROWS * CELL}
          className="bg-[#0b1120] rounded mx-auto"
          style={{ imageRendering: "pixelated" }}
        />

        {won && (
          <div className="absolute inset-0 z-[2] bg-[rgba(10,14,23,0.92)] rounded-[6px] flex flex-col items-center justify-center text-center gap-[10px] p-5">
            <h3 className="text-[#4fd8c4] m-0 text-[16px]">// game complete</h3>
            <p className="text-[#7c8aad] text-[12px] m-0 max-w-[240px]">
              Nice work. You cleared the board.
            </p>
            {showContinue && (
              <button
                onClick={handleContinue}
                className="mt-2 bg-[#4fd8c4] text-[#06231d] border-none font-mono font-bold text-[12px] px-5 py-[10px] rounded cursor-pointer"
              >
                continue →
              </button>
            )}
          </div>
        )}
      </div>

      {/* instructions centered */}
      <div className="text-[12px] md:text-[11px] text-[#4c5878] leading-[1.6] text-center">
        // use keyboard<br />// arrows to play
      </div>

      {/* D-pad centered */}
      <div className="grid gap-[8px]" style={{ gridTemplateColumns: "repeat(3, 38px)", gridTemplateRows: "repeat(2, 38px)" }}>
        <div style={{ gridColumn: 2, gridRow: 1 }}>
          <DPadButton label="▲" onClick={() => setDirection("up")} disabled={!gameStarted || won} />
        </div>
        <div style={{ gridColumn: 1, gridRow: 2 }}>
          <DPadButton label="◀" onClick={() => setDirection("left")} disabled={!gameStarted || won} />
        </div>
        <div style={{ gridColumn: 2, gridRow: 2 }}>
          <DPadButton label="▼" onClick={() => setDirection("down")} disabled={!gameStarted || won} />
        </div>
        <div style={{ gridColumn: 3, gridRow: 2 }}>
          <DPadButton label="▶" onClick={() => setDirection("right")} disabled={!gameStarted || won} />
        </div>
      </div>

      {/* food dots centered */}
      <div className="text-center">
        <div className="text-[12px] text-[#4c5878] mb-2">// food left</div>
        <FoodDots eaten={eaten} total={FOOD_TARGET} />
      </div>

      {/* control row — single source of truth */}
      <div className="flex items-center justify-between w-full gap-3 mt-1">
        {!won ? (
          <button
            onClick={handleStart}
            disabled={running}
            className="bg-[#f0a860] text-[#2b1a05] border-none font-mono font-bold text-[13px] px-5 py-[10px] rounded flex-1"
            style={{ cursor: running ? "not-allowed" : "pointer", opacity: running ? 0.5 : 1 }}
          >
            {gameStarted ? "running..." : "start-game"}
          </button>
        ) : (
          <button
            onClick={handlePlayAgain}
            className="bg-[#f0a860] text-[#2b1a05] border-none font-mono font-bold text-[13px] px-5 py-[10px] rounded flex-1"
          >
            play-again
          </button>
        )}
        {!won && (
          <button
            onClick={handleSkip}
            className="bg-transparent border border-[#2a3556] text-[#7c8aad] font-mono text-[13px] px-5 py-[10px] rounded cursor-pointer hover:border-[#4fd8c4] hover:text-[#4fd8c4] flex-[0.5]"
          >
            skip
          </button>
        )}
      </div>
    </div>
  );
}
