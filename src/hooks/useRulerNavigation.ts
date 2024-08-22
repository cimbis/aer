import {
    useCallback,
    useEffect,
    useMemo,
    useRef
} from "react";

import {ImageProps} from "../App.tsx";

import {formatTime} from "../utils/formatTime.ts";

interface RulerNavigationHookProps {
    prefersDark: boolean;
    videoDuration: number;
    pixelsPerSecond: number;
    images: ImageProps[];
    onThumbnailClick: (
        {id, time}: { id: string, time: number }
    ) => void;
}

export const useRulerNavigation = (
    {
        prefersDark,
        videoDuration,
        pixelsPerSecond,
        images,
        onThumbnailClick
    }: RulerNavigationHookProps
) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const canvasHeight = 200; // px

    const canvasWidth = useMemo(() => {
        return videoDuration * pixelsPerSecond
    }, [videoDuration, pixelsPerSecond])

    const canvasColor = useMemo(() => {
        if (prefersDark) {
            return "#fff";
        } else {
            return "#000"
        }
    }, [prefersDark])

    const drawRuler = useCallback((ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = canvasColor;
        ctx.font = "0.8rem Arial";

        for (
            let markerPosition = 0;
            markerPosition < canvasWidth;
            markerPosition += pixelsPerSecond
        ) {
            ctx.beginPath();
            ctx.moveTo(markerPosition, canvasHeight);
            ctx.lineTo(markerPosition, (canvasHeight / 3));
            ctx.stroke();
            ctx.strokeStyle = canvasColor;

            ctx.fillText(
                `${formatTime(markerPosition / pixelsPerSecond)}`,
                markerPosition,
                canvasHeight / 3 - 10
            );
        }
    }, [canvasWidth, pixelsPerSecond, canvasColor]);

    const drawImages = useCallback((ctx: CanvasRenderingContext2D) => {
        images.forEach((image: ImageProps) => {
            const imagePosition = image.positionInSeconds * pixelsPerSecond;
            const canvasImage = new Image();
            canvasImage.src = image.imageSrc;
            canvasImage.onload = () => {
                ctx.drawImage(
                    canvasImage,
                    imagePosition - canvasImage.width / 2,
                    canvasHeight / 2
                )
            }
        })
    }, [images, pixelsPerSecond])

    const handleCanvasClick = useCallback((event: {
        clientX: number;
        clientY: number;
    }) => {
        if (!canvasRef.current) return;

        const canvasRect = canvasRef.current.getBoundingClientRect();
        const clickPositionX = event.clientX - canvasRect.left;
        const clickPositionY = event.clientY - canvasRect.top;

        const clickedThumbnail = images.find(thumb => {
            const imagePositionX = thumb.positionInSeconds * pixelsPerSecond;
            const imagePositionY = canvasHeight / 2;

            // assuming images are 25x25
            if (
                clickPositionX >= imagePositionX - 12.5 && clickPositionX <= imagePositionX + 12.5
                && clickPositionY >= imagePositionY && clickPositionY <= imagePositionY + 25
            ) {
                return thumb;
            }
        })

        if (clickedThumbnail) {
            onThumbnailClick({
                id: clickedThumbnail.id,
                time: clickedThumbnail.positionInSeconds
            });
        }
    }, [images, onThumbnailClick, pixelsPerSecond])

    useEffect(() => {
        const cnv = canvasRef.current
        if (cnv) {
            const ctx = cnv.getContext('2d');
            if (ctx) {
                drawRuler(ctx);
                drawImages(ctx);
            }
        }
    }, [drawImages, drawRuler])

    return {
        canvasRef,
        canvasWidth,
        canvasHeight,
        handleCanvasClick
    }
}
