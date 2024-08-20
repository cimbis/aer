import {useCallback, useRef, useState} from "react";

export const useVideoControls = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const [videoDuration, setVideoDuration] = useState(0);

    const onLoadedMetadata = useCallback(() => {
        if (videoRef.current) {
            setVideoDuration(videoRef.current.duration);
        }
    }, [videoRef]);


    const seekVideoTo = useCallback((timeTo: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = timeTo;
        }
    }, [videoRef])

    const playPauseClicked = useCallback(async () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                await videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [videoRef])

    return {
        videoRef,
        videoDuration,
        onLoadedMetadata,
        seekVideoTo,
        playPauseClicked
    };

}
