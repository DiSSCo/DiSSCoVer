/* Import Dependencies */
import { Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Styles */
import styles from 'components/search/search.module.scss';


/* Props Typing */
interface Props {
    filter: Dict,
    searchFilter: string
};


const TextFilter = (props: Props) => {
    const { filter, searchFilter } = props;

    return (
        <Row className="mt-2 px-2">
            <Col>
                <Row>
                    <Col>
                        <p className={`${styles.filterTitle} fw-bold`}> {filter.displayName} </p>
                    </Col>
                </Row>

                <Row className="mt-1">
                    <Col>
                        <div className={`${styles.filterSearchBlock}`}>
                            <Row className="align-items-center">
                                <Col>
                                    <Field name={`filters.${searchFilter}`}
                                        className={`${styles.filterSearch} w-100 px-2 py-1`}
                                        placeholder="Coming soon!"
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default TextFilter;