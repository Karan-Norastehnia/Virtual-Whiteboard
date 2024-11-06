import { useEffect, useState } from "react";

const Highlight = ({ setSize, canvasRef, mouseDown, mouseOnCanvas, prevPos, x, y, expand, currentTool }) => {
    const [hueValue, setHueValue] = useState(60);
    const [saturationValue, setSaturationValue] = useState(100);
    const [lightnessValue, setLightnessValue] = useState(60);
    const [widthValue, setWidthValue] = useState(20);
    const [smoothnessValue, setSmoothnessValue] = useState(10);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas && currentTool === "highlight") {
            const context = canvas.getContext("2d");
            const bounds = canvas.getBoundingClientRect();

            setSize(widthValue);

            if (context && mouseDown && mouseOnCanvas) {
                context.globalCompositeOperation = "source-over";
                // context.globalAlpha = 0.5;
                context.beginPath();
                context.strokeStyle = `hsla(${hueValue}, ${saturationValue}%, ${lightnessValue}%, 0.5)`;
                context.lineWidth = widthValue;
                context.lineCap = "butt";
                context.lineJoin = "round";
                context.moveTo(prevPos.current.x - bounds.x, prevPos.current.y - bounds.y);
                context.lineTo(x - bounds.x, y - bounds.y);
                context.stroke();
            }

            prevPos.current = { x: x, y: y };
        }
    }, [x, y, mouseDown]);

    return (
        <div style={{display: currentTool === "highlight" ? "block" : "none"}}>
            <div className="section">
                <div onClick={expand} className="title">
                    <span>Colour</span>
                    <svg width={24} height={24} viewBox="-5 -6 10 10" stroke="#000" strokeWidth={0.6} fill="none"><path d="M 2 -2 L 0 0 L -2 -2" /></svg>
                </div>

                <div className="content">
                    <div className="colour-wheel-button" style={{backgroundColor: `hsla(${hueValue}, ${saturationValue}%, ${lightnessValue}%, 0.5)`}}></div>

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
                            min={10} max={100} defaultValue={widthValue} id="width" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Highlight;
