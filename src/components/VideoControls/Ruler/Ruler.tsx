import {ImageProps} from "../../../App.tsx";

import {useRulerNavigation} from "../../../hooks/useRulerNavigation.ts";
import useMediaQuery from "../../../hooks/useMediaQuery.ts";

import "./Ruler.css"

interface RulerProps {
    videoDuration: number;
    pixelsPerSecond: number;
    images: ImageProps[];
    onThumbnailClick: (
        {id, time}: { id: string, time: number }
    ) => void;
}

export const Ruler = function RulerComponent(
    {
        videoDuration,
        pixelsPerSecond,
        images,
        onThumbnailClick
    }: RulerProps
) {

    const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

    const {
        canvasRef,
        canvasWidth,
        canvasHeight,
        handleCanvasClick
    } = useRulerNavigation({
        prefersDark,
        videoDuration,
        pixelsPerSecond,
        images,
        onThumbnailClick
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
}
