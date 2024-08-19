import "./VideoControls.css"

interface VideoControlsProps {
    seekVideoTo: (toSeconds: number) => void,
    playPause: () => Promise<void>
}

export const VideoControls = (props: VideoControlsProps) => {
    return (
        <div className="video-controls">
            <button onClick={() => props.seekVideoTo(100)}>
                Seek to
            </button>
            <button onClick={props.playPause}>
                Play/Pause
            </button>
        </div>
    );
}
