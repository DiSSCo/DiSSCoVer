// @ts-nocheck

/* Import Dependencies */
import { OpenSeadragonAnnotator, OpenSeadragonAnnotationPopup, OpenSeadragonViewer, W3CImageAnnotation, W3CImageFormat, useAnnotator } from '@annotorious/react';
import { useState } from 'react';

/* Import Utilities */
import { ConstructAnnotationObject, ReformatToAnnotoriousAnnotation } from 'app/utilities/AnnotateUtilities';

/* Import Hooks */
import { useFetch, useLoading, useNotification, useTrigger } from 'app/Hooks';

/* Import Types */
import { DigitalMedia } from 'app/types/DigitalMedia';
import { Annotation } from 'app/types/Annotation';
import { Dict } from 'app/Types';

/* Import API */
import InsertAnnotation from 'api/annotation/InsertAnnotation';

/* Import Components */
import ImagePopup from './ImagePopup';
import { LoadingScreen } from '../customUI/CustomUI';


/* Props Type */
type Props = {
    digitalMedia: DigitalMedia,
    annotoriousMode: string,
    GetAnnotations: Function,
    SetAnnotoriousMode: Function
};


/**
 * Component that renders a dynamic image viewer including the ability to make annotations
 * @param digitalMedia The digital media item to represent
 * @param annotoriousMode The selected Annotorious mode
 * @param GetAnnotations Function to fetch the annotations of the digital object
 * @param SetAnnotoriousMode Function to set the Annotorious mode
 * @returns JSX Component
 */
