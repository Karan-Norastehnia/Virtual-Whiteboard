import { useEffect, useState, useRef } from "react";
import Colour from "./colour";
import Stroke from "./stroke";

const Highlight = ({ setSize, canvasRef, mouseDown, mouseOnCanvas, prevPos, x, y, expand, currentTool }) => {
    const [hueValue, setHueValue] = useState(60);
    const [saturationValue, setSaturationValue] = useState(100);
    const [lightnessValue, setLightnessValue] = useState(60);
    const [widthValue, setWidthValue] = useState(20);
    const [smoothnessValue, setSmoothnessValue] = useState(0.1);

    const widthRange = useRef({min: 10, max: 100});

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas && currentTool === "highlight") {
            const context = canvas.getContext("2d");
            const bounds = canvas.getBoundingClientRect();

            const dist = (x - prevPos.current.x)**2 + (y-prevPos.current.y)**2;
            const smoothedX = prevPos.current.x + (x - prevPos.current.x) * (1 - smoothnessValue);
            const smoothedY = prevPos.current.y + (y - prevPos.current.y) * (1 - smoothnessValue);

            setSize(widthValue);

            if (context && mouseDown && mouseOnCanvas) {
                context.globalCompositeOperation = "source-over";
                context.strokeStyle = `hsla(${hueValue}, ${saturationValue}%, ${lightnessValue}%, 0.5)`;
                context.lineWidth = widthValue;
                context.lineCap = "butt";
                context.lineJoin = "round";
                context.beginPath();
                context.moveTo(prevPos.current.x - bounds.x, prevPos.current.y - bounds.y);
                context.lineTo(smoothedX - bounds.x, smoothedY - bounds.y);
                context.stroke();
            }

            prevPos.current = { x: smoothedX, y: smoothedY };
        }
    }, [x, y, mouseDown]);

    return (
        <div className="container" style={{display: currentTool === "highlight" ? "block" : "none"}}>
            <Colour {...{ expand, hueValue, saturationValue, lightnessValue, setHueValue, setSaturationValue, setLightnessValue }} />
            <Stroke {...{ expand, widthValue, smoothnessValue, setWidthValue, setSmoothnessValue, widthRange }} />
        </div>
    );
};

export default Highlight;
