import {ForwardedRef, forwardRef, MediaHTMLAttributes, ReactEventHandler} from "react";

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
                width="100%"
                height="100%"
            ></video>
        );
    })
