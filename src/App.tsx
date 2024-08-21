import {SimpleVideo} from "./components/StandardVideo/StandardVideo.tsx";
import {VideoControls} from "./components/VideoControls/VideoControls.tsx";

import {useVideoControls} from "./hooks/useVideoControls.ts";


import stitched from "./assets/GS012237-stitched.mp4";
import image from "./assets/thumb_21_R_1592_5.27_.png";

import './App.css'

export interface ImageProps {
    imageSrc: string;
    positionInSeconds: number;
}

function App() {
    const {
        videoRef,
        videoDuration,
        seekVideoTo,
        onLoadedMetadata,
        playPauseClicked
        playClicked,
        pauseClicked
    } = useVideoControls();

    return (
        <div className="app">
            <SimpleVideo
                src={stitched}
                ref={videoRef}
                onLoadedMetadata={onLoadedMetadata}
            />

            <VideoControls
                seekVideoTo={seekVideoTo}
                videoDuration={videoDuration}
                playClicked={playClicked}
                pauseClicked={pauseClicked}
                images={[
                    {
                        positionInSeconds: 7,
                        imageSrc: image
                    }
                ]}
            />
        </div>
    );
}

export default App
