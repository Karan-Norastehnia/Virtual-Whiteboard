import exp from "constants";
import { useRef, useState, useEffect } from "react";
import Draw from "./draw";
import Erase from "./erase";

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const gridRef = useRef<HTMLCanvasElement | null>(null);

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [mouseDown, setMouseDown] = useState(false);

    const prevPos = useRef({ prevX: x, prevY: y });

    const [mouseOnCanvas, setMouseOnCanvas] = useState(false);
    const [currentTool, setCurrentTool] = useState("draw");
    const [size, setSize] = useState(2);

    const width = 2048;
    const height = 2048;

    useEffect(() => {
        drawGrid();

        const handleMouseDown = (event: MouseEvent) => {
            if (event.button === 0) {
                setMouseDown(true);
            }
        }

        const handleMouseUp = (event: MouseEvent) => {
            setMouseDown(false);
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
        const svg = target.querySelector("svg") ?? target.parentElement?.querySelector("svg");
        const section = svg?.parentElement?.parentElement?.querySelector(".content");

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

    return (
        <>
            <div className="canvas-container">
                <canvas ref={gridRef} width={width} height={height} id="grid-canvas"></canvas>
                <canvas ref={canvasRef} 
                    onMouseLeave={() => setMouseOnCanvas(false)} 
                    onMouseOver={() => setMouseOnCanvas(true)} 
                    width={width} height={height} id="main"></canvas>
            </div>

            <div className="menu">
                <div className="tool-select">
                    <span onClick={() => setCurrentTool("draw")}>Draw</span>
                    <span onClick={() => setCurrentTool("erase")}>Erase</span>
                </div>

                <Draw {...{ setSize, canvasRef, mouseDown, mouseOnCanvas, prevPos, x, y, expand, currentTool }}></Draw>
                <Erase {...{ setSize, canvasRef, mouseDown, mouseOnCanvas, x, y, expand, currentTool }}></Erase>
            </div>

            <div className="cursor" style={{top: y, left: x, padding: size / 2, borderRadius: currentTool === "erase" ? "0" : "50%"}}></div>
        </>
    );
};

export default Canvas;
