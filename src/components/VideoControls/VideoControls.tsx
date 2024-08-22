import "./VideoControls.css"
import {ImageProps} from "../../App.tsx";
import {Ruler} from "./Ruler/Ruler.tsx";
import {Meta} from "./Meta/Meta.tsx";

interface VideoControlsProps {
    displayAnnotationWithId: (id: string) => void,
    seekVideoTo: (toSeconds: number) => void,
    playClicked: () => void;
    pauseClicked: () => void;
    onThumbnailClicked: (
        {id, time}: { id: string, time: number }
    ) => void;
    videoDuration: number;
    images: ImageProps[];
}

export const VideoControls = (
    {
        onThumbnailClicked,
        seekVideoTo,
        playClicked,
        pauseClicked,
        videoDuration,
        images
    }: VideoControlsProps
) => {

    return (
        <div className="flex-column">
            <Meta videoDuration={videoDuration}
                  playClicked={playClicked}
                  pauseClicked={pauseClicked}
                  seekVideoTo={seekVideoTo}
            />
            <Ruler
                videoDuration={videoDuration}
                pixelsPerSecond={50}
                images={images}
                onThumbnailClick={onThumbnailClicked}
            />
        </div>
    );
}
