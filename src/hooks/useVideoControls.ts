import {useRef, useState} from "react";

export const useVideoControls = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const [videoDuration, setVideoDuration] = useState(0);
    const [currentTimeInVideo, setCurrentTimeInVideo] = useState(0);

    const onLoadedMetadata = () => {
        if (videoRef.current) {
            setVideoDuration(videoRef.current.duration);
        }
    }

    const onVideoTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTimeInVideo(videoRef.current.currentTime);
        }
    }
    const seekVideoTo = (timeTo: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = timeTo;
        }
    }

    const playPauseClicked = async () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                await videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }

    return {
        videoRef,
        videoDuration,
        currentTimeInVideo,
        onLoadedMetadata,
        onVideoTimeUpdate,
        seekVideoTo,
        playPauseClicked
    };

}
