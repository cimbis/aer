import {SimpleVideo} from "./components/StandardVideo/StandardVideo.tsx";
import {VideoControls} from "./components/VideoControls/VideoControls.tsx";

import {useVideoControls} from "./hooks/useVideoControls.ts";

import {formatTime} from "./utlis/formatTime.ts";

import stitched from "./assets/GS012237-stitched.mp4";

import './App.css'

function App() {
    const {
        videoRef,
        videoDuration,
        currentTimeInVideo,
        onVideoTimeUpdate,
        seekVideoTo,
        onLoadedMetadata,
        playPauseClicked
    } = useVideoControls();

    return (
        <div className="app">
            <SimpleVideo
                src={stitched}
                ref={videoRef}
                onLoadedMetadata={onLoadedMetadata}
                onTimeUpdate={onVideoTimeUpdate}
            />

            <div className="video-length">
                {formatTime(videoDuration)} | {formatTime(currentTimeInVideo)}
            </div>

            <VideoControls
                seekVideoTo={seekVideoTo}
                playPause={playPauseClicked}
            />
        </div>
    );
}

export default App
