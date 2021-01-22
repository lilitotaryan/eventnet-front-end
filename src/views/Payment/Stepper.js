import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import { SentimentVerySatisfied, SentimentVeryDissatisfied } from '@material-ui/icons';
import StepperIcons from './StepperIcons';
import ContactForm from './Forms/ContactForm';
import PaymentForm from './Forms/PaymentForm';
import ServiceForm from './Forms/ServiceForm';
import { useStripe, useElements, CardCvcElement } from '@stripe/react-stripe-js';
import { paymentActions } from 'redux/actions';
import StepConnector from './StepConnector';
import Snackbar from 'views/HomePage/modules/components/Snackbar';
import {
  clientSecretPull,
  stripeDataObjectConverter,
  clientSecretDataObjectConverter,
} from './constants/functions';

// OVERALL STYLE
const style = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1),
  },
  mainBox: {
    position: 'relative',
    marginTop: '-8px',
    padding: '10px 20px',
    borderBottomRightRadius: '4px',
    borderBottomLeftRadius: '4px',
    background: theme.palette.background.default,
  },
  stepper: {
    height: 'calc(10vh - 40px)',
    minHeight: '55px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  buttonWrapper: {
    justifyContent: 'flex-end',
  },
}));

const StepContent = ({ step }) => {
  switch (step) {
    case 0:
      return <ContactForm />;
    case 1:
      return <ServiceForm />;
    case 2:
      return <PaymentForm />;
    default:
      return <></>;
  }
};

const Steppers = props => {
  const { setVisible } = props;
  const classes = style();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cardStatus, setCardStatus] = useState(true);
  const [cardMessage, setCardMessage] = useState('');
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const stripe = useStripe();
  const elements = useElements();
  const formValues = useSelector(state => state.payment);
  const { token } = useSelector(state => state.userData);
  const dispatch = useDispatch();

  const handleNext = () => {
    if (activeStep === 2) {
      capture();
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };
  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);
  const handleReset = () => setActiveStep(0);
  const ticket = useSelector(state => state.ticket);

  const capture = async () => {
    setLoading(true);

    const clientSecretDataObject = clientSecretDataObjectConverter({
      ...formValues.formValues,
      ...ticket,
    });

    const response = await clientSecretPull(clientSecretDataObject, {
      'Content-Type': 'application/json',
      'JWT-TOKEN': token,
      'API-KEY': '12bf8fffa86840aee50aeb408621f0ba9c131d8e0edca457ec68a48674f1d4a5',
    });
    const cardElement = elements.getElement(CardCvcElement);
    const stripeDataObject = stripeDataObjectConverter(formValues, cardElement);

    if (response.OK) {
      setMsg('');
      setOpen(false);
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        response.data.client_secret,
        stripeDataObject
      );

      if (error) {
        setCardStatus(false);
        setCardMessage(error.message);
        setMsg(error.message);
        setOpen(true);
        dispatch(
          paymentActions.reserveTicket({
            payment_id: response.data.payment_id,
            // public_id: response.public_id,
            refund_id: paymentIntent.id,
            is_ok: false,
          })
        );
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log(paymentIntent);
        setCardStatus(true);
        setCardMessage('');
        setMsg('Payment completed !');
        setOpen(true);
        dispatch(paymentActions.clearForm());
        dispatch(
          paymentActions.reserveTicket({
            payment_id: response.data.payment_id,
            // public_id: response.public_id,
            refund_id: paymentIntent.id,
            is_ok: true,
          })
        );
      }
      setActiveStep(prevActiveStep => prevActiveStep + 1);
      setLoading(false);
    } else {
      setMsg(response.err);
      setOpen(true);
    }
  };

  return (
    <>
      <Stepper
        alternativeLabel
        className={classes.stepper}
        connector={<StepConnector />}
        activeStep={activeStep}
      >
        {/* Change the number of loops here based on StepContent */}
        {[1, 2, 3].map(e => (
          <Step key={e}>
            <StepLabel StepIconComponent={StepperIcons} />
          </Step>
        ))}
      </Stepper>
      <Box className={classes.mainBox}>
        {activeStep === 3 ? (
          <Grid
            container
            spacing={3}
            direction="column"
            justify="space-around"
            alignItems="center"
            style={{ height: '400px' }}
          >
            {cardStatus ? (
              <SentimentVerySatisfied fontSize="large" color="primary" />
            ) : (
              <SentimentVeryDissatisfied fontSize="large" color="error" />
            )}
            <Typography variant="h4">{cardMessage}</Typography>
            {cardStatus ? (
              <Button onClick={setVisible} className={classes.button}>
                Back to Events
              </Button>
            ) : (
              <Button onClick={handleBack} className={classes.button}>
                'Back'
                {/* {cardStatus ? 'Reset' : 'Back'} */}
              </Button>
            )}
          </Grid>
        ) : (
          <form
            autoComplete="off"
            className={classes.form}
            onSubmit={e => {
              e.preventDefault();
              handleNext();
            }}
          >
            <Grid container spacing={3}>
              <StepContent step={activeStep} />
              <Grid container item justify="flex-end">
                <Button disabled={activeStep === 0} className={classes.button} onClick={handleBack}>
                  Back
                </Button>
                {open ? null : (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : activeStep === 2 ? 'Pay' : 'Next'}
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
      <Snackbar open={open} onClose={handleClose} message={msg} />
    </>
  );
};

export default Steppers;
