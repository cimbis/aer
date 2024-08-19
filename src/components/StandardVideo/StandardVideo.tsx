import {ForwardedRef, forwardRef, MediaHTMLAttributes, ReactEventHandler} from "react";

import "./StandardVideo.css"

interface SimpleVideoProps {
    src: MediaHTMLAttributes<HTMLVideoElement>["src"];
    onLoadedMetadata: ReactEventHandler<HTMLVideoElement>;
    onTimeUpdate: ReactEventHandler<HTMLVideoElement>;
}

export const SimpleVideo = forwardRef(
    (
        props: SimpleVideoProps,
        ref: ForwardedRef<HTMLVideoElement>
    ) => {
        return (
            <video
                ref={ref}
                src={props.src}
                onLoadedMetadata={props.onLoadedMetadata}
                onTimeUpdate={props.onTimeUpdate}
                className="video"
                width="100%"
                height="100%"
            ></video>
        );
    })
