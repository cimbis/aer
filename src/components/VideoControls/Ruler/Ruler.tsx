import {ImageProps} from "../../../App.tsx";

import {useCanvas} from "../../../hooks/useCanvas.ts";
import useMediaQuery from "../../../hooks/useMediaQuery.ts";

import "./Ruler.css"
import {memo} from "react";

interface RulerProps {
    videoDuration: number;
    pixelsPerSecond: number;
    images: ImageProps[];
    onImageClick: (number: number) => void;
}

export const Ruler = memo(function RulerComponent({
                                                      videoDuration,
                                                      pixelsPerSecond,
                                                      images,
                                                      onImageClick
                                                  }: RulerProps) {

    console.log('rerendered')
    const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

    const {
        canvasRef,
        canvasWidth,
        canvasHeight,
        handleCanvasClick
    } = useCanvas({
        prefersDark,
        videoDuration,
        pixelsPerSecond,
        images,
        onImageClick
    });

    return (
        <div className="position-relative">
            <div className="ruler position-absolute w-100 overflow-x-scroll">
                <canvas
                    ref={canvasRef}
                    id="ruler-canvas"
                    width={canvasWidth}
                    height={canvasHeight}
                    onClick={handleCanvasClick}
                />
            </div>
        </div>
    );
})
