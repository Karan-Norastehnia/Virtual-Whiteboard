import { useState, useEffect } from "react";

const Draw = ({ setSize, canvasRef, mouseDown, mouseOnCanvas, prevPos, x, y, expand, currentTool }) => {
    const [hueValue, setHueValue] = useState(220);
    const [saturationValue, setSaturationValue] = useState(100);
    const [lightnessValue, setLightnessValue] = useState(30);
    const [widthValue, setWidthValue] = useState(2);
    const [smoothnessValue, setSmoothnessValue] = useState(10);

    useEffect(() => {
        const canvas = canvasRef.current;

        setSize(widthValue);
        
        if (canvas && currentTool === "draw") {
            const context = canvas.getContext("2d");
            const bounds = canvas.getBoundingClientRect();

            if (context && mouseDown && mouseOnCanvas) {
                context.beginPath();
                context.strokeStyle = `hsl(${hueValue}, ${saturationValue}%, ${lightnessValue}%)`;
                context.lineWidth = widthValue;
                context.lineCap = "round";
                context.lineJoin = "round";
                context.moveTo(prevPos.current.prevX - bounds.x, prevPos.current.prevY - bounds.y);
                context.lineTo(x - bounds.x, y - bounds.y);
                context.stroke();
            }
        }

        prevPos.current = { prevX: x, prevY: y};
    }, [x, y, mouseDown]);

    return (
        <div style={{display: currentTool === "draw" ? "block" : "none"}}>
            <div className="section">
                <div onClick={expand} className="title">
                    <span>Colour</span>
                    <svg width={24} height={24} viewBox="-5 -6 10 10" stroke="#000" strokeWidth={0.6} fill="none"><path d="M 2 -2 L 0 0 L -2 -2" /></svg>
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
                    <svg width={24} height={24} viewBox="-5 -6 10 10" stroke="#000" strokeWidth={0.6} fill="none"><path d="M 2 -2 L 0 0 L -2 -2" /></svg>
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
                            min={0} max={100} defaultValue={smoothnessValue} id="smoothness" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Draw;
