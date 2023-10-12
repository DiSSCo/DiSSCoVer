/* Import Dependencies */
import classNames from "classnames";

/* Import Types */
import { DigitalMedia } from "global/Types";

/* Import Styling */
import styles from 'components/specimen/specimen.module.scss';


/* Props Typing */
interface Props {
    digitalMedia: DigitalMedia,
    sizeOrientation: 'width' | 'height',
    hoverEffect?: boolean
};


const Image = (props: Props) => {
    const { digitalMedia, sizeOrientation, hoverEffect } = props;

    /* Class Names */
    const classSizeOrientation = classNames({
        'w-100': sizeOrientation === 'width',
        'h-100': sizeOrientation === 'height'
    });

    return (
        <div className="d-flex position-relative h-100 w-100 justify-content-center">
            <img src={digitalMedia.mediaUrl}
                alt={digitalMedia.id}
                className={`${classSizeOrientation} rounded`}
            />

            {hoverEffect &&
                <div className={`${styles.imageHover} opacity-0 position-absolute transition 
                        h-100 w-100 top-0 d-flex justify-content-center align-items-center c-pointer px-3`
                }>
                    <p className="fw-bold"> {digitalMedia.id.replace('https://hdl.handle.net/', '')} </p>
                </div>
            }
        </div>
    );
}

export default Image;