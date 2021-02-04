import React, { MouseEventHandler, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { Cluster, DataChanged, Label, PropsFromData } from '../../Data';
import { PropsForSidebar } from '../../Sidebar';

type Row = {
    label: string,
    size: number,
    metric: string
}

type OrderBy = 'label' | 'size' | 'metric'

type ClusterInfoDict = {
    [label: string]: {
        'size': number,
        'metric': number,
    }
}

var labelsAndData = {}
var rows: Row[] = []

function descendingComparator(a: Row, b: Row, orderBy: OrderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: string, orderBy: OrderBy) {
    return order === 'desc'
        ? (a: Row, b: Row) => descendingComparator(a, b, orderBy)
        : (a: Row, b: Row) => -descendingComparator(a, b, orderBy);
}

function stableSort(array: Row[], comparator: (a: Row, b: Row) => number) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0] as Row);
}


function EnhancedTableHead(props: any) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: string) => (event: any) => {
        onRequestSort(event, property);
    };

    const headCells = [
        { id: 'label', numeric: false, disablePadding: true, label: 'Cluster Name' },
        { id: 'size', numeric: true, disablePadding: false, label: 'Size' },
        { id: 'metric', numeric: true, disablePadding: false, label: 'Density' },
    ];

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'show all clusters' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            <Typography style={{ fontWeight: 600 }}>{headCell.label}</Typography>
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props: any) {
    return (
        <Toolbar>
            <Typography variant="h4" id="tableTitle" style={{ padding: '40px 0' }}>Overview Clusters</Typography>
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    paper: {
        color: 'white',
        backgroundColor: 'unset',
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        color: 'white',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

const useTablePaginationStyles = makeStyles((theme) => ({
    spacer: {
        flex: '1'
    },
    actions: {
        marginLeft: '0',
        marginRight: '0'
    },
    input: {
        flex: '1 3 100%',
        marginLeft: '0',
        marginRight: '0'
    },
    caption: {
        flex: '1 1 100%'
    },

}))

const useTableRowStyles = makeStyles((theme) => ({
    selected: {
        backgroundColor: 'rgba(63, 81, 181, 0.30) !important'
    },
    hover: {
        '&:hover': {
            backgroundColor: 'rgba(63, 81, 181, 0.1) !important'
        }
    }
}))


function clustersToRows(clusters: Cluster) {
    let rows = []
    for (let label in clusters) {
        rows.push({ 'label': label, 'size': clusters[label].size, 'metric': clusters[label].quality.toFixed(2) })
    }
    return rows
}

type PropsClusterTable = PropsForSidebar
export default function ClusterTable({
    labels,
    data,
    dataChanged,
    clustersToShow,
    setClustersToShow,
    selectCluster,
    ...other }: PropsClusterTable) {

    const classes = useStyles();
    const classesTableRow = useTableRowStyles()
    const classesTablePagination = useTablePaginationStyles()
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('size' as OrderBy);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    rows = clustersToRows(other.clusters)

    const handleRequestSort = (event: any, property: OrderBy) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: any) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.label);
            setClustersToShow(newSelecteds);
            return;
        }
        setClustersToShow([]);
    };

    const handleCheckboxClick = (event: any, name: string) => {
        const selectedIndex = clustersToShow.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) { // wasn't clicked before
            newSelected = newSelected.concat(clustersToShow, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(clustersToShow.slice(1));
        } else if (selectedIndex === clustersToShow.length - 1) {
            newSelected = newSelected.concat(clustersToShow.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                clustersToShow.slice(0, selectedIndex),
                clustersToShow.slice(selectedIndex + 1),
            );
        }

        setClustersToShow(newSelected);
    }

    const handleRowClick = (event: any, name: string) => {
        if (event.target.nodeName === "INPUT") return // skip if over checkbox
        selectCluster(name)
        // click checkbox if not cliked yet
        const selectedIndex = clustersToShow.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) { // wasn't clicked before
            newSelected = newSelected.concat(clustersToShow, name);
            setClustersToShow(newSelected);
        }
    };

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name: string) => clustersToShow.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const rowsSorted = stableSort(rows, getComparator(order, orderBy))

    useEffect(() => {
        // select and show first four elements
        setClustersToShow(
            rowsSorted.slice(0, 4).map(row => row.label)
        )
    }, []) // only run on mount/unmount of component

    useEffect(() => {
        rows = clustersToRows(other.clusters)
    }, [other.clusters]) // if clusters change, update rows

    return (
        <div>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={clustersToShow.length} />
                <TableContainer>
                    <Table
                        style={{ width: '100%', minWidth: 'auto' }}
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size='medium'
                        aria-label="cluster table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={clustersToShow.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rowsSorted
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: Row, index: number) => {
                                    const isItemSelected = isSelected(row.label);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event: any) => handleRowClick(event, row.label)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.label}
                                            selected={isItemSelected}
                                            classes={classesTableRow}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color='secondary'
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                    onClick={(event) => handleCheckboxClick(event, row.label)}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none" width={'70%'}>
                                                {row.label}
                                            </TableCell>
                                            <TableCell width={'10%'} align="right">{row.size}</TableCell>
                                            <TableCell width={'10%'} align="right">{row.metric}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={4} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    classes={classesTablePagination}
                    rowsPerPageOptions={[10,20,45]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}