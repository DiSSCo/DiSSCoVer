import { useState } from 'react';
import { useLocation, /*useParams*/ } from 'react-router-dom';
import './annotate.css';

/* Import components */
import Header from 'templates/header/Header';
import Body from './body/Body';
import Footer from 'templates/footer/Footer';

/* Import API */
import GetSpecimen from 'api/specimen/GetSpecimen';
import FilterSpecimen from 'api/specimen/FilterSpecimen';


const Annotate = () => {
    const location = useLocation();;
    // const params = useParams();

    let mode = 'annotate';
    let mids = false;

    if (location['state']) {
        if (location['state']['mode']) {
            mode = location['state']['mode'];
        }
        if (location['state']['mids']) {
            mids = location['state']['mids'];
        }
    }

    const [specimen, setSpecimen] = useState();

    if (!specimen) {
        // if (location.state) {
        //     setSpecimen(location.state.specimen);
        // } else if (!specimen && params['id']) {
        /* Temporary disablement */
        // const specimenId = params['id'];
        const specimenId = 'Smilodon Populator';

        GetSpecimen(specimenId, Process);

        function Process(result) {
            const specimen = FilterSpecimen(result);

            setSpecimen(specimen);
        }
        // }
    } else {
        return (
            <div className="d-flex flex-column min-vh-100">
                <Header />

                <Body specimen={specimen} mode={mode} mids={mids} />

                <Footer />
            </div>
        );
    }
}

export default Annotate;