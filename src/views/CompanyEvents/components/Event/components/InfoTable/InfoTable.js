import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

// @material-ui/core components
import Pagination from '@material-ui/lab/Pagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RemoveIcon from '@material-ui/icons/Remove';
// import Button from '@material-ui/core/Button';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from 'views/MyProfile/style/MyProfileCss';
import { useDispatch, useSelector } from 'react-redux';
import { ticketActions, sortingActions } from 'redux/actions';

import { useStyles } from './style';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(isUsed, id, type, price, date) {
  return { isUsed, id, type, price, date };
}

export default function InfoTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  async function dispatchTickets(id) {
    await dispatch(ticketActions.getCompanyTickets(id));
  }

  const pageNumber = useSelector(state => state.ticketsData.pageNumber);
  const page = useSelector(state => state.sortingData.pageCompany);
  const tickets = useSelector(state => state.ticketsData.tickets);
  const ticketsGotResponse = useSelector(state => state.ticketsData.ticketsGotResponse);
  let rows = [];

  useEffect(() => {
    console.log('component mount info table');
    async function fetchData() {
      await dispatchTickets(props.id);
    }
    fetchData();
  }, []);

  useEffect(() => {
    return () => {
      rows =
        Array.isArray(tickets) &&
        tickets.map(ticket => {
          const price = ticket.is_vip ? ticket.event.vip_ticket_fee : ticket.event.ticket_fee;
          const type = ticket.is_vip ? 'Vip Ticket' : 'Ordinary Ticket';
          createData(ticket.is_used, ticket.public_id, type, price, ticket.created_date);
        });
      console.log('tickets update', tickets, ticketsGotResponse, rows);
    };
  }, [ticketsGotResponse]);

  const handleChange = (event, value) => {
    dispatch(sortingActions.changePageCompany(value));
    dispatchTickets(props.id);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Is Used</StyledTableCell>
                <StyledTableCell align="right">TicketId</StyledTableCell>
                <StyledTableCell align="right">Ticket Type</StyledTableCell>
                <StyledTableCell align="right">Ticket Price</StyledTableCell>
                <StyledTableCell align="right">Bought Date & Time</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(tickets) &&
                tickets.map(row => (
                  <StyledTableRow key={row.public_id}>
                    <StyledTableCell>
                      {row.is_used ? <CheckCircleOutlineIcon /> : <RemoveIcon />}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.public_id}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.is_vip ? 'Vip Ticket' : 'Ordinary Ticket'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.is_vip ? row.event.vip_ticket_fee : row.event.ticket_fee}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.created_date}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {tickets && tickets.length > 0 ? (
          <div style={{ padding: '10px' }}>
            <Pagination
              count={pageNumber}
              page={page}
              onChange={handleChange}
              defaultPage={1}
              boundaryCount={2}
              showFirstButton
              showLastButton
            />
          </div>
        ) : (
          ''
        )}
        {!ticketsGotResponse ? (
          <div style={{ position: 'relative', marginLeft: '50%', padding: '25px' }}>
            <CircularProgress />
          </div>
        ) : (
          ''
        )}
        {ticketsGotResponse && tickets.length === 0 ? (
          <h3 style={{ position: 'relative', marginLeft: '50%', padding: '25px' }}>
            No Tickets to show
          </h3>
        ) : (
          ''
        )}
      </div>
    </MuiThemeProvider>
  );
}

InfoTable.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
