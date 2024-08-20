import {ForwardedRef, forwardRef, MediaHTMLAttributes, ReactEventHandler} from "react";

import "./StandardVideo.css"

interface SimpleVideoProps {
    src: MediaHTMLAttributes<HTMLVideoElement>["src"];
    onLoadedMetadata: ReactEventHandler<HTMLVideoElement>;
}

export const SimpleVideo = forwardRef(
    ({
         src,
         onLoadedMetadata
     }: SimpleVideoProps,
     ref: ForwardedRef<HTMLVideoElement>
    ) => {
        return (
            <video
                ref={ref}
                src={src}
                onLoadedMetadata={onLoadedMetadata}
                className="video"
                width="100%"
                height="100%"
                controls
            ></video>
        );
    })
