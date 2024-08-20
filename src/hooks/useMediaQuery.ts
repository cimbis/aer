import {useState, useEffect} from "react";

const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState<boolean>(false);

    useEffect(() => {

        setMatches(window.matchMedia(query).matches);
        const callback = (e: MediaQueryListEvent) => {
            if (e.matches) {
                setMatches(true);
            } else {
                setMatches(false);
            }
        }

        const mediaQuery = window.matchMedia(query);

        mediaQuery.addEventListener("change", callback);

        return () => mediaQuery.removeEventListener('change', callback)
    }, [query, matches]);

    return matches;
};

export default useMediaQuery;
