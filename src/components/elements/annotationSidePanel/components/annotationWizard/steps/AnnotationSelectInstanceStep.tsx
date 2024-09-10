/* Import Dependencies */
import jp, { PathComponent } from 'jsonpath';
import { Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { useAppSelector } from 'app/Hooks';

/* Import Store */
import { getAnnotationTarget } from 'redux-store/AnnotateSlice';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { DigitalMedia } from 'app/types/DigitalMedia';
import { Dict } from 'app/Types';

/* Import Components */
import ExistingInstance from './ExistingInstance';


/* Props Type */
type Props = {
    superClass: DigitalSpecimen | DigitalMedia | Dict,
    formValues?: Dict,
    SetFieldValue?: Function
};


/**
 * Component that renders the instance selection of the annotation wizard
 * @param superClass The provided super class
 * @param formValues The current values of the parent form
 * @param SetFieldValue Function to set the value of a field in the form
 * @returns JSX Component
 */
const AnnotationSelectInstanceStep = (props: Props) => {
    const { superClass, formValues, SetFieldValue } = props;

    /* Base variables */
    const annotationTarget = useAppSelector(getAnnotationTarget);
    let nodes: {
        path: PathComponent[];
        value: any;
    }[] = [];

    /* Find all existing instances of the annotation target in the provided super class and process them into a workable format */
    if (annotationTarget) {
        /* Construct json target path */
        let jsonTargetPath: string = '';

        /* Insert the json path library double dots before every square bracket in order to select everything linked to the path */
        annotationTarget.jsonPath.split('[').forEach((pathSegment, index) => {
            if (index) {
                jsonTargetPath = jsonTargetPath.concat(`..[${pathSegment}`);
            } else {
                jsonTargetPath = jsonTargetPath.concat(pathSegment);
            }
        });

        /* Query the super class digital object using the annotation target's json path and find the existing nodes */
        nodes = jp.nodes(superClass, jsonTargetPath);
    }

    return (
        <div className="h-100 d-flex flex-column">
            {/* Selected annotation target */}
            <Row>
                <Col>
                    <p>
                        Annotate a new or existing instance
                    </p>
                </Col>
            </Row>
            {/* Annotate a new instance */}
            <Row className="mt-4">
                <Col>
                    <p className="fw-lightBold">
                        A new instance
                    </p>
                </Col>
            </Row>
            {/* Annotate an existing instance */}
            <Row className="flex-grow-1 mt-4 overflow-hidden">
                <Col className="h-100 d-flex flex-column">
                    <p className="fw-lightBold">
                        Existing instances
                    </p>

                    <Row className="flex-grow-1 overflow-scroll">
                        <Col>
                            {nodes.map(node => {
                                /* Check if node is a class or term */
                                if (Array.isArray(node.value)) {
                                    return node.value.map((value, index) => (
                                        <ExistingInstance jsonPath={jp.stringify([...node.path, index])}
                                            instanceValue={value}
                                            selected={formValues?.jsonPath === jp.stringify([...node.path, index])}
                                            SetFieldValue={SetFieldValue}
                                        />
                                    ));
                                } else {
                                    return (<ExistingInstance jsonPath={jp.stringify(node.path)}
                                        instanceValue={node.value}
                                        selected={formValues?.jsonPath === jp.stringify(node.path)}
                                        SetFieldValue={SetFieldValue}
                                    />);
                                }
                            })}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default AnnotationSelectInstanceStep;