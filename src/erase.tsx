import { useEffect, useState } from "react";

const Erase = ({ setSize, canvasRef, mouseDown, mouseOnCanvas, x, y, expand, currentTool }) => {
    const [sizeValue, setSizeValue] = useState(10);

    useEffect(() => {
        const canvas = canvasRef.current;

        
        if (canvas && currentTool === "erase") {
            const context = canvas.getContext("2d");
            const bounds = canvas.getBoundingClientRect();

            setSize(sizeValue);
            
            if (context && mouseDown && mouseOnCanvas) {
                context.clearRect(x - bounds.x - (sizeValue / 2), y - bounds.y - (sizeValue / 2), sizeValue, sizeValue);
            }
        }
    }, [x, y, mouseDown]);

    return (
        <div style={{display: currentTool === "erase" ? "block" : "none"}}>
            <div className="section">
                <div onClick={expand} className="title">
                    <span>Colour</span>
                    <svg width={24} height={24} viewBox="-5 -6 10 10" stroke="#000" strokeWidth={0.6} fill="none"><path d="M 2 -2 L 0 0 L -2 -2" /></svg>
                </div>

                <div className="content">
                    <div className="slider">
                        <div>Size</div>
                        <input type="range" 
                            onChange={(event) => {setSizeValue(Number(event.target.value))}} 
                            min={5} max={100} defaultValue={15} id="hue" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Erase;
