import {SimpleVideo} from "./components/StandardVideo/StandardVideo.tsx";
import {VideoControls} from "./components/VideoControls/VideoControls.tsx";
import {Annotations} from "./components/Annotations/Annotations.tsx";

import {useVideoControls} from "./hooks/useVideoControls.ts";
import {useAnnotations} from "./hooks/useAnnotations.ts";


import stitched from "./assets/GS012237-stitched.mp4";
import image1 from "./assets/thumb_21_R_1592_5.27_.png";
import image2 from "./assets/thumb_111_R_1972_5.23_.png";

import './App.css'
import {useCallback, useMemo} from "react";
import {FancyVideo} from "./components/FancyVideo/FancyVideo.tsx";

export interface ImageProps {
    id: string;
    imageSrc: string;
    positionInSeconds: number;
}

export interface VideoDimensions {
    originalWidth: number,
    originalHeight: number,
    renderedWidth: number,
    renderedHeight: number,
}


function App() {
    const annotations = useMemo(() => ({
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
        "111_R_1972_5.23_.png": {
            "qr_val": "1972",
            "distance": "5.23",
            "annotations": [
                {
                    "id_nr": 105,
                    "category_name": "crack_4th_level",
                    "bbox": [
                        1949,
                        1767,
                        2547,
                        2192
                    ],
                    "area": "254150",
                    "segmentation": [],
                    "confidence": "0.78",
                    "real_NIO": false,
                    "defect_size_mm": 0,
                    "operator_found": false
                }
            ]
        },
    }), [])

    const images = useMemo(() => [
        {
            positionInSeconds: 7,
            imageSrc: image1,
            id: "21_R_1592_5.27_.png"
        },
        {
            positionInSeconds: 37,
            imageSrc: image2,
            id: "111_R_1972_5.23_.png"
        }
    ], [])

    const annotationsInfo = {
        "21_R_1592_5.27_.png": {
            bbox: annotations["21_R_1592_5.27_.png"].annotations[0].bbox,
            text: annotations["21_R_1592_5.27_.png"].annotations[0].category_name
        },
        "111_R_1972_5.23_.png": {
            bbox: annotations["111_R_1972_5.23_.png"].annotations[0].bbox,
            text: annotations["111_R_1972_5.23_.png"].annotations[0].category_name
        }
    }

    const {
        videoRef,
        videoDuration,
        videoDimensions,
        seekVideoTo,
        onLoadedMetadata,
        playClicked,
        pauseClicked
    } = useVideoControls();

    const {
        annotationsRef,
        displayAnnotationWithId,
        clearAnnotations,
        annotationIdToDisplay
    } = useAnnotations({
        videoDimensions,
        annotations: annotationsInfo,
    });

    const onThumbnailClick = useCallback(async ({id, time}: {
        id: string,
        time: number
    }) => {
        seekVideoTo(time);
        await pauseClicked();
        displayAnnotationWithId(id);
    }, [displayAnnotationWithId, pauseClicked, seekVideoTo]);

    const onPlayClick = useCallback(async () => {
        await playClicked();
        clearAnnotations();
    }, [clearAnnotations, playClicked]);

    const onPauseClick = useCallback(async () => {
        await pauseClicked();
        clearAnnotations();
    }, [clearAnnotations, pauseClicked]);

    const onSeekVideoTo = useCallback((toSeconds: number) => {
        seekVideoTo(toSeconds);
        clearAnnotations();
    }, [clearAnnotations, seekVideoTo])

    return (
        <div className="app">
            <div className="position-relative">
                <SimpleVideo
                    src={stitched}
                    ref={videoRef}
                    onLoadedMetadata={onLoadedMetadata}
                />
                <Annotations
                    ref={annotationsRef}
                />
            </div>

            <FancyVideo
                videoRef={videoRef}
                annotationIdToDisplay={annotationIdToDisplay}
                annotations={annotationsInfo}
            />

            <VideoControls
                displayAnnotationWithId={displayAnnotationWithId}
                seekVideoTo={onSeekVideoTo}
                videoDuration={videoDuration}
                playClicked={onPlayClick}
                pauseClicked={onPauseClick}
                images={images}
                onThumbnailClicked={onThumbnailClick}
            />
        </div>
    );
}

export default App
