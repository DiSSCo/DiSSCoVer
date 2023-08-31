/* Import Dependencies */
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import DataTable, { TableColumn } from 'react-data-table-component';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
    getSearchResults, getSearchSpecimen, setSearchSpecimen,
    getCompareMode, getCompareSpecimens, setCompareSpecimens
} from 'redux/search/SearchSlice';

/* Import Types */
import { Specimen } from 'global/Types';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Components */
import ColumnLink from './ColumnLink';


/* Props Styling */
interface Props {
    pageNumber: number,
    HideFilters: Function
};


const ResultsTable = (props: Props) => {
    const { pageNumber, HideFilters } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const searchResults = useAppSelector(getSearchResults);
    const searchSpecimen = useAppSelector(getSearchSpecimen);
    const [tableData, setTableData] = useState<DataRow[]>([]);
    const compareMode = useAppSelector(getCompareMode);
    const compareSpecimens = useAppSelector(getCompareSpecimens);

    interface DataRow {
        index: number,
        id: string,
        specimen_name: string,
        country: string,
        specimen_type: string,
        organisation: string,
        organisationId: string,
        toggleSelected: boolean,
        compareSelected: boolean
    };

    /* Function for when clicked on a table row, continue to specimen page */
    const OnSpecimenSelect = (row: DataRow) => {
        /* Set specimen */
        const specimen: Specimen = searchResults[row.index];

        dispatch(setSearchSpecimen(specimen));

        /* Unselect current Row */
        const unselectedRow = tableData.find((tableRow) => (tableRow.toggleSelected && tableRow.id !== specimen.id));

        if (unselectedRow) {
            unselectedRow.toggleSelected = false;
        }

        /* Select chosen Table Row */
        const selectedRow = tableData.find((tableRow) => tableRow.id === specimen.id);

        if (selectedRow) {
            selectedRow.toggleSelected = true;
        }

        const copyTableData = [...tableData];

        setTableData(copyTableData);

        /* Hide Filters */
        HideFilters();
    }

    /* Function for selecting a specimen for comparison */
    const SelectForComparison = (row: DataRow) => {
        /* Update table data and Compare Specimens array*/
        const selectedRow = tableData.find((tableRow) => tableRow.id === row.id);
        const copyCompareSpecimens = [...compareSpecimens];

        /* If deselected, remove from array */
        if (selectedRow) {
            if (row.compareSelected === true) {
                selectedRow.compareSelected = false;

                const compareSpecimenIndex = compareSpecimens.findIndex((specimen) => specimen.id === row.id);
                copyCompareSpecimens.splice(compareSpecimenIndex, 1);
            } else if (compareSpecimens.length < 3) {
                selectedRow.compareSelected = true;

                copyCompareSpecimens.push(searchResults[row.index]);
            }
        }

        dispatch(setCompareSpecimens(copyCompareSpecimens));
    }

    /* Function to reset chosen Table Row on close */
    useEffect(() => {
        if (isEmpty(searchSpecimen)) {
            /* Unselect current Row */
            const currentRow = tableData.find((tableRow) => tableRow.toggleSelected);

            if (currentRow) {
                currentRow.toggleSelected = false;
            }
        }

        const copyTableData = [...tableData];

        setTableData(copyTableData);
    }, [searchSpecimen, pageNumber]);

    /* Function to check if selected Specimen is still selected after page change */
    useEffect(() => {
        if (!isEmpty(searchSpecimen)) {
            if (!tableData.find((tableRow) => (tableRow.toggleSelected && tableRow.id === searchSpecimen.id))) {
                const currentRow = tableData.find((tableRow) => tableRow.id === searchSpecimen.id);

                if (currentRow) {
                    currentRow.toggleSelected = true;

                    const copyTableData = [...tableData];

                    setTableData(copyTableData);
                }
            }
        }
    }, [tableData]);

    /* Set Datatable columns */
    const tableColumns: TableColumn<DataRow>[] = [{
        name: 'Specimen name',
        selector: row => row.specimen_name,
        id: 'search_name',
        sortable: true
    }, {
        name: 'Country',
        selector: row => row.country,
        id: 'search_country',
        sortable: true
    }, {
        name: 'Specimen type',
        selector: row => row.specimen_type,
        id: 'search_type',
        sortable: true
    }, {
        name: 'Organisation',
        selector: row => row.organisation,
        id: 'search_organisation',
        cell: row => <ColumnLink link={row.organisationId} text={row.organisation} />,
        ignoreRowClick: true,
        style: {
            color: "#28bacb"
        },
        sortable: true
    }];

    if (compareMode) {
        tableColumns.unshift({
            selector: row => row.id,
            id: 'search_compareCheckbox',
            cell: row => <input type="checkbox" checked={row.compareSelected} onChange={() => SelectForComparison(row)} />,
            width: '40px',
            ignoreRowClick: true
        });
    }

    /* Custom styles for Data Table */
    const customStyles = {
        head: {
            style: {
                color: 'white',
                fontSize: '14px'
            }
        },
        headRow: {
            style: {
                backgroundColor: '#51a993'
            }
        },
        rows: {
            style: {
                minHeight: '40px'
            },
            highlightOnHoverStyle: {
                backgroundColor: '#98cdbf',
            },
            stripedStyle: {
                backgroundColor: '#eef7f4'
            }
        }
    };

    const conditionalRowStyles = [{
        when: (row: any) => row.toggleSelected,
        style: {
            backgroundColor: '#98cdbf',
            userSelect: 'none'
        }
    }];

    /* OnChange of Specimen Search Results: update Table Data */
    useEffect(() => {
        const tableData: DataRow[] = [];

        searchResults.forEach((specimen, i) => {
            tableData.push({
                index: i,
                id: specimen.id,
                specimen_name: specimen.specimenName,
                country: specimen.data['dwc:country'] ? specimen.data['dwc:country'] : '-',
                specimen_type: specimen.type,
                organisation: specimen.data['ods:organisationName'] ? specimen.data['ods:organisationName'] : specimen.organisationId,
                organisationId: specimen.organisationId,
                toggleSelected: false,
                compareSelected: !!compareSpecimens.find((compareSpecimen) => compareSpecimen.id === specimen.id)
            });
        });

        setTableData(tableData);
    }, [searchResults, compareSpecimens]);

    return (
        <div className="h-100 overflow-auto position-relative b-secondary rounded-c">
            <DataTable
                columns={tableColumns}
                data={tableData}
                customStyles={customStyles}
                onRowClicked={(row) => {
                    if (compareMode) {
                        SelectForComparison(row);
                    } else {
                        OnSpecimenSelect(row);
                    }
                }}
                conditionalRowStyles={conditionalRowStyles}

                striped
                highlightOnHover
                pointerOnHover
            />
        </div>
    );
}

export default ResultsTable;