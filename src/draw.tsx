import { useState, useEffect } from "react";

const Draw = ({ setSize, canvasRef, mouseDown, mouseOnCanvas, prevPos, x, y, expand, currentTool }) => {
    const [hueValue, setHueValue] = useState(220);
    const [saturationValue, setSaturationValue] = useState(100);
    const [lightnessValue, setLightnessValue] = useState(30);
    const [widthValue, setWidthValue] = useState(2);
    const [smoothnessValue, setSmoothnessValue] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas && currentTool === "draw") {
            const context = canvas.getContext("2d");
            const bounds = canvas.getBoundingClientRect();

            const dist = (x - prevPos.current.x)**2 + (y-prevPos.current.y)**2;
            const smoothedX = prevPos.current.x + (x - prevPos.current.x) * (1 - smoothnessValue);
            const smoothedY = prevPos.current.y + (y - prevPos.current.y) * (1 - smoothnessValue);

            setSize(widthValue);

            if (context && mouseDown && mouseOnCanvas) {
                context.globalCompositeOperation = "source-over";
                context.strokeStyle = `hsl(${hueValue}, ${saturationValue}%, ${lightnessValue}%)`;
                context.lineWidth = widthValue;
                context.lineCap = "round";
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
        <div style={{display: currentTool === "draw" ? "block" : "none"}}>
            <div className="section">
                <div onClick={expand} className="title">
                    <span>Colour</span>
                    <svg width={24} height={24} viewBox="-5 -6 10 10" stroke="#000" strokeWidth={0.4} fill="none"><path d="M 2 -2 L 0 0 L -2 -2" /></svg>
                </div>

                <div className="content">
                    <div className="colour-wheel-button" style={{backgroundColor: `hsl(${hueValue}, ${saturationValue}%, ${lightnessValue}%)`}}></div>

                    <div className="slider">
                        <div>Hue</div>
                        <input type="range" 
                            onChange={(event) => {setHueValue(Number(event.target.value))}} 
                            min={0} max={255} defaultValue={hueValue} id="hue" />
                    </div>

                    <div className="slider">
                        <div>Saturation</div>
                        <input type="range" 
                            onChange={(event) => {setSaturationValue(Number(event.target.value))}} 
                            min={0} max={100} defaultValue={saturationValue} id="saturation" />
                    </div>

                    <div className="slider">
                        <div>Lightness</div>
                        <input type="range" 
                            onChange={(event) => {setLightnessValue(Number(event.target.value))}} 
                            min={0} max={100} defaultValue={lightnessValue} id="lightness" />
                    </div>
                </div>
            </div>

            <div className="section">
                <div onClick={expand} className="title">
                    <span>Stroke</span>
                    <svg width={24} height={24} viewBox="-5 -6 10 10" stroke="#000" strokeWidth={0.4} fill="none"><path d="M 2 -2 L 0 0 L -2 -2" /></svg>
                </div>

                <div className="content">
                    <div className="slider">
                        <div>Width</div>
                        <input type="range" 
                            onChange={(event) => {setWidthValue(Number(event.target.value))}} 
                            min={1} max={50} defaultValue={widthValue} id="width" />
                    </div>

                    <div className="slider">
                        <div>Smoothness</div>
                        <input type="range" 
                            onChange={(event) => {setSmoothnessValue(Number(event.target.value))}} 
                            min={0} max={0.9} step={0.1} defaultValue={smoothnessValue} id="smoothness" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Draw;
