import { Row, Col } from 'react-bootstrap';

/* Import Components */
import ValueField from '../ValueField';


const AddingForm = (props) => {
    const modalProperty = props.modalProperty;
    const formData = props.formData['adding'];

    const HandleSubmit = event => {
        event.preventDefault();

        props.SubmitForm('adding');
    }

    return (
        <Row className="mt-3">
            <Col>
                <Row>
                    <Col md={{ span: 9 }}>
                        <div className="annotate_annotationTypeContext px-2 py-2 bg-primary-light">
                            This annotation type is used when adding new values to
                            previously empty attributes.
                        </div>
                    </Col>
                </Row>

                <form className="mt-4" onSubmit={HandleSubmit} autoComplete="off">
                    <Row>
                        <Col>
                            <p className="annotate_annotationTypeFieldTitle"> Chosen attribute: </p>
                            <input className="annotate_annotationTypeField w-100"
                                disabled
                                name="attributeValue"
                                value={modalProperty['displayName']}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <p className="annotate_annotationTypeFieldTitle"> Value: </p>

                            {(modalProperty['multiple']) ?
                                props.RenderMultipleMode('adding')
                                : <ValueField formData={formData}
                                    modalProperty={modalProperty}

                                    UpdateFormData={(value) => props.UpdateFormData('adding', 'value', value)}
                                />
                            }
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <p className="annotate_annotationTypeFieldTitle"> Remarks: </p>
                            <textarea className="annotate_annotationTypeTextArea w-100"
                                rows="4"
                                name="remarks"
                                defaultValue={formData && formData['description']}
                                onChange={(remarks) => props.UpdateFormData('adding', 'description', remarks)}
                            />
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col className="col-md-auto">
                            <button type="submit"
                                className="annotate_annotationTypeSubmit border-2-primary-dark"
                            >
                                Save annotation
                            </button>
                        </Col>
                        {(Object.keys(formData).length > 0) &&
                            <Col className="col-md-auto">
                                <button type="button"
                                    className="annotate_annotationTypeRemove"
                                    onClick={() => props.RemoveAnnotation('adding')}
                                >
                                    Remove Annotation
                                </button>
                            </Col>
                        }
                    </Row>
                </form>
            </Col>
        </Row>
    );

}

export default AddingForm;