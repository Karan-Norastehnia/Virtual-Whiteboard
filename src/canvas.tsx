import { useRef, useState, useEffect } from "react";
import Draw from "./draw";
import DynamicDraw from "./dynamicdraw";
import Highlight from "./highlight";
import Erase from "./erase";
import { ReactComponent as PenIcon } from "./icons/pen.svg";
import { ReactComponent as InkPenIcon } from "./icons/inkpen.svg";
import { ReactComponent as HighlighterIcon } from "./icons/highlighter.svg";
import { ReactComponent as EraserIcon } from "./icons/eraser.svg";
import { ReactComponent as GithubIcon } from "./icons/github.svg";

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const gridRef = useRef<HTMLCanvasElement | null>(null);

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    
    const prevPos = useRef({ x: x, y: y });
    const mouseDown = useRef(false);
    const mouseOnCanvas = useRef(false);

    const step = useRef(-1);
    const editHistory = useRef<object[]>([]);

    const [currentTool, setCurrentTool] = useState("draw");
    const [size, setSize] = useState(2);

    const width = 2048;
    const height = 2048;

    const endEdit = () => {
        const canvas = canvasRef.current;

        canvas?.toBlob((blob) => {
            if (blob && mouseOnCanvas.current) {
                step.current += 1;
                editHistory.current = editHistory.current.slice(0, step.current);
                editHistory.current.push(blob);

            }
        });
    };

    const navigateHistory = (next: number) => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        const img = new Image();

        step.current = Math.min(Math.max(step.current + next, 0), editHistory.current.length - 1);

        const url = URL.createObjectURL(editHistory.current[step.current] as Blob);

        img.onload = () => {
            context?.clearRect(0, 0, width, height);
            context?.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);
        };

        img.src = url;
    };

    const loadCanvas = () => {
        endEdit();
    };

    useEffect(() => {
        drawGrid();
        loadCanvas();

        const handleMouseDown = (event: MouseEvent) => {
            if (event.button === 0) {
                mouseDown.current = true;
            }
        }

        const handleMouseUp = (event: MouseEvent) => {
            mouseDown.current = false;

            if (event.button === 0) {
                endEdit();
            }
        }

        const handleMouseMove = (event: MouseEvent) => {
            setX(event.clientX);
            setY(event.clientY);
        };

        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const drawGrid = () => {
        const canvas = gridRef.current;

        if (canvas) {
            const context = canvas.getContext("2d");

            if (context) {
                context.beginPath();
                context.lineWidth = 1;
                context.strokeStyle = "hsl(0, 0%, 88%)";

                for (let i = 0; i <= height; i += 64) {
                    context.moveTo(i, 0);
                    context.lineTo(i, height);
                }

                for (let i = 0; i <= width; i += 64) {
                    context.moveTo(0, i);
                    context.lineTo(width, i);
                }

                context.stroke();
            }
        }
    };

    const expand = (event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        const svg = target.querySelector("svg"); // ?? target.parentElement?.querySelector("svg");
        const section = svg?.parentElement?.parentElement?.querySelector(".content") ?? 
            svg?.parentElement?.parentElement?.parentElement?.querySelector(".tool-settings");

        if (section) {
            if (section.classList.contains("condense")) {
                section.classList.remove("condense");
            } else {
                section.classList.add("condense");
            }
        }

        if (svg) {
            if (svg.classList.contains("condense")) {
                svg.classList.remove("condense");
            } else {
                svg.classList.add("condense");
            }
        }
    };

    const properties = { setSize, canvasRef, mouseDown, mouseOnCanvas, prevPos, x, y, expand, currentTool };

    return (
        <>
            <div className="canvas-container">
                <canvas ref={gridRef} width={width} height={height} id="grid-canvas"></canvas>
                <canvas ref={canvasRef} 
                    onMouseLeave={() => mouseOnCanvas.current = false} 
                    onMouseOver={() => mouseOnCanvas.current = true} 
                    width={width} height={height} id="main"></canvas>
            </div>

            <div className="menu">
                <div className="tool-select">
                    <button className={currentTool === "draw" ? "active-tool" : "inactive-tool"} onClick={() => setCurrentTool("draw")}>
                        <PenIcon />
                    </button>
                    <button className={currentTool === "dynamicDraw" ? "active-tool" : "inactive-tool"} onClick={() => setCurrentTool("dynamicDraw")}>
                        <InkPenIcon />
                    </button>
                    <button className={currentTool === "highlight" ? "active-tool" : "inactive-tool"} onClick={() => setCurrentTool("highlight")}>
                        <HighlighterIcon />
                    </button>
                    <button className={currentTool === "erase" ? "active-tool" : "inactive-tool"} onClick={() => setCurrentTool("erase")}>
                        <EraserIcon />
                    </button>

                    <div className="collapse" onClick={expand}>
                        <svg width={32} height={32} 
                            viewBox="-5 -6 10 10" stroke="#000" strokeWidth={0.3} 
                            fill="none"><path d="M 2 -2 L 0 0 L -2 -2" /></svg>
                    </div>
                </div>

                <div className="tool-settings">
                    <Draw {...properties}></Draw>
                    <DynamicDraw {...properties}></DynamicDraw>
                    <Erase {...properties}></Erase>
                    <Highlight {...properties}></Highlight>
                </div>
            </div>

            <div className="edit-history">
                <button onClick={() => navigateHistory(-1)}>Undo</button>
                <button onClick={() => navigateHistory(1)}>Redo</button>
            </div>

            <a href="https://github.com/Karan-Norastehnia/Virtual-Whiteboard" target="_blank" className="repo-link">
                <GithubIcon />
            </a>

            <div className="cursor" style={{top: y, left: x, display: mouseOnCanvas.current ? "block" : "none", padding: size / 2}}></div>
        </>
    );
};

export default Canvas;
