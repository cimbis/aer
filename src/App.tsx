import {SimpleVideo} from "./components/StandardVideo/StandardVideo.tsx";
import {VideoControls} from "./components/VideoControls/VideoControls.tsx";

import {useVideoControls} from "./hooks/useVideoControls.ts";

import {formatTime} from "./utils/formatTime.ts";

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

            <div className="flex-row align-center">
                <span className="monospaced">
                    {formatTime(videoDuration)} | {formatTime(currentTimeInVideo)}
                </span>
                <button onClick={playPauseClicked}>
                    Play/Pause
                </button>
                <button onClick={() => seekVideoTo(0)}>
                    To Video Start
                </button>
            </div>

            <VideoControls
                seekVideoTo={seekVideoTo}
                playPause={playPauseClicked}
                videoDuration={videoDuration}
            />
        </div>
    );
}

export default App
