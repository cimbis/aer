import {useCallback, useRef, useState} from "react";
import {VideoDimensions} from "../App.tsx";

export const useVideoControls = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const [videoDuration, setVideoDuration] = useState(0);
    const [videoDimensions, setVideoDimensions] = useState<VideoDimensions>({
        originalWidth: 0,
        originalHeight: 0,
        renderedWidth: 0,
        renderedHeight: 0,
    });

    const onLoadedMetadata = useCallback(() => {
        if (videoRef.current) {
            setVideoDuration(videoRef.current.duration);

            setVideoDimensions({
                originalWidth: videoRef.current.videoWidth,
                originalHeight: videoRef.current.videoHeight,
                renderedWidth: videoRef.current.offsetWidth,
                renderedHeight: videoRef.current.offsetHeight,
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
