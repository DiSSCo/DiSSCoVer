/* Import Depencencies */
import classNames from "classnames";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

/* Import Hooks */
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch, useFetch } from "app/Hooks";

/* Import Store */
import { getDigitalMedia, setDigitalMedia } from "redux-store/DigitalMediaSlice";

/* Import Types */
import { DigitalMedia as DigitalMediaType } from "app/types/DigitalMedia";

/* Import Sources */
import DigitalMediaSchema from 'sources/dataModel/digitalMedia.json';

/* Import API */
import GetDigitalMedia from "api/digitalMedia/GetDigitalMedia";
import GetDigitalMediaAnnotations from "api/digitalMedia/GetDigitalMediaAnnotations";
import GetDigitalMediaMASs from "api/digitalMedia/GetDigitalMediaMAS";
import GetDigitalMediaMASJobRecords from "api/digitalMedia/GetDigitalMediaMASJobRecords";
import ScheduleDigitalMediaMAS from "api/digitalMedia/ScheduleDigitalMediaMAS";

/* Import Components */
import { ContentBlock, IdCard, TopBar } from "./components/DigitalMediaComponents";
import { AnnotationSidePanel, BreadCrumbs, Footer, Header } from "components/elements/Elements";
import { LoadingScreen } from "components/elements/customUI/CustomUI";


/**
 * Component that renders the digital media page
 * @returns JSX Component
 */
const DigitalMedia = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const params = useParams();
    const fetch = useFetch();

    /* Base variables */
    const digitalMedia = useAppSelector(getDigitalMedia);
    const [annotationMode, setAnnotationMode] = useState<boolean>(false);

    /* OnLoad, fetch digital media data */
    fetch.Fetch({
        params: {
            handle: `${params.prefix}/${params.suffix}`,
            version: ''
        },
        triggers: [params.suffix],
        Method: GetDigitalMedia,
        Handler: (digitalMedia: DigitalMediaType) => dispatch(setDigitalMedia(digitalMedia))
    });

    /* Class Names */
    const digitalMediaBodyClass = classNames({
        'col-lg-12': !annotationMode,
        'col-lg-8': annotationMode
    });

    const digitalMediaContentClass = classNames({
        'col-lg-10 offset-lg-1': !annotationMode,
        'col-lg-12 px-5': annotationMode
    });

    const annotationSidePanelClass = classNames({
        'w-0': !annotationMode,
        'col-lg-4 pe-0': annotationMode
    });

    return (
        <div className="h-100 d-flex flex-column">
            {/* Main container, acting as the body for the digital specimen page and additionally, the annotation side panel */}
            <Container fluid className="h-100 overflow-hidden">
                <Row className="h-100">
                    <Col className={`${digitalMediaBodyClass} h-100 tr-smooth`}>
                        <div className={`${digitalMediaContentClass} h-100 d-flex flex-column tr-smooth`}>
                            {/* Render header*/}
                            <Header />

                            {/* Digital specimen page body */}
                            <Container fluid className="flex-grow-1 overflow-hidden my-5">
                                <Row className="h-100">
                                    <Col
                                        className={`h-100 d-flex flex-column position-relative`}
                                    >
                                        {(!fetch.loading && digitalMedia) &&
                                            <>
                                                {/* Bread crumbs */}
                                                <Row>
                                                    <Col>
                                                        <BreadCrumbs />
                                                    </Col>
                                                </Row>
                                                {/* Top bar */}
                                                <Row className="mt-2">
                                                    <Col>
                                                        <TopBar digitalMedia={digitalMedia}
                                                            annotationMode={annotationMode}
                                                            ToggleAnnotationSidePanel={() => setAnnotationMode(!annotationMode)}
                                                        />
                                                    </Col>
                                                </Row>
                                                {/* ID card and content block */}
                                                <Row className="flex-grow-1 overflow-hidden mt-4">
                                                    {/* ID card */}
                                                    <Col lg={{ span: 3 }}
                                                        className="h-100"
                                                    >
                                                        <IdCard digitalMedia={digitalMedia} />
                                                    </Col>
                                                    {/* Content block */}
                                                    <Col lg={{ span: 9 }}
                                                        className="h-100"
                                                    >
                                                        <ContentBlock digitalMedia={digitalMedia} />
                                                    </Col>
                                                </Row>
                                            </>
                                        }

                                        {/* Loading screen if digital specimen is being fetched */}
                                        <LoadingScreen visible={fetch.loading}
                                            displaySpinner={true}
                                            text="Loading Digital Media"
                                            className="bgc-default"
                                        />
                                    </Col>
                                </Row>
                            </Container>

                            <Footer />
                        </div>
                    </Col>
                    {digitalMedia &&
                        <div className={`${annotationSidePanelClass} h-100 tr-smooth`}>
                            <AnnotationSidePanel superClass={digitalMedia}
                                schema={DigitalMediaSchema}
                                GetAnnotations={GetDigitalMediaAnnotations}
                                GetMASs={GetDigitalMediaMASs}
                                GetMASJobRecords={GetDigitalMediaMASJobRecords}
                                ScheduleMASs={ScheduleDigitalMediaMAS}
                                HideAnnotationSidePanel={() => setAnnotationMode(false)}
                            />
                        </div>
                    }
                </Row>
            </Container>
        </div>
    );
};

export default DigitalMedia;