/* Import Dependencies */
import { useState } from 'react';
import classNames from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from './home.module.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import Title from './components/Title';
import SpecimenTypeFilters from "./components/specimenTypes/SpecimenTypeFilters";
import IntroText from "./components/IntroText";
import GlobalSearchBar from "./components/search/GlobalSearchBar";
import AdvancedSearch from "./components/search/AdvancedSearch";
import Footer from 'components/general/footer/Footer';


const Home = () => {
    /* Base variables */
    const [advancedSearch, setAdvancedSearch] = useState<boolean>(false);

    /* ClassName for Advanced Search */
    const classAdvancedSearch = classNames({
        [`${styles.advancedSearch}`]: true,
        'position-fixed': !advancedSearch,
        [`${styles.active} position-absolute`]: advancedSearch
    });

    const classAdvancedToggled = classNames({
        [`${styles.advancedToggled}`]: true,
        [`${styles.active}`]: !advancedSearch
    });

    return (
        <div>
            <Header />

            <Container fluid className={styles.content}>
                <Row className="h-100">
                    {/* First part of Homepage, relative to screen height */}
                    <Col md={{ span: 10, offset: 1 }} className="h-100">
                        {/* Title for tablet smaller screens */}
                        <Row className="d-lg-none mt-md-5">
                            <Col>
                                <Title />
                            </Col>
                        </Row>
                        <Row className="h-100 align-items-center">
                            <Col lg={{ span: 6 }} md={{ span: 12 }} className="pe-lg-5 pt-md-4">
                                <SpecimenTypeFilters />
                            </Col>
                            <Col lg={{ span: 6 }} md={{ span: 12 }}
                                className="ps-lg-5 mt-md-4 d-flex flex-lg-column flex-md-column-reverse position-relative"
                            >
                                {/* Introduction Text */}
                                <Row className={classAdvancedToggled}>
                                    <Col>
                                        <IntroText />
                                    </Col>
                                </Row>
                                {/* General Search Bar */}
                                <Row className={`${classAdvancedToggled} mt-4`}>
                                    <Col>
                                        <GlobalSearchBar ToggleAdvancedFilter={() => setAdvancedSearch(true)} />
                                    </Col>
                                </Row>
                                {/* Advanced Search */}
                                <div className={`${classAdvancedSearch} w-100 pe-5`} role="advancedSearch">
                                    <AdvancedSearch HideAdvancedSearch={() => setAdvancedSearch(false)} />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
}

export default Home;