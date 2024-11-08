import { useEffect, useState, useRef } from "react";
import Stroke from "./stroke";


const Erase = ({ setSize, canvasRef, mouseDown, mouseOnCanvas, prevPos, x, y, expand, currentTool }) => {
    const [widthValue, setWidthValue] = useState(10);

    const widthRange = useRef({min: 5, max: 100});

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas && currentTool === "erase") {
            const context = canvas.getContext("2d");
            const bounds = canvas.getBoundingClientRect();

            setSize(widthValue);
            
            if (context && mouseDown && mouseOnCanvas) {
                // context.clearRect(x - bounds.x - (widthValue / 2), y - bounds.y - (widthValue / 2), widthValue, widthValue);
                context.globalCompositeOperation = "destination-out";
                context.strokeStyle = "hsl(0, 0%, 0%)";
                context.lineWidth = widthValue;
                context.lineCap = "round";
                context.lineJoin = "round";
                context.beginPath();
                context.moveTo(prevPos.current.x - bounds.x, prevPos.current.y - bounds.y);
                context.lineTo(x - bounds.x, y - bounds.y);
                context.stroke();
            }

            prevPos.current = { x: x, y: y };
        }
    }, [x, y, mouseDown]);

    return (
        <div className="container" style={{display: currentTool === "erase" ? "block" : "none"}}>
            <Stroke {...{ expand, widthValue, setWidthValue, widthRange }} />
        </div>
    );
};

export default Erase;
