import React, { useState, useEffect } from 'react';
import { userActions } from 'redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { TextField, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Region from 'views/Register/SignUp/components/Region';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Error from './Error';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Address(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const address = useSelector(state => state.userData.address);
  const addressUpdated = useSelector(state => state.userData.addressUpdated);
  const [err, setError] = useState(false);
  const [canSave, setSave] = useState(true);
  const [newaddress, setAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
  });
  const address1 = useValue(newaddress, setAddress, 'address1');
  const address2 = useValue(newaddress, setAddress, 'address2');
  // const zipCode = useCode();
  const city = useValue(newaddress, setAddress, 'city');
  const country = useCountry(newaddress, setAddress, 'country');
  const region = useRegion(newaddress, setAddress, 'state');

  const handleErrorClick = () => {
    setError(true);
  };

  const handleErrorClose = () => {
    setError(false);
  };

  function checkValidity(obj) {
    if (address !== '') {
      for (var key in obj) {
        if (obj[key] !== '') return true;
      }
      return false;
    } else {
      for (var key in obj) {
        if (obj[key] === '') return false;
      }
      return true;
    }
  }

  useEffect(() => {
    if (!checkValidity(newaddress)) {
      setSave(false);
    } else {
      setSave(true);
    }
  }, [
    newaddress.address1,
    newaddress.address2,
    newaddress.city,
    newaddress.state,
    newaddress.country,
  ]);

  useEffect(() => {
    if (addressUpdated) {
      props.handleClose();
    }
  }, [addressUpdated]);

  function handleSave() {
    address !== ''
      ? dispatch(
          userActions.updateAddress({
            address1: newaddress.address1.length !== 0 ? newaddress.address1 : address.address1,
            address2: newaddress.address2.length !== 0 ? newaddress.address2 : address.address2,
            city: newaddress.city.length !== 0 ? newaddress.city : address.city,
            state: newaddress.state.length !== 0 ? newaddress.state : address.state,
            country: newaddress.country.length !== 0 ? newaddress.country : address.country,
            // zip_code: zipCode.value,
          })
        )
      : dispatch(
          userActions.postAddress(
            newaddress
            // zip_code: zipCode.value,
          )
        );
    handleErrorClick();
    setAddress({ address1: '', address2: '', city: '', state: '', country: '' });
    setSave(false);
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                props.handleClose();
                setSave(false);
                setAddress({ address1: '', address2: '', city: '', state: '', country: '' });
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {address !== '' ? 'Edit' : 'Add'} Address
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSave} disabled={!canSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <TextField
              label="Street Address"
              name="address1"
              variant="outlined"
              required={address !== '' ? false : true}
              fullWidth
              input={address1.value}
              onChange={address1.onChange}
            />
          </ListItem>
          <ListItem>
            {' '}
            <TextField
              label="Appartement"
              name="address2"
              variant="outlined"
              required={address !== '' ? false : true}
              fullWidth
              onChange={address2.onChange}
            />
          </ListItem>
          {/* <ListItem>
            <TextField
              label="Postal Code"
              name="postal_code"
              variant="outlined"
              fullWidth
              onChange={zipCode.onChange}
            />
          </ListItem> */}
          <ListItem>
            {' '}
            <TextField
              label="City"
              name="city"
              variant="outlined"
              required={address !== '' ? false : true}
              fullWidth
              onChange={city.onChange}
            />
          </ListItem>
          <ListItem>
            <Region
              onChange={region.onChange}
              isValid={true}
              error={null}
              canRegister={true}
              isRequired={address !== '' ? false : true}
            />
          </ListItem>
          <ListItem>
            <Grid item xs={12}>
              <Autocomplete
                options={countries}
                getOptionLabel={option => option.name}
                onInputChange={country.onChange}
                renderInput={params => (
                  <TextField
                    label="Country"
                    name="country"
                    variant="outlined"
                    required={address !== '' ? false : true}
                    fullWidth
                    {...params}
                  />
                )}
              />
            </Grid>
          </ListItem>
        </List>
      </Dialog>
      <Error
        open={err}
        handleClose={handleErrorClose}
        handleClick={handleErrorClick}
        vertical={'bottom'}
        horizontal={'center'}
        message={`Address updated successfully!`}
        editProfile={false}
      />
    </div>
  );
}

function useValue(address, setAddress, attribute) {
  const [value, setValue] = useState('');
  const [isValid, setValid] = useState(false);
  function handleChange(event) {
    address[attribute] = event.currentTarget.value;
    setAddress(address);
    setValue(event.currentTarget.value);

    if (event.currentTarget.value.length === 0) {
      setValid(false);
    } else {
      setValid(true);
    }
  }
  return {
    value,
    isValid,
    onChange: handleChange,
  };
}

function useCountry(address, setAddress, attribute) {
  const [value, setValue] = useState('');
  const [isValid, setValid] = useState(false);

  function handleChange(event, value) {
    if (value.length === 0) {
      setValid(false);
      address[attribute] = '';
      setAddress(address);
    } else {
      setValue(value);
      address[attribute] = value;
      setAddress(address);
      setValid(true);
    }
  }
  return {
    value,
    onChange: handleChange,
    isValid,
  };
}

function useRegion(address, setAddress, attribute) {
  const [value, setValue] = useState('');
  const [isValid, setValid] = useState(false);

  function handleChange(event, value) {
    if (value.length === 0) {
      setValid(false);
      address[attribute] = '';
      setAddress(address);
    } else {
      setValue(value);
      address[attribute] = value;
      setAddress(address);
      setValid(true);
    }
  }
  return {
    value,
    onChange: handleChange,
    isValid,
  };
}

// function useCode() {
//   const [value, setValue] = useState(null);
//   const [isValid, setValid] = useState(false);
//   function handleChange(event) {
//     setValue(parseInt(event.currentTarget.value));

//     if (typeof value === 'number' && Number.isFinite(value) && value.length === 4) {
//       setValid(true);
//     } else {
//       setValid(false);
//     }
//   }
//   return {
//     value,
//     isValid,
//     onChange: handleChange,
//   };
// }

const countries = [{ name: 'Armenia', code: 'AM' }];
