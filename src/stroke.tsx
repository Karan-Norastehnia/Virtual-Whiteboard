type StrokeProps = {
    expand: () => void;
    widthValue: number;
    smoothnessValue?: number;
    setWidthValue: any;
    setSmoothnessValue?: any;
    widthRange: React.RefObject<{ min: number, max: number }>;
};

const Stroke: React.FC<StrokeProps> = ({ expand, widthValue, smoothnessValue, setWidthValue, setSmoothnessValue, widthRange }) => {
    return (
        <div className="section">
            <div onClick={expand} className="title">
                <span>Stroke</span>
                <svg width={24} height={24} viewBox="-5 -6 10 10" stroke="#000" strokeWidth={0.4} fill="none"><path d="M 2 -2 L 0 0 L -2 -2" /></svg>
            </div>

            <div className="content">
                <div className="slider">
                    <div>Width</div>

                    <div className="input">
                        <input type="range" 
                            onChange={(event) => {setWidthValue(Number(event.target.value))}} 
                            min={widthRange.current?.min} max={widthRange.current?.max} value={widthValue} id="width" />

                        <input type="number" 
                            onChange={(event) => {setWidthValue(Number(event.target.value))}} 
                            min={widthRange.current?.min} max={widthRange.current?.max} value={widthValue} />
                    </div>
                </div>

                <div className="slider" style={{display: smoothnessValue === undefined ? "none" : ""}}>
                    <div>Smoothness</div>

                    <div className="input">
                        <input type="range" 
                            onChange={(event) => {setSmoothnessValue(Number(event.target.value))}} 
                            min={0} max={0.9} step={0.1} value={smoothnessValue} id="smoothness" />
                        
                        <input type="number" 
                            onChange={(event) => {setSmoothnessValue(Number(event.target.value))}} 
                            min={0} max={0.9} step={0.1} value={smoothnessValue} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stroke;
