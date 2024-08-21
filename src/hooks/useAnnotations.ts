interface AnnotationsHookProps {
    videoDimensions: number[];
}

export const useAnnotations = ({videoDimensions}: AnnotationsHookProps) => {
    console.log(videoDimensions);
}
