import "./VideoControls.css"
import {Ruler} from "./Ruler/Ruler.tsx";

import image from "../../assets/thumb_21_R_1592_5.27_.png"

interface VideoControlsProps {
    seekVideoTo: (toSeconds: number) => void,
    playPause: () => Promise<void>
    videoDuration: number;
}

export const VideoControls = (props: VideoControlsProps) => {
    return (
        <div className="flex-column position-relative">
            <Ruler
                videoDuration={props.videoDuration}
                pixelsPerSecond={50}
                images={[
                    {
                        positionInSeconds: 7,
                        imageSrc: image
                    }
                ]}
                onImageClick={props.seekVideoTo}
            />
        </div>
    );
}
