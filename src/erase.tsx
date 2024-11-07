import { useEffect, useState } from "react";

const Erase = ({ setSize, canvasRef, mouseDown, mouseOnCanvas, prevPos, x, y, expand, currentTool }) => {
    const [widthValue, setWidthValue] = useState(10);

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
        <div style={{display: currentTool === "erase" ? "block" : "none"}}>
            <div className="section">
                <div onClick={expand} className="title">
                    <span>Colour</span>
                    <svg width={24} height={24} viewBox="-5 -6 10 10" stroke="#000" strokeWidth={0.4} fill="none"><path d="M 2 -2 L 0 0 L -2 -2" /></svg>
                </div>

                <div className="content">
                    <div className="slider">
                        <div>Size</div>
                        <input type="range" 
                            onChange={(event) => {setWidthValue(Number(event.target.value))}} 
                            min={5} max={100} defaultValue={15} id="hue" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Erase;
