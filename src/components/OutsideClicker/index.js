import React, { useEffect, useRef } from 'react';
import "./OutsideClicker.css";

/**
 * Hook that alerts clicks outside of the passed ref
 */

function useOutsideClicker(props, ref) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            console.log("clickOutside");
            if (ref.current && !ref.current.contains(event.target)) {
                /* alert("You clicked outside of me!"); */
                props.openCloseMenu();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, props]);
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideClicker(props) {
    const wrapperRef = useRef(null);
    console.log("props", props);
    useOutsideClicker(props, wrapperRef);

    return <div ref={wrapperRef}>{props.children}</div>;
}