import exp from "constants";
import { useRef, useState, useEffect, useLayoutEffect } from "react";

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [mouseDown, setMouseDown] = useState(false);

    const prevPos = useRef({ prevX: x, prevY: y });

    const [hueValue, setHueValue] = useState(0);
    const [saturationValue, setSaturationValue] = useState(0);
    const [lightnessValue, setLightnessValue] = useState(0);
    const [widthValue, setWidthValue] = useState(2);

    useEffect(() => {
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

    useEffect(() => {
        const canvas = canvasRef.current;
        
        if (canvas) {
            const context = canvas.getContext("2d");
            if (context && mouseDown) {
                context.beginPath();
                context.strokeStyle = `hsl(${hueValue}, ${saturationValue}%, ${lightnessValue}%)`;
                context.lineWidth = widthValue;
                context.moveTo(prevPos.current.prevX, prevPos.current.prevY);
                context.lineTo(x, y);
                context.stroke();                    
            }
        }

        prevPos.current = { prevX: x, prevY: y};
    }, [x, y, mouseDown]);

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const resizeCanvas = () => {
                // Save current canvas content
                const dataUrl = canvas.toDataURL();
                
                // Update canvas size
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                // Restore the saved content
                const context = canvas.getContext("2d");
                if (context) {
                    const img = new Image();
                    img.src = dataUrl;
                    img.onload = () => {
                        context.drawImage(img, 0, 0);
                    };
                }
            };

            resizeCanvas();
            window.addEventListener("resize", resizeCanvas);
            return () => window.removeEventListener("resize", resizeCanvas);
        }
    }, []);

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
            <div className="menu">
                <div className="section">
                    <div onClick={expand} className="title">
                        <span>Colour</span>
                        <svg width={24} height={24} viewBox="-5 -6 10 10" stroke="#000" strokeWidth={0.6} fill="none"><path d="M 2 -2 L 0 0 L -2 -2" /></svg>
                    </div>

                    <div className="content">
                        <div className="slider">
                            <div>Hue</div>
                            <input type="range" 
                                onChange={(event) => {setHueValue(Number(event.target.value))}} 
                                min={0} max={255} id="hue" />
                        </div>

                        <div className="slider">
                            <div>Saturation</div>
                            <input type="range" 
                                onChange={(event) => {setSaturationValue(Number(event.target.value))}} 
                                min={0} max={100} id="saturation" />
                        </div>

                        <div className="slider">
                            <div>Lightness</div>
                            <input type="range" 
                                onChange={(event) => {setLightnessValue(Number(event.target.value))}} 
                                min={0} max={100} id="lightness" />
                        </div>
                    </div>
                </div>

                <div className="section">
                    <div onClick={expand} className="title">
                        <span>Stroke</span>
                        <svg width={24} height={24} viewBox="-5 -6 10 10" stroke="#000" strokeWidth={0.6} fill="none"><path d="M 2 -2 L 0 0 L -2 -2" /></svg>
                    </div>

                    <div className="content">
                        <div className="slider">
                            <div>Width</div>
                            <input type="range" 
                                onChange={(event) => {setWidthValue(Number(event.target.value))}} 
                                min={1} max={10} id="width" />
                        </div>

                        <div className="slider">
                            <div>Smoothness</div>
                            <input type="range" min={0} max={100} id="smoothness" />
                        </div>
                    </div>
                </div>

                <div>{}</div>
            </div>

            <canvas ref={canvasRef} id="main"></canvas>
        </>
    );
};

export default Canvas;
