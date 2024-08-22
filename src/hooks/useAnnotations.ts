import {useCallback, useEffect, useMemo, useRef, useState} from "react";

interface AnnotationsHookProps {
    videoDimensions: {
        originalWidth: number,
        originalHeight: number,
        renderedWidth: number,
        renderedHeight: number,
    };
    annotations: {
        [id: string]: {
            bbox: number[];
            text: string;
        };
    };
}

export const useAnnotations = (
    {
        videoDimensions,
        annotations,
    }: AnnotationsHookProps
) => {
    const annotationsRef = useRef<HTMLCanvasElement>(null);

    const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D | null>(null);

    const videoScale = useMemo(() => {
        return videoDimensions.renderedWidth / videoDimensions.originalWidth
    }, [videoDimensions.originalWidth, videoDimensions.renderedWidth]);

    const getCoordinatesOfAnnotation = useCallback((annotationBbox: number[]) => {
        return {
            x: annotationBbox[1] * videoScale,
            y: annotationBbox[0] * videoScale,

            width: annotationBbox[3] * videoScale - annotationBbox[1] * videoScale,
            height: annotationBbox[2] * videoScale - annotationBbox[0] * videoScale,
        }
    }, [videoScale]);

    const displayAnnotationWithId = useCallback((annotationId: string) => {
        if (canvasCtx && annotationsRef.current) {
            canvasCtx.clearRect(
                0, 0,
                annotationsRef.current.width,
                annotationsRef.current.height
            );
            const {
                x,
                y,
                width,
                height
            } = getCoordinatesOfAnnotation(annotations[annotationId].bbox);

            canvasCtx.strokeStyle = 'yellow';
            canvasCtx.strokeRect(x, y, width, height);

            canvasCtx.fillStyle = 'yellow';
            canvasCtx.font = '16px Arial';
            canvasCtx.fillText(annotations[annotationId].text, x, y);
        }
    }, [canvasCtx, getCoordinatesOfAnnotation, annotations]);

    const clearAnnotations = useCallback(() => {
        if (canvasCtx && annotationsRef.current) {
            canvasCtx.clearRect(
                0, 0,
                annotationsRef.current.width,
                annotationsRef.current.height
            );
        }
    }, [canvasCtx]);

    useEffect(() => {
        const canvas = annotationsRef.current;
        if (canvas) {
            canvas.width = videoDimensions.renderedWidth;
            canvas.height = videoDimensions.renderedHeight;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                setCanvasCtx(ctx);
            }
        }
    }, [annotationsRef, videoDimensions]);

    return {
        annotationsRef,
        displayAnnotationWithId,
        clearAnnotations,
    }
}
