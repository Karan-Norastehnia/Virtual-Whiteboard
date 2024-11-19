type ColourProps = {
    expand: () => void;
    hueValue: number;
    saturationValue: number;
    lightnessValue: number;
    setHueValue: any;
    setSaturationValue: any;
    setLightnessValue: any;
};

const Colour: React.FC<ColourProps> = ({ expand, hueValue, saturationValue, lightnessValue, setHueValue, setSaturationValue, setLightnessValue }) => {
    return (
        <div className="section">
            <div onClick={expand} className="title">
                <span>Colour</span>
                <svg width={24} height={24} viewBox="-5 -6 10 10" stroke="#000" strokeWidth={0.4} fill="none"><path d="M 2 -2 L 0 0 L -2 -2" /></svg>
            </div>

            <div className="content">
                <div className="colour-wheel-button" style={{backgroundColor: `hsl(${hueValue}, ${saturationValue}%, ${lightnessValue}%)`}}></div>

                <div className="slider">
                    <div>Hue</div>

                    <div className="input">
                        <input type="range" 
                            onChange={(event) => {setHueValue(Number(event.target.value))}} 
                            min={0} max={255} value={hueValue} id="hue" />

                        <input type="number" 
                            onChange={(event) => {setHueValue(Number(event.target.value))}} 
                            min={0} max={255} value={hueValue} />
                    </div>
                </div>

                <div className="slider">
                    <div>Saturation</div>

                    <div className="input">
                        <input type="range" 
                            onChange={(event) => {setSaturationValue(Number(event.target.value))}} 
                            min={0} max={100} value={saturationValue} id="saturation" />
                        
                        <input type="number" 
                            onChange={(event) => {setSaturationValue(Number(event.target.value))}} 
                            min={0} max={100} value={saturationValue} />
                    </div>
                </div>

                <div className="slider">
                    <div>Lightness</div>

                    <div className="input">
                        <input type="range" 
                            onChange={(event) => {setLightnessValue(Number(event.target.value))}} 
                            min={0} max={100} value={lightnessValue} id="lightness" />
                        
                        <input type="number" 
                            onChange={(event) => {setLightnessValue(Number(event.target.value))}} 
                            min={0} max={100} value={lightnessValue} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Colour;