const ImageViewer = (props: Props) => {
    const { digitalMedia, annotoriousMode, GetAnnotations, SetAnnotoriousMode } = props;

    /* Hooks */
    const fetchHook = useFetch();
    const loading = useLoading();
    const notification = useNotification();
    const trigger = useTrigger();
    const annotorious = useAnnotator<AnnotoriousImageAnnotator<W3CImageAnnotation>>();

    /* Base variables */
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [osdOptions, setOsdOptions] = useState<OpenSeadragon.Options | undefined>();

    /**
     * Function to refresh the visual annotations on the canvas
     */
    const RefreshAnnotations = async () => {
        /* Fetch annotations */
        const annotations: Annotation[] = await GetAnnotations();
        const visualAnnotations: Annotation[] = annotations.filter(annotation => annotation['oa:hasTarget']['oa:hasSelector']['@type'] === 'oa:FragmentSelector');
        const annotoriousAnnotations: W3CImageAnnotation[] = annotorious.getAnnotations();

        if (visualAnnotations.length !== annotoriousAnnotations.length) {
            const refreshedAnnotoriousAnnotations: W3CImageAnnotation[] = [];
            if (visualAnnotations.length) {
                visualAnnotations.forEach(annotation => {
                    refreshedAnnotoriousAnnotations.push(
                        ReformatToAnnotoriousAnnotation(annotation, digitalMedia['ac:accessURI'], annotorious?.viewer.world['_contentSize'])
                    );
                });
            }

            annotorious.setAnnotations(refreshedAnnotoriousAnnotations, true);
        }

        /* Update annotations state */
        setAnnotations(visualAnnotations);
    };

    /* OnLoad, check for image format (image/jpeg for still images and application/json for IIIF) and set source url */
    trigger.SetTrigger(async () => {
        /* Set OpenSeadragon options */
        if (digitalMedia['dcterms:format'] === 'application/json') {
            /* Get manifest */
            const manifest: Dict = await (await fetch(digitalMedia['ac:accessURI'])).json();

            /* Try to structure the info.json file link from the first image in the manifest file */
            let infoUrl: string = '';
            let context: string | string[] = manifest['@context'][1];
            let width: number = 0;
            let height: number = 0;

            /* First try manifest version 2, if it fails try version 3 */
            try {
                /* Manifest version 2 */
                let versionTwoId = manifest.sequences[0].canvases[0].images[0].resource['@id'];

                if (!(versionTwoId.includes('/info.json'))) {
                    versionTwoId = manifest.sequences[0].canvases[0].images[0].resource.service['@id'];
                }

                infoUrl = versionTwoId.replace('/info.json', '');

                /* Set Canvas Width and Height */
                width = manifest.sequences[0].canvases[0].width;
                height = manifest.sequences[0].canvases[0].height;
            } catch {
                /* Manifest version 3 */
                const versionThreeId = manifest.items[0].items[0].items[0].body.id;

                infoUrl = versionThreeId.replace('/info.json', '');

                /* Set Canvas Width and Height */
                width = versionThreeId.items[0].width;
                height = versionThreeId.items[0].height;
            };

            setOsdOptions({
                id: "openSeaDragon",
                preserveViewport: true,
                visibilityRatio: 1,
                defaultZoomLevel: 0,
                sequenceMode: true,
                tileSources: {
                    "@context": context,
                    "@id": infoUrl,
                    "height": height,
                    "width": width,
                    "profile": ["https://iiif.io/api/image/2/level2.json"],
                    "protocol": "http://iiif.io/api/image",
                    "tiles": [{
                        "scaleFactors": [1, 2, 4, 8, 16, 32],
                        "width": 1024
                    }]
                },
                showFullPageControl: false,
                showHomeControl: false,
                prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@2.4/build/openseadragon/images/"
            });
        } else {
            /* Set OpenSeadragon options */
            setOsdOptions({
                tileSources: {
                    type: 'image',
                    url: digitalMedia['ac:accessURI']
                },
                prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@3.1/build/openseadragon/images/",
                gestureSettingsMouse: {
                    clickToZoom: false
                }
            });
        }
    }, [digitalMedia]);

    /* On Annotorious boot, set the Annotorious listeners and events */
    trigger.SetTrigger(() => {
        if (annotorious) {
            /* Set Annotorious listeners */
            annotorious.on('selectionChanged', (selectedAnnotations: W3CImageAnnotation[]) => {
                const annotoriousAnnotations = annotorious.getAnnotations();
                const annotoriousAnnotation = selectedAnnotations[0];

                /* Check for unfinished annotations */
                annotoriousAnnotations.forEach((annotation) => {
                    if (!annotation.id.includes('/') && (!annotoriousAnnotation || annotoriousAnnotation.id !== annotation.id)) {
                        annotorious.removeAnnotation(annotation);
                    }
                });
            });
        }

        /* If Annotorious and OpenSeadragon are ready, apply annotations to canvas */
        if (annotorious && osdOptions) {
            annotorious.viewer.addHandler('open', () => RefreshAnnotations());
        }
    }, [annotorious]);

    /**
     * Function to submit a visual annotation
     * @param annotationValue The string value of the annotation
     */
    const SubmitAnnotation = async (annotationValue: string) => {
        /* Start loading */
        loading.Start();

        /* Get selected Annotorious annotation and content size of digital media item */
        const annotoriousAnnotation = annotorious.getAnnotations().at(-1);
        const annotoriousContentSize: {
            x: number,
            y: number
        } = annotorious?.viewer.world['_contentSize'];

        /* Calculate W3C pixels to TDWG AC position */
        const target = annotoriousAnnotation.target as W3CImageAnnotationTarget;
        const selector = target.selector as W3CImageSelector;
        const coordinates = selector?.value.split(',');

        /* Calculate the relative fragments based upon the given coordinates and image dimensions */
        const fragments: {
            xFrac: number,
            yFrac: number,
            widthFrac: number,
            heightFrac: number
        } = {
            xFrac: Number(coordinates[0].replace('xywh=pixel:', '')) / annotoriousContentSize.x,
            yFrac: Number(coordinates[1]) / annotoriousContentSize.y,
            widthFrac: Number(coordinates[2]) / annotoriousContentSize.x,
            heightFrac: Number(coordinates[3]) / annotoriousContentSize.y
        };

        /* Prepare new Annotation object */
        const newAnnotation = ConstructAnnotationObject({
            digitalObjectId: digitalMedia['@id'],
            digitalObjectType: digitalMedia['@type'],
            motivation: 'oa:commenting',
            annotationTargetType: 'ROI',
            annotationValues: [annotationValue],
            fragments: fragments
        });

        /* Try to post annotation to the API, if succeeds disable draw mode and update Annotorious annotation with DiSSCo identifier, otherwise return and show message */
        try {
            const annotation = await InsertAnnotation({ newAnnotation });

            /* Update Annotorious annotation source on canvas */
            UpdateAnnotoriousAnnotation(
                ReformatToAnnotoriousAnnotation(annotation, digitalMedia['ac:accessURI'], annotorious?.viewer.world['_contentSize']),
                annotoriousAnnotation.id
            );

            SetAnnotoriousMode('move');
        } catch {
            notification.Push({
                key: `${annotoriousAnnotation.id}-${Math.random()}`,
                message: `Failed to save the annotation. Please try saving it again.`,
                template: 'error'
            });
        } finally {
            loading.End();
        };
    };

    /**
     * Function to update an Annotorious annotation on the canvas
     * @param annotoriousAnnotation The updated Annotorious annotation
     * @param originalId The original identifier of the Annotorious annotation (present when inserting it for the first time)
     */
    const UpdateAnnotoriousAnnotation = (annotoriousAnnotation: W3CImageAnnotation, originalId?: string) => {
        /* If original identifier is present, and thus is added for the first time, remove this instance and update with DiSSCo identifier, otherwise just update */
        if (originalId) {
            /* Remove old Annotorious annotation */
            annotorious.removeAnnotation(originalId);

            /* Replace with new version of annotation */
            annotorious.addAnnotation(annotoriousAnnotation);
        } else {
            /* Update Annotorious annotation */
            annotorious.updateAnnotation(annotoriousAnnotation);
        }

        /* Set selected annotation */
        annotorious.setSelected(annotoriousAnnotation.id);
    };

    /* Styling for OpenSeadragon annotator */
    const openSeadragonAnnotatorStyle = () => ({
        fill: '#a1d8ca'
    });

    return (
        <div className="h-100 position-relative">
            {osdOptions ?
                <OpenSeadragonAnnotator adapter={W3CImageFormat('https://iiif.bodleian.ox.ac.uk/iiif/image/af315e66-6a85-445b-9e26-012f729fc49c')}
                    drawingEnabled={annotoriousMode === 'draw'}
                    drawingMode='click'
                    tool="rectangle"
                    style={openSeadragonAnnotatorStyle}
                >
                    <OpenSeadragonViewer options={osdOptions}
                        className="h-100 bgc-grey-light"
                    />

                    <OpenSeadragonAnnotationPopup popup={() => (
                        <ImagePopup annotation={annotations.find(annotation => annotation['ods:ID'] === annotorious.getSelected()?.[0].id)}
                            loading={loading.loading}
                            SubmitAnnotation={SubmitAnnotation}
                        />
                    )}
                    />
                </OpenSeadragonAnnotator>
                : <LoadingScreen visible
                    text="Loading digital media"
                    displaySpinner
                />
            }
        </div>
    );
};

export default ImageViewer;