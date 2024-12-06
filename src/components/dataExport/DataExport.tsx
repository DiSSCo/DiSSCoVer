/* Import Dependencies */
import { Formik, Form } from "formik";
import KeycloakService from "app/Keycloak";
import { isEmpty } from "lodash";
import { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/* Import Hooks */
import { useFetch, useLoading, useNotification, useTrigger } from "app/Hooks";

/* Import Types */
import { SourceSystem } from "app/types/SourceSystem";
import { DropdownItem } from "app/Types";

/* Import API */
import ScheduleDataExport from "api/dataExport/ScheduleDataExport";
import GetSourceSystems from "api/sourceSystem/GetSourceSystems";

/* Import Components */
import { Header, Footer } from "components/elements/Elements";
import { Button, Dropdown, LoadingScreen } from "components/elements/customUI/CustomUI";


const DataExport = () => {
    /* Hooks */
    const navigate = useNavigate();
    const fetch = useFetch();
    const loading = useLoading();
    const notification = useNotification();
    const trigger = useTrigger();

    /* Base variables */
    const [sourceSystemDropdownItems, setSourceSystemDropdownItems] = useState<DropdownItem[]>([]);
    const initialValues: {
        sourceSystemID: string | undefined
    } = {
        sourceSystemID: undefined
    };

    /* OnLoad, redirect to home if user is not logged in yet */
    trigger.SetTrigger(() => {
        if (!KeycloakService.IsLoggedIn()) {
            navigate('/');
        }
    }, []);

    /* OnLoad, fetch source systems */
    fetch.Fetch({
        Method: GetSourceSystems,
        Handler: (sourceSystems: SourceSystem[]) => {
            const sourceSystemDropdownItems: DropdownItem[] = [];

            sourceSystems.map(sourceSytem => {
                sourceSystemDropdownItems.push({
                    label: sourceSytem['schema:name'] ?? sourceSytem['schema:identifier'],
                    value: sourceSytem['@id'] ?? sourceSytem['schema:identifier']
                });
            });

            setSourceSystemDropdownItems(sourceSystemDropdownItems);
        }
    });

    return (
        <div className="h-100 d-flex flex-column">
            {/* Render header*/}
            <Header span={10}
                offset={1}
            />

            <Container fluid className="flex-grow-1 overflow-hidden py-5">
                <Row className="h-100">
                    <Col lg={{ span: 4, offset: 4 }}
                        className="h-100 d-flex align-items-center"
                    >
                        <Formik initialValues={initialValues}
                            onSubmit={async (values) => {
                                await new Promise((resolve) => setTimeout(resolve, 100));

                                /* Start loading */
                                loading.Start();

                                /* Post data export request */
                                try {
                                    await ScheduleDataExport({
                                        dataExportKey: "$[ods:sourceSystemID]",
                                        dataExportValue: values.sourceSystemID
                                    });

                                    notification.Push({
                                        key: `dataExport_${Math.random()}`,
                                        message: 'Data Export scheduled successfully, your download link will be sent via email',
                                        template: 'success'
                                    });
                                } catch {
                                    notification.Push({
                                        key: `dataExport_${Math.random()}`,
                                        message: 'Failed to schedule the data export, please try again',
                                        template: 'error'
                                    });
                                };

                                /* End loading */
                                loading.End();
                            }}
                        >
                            {({ setFieldValue, values }) => (
                                <Form>
                                    {/* Data export card */}
                                    <Card className="w-100 px-3 py-2">
                                        {/* Title and description */}
                                        <Row>
                                            <Col>
                                                <p className="fs-2 fw-lightBold">
                                                    Export Data
                                                </p>
                                                <p className="fs-4 mt-2">
                                                    Receive a CSV of physical specimen IDs and DiSSCo managed DOIs
                                                </p>
                                            </Col>
                                        </Row>
                                        {/* Source system dropdown */}
                                        <Row className="mt-3">
                                            <Col>
                                                <p className="fs-4 mb-1">
                                                    Select a Source System to export from:
                                                </p>
                                                {!isEmpty(sourceSystemDropdownItems) &&
                                                    <Dropdown items={sourceSystemDropdownItems}
                                                        OnChange={(sourceSystemOption: DropdownItem) => setFieldValue('sourceSystemID', sourceSystemOption.value)}
                                                    />
                                                }
                                            </Col>
                                        </Row>
                                        {/* Submit button */}
                                        <Row className="mt-5 flex-row-reverse">
                                            <Col lg="auto">
                                                <Button type="submit"
                                                    variant="primary"
                                                    disabled={!values.sourceSystemID}
                                                >
                                                    <p>
                                                        Submit
                                                    </p>
                                                </Button>
                                            </Col>
                                        </Row>

                                        <LoadingScreen visible={loading.loading}
                                            displaySpinner={true}
                                        />
                                    </Card>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Container>

            {/* Render header*/}
            <Footer span={10}
                offset={1}
            />
        </div>
    );
};

export default DataExport;