interface MetaProps {
    videoDuration: number;
    playClicked: () => void;
    pauseClicked: () => void;
    seekVideoTo: (number: number) => void;
}

export const Meta = (
    {
        playClicked,
        pauseClicked,
        seekVideoTo,
    }: MetaProps
) => {
    return (
        <div className="flex-row align-center">
            <button onClick={playClicked}>
                Play
            </button>
            <button onClick={pauseClicked}>
                Pause
            </button>
            <button onClick={() => seekVideoTo(0)}>
                To Video Start
            </button>
        </div>
    );
}
