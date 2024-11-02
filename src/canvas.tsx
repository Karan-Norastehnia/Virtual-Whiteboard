import { useEffect, useRef } from "react";

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            const context = canvas.getContext("2d");
            if (context) {
                // First path
                context.beginPath();
                context.strokeStyle = "blue";
                context.moveTo(20, 20);
                context.lineTo(200, 20);
                context.stroke();

                // Second path
                context.beginPath();
                context.strokeStyle = "green";
                context.moveTo(20, 20);
                context.lineTo(120, 120);
                context.stroke();
            }
        }
    }, []);

    return (
        <canvas ref={canvasRef} id="main" width={window.innerWidth} height={window.innerHeight}></canvas>
    );
};

export default Canvas;