import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import CardHeader from '@material-ui/core/CardHeader';
// import clsx from 'clsx';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

//import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
//import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
// import IconButton from '@material-ui/core/IconButton';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';

// core components
import GridItem from 'components/Grid/GridItem.js';
import Card from 'components/Card/Card.js';
import Edit from './components/Edit';
import Delete from './components/Delete';

import InfoTable from './components/InfoTable';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { ticketActions, sortingActions } from 'redux/actions';

import { useStyles } from './style';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

function Alert(props) {
  return <MuiAlert elevation={0} variant="filled" {...props} />;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

// const DialogContent = withStyles(theme => ({
//   root: {
//     padding: theme.spacing(2),
//   },
// }))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Event(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  async function dispatchTickets(id) {
    await dispatch(ticketActions.getCompanyTickets(id));
  }
  const handleAll = () => {
    dispatch(sortingActions.changeIsAllCompanyTickets());
    dispatchTickets(props.id);
  };

  const handleUsed = () => {
    dispatch(sortingActions.chanegeIsUsed());
    dispatchTickets(props.id);
  };
  const [searchVal, setSearchVal] = React.useState('');

  function handleSearch() {
    const search = searchVal.replace(' ', '+');
    dispatch(sortingActions.searchCompanyTickets(search));
    dispatchTickets(props.id);
  }

  const handleOnChange = event => {
    setSearchVal(event.target.value);
  };

  const [openMore, setMoreOpen] = React.useState(false);

  const handleMore = () => {
    setMoreOpen(true);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setMoreOpen(false);
    dispatch(ticketActions.handleClose());
  };

  const [openDelete, setDeleteOpen] = React.useState(false);

  const handleDeleteClickOpen = () => {
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const [ticketId, setTicketId] = React.useState('');

  const handleIdChange = e => {
    setTicketId(e.target.value);
  };

  function handleUse() {
    dispatch(ticketActions.useTicketAction(ticketId));
  }

  // const handleDelete = () => {
  //   dispatch(eventsActions.removeEvent(props.id));
  //   setDeleteOpen(false);
  // };

  const avatar = props.companyName.charAt(0);

  const [alertTicketIsUsed, setTicketIsUsed] = React.useState(false);
  const [alertUseTicket, setAlertUseTicket] = React.useState(false);
  const [deleteAlertError, setDeleteAlertError] = React.useState(false);
  const [deleteAlertSuccess, setDeleteAlertSuccess] = React.useState(false);
  const errorUse = useSelector(state => state.ticketsData.error);

  const useSuccess = useSelector(state => state.ticketsData.useSuccess);
  const deleteSuccess = useSelector(state => state.eventsData.deleteSuccess);
  const deleteError = useSelector(state => state.eventsData.deleteError);

  useEffect(() => {
    return () => {
      setDeleteAlertError(false);
      setDeleteAlertSuccess(true);
    };
  }, [deleteSuccess]);

  useEffect(() => {
    return () => {
      setDeleteAlertSuccess(false);
      setDeleteAlertError(true);
    };
  }, [deleteError]);

  useEffect(() => {
    return () => {
      setTicketIsUsed(false);
      setAlertUseTicket(true);
    };
  }, [useSuccess]);

  useEffect(() => {
    return () => {
      setAlertUseTicket(false);
      setTicketIsUsed(true);
    };
  }, [errorUse]);

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setDeleteAlertSuccess(false);
    setDeleteAlertError(false);
    setTicketIsUsed(false);
    setAlertUseTicket(false);
  };

  const categories =
    props.categories &&
    props.categories.map(category => (
      <Chip label={category.name} key={category.name} color="primary" variant="outlined" />
    ));

  const startDate = new Date(props.start_date);
  const endDate = new Date(props.end_date);

  return (
    <GridItem xs={12} sm={4}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {avatar}
            </Avatar>
          }
          action={props.isResponsibe ? <Chip label="Responsible type" icon={<DoneIcon />} /> : ''}
          title={<h3> {props.title}</h3>}
          subheader={
            startDate.getDate() + '/' + startDate.getMonth() + '/' + startDate.getFullYear()
          }
        />
        <CardMedia
          className={classes.media}
          image="http://3adim.com/images/eventsturkeyantalya.jpg"
          title="Paella dish"
        />
        <CardContent>
          {props.categories && <div className={classes.chips}>{categories}</div>}
          <Typography variant="subtitle2" color="textSecondary" component="p">
            Description:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            {props.description}
          </Typography>

          <Typography variant="subtitle2" color="textSecondary" component="p">
            Address:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.address.state}, {props.address.city}, {props.address.address1},
            {' ' + props.address.address2}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p">
            Start Date:{' '}
            {startDate.getDate() +
              '/' +
              startDate.getMonth() +
              '/' +
              startDate.getFullYear() +
              '  Time: ' +
              startDate.getHours() +
              ':' +
              startDate.getMinutes()}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p">
            End Date:{' '}
            {endDate.getDate() +
              '/' +
              endDate.getMonth() +
              '/' +
              endDate.getFullYear() +
              '  Time: ' +
              endDate.getHours() +
              ':' +
              endDate.getMinutes()}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p">
            Ticket Fee: {props.fee === 0 ? `  Free` : `${props.fee}`}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p">
            Vip Ticket Fee: {props.vipFee === 0 ? `--` : `:  ${props.vipFee}`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="delete" onClick={handleClickOpen}>
            <EditIcon color="primary" />
          </IconButton>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              <CardHeader title={<h5>Edit event {props.title}</h5>} />
            </DialogTitle>
            <Edit id={props.id} />
          </Dialog>
          <IconButton color="secondary" aria-label="share" onClick={handleDeleteClickOpen}>
            <DeleteIcon />
          </IconButton>

          <Dialog
            open={openDelete}
            onClose={handleDeleteClose}
            aria-labelledby="draggable-dialog-title"
          >
            <Delete id={props.id} title={props.title} />
            <DialogActions>
              <Button autoFocus onClick={handleDeleteClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Button aria-label="more" color="primary" onClick={handleMore}>
            Ticket Info
          </Button>

          <Dialog fullScreen open={openMore} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Information About {props.title} Event
                </Typography>

                <div style={{ marginRight: '8px', marginLeft: '8px' }}>
                  <TextField
                    formControlProps={{
                      className: classes.margin + ' ' + classes.search,
                    }}
                    inputProps={{
                      placeholder: 'Add ticket id',
                      inputProps: {
                        'aria-label': 'Use Ticket',
                      },
                    }}
                    style={{ color: 'white' }}
                    value={ticketId}
                    onChange={handleIdChange}
                  />
                  <Button
                    onClick={handleUse}
                    style={{ color: 'white' }}
                    aria-label="edit"
                    justIcon
                    round
                  >
                    Use
                  </Button>
                </div>

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
                  style={{ color: 'white' }}
                  value={searchVal}
                  onChange={handleOnChange}
                />
                <Button
                  onClick={handleSearch}
                  style={{ color: 'white' }}
                  aria-label="edit"
                  justIcon
                  round
                >
                  <SearchIcon />
                </Button>
                <ButtonGroup color="primary" size="large">
                  <Button autoFocus color="inherit" onClick={handleAll}>
                    All Tickets
                  </Button>
                  <Button autoFocus color="inherit" onClick={handleUsed}>
                    Used Tickets
                  </Button>
                </ButtonGroup>
              </Toolbar>
            </AppBar>
            <InfoTable id={props.id} name={props.title} />
          </Dialog>
        </CardActions>
      </Card>

      {useSuccess ? (
        <Snackbar open={alertUseTicket} autoHideDuration={5000} onClose={handleAlertClose}>
          <Alert onClose={handleAlertClose} severity="success">
            Ticket is available!
          </Alert>
        </Snackbar>
      ) : (
        ''
      )}

      {errorUse ? (
        <Snackbar onClose={handleAlertClose} open={alertTicketIsUsed} autoHideDuration={5000}>
          <Alert onClose={handleAlertClose} severity="error">
            {errorUse}
          </Alert>
        </Snackbar>
      ) : (
        ''
      )}

      {deleteError ? (
        <Snackbar onClose={handleAlertClose} open={deleteAlertError} autoHideDuration={5000}>
          <Alert onClose={handleAlertClose} severity="error">
            {deleteError}
          </Alert>
        </Snackbar>
      ) : (
        ''
      )}

      {deleteSuccess ? (
        <Snackbar open={deleteAlertSuccess} autoHideDuration={5000} onClose={handleAlertClose}>
          <Alert onClose={handleAlertClose} severity="success">
            Ticket is Deleted!
          </Alert>
        </Snackbar>
      ) : (
        ''
      )}
    </GridItem>
  );
}

Event.propTypes = {
  id: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  start_date: PropTypes.string.isRequired,
  end_date: PropTypes.string.isRequired,
  fee: PropTypes.number.isRequired,
  vipFee: PropTypes.number.isRequired,
  address: PropTypes.object.isRequired,
  companyName: PropTypes.string.isRequired,
  isResponsibe: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
};
