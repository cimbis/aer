import {useCallback, useRef, useState} from "react";

export const useVideoControls = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const [videoDuration, setVideoDuration] = useState(0);
    const [videoDimensions, setVideoDimensions] = useState<{
        originalWidth: number,
        originalHeight: number,
        renderedWidth: number,
        renderedHeight: number,
    } | null>(null);

    const onLoadedMetadata = useCallback(() => {
        if (videoRef.current) {
            setVideoDuration(videoRef.current.duration);

            setVideoDimensions({
                originalWidth: videoRef.current.videoWidth,
                originalHeight: videoRef.current.videoHeight,
                renderedWidth: videoRef.current.videoWidth,
                renderedHeight: videoRef.current.videoHeight,
            })
        }
    }, [videoRef]);


    const seekVideoTo = useCallback((timeTo: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = timeTo;
        }
    }, [videoRef])

    const pauseClicked = useCallback(async () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    }, [videoRef])

    const playClicked = useCallback(async () => {
        if (videoRef.current) {
            await videoRef.current.play();
        }
    }, [videoRef])

    return {
        videoRef,
        videoDuration,
        videoDimensions,
        onLoadedMetadata,
        seekVideoTo,
        pauseClicked,
        playClicked
    };

}
