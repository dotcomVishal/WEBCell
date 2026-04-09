import { useEffect, useMemo, useRef, useState } from "react";
import "./TerminalSection.css";

const GRID_SIZE = 16;
const TICK_MS = 140;

const keyToDir = (key) => {
  if (key === "ArrowUp" || key === "w") return { x: 0, y: -1 };
  if (key === "ArrowDown" || key === "s") return { x: 0, y: 1 };
  if (key === "ArrowLeft" || key === "a") return { x: -1, y: 0 };
  if (key === "ArrowRight" || key === "d") return { x: 1, y: 0 };
  return null;
};

const sameDir = (a, b) => a.x === b.x && a.y === b.y;

function TerminalSection() {
  const [lines, setLines] = useState([
    
    "available commands:",
    "> about",
    "> playgame"
  ]);
  const [input, setInput] = useState("");
  const [snakeMode, setSnakeMode] = useState(false);

  const [snake, setSnake] = useState([
    { x: 8, y: 8 },
    { x: 7, y: 8 },
    { x: 6, y: 8 }
  ]);
  const [dir, setDir] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState({ x: 12, y: 8 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const dirRef = useRef(dir);

  useEffect(() => {
    dirRef.current = dir;
  }, [dir]);

  const resetSnake = () => {
    setSnake([
      { x: 8, y: 8 },
      { x: 7, y: 8 },
      { x: 6, y: 8 }
    ]);
    setDir({ x: 1, y: 0 });
    setFood({ x: 12, y: 8 });
    setScore(0);
    setGameOver(false);
  };

  const randomFood = (body) => {
    let next = { x: 0, y: 0 };
    let ok = false;
    while (!ok) {
      next = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      ok = !body.some((p) => p.x === next.x && p.y === next.y);
    }
    return next;
  };

  useEffect(() => {
    if (!snakeMode || gameOver) return;

    const id = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const d = dirRef.current;

        // wrap around edges instead of dying
        const nextHead = {
          x: (head.x + d.x + GRID_SIZE) % GRID_SIZE,
          y: (head.y + d.y + GRID_SIZE) % GRID_SIZE
        };

        // die only on self-bite
        if (prev.some((p) => p.x === nextHead.x && p.y === nextHead.y)) {
          setGameOver(true);
          setLines((l) => [...l, `game over | score: ${score}`, "type 'playgame' to restart"]);
          return prev;
        }

        const grew = nextHead.x === food.x && nextHead.y === food.y;
        const nextBody = [nextHead, ...prev];

        if (!grew) {
          nextBody.pop();
        } else {
          setScore((s) => s + 1);
          setFood(randomFood(nextBody));
        }

        return nextBody;
      });
    }, TICK_MS);

    return () => clearInterval(id);
  }, [snakeMode, gameOver, food, score]);

  useEffect(() => {
    if (!snakeMode) return;

    const onKey = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const next = keyToDir(key);
      if (!next) return;

      const current = dirRef.current;
      const opposite = { x: -current.x, y: -current.y };
      if (sameDir(next, opposite)) return;

      setDir(next);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [snakeMode]);

  const runCommand = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setLines((prev) => [...prev, `> ${cmd}`]);

    if (cmd === "about") {
      setSnakeMode(false);
      setLines((prev) => [
        ...prev,
        "DEV.cell is a student developers collective at IIT Mandi.",
        "we build and learn"
      ]);
      return;
    }

    if (cmd === "playgame") {
      setSnakeMode(true);
      resetSnake();
      setLines((prev) => [
        ...prev,
        "starting pixel snake...",
        "controls: arrow keys / wasd"
        
      ]);
      return;
    }

    setLines((prev) => [...prev, `unknown command: ${cmd}`, "try: about or playgame"]);
  };

  const cells = useMemo(() => {
    const set = new Set(snake.map((p) => `${p.x}-${p.y}`));
    return Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
      const x = i % GRID_SIZE;
      const y = Math.floor(i / GRID_SIZE);
      const isSnake = set.has(`${x}-${y}`);
      const isHead = snake[0]?.x === x && snake[0]?.y === y;
      const isFood = food.x === x && food.y === y;
      return { x, y, isSnake, isFood, isHead };
    });
  }, [snake, food]);

  return (
    <section className="terminal-section">
      <div className="terminal-shell">
        <div className="terminal-topbar">
          <span>DEV.cell</span>
          <span>terminal</span>
        </div>

        <div className="terminal-body">
          <div className="terminal-log">
            {lines.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>

          <form
            className="terminal-input-row"
            onSubmit={(e) => {
              e.preventDefault();
              runCommand(input);
              setInput("");
            }}
          >
            <span className="prompt">&gt;</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="enter command"
              autoComplete="off"
            />
          </form>

          {snakeMode && (
            <div className="snake-wrap">
              <div className="snake-headline">
                <span>snake</span>
                <span>score: {score}</span>
                {gameOver && <span className="game-over">game over</span>}
              </div>

              <div className="snake-grid">
                {cells.map((c) => (
                  <div
                    key={`${c.x}-${c.y}`}
                    className={[
                      "cell",
                      c.isSnake ? "snake" : "",
                      c.isHead ? "head" : "",
                      c.isFood ? "food" : ""
                    ].join(" ")}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TerminalSection;