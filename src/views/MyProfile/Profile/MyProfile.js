import React, { useState, useEffect } from 'react';
import { userActions } from 'redux/actions';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import BusinessIcon from '@material-ui/icons/Business';
import WcIcon from '@material-ui/icons/Wc';
import CakeIcon from '@material-ui/icons/Cake';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer.js';
import Button from '@material-ui/core/Button';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardAvatar from 'components/Card/CardAvatar.js';
import CardBody from 'components/Card/CardBody.js';
import EditIcon from '@material-ui/icons/Edit';
import Address from './Address';
import EditProfile from './EditProfile';
import { WindMillLoading } from 'react-loadingg';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Favorite from './Favorite';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';

import maleAvatar from '../Images/male.png';
import femaleAvatar from '../Images/female.png';
import companyAvatar from '../Images/company.png';
import { useStyles, theme } from '../style/MyProfileCss';

export default function MyProfile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.userData);
  // const editUser = useSelector(state => state.updateData);
  const loaded = useSelector(state => state.userData.loaded);
  const address = useSelector(state => state.userData.address);
  const [editOpen, setEditOpen] = React.useState(false);

  // const [canUpdate, setUpdate] = useState(true);
  const [open, setOpen] = useState(false);

  // const firstName = useName();
  // const lastName = useName();
  // const [password, setPassword] = useState('');
  // const [isValid, setValid] = useState(false);
  // const [passwordError, setError] = useState('');
  // const phone = usePhone();
  const [, updateState] = useState();

  useEffect(() => {
    if (!user.loaded) {
      dispatch(userActions.getUser());
    }
  }, [loaded]);

  // function handlePassword(e) {
  //   setPassword(e.target.value);
  // }

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      {!loaded ? (
        <WindMillLoading />
      ) : (
        <div>
          <EditProfile open={editOpen} handleClose={handleEditClose} />
          <GridContainer justify="flex-end">
            <MuiThemeProvider theme={theme}>
              <GridItem xs={12} sm={12} md={8}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Personal Information</h4>
                    <p className={classes.cardCategoryWhite}>Address</p>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="standard-textarea"
                          label={address !== '' ? address.address1 : 'Not Specified'}
                          multiline
                          fullWidth
                          style={{ marginBottom: theme.spacing(2) }}
                          disabled
                          helperText={'Street Address'}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="standard-textarea"
                          label={address !== '' ? address.address2 : 'Not Specified'}
                          multiline
                          fullWidth
                          disabled
                          helperText={'Appartment'}
                          style={{ marginBottom: theme.spacing(2) }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="standard-textarea"
                          label={address !== '' ? address.city : 'Not Specified'}
                          multiline
                          fullWidth
                          disabled
                          helperText={'City'}
                          style={{ marginBottom: theme.spacing(2) }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="standard-textarea"
                          label={address !== '' ? address.state : 'Not Specified'}
                          multiline
                          fullWidth
                          style={{ marginBottom: theme.spacing(2) }}
                          disabled
                          helperText={'State'}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="standard-textarea"
                          label={address !== '' ? address.country : 'Not Specified'}
                          multiline
                          fullWidth
                          disabled
                          helperText={'Country'}
                          style={{ marginBottom: theme.spacing(2) }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}></GridItem>
                      <Grid container spacing={1} alignItems="flex-end">
                        <GridItem xs={12} sm={12} md={6}>
                          <Button
                            color="primary"
                            style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(1) }}
                            startIcon={address !== '' ? <EditIcon /> : <AddCircleOutlineIcon />}
                            onClick={handleClickOpen}
                          >
                            {address !== '' ? 'Edit' : 'Add'} Address
                          </Button>
                        </GridItem>
                      </Grid>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
              <Address open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
              <GridItem xs={12} sm={12} md={4}>
                <Card profile>
                  <CardAvatar profile>
                    <a
                      href="#pablo"
                      onClick={e => {
                        e.preventDefault();
                        handleEditOpen();
                      }}
                    >
                      <img
                        src={
                          user.is_company
                            ? companyAvatar
                            : user.gender === 'F'
                            ? femaleAvatar
                            : maleAvatar
                        }
                        alt={`${user.first_name} ${user.last_name}`}
                      />
                    </a>
                  </CardAvatar>
                  <CardBody profile>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <EmailIcon />
                      </Grid>
                      <Grid item>
                        <TextField id="input-with-icon-grid" label={user.email} disabled />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <AccountCircle />
                      </Grid>
                      <Grid item>
                        <TextField
                          id="input-with-icon-grid"
                          label={`${user.first_name} ${user.last_name}`}
                          disabled
                        />
                      </Grid>
                    </Grid>
                    {user.is_company ? (
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <BusinessIcon />
                        </Grid>
                        <Grid item>
                          <TextField id="input-with-icon-grid" label={user.name} disabled />
                        </Grid>
                      </Grid>
                    ) : null}
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <CakeIcon />
                      </Grid>
                      <Grid item>
                        <TextField id="input-with-icon-grid" label={user.birth_date} disabled />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <WcIcon />
                      </Grid>
                      <Grid item>
                        <TextField
                          id="input-with-icon-grid"
                          label={`${user.gender === 'F' ? 'Female' : 'Male'}`}
                          disabled
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <PhoneIcon />
                      </Grid>
                      <Grid item>
                        <TextField id="input-with-icon-grid" label={user.phone_number} disabled />
                      </Grid>
                    </Grid>

                    <Grid container alignItems="flex-start">
                      <Grid item xs={12} sm={12} md={6}>
                        <Button
                          color="primary"
                          style={{ marginTop: theme.spacing(3) }}
                          startIcon={<EditIcon />}
                          onClick={handleEditOpen}
                        >
                          Edit
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        {/* <Category /> */}
                        {/* <Button
                          color="primary"
                          style={{ marginTop: theme.spacing(3) }}
                          startIcon={<FavoriteIcon />}
                          onClick={handleEditOpen}
                        >
                          Favorite
                        </Button> */}
                        <Favorite />
                      </Grid>
                    </Grid>
                  </CardBody>
                </Card>
              </GridItem>
            </MuiThemeProvider>
          </GridContainer>
        </div>
      )}
    </>
  );
}

function useName() {
  const [value, setValue] = useState('');
  const [isValid, setValidName] = useState(false);
  const [error, setError] = useState('');

  function handleChange(event) {
    if (event.target.value.match(/^[a-zA-Z ]{2,30}$/) && event.target.value.length > 0) {
      setValue(event.target.value);
      setValidName(true);
    } else {
      setValidName(false);
      setError('Invalid Input');
    }
  }

  return {
    value,
    onChange: handleChange,
    isValid,
    error,
  };
}

function usePhone() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isValid, setValid] = useState(true);
  const [isValidPhone, setValidPhone] = useState(false);

  function handleChange(value) {
    if (value.length === 12) {
      setValue(value);
      setValidPhone(true);
      setError('');
    } else {
      setError('Invalid phone number');
      setValidPhone(false);
    }
  }

  return {
    value,
    onChange: handleChange,
    isValid,
    error,
    isValidPhone,
  };
}
