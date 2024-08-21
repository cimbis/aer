import "./Annotations.css"

interface AnnotationProps {
    coordinates: number[],
    text: string;
}

export const Annotations = ({coordinates, text}: AnnotationProps) => {
    return (
        <div className="annotation-overlay position-absolute w-100 h-100">
            {coordinates}, {text}
        </div>
    );
}
