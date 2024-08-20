import {MouseEventHandler} from "react";

interface MetaProps {
    videoDuration: number;
    playPauseClicked: MouseEventHandler<HTMLButtonElement>;
    seekVideoTo: (number: number) => void;
}

export const Meta = ({
                         playPauseClicked,
                         seekVideoTo,
                     }: MetaProps) => {
    return (
        <div className="flex-row align-center">
            <button onClick={playPauseClicked}>
                Play/Pause
            </button>
            <button onClick={() => seekVideoTo(0)}>
                To Video Start
            </button>
        </div>
    );
}
