import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import Snackbar from '../../components/Snackbar';
import Button from '../../components/Button';

const styles = theme => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: 0,
    display: 'flex',
  },
  cardWrapper: {
    zIndex: 1,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#E8EAF6',
    padding: theme.spacing(16, 3),
  },
  cardContent: {
    maxWidth: 400,
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  button: {
    width: '100%',
  },
  imagesWrapper: {
    position: 'relative',
  },
});

export default function Email(props) {
  const { classes } = props;
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const subscribe = data => {
    const url = 'https://www.eventnet-api-staging.ml/subscribe/';
    return new Promise(async resolve => {
      const response = await Axios.post(
        url,
        { email: data },
        {
          headers: {
            'Content-Type': 'application/json',
            // 'JWT-TOKEN': document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, '$1'),
            'API-KEY': '12bf8fffa86840aee50aeb408621f0ba9c131d8e0edca457ec68a48674f1d4a5',
          },
        }
      );
      console.log(response.data);

      if (response.data.OK) {
        resolve(response.data.data);
        setMsg('We will send you our best offers, once a week.');
        setEmail('');
      } else {
        setMsg(
          response.data.errors[0].error_code === 21
            ? response.data.errors[0].error_fields[0].error_message
            : response.data.errors[0].error_message
        );
      }
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    subscribe(email);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container alignItems="center" justify="center">
        <form onSubmit={handleSubmit}>
          <Grid item xs={12} md={12}>
            <TextField
              id="standard-basic"
              // noBorder
              // className={classes.textField}
              value={email}
              label="Enter your email"
              onChange={event => {
                setEmail(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Button color="primary" type="submit">
              Subcribe
            </Button>
          </Grid>
        </form>
      </Grid>
      <Snackbar open={open} onClose={handleClose} message={msg} style={{ color: '#E1BEE7' }} />
    </>
  );
}
