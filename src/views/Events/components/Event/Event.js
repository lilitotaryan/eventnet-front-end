import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// @material-ui/core components
import CardHeader from '@material-ui/core/CardHeader';
// import clsx from 'clsx';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { paymentActions } from 'redux/actions';
import Chip from '@material-ui/core/Chip';
// import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from 'views/HomePage/modules/components/Snackbar';
// core components
import GridItem from 'components/Grid/GridItem.js';
import Card from 'components/Card/Card.js';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

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

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Event(props) {
  const classes = useStyles();
  const [openSnack, setOpenSnack] = React.useState(false);
  const ticket = useSelector(state => state.ticket);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const avatar = props.companyName.charAt(0);

  const dispatch = useDispatch();
  const [quant, setQuantity] = React.useState(0);

  function handlePurchase() {
    props.setVisible();
    dispatch(paymentActions.selectEvent({ fee: props.fee, public_id: props.public_id }));
  }

  function handleVipPurchase() {
    props.setVisible();
    dispatch(
      paymentActions.selectEvent({ fee: props.vipFee, public_id: props.public_id, is_vip: true })
    );
  }

  const categories =
    props.categories &&
    props.categories.map(category => (
      <Chip label={category.name} key={category.name} color="primary" variant="outlined" />
    ));

  const startDate = new Date(props.start_date);
  const endDate = new Date(props.end_date);
  const logedIn = useSelector(state => state.userAuth.loggedIn);

  return (
    <>
      <GridItem xs={12} sm={4}>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {avatar}
              </Avatar>
            }
            action={props.isResponsibe ? <Chip label="Responsible type" icon={<DoneIcon />} /> : ''}
            title={props.title}
            subheader={
              startDate.getDate() +
              '/' +
              startDate.getMonth() +
              '/' +
              startDate.getFullYear() +
              '  Time: ' +
              startDate.getHours() +
              ':' +
              startDate.getMinutes()
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
              Address:
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.address.state}, {props.address.city}, {props.address.address1},
              {props.address.address2}
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
            {/* {props.fee === 0 ? ( */}
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleClickOpen}
            >
              {props.fee === 0 ? 'Get Ticket' : 'Buy Ticket'}
            </Button>
            {/* ) : (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleClickOpen}
            >
              Get Ticket
            </Button>
          )} */}

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
              <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {avatar}
                    </Avatar>
                  }
                  title={props.title}
                  subheader={
                    startDate.getDate() + '/' + startDate.getMonth() + '/' + startDate.getFullYear()
                  }
                />
              </DialogTitle>
              <DialogContent dividers>
                <CardMedia
                  className={classes.media}
                  image="http://3adim.com/images/eventsturkeyantalya.jpg"
                  title="Paella dish"
                />
                <div style={{ minWidth: '400px', minHeight: '250px' }}>
                  {props.categories && <div className={classes.chips}>{categories}</div>}
                  <Typography variant="subtitle2" color="textSecondary" component="p">
                    Description:
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {props.description}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary" component="p">
                    Address:
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {props.address.state}, {props.address.city}, {props.address.address1}
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
                    Vip Ticket Fee: {props.vipFee === 0 ? `-` : `:  ${props.vipFee}`}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary" component="p">
                    available Places: {props.availablePlaces}
                  </Typography>
                </div>
              </DialogContent>

              {props.fee === 0 && logedIn ? (
                <>
                  {' '}
                  <Button
                    autoFocus
                    onClick={() => {
                      handleClose();
                      dispatch(
                        paymentActions.getFreeTicket(props.public_id, { is_vip: false, quant: 1 })
                      );
                      setOpenSnack(true);
                    }}
                    color="primary"
                  >
                    Get Free Ticket
                  </Button>
                </>
              ) : logedIn ? (
                <DialogActions>
                  <Button autoFocus onClick={handlePurchase} color="primary">
                    Get Ticket
                  </Button>
                  {props.vipFee === 0 ? null : (
                    <Button autoFocus onClick={handleVipPurchase} color="secondary">
                      Get Vip Ticket
                    </Button>
                  )}
                </DialogActions>
              ) : (
                ''
              )}
            </Dialog>
          </CardActions>
        </Card>
      </GridItem>
      <Snackbar open={openSnack} onClose={handleCloseSnack} message={ticket.msg} />
    </>
  );
}

Event.propTypes = {
  title: PropTypes.string.isRequired,
  public_id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  start_date: PropTypes.string.isRequired,
  end_date: PropTypes.string.isRequired,
  fee: PropTypes.number.isRequired,
  vipFee: PropTypes.number.isRequired,
  address: PropTypes.object.isRequired,
  companyName: PropTypes.string.isRequired,
  availablePlaces: PropTypes.number.isRequired,
  categories: PropTypes.array.isRequired,
  isResponsibe: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  isResponsible: PropTypes.bool.isRequired,
};
