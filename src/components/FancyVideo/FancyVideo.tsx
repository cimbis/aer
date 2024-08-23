import {RefObject, useMemo, useRef} from "react";
import {BackSide, RepeatWrapping, Vector3, VideoTexture} from "three";
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";

interface FancyVideoProps {
    videoRef: RefObject<HTMLVideoElement>;
    annotationIdToDisplay: string | null;
    annotations: {
        [id: string]: {
            bbox: number[];
            text: string;
        };
    };
}

export const VideoMesh = (
    {
        videoRef,
    }: FancyVideoProps
) => {

    const sphereRadius = useRef(100);

    const videoTexture = useMemo(() => {
        if (videoRef.current) {
            const videoTexture = new VideoTexture(videoRef.current);

            videoTexture.wrapS = RepeatWrapping;
            videoTexture.repeat.x = -1;

            return videoTexture
        }
    }, [videoRef]);

    useFrame(() => {
            if (videoTexture) {
                videoTexture.needsUpdate = true;
            }
        }
    );


    const {startingCoordinate, width, height} = useMemo(() => ({
        startingCoordinate: new Vector3(0, 0, 0),
        width: 50,
        height: 50,
    }), []);


    return (
        <>
            <group>
                <mesh position={startingCoordinate}>
                    <boxGeometry args={[width, height, 20]}/>
                    <meshBasicMaterial color="red"/>
                </mesh>
                <mesh>
                    <sphereGeometry args={[sphereRadius.current, 128, 128]}/>
                    <meshBasicMaterial
                        map={videoTexture}
                        side={BackSide}
                    />
                </mesh>
            </group>
            <OrbitControls enableZoom/>
        </>
    );
};

export const FancyVideo = (
    {
        videoRef,
        annotationIdToDisplay,
        annotations
    }: FancyVideoProps
) => {
    return (
        <Canvas style={{
            "width": videoRef.current?.offsetWidth,
            "height": videoRef.current?.offsetHeight
        }}>
            <VideoMesh
                videoRef={videoRef}
                annotationIdToDisplay={annotationIdToDisplay}
                annotations={annotations}
            ></VideoMesh>
        </Canvas>
    )
}
