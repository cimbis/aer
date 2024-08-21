import {SimpleVideo} from "./components/StandardVideo/StandardVideo.tsx";
import {VideoControls} from "./components/VideoControls/VideoControls.tsx";

import {useVideoControls} from "./hooks/useVideoControls.ts";


import stitched from "./assets/GS012237-stitched.mp4";
import image from "./assets/thumb_21_R_1592_5.27_.png";

import './App.css'
import {Annotations} from "./components/Annotations/Annotations.tsx";

export interface ImageProps {
    imageSrc: string;
    positionInSeconds: number;
}

const annotation = {
    "21_R_1592_5.27_.png": {
        "qr_val": "1592",
        "distance": "5.27",
        "annotations": [
            {
                "id_nr": 104,
                "category_name": "crack_4th_level",
                "bbox": [
                    202,
                    1025,
                    400,
                    1234
                ],
                "area": "41382",
                "segmentation": [],
                "confidence": "0.63",
                "real_NIO": false,
                "defect_size_mm": 0,
                "operator_found": false
            }
        ]
    },
}

function App() {
    const {
        videoRef,
        videoDuration,
        seekVideoTo,
        onLoadedMetadata,
        playClicked,
        pauseClicked
    } = useVideoControls();

    return (
        <div className="app">
            <div className="position-relative">
                <SimpleVideo
                    src={stitched}
                    ref={videoRef}
                    onLoadedMetadata={onLoadedMetadata}
                />
                <Annotations
                    coordinates={annotation["21_R_1592_5.27_.png"].annotations[0].bbox}
                    text={annotation["21_R_1592_5.27_.png"].annotations[0].category_name}
                />
            </div>

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
