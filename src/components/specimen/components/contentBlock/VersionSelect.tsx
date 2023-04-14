/* Import Dependencies */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getSpecimen, getSpecimenVersion, setSpecimenVersion } from 'redux/specimen/SpecimenSlice';

/* Import API */
import GetSpecimenVersions from 'api/specimen/GetSpecimenVersions';


const VersionSelect = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const specimen = useAppSelector(getSpecimen)
    const version = useAppSelector(getSpecimenVersion);
    const [versions, setVersions] = useState<number[]>([]);

    /* OnLoad: Fetch Specimen versions */
    useEffect(() => {
        GetSpecimenVersions(specimen.id).then((versions) => {
            if (versions) {
                versions.sort((a, b) => (a - b));

                setVersions(versions);
            }
        });
    }, []);

    /* Construct Select options */
    const selectOptions: { value: number, label: string }[] = [];

    versions.forEach((version) => {
        selectOptions.push({
            value: version,
            label: `Version ${version}`
        })
    });

    return (
        <Row>
            <Col>
                <Select 
                    value={{ value: version, label: `Version ${version}` }}
                    options={selectOptions}
                    styles={{ menu: provided => ({ ...provided, zIndex: 100000 }) }}
                    onChange={(option) => { option?.value && dispatch(setSpecimenVersion(option.value)) }}
                />
            </Col>
        </Row>
    );
}

export default VersionSelect;