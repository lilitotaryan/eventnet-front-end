import React, { useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import { useDispatch, useSelector } from 'react-redux';
import { ticketActions, sortingActions } from 'redux/actions';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
    sorting: {
      display: 'flex',
    },
  },
};

const useStyles = makeStyles(styles);

export default function Projects() {
  const classes = useStyles();

  const dispatch = useDispatch();

  async function dispatchTickets() {
    await dispatch(ticketActions.getUserTickets());
  }

  const handleAll = () => {
    dispatch(sortingActions.changeIsAllUserTickets());
    dispatchTickets();
  };

  const handleUsed = () => {
    dispatch(sortingActions.chanegeIsUsed());
    dispatchTickets();
  };
  const [searchVal, setSearchVal] = React.useState('');

  function handleSearch() {
    const search = searchVal.replace(' ', '+');
    dispatch(sortingActions.searchUserTickets(search));
    dispatchTickets();
  }

  const handleOnChange = event => {
    setSearchVal(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      await dispatchTickets();
    }
    fetchData();
  }, []);

  const handleChange = (event, value) => {
    dispatch(sortingActions.changePageCompany(value));
    dispatchTickets();
  };

  const handleOrderingDes = event => {
    dispatch(sortingActions.changeIsOrdering('des'));
    dispatchTickets();
  };

  const handleOrderingAsc = event => {
    dispatch(sortingActions.changeIsOrdering('asc'));
    dispatchTickets();
  };

  const pageNumber = useSelector(state => state.ticketsData.pageNumber);
  const tickets = useSelector(state => state.ticketsData.tickets);
  const page = useSelector(state => state.sortingData.pagCompany);
  const ticketsGotResponse = useSelector(state => state.ticketsData.ticketsGotResponse);

  const ticketsMapped = tickets.map(ticket => {
    const name = ticket.event.title;
    const id = ticket.public_id;
    const startDate = ticket.event.start_date;
    const endDate = ticket.event.end_date;
    const price = ticket.is_vip ? ticket.event.vip_ticket_fee : ticket.event.ticket_fee;
    return [name, startDate, endDate, id, price];
  });

  return (
    <GridContainer>
      <div
        style={{
          marginLeft: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <ButtonGroup color="primary" size="large">
          <Button color="inherit" onClick={handleAll}>
            All Tickets
          </Button>
          <Button color="inherit" onClick={handleUsed}>
            Is Used
          </Button>
          <Button color="inherit" onClick={handleOrderingDes} endIcon={<ArrowDownwardIcon />}>
            End Date
          </Button>
          <Button color="inherit" onClick={handleOrderingAsc} endIcon={<ArrowUpwardIcon />}>
            End Date
          </Button>
        </ButtonGroup>
      </div>

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <div>
                <h4 className={classes.cardTitleWhite}>Table of Events</h4>
                <p className={classes.cardCategoryWhite}>
                  Below you can find events for which you have brought a ticket{' '}
                </p>
              </div>
              <div>
                <TextField
                  formControlProps={{
                    className: classes.margin + ' ' + classes.search,
                  }}
                  inputProps={{
                    placeholder: 'Search',
                    inputProps: {
                      'aria-label': 'Search',
                    },
                  }}
                  value={searchVal}
                  onChange={handleOnChange}
                />
                <Button onClick={handleSearch} aria-label="edit" justIcon round>
                  <SearchIcon />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={[
                'Event Name',
                'Start Date & Time',
                'End Date & Time',
                'Ticket No',
                'Price',
              ]}
              tableData={ticketsMapped}
            />
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
          </CardBody>
        </Card>
        {tickets.length > 0 ? (
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
      </GridItem>
    </GridContainer>
  );
}
