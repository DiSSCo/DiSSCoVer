/* Import Dependencies */
import { Formik, Form } from 'formik';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { useAppDispatch } from 'app/Hooks';

/* Import Store */
import { setAnnotationTarget } from 'redux-store/AnnotateSlice';

/* Import Types */
import { Dict, ProgressDot } from 'app/Types';

/* Import Components */
import { AnnotationTargetStep, AnnotationFormStep, AnnotationInstanceSelectStep } from './AnnotationWizardComponents';
import { Button, ProgressDots, Tabs } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    schema: Dict
};


/**
 * Component that renders the annotation wizard for adding annotations
 * @returns JSX Component
 */
const AnnotationWizard = (props: Props) => {
    const { schema } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Define wizard step components using tabs */
    const tabs: { [name: string]: JSX.Element } = {
        annotationTarget: <AnnotationTargetStep schema={schema} />,
        annotationSelectInstance: <AnnotationInstanceSelectStep />,
        annotationForm: <AnnotationFormStep />
    };

    /* Base variables */
    const [tabStates, setTabStates] = useState<{
        checked: boolean,
        active: boolean
    }[]>(
        Object.keys(tabs).map((_key, index) => ({
            checked: !index,
            active: !index
        }))
    );
    const progressDots: ProgressDot[] = [];
    const selectedIndex: number = tabStates.findIndex(tabState => tabState.active);
    const completedTill: number = tabStates.findLastIndex(tabState => tabState.checked);
    const initialFormValues: {
        class: {
            label: string,
            value: string
        } | undefined,
        term: {
            label: string,
            value: string
        } | undefined
    } = {
        class: undefined,
        term: undefined
    };

    /**
     * Function to go to the provided step in the wizard
     * @param stepIndex The step to move to in the wizard
     */
    const GoToStep = (stepIndex: number) => {
        /* Find current active index */
        const currentIndex: number = tabStates.findIndex(tabState => tabState.active);

        /* Set current index non active */
        tabStates[currentIndex].active = false;

        /* Set next index active */
        tabStates[stepIndex].active = true;

        /* Check if targetted step has been checked */
        if (!tabStates[stepIndex].checked) {
            tabStates[stepIndex].checked = true;
        }

        setTabStates([...tabStates]);
    };

    /* Construct progress dots */
    Object.keys(tabs).forEach((tab, index) => {
        progressDots.push({
            label: tab,
            OnClick: () => GoToStep(index)
        });
    });

    /**
     * Function to set the annotation target based on the user's selection (wizard step one)
     */
    const SetAnnotationTarget = (formValues: Dict, targetType: string) => {
        /* Check if class is the super class */
        let classType: 'class' | 'superClass' = 'class';

        if (formValues.class && formValues.class.value === '$') {
            classType = 'superClass';
        }

        /* Set annotation target */
        dispatch(setAnnotationTarget({
            type: targetType === 'class' ? classType : 'term',
            jsonPath: targetType === 'class' ? formValues.class?.value as string : formValues.term?.value as string,
        }));

        /* Go to next step in wizard */
        GoToStep(tabStates.findIndex(tabState => tabState.active) + 1);
    };

    return (
        <div className="h-100 d-flex flex-column">
            {/* Previous and next step buttons */}
            <Row>
                {!!selectedIndex &&
                    <Col lg>
                        <Button type="button"
                            variant="blank"
                            className="px-0 py-0 tc-primary fw-lightBold"
                            OnClick={() => GoToStep(selectedIndex - 1)}
                        >
                            {`< Previous step`}
                        </Button>
                    </Col>
                }
                {selectedIndex < completedTill &&
                    <Col lg
                        className="d-flex justify-content-end"
                    >
                        <Button type="button"
                            variant="blank"
                            className="px-0 py-0 tc-primary fw-lightBold"
                            OnClick={() => GoToStep(selectedIndex + 1)}
                        >
                            {`Next step >`}
                        </Button>
                    </Col>
                }
            </Row>
            {/* Wizard steps display */}
            <Row className="flex-grow-1">
                <Col>
                    <Formik
                        initialValues={initialFormValues}
                        onSubmit={async (_values) => {
                            await new Promise((resolve) => setTimeout(resolve, 100));


                        }}
                    >
                        {({ values, setFieldValue }) => (
                            <Form>
                                <Tabs tabs={tabs}
                                    selectedIndex={selectedIndex}
                                    tabClassName='d-none'
                                    tabProps={{
                                        formValues: values,
                                        SetFieldValue: setFieldValue,
                                        SetAnnotationTarget
                                    }}
                                    SetSelectedIndex={GoToStep}

                                />
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
            {/* Progress dots adhering to wizard */}
            <Row>
                <Col>
                    <ProgressDots progressDots={progressDots}
                        selectedIndex={selectedIndex}
                        completedTill={completedTill}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default AnnotationWizard;