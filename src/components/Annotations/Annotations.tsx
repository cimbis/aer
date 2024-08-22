import {ForwardedRef, forwardRef} from "react";

import "./Annotations.css"

export const Annotations = forwardRef(
    (_props, ref: ForwardedRef<HTMLCanvasElement>) => {
        return (
            <canvas
                ref={ref}
                className="annotation-overlay position-absolute">
                Annotations
            </canvas>
        );
    }
)
