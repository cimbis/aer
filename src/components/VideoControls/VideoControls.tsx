import "./VideoControls.css"
import {ImageProps} from "../../App.tsx";
import {Ruler} from "./Ruler/Ruler.tsx";
import {Meta} from "./Meta/Meta.tsx";

interface VideoControlsProps {
    seekVideoTo: (toSeconds: number) => void,
    playPauseClicked: () => void;
    videoDuration: number;
    images: ImageProps[];
}

export const VideoControls = (
    {
        seekVideoTo,
        playPauseClicked,
        videoDuration,
        images
    }: VideoControlsProps
) => {
    return (
        <div className="flex-column">
            <Meta videoDuration={videoDuration}
                  playPauseClicked={playPauseClicked}
                  seekVideoTo={seekVideoTo}
            />
            <Ruler
                videoDuration={videoDuration}
                pixelsPerSecond={50}
                images={images}
                onImageClick={seekVideoTo}
            />
        </div>
    );
}
