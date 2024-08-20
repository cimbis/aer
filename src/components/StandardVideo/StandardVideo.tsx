import {ForwardedRef, forwardRef, MediaHTMLAttributes, ReactEventHandler} from "react";

import "./StandardVideo.css"

interface SimpleVideoProps {
    src: MediaHTMLAttributes<HTMLVideoElement>["src"];
    onLoadedMetadata: ReactEventHandler<HTMLVideoElement>;
}

export const SimpleVideo = forwardRef(
    (
        props: SimpleVideoProps,
        ref: ForwardedRef<HTMLVideoElement>
    ) => {

        console.log("video");

        return (
            <video
                ref={ref}
                src={props.src}
                onLoadedMetadata={props.onLoadedMetadata}
                className="video"
                width="100%"
                height="100%"
                controls
            ></video>
        );
    })
