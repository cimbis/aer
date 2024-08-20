import {
    ForwardedRef,
    forwardRef,
} from "react";

import "./Ruler.css"
import {useCanvas} from "../../../hooks/useCanvas.ts";
import useMediaQuery from "../../../hooks/useMediaQuery.ts";


export interface ImageProps {
    imageSrc: string;
    positionInSeconds: number;
}

interface RulerProps {
    videoDuration: number;
    pixelsPerSecond: number;
    images: ImageProps[];
    onImageClick: (number: number) => void;
}

export const Ruler = ({
                          videoDuration,
                          pixelsPerSecond,
                          images,
                          onImageClick
                      }: RulerProps) => {
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
        <div className="ruler position-absolute w-100 overflow-x-scroll">
            <canvas
                ref={canvasRef}
                id="ruler-canvas"
                width={canvasWidth}
                height={canvasHeight}
                onClick={handleCanvasClick}
            />
        </div>
    );
}
