import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import { TextField, Typography, IconButton } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Alert from '@material-ui/lab/Alert';

import PhoneIcon from '@material-ui/icons/Phone';
import MuiPhoneInput from 'material-ui-phone-number';

import NumberFormat from 'react-number-format';

import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';

import { useDispatch, useSelector } from 'react-redux';
import { eventsActions } from 'redux/actions';
import { useStyles } from './style/AddEventCss';

// core components
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Button from '@material-ui/core/Button';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="AMD "
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isPrice: PropTypes.bool.isRequired,
};

export default function AddEvent() {
  const classes = useStyles();

  const regions = [
    'Aragatsotn',
    'Ararat',
    'Armavir',
    'Gegharquniq',
    'Lori',
    'Kotayq',
    'Shirak',
    'Syuniq',
    'Vayots Dzor',
    'Tavush',
    'Yerevan',
  ];
  const categories = [
    'Formal',
    'Fleshmob',
    'Party',
    'Ceremony',
    'Science',
    'Sport',
    'Education',
    'Museum',
    'Festival',
    'Theatre',
    'Cinema',
    'Fashion',
    'Music',
    'Health',
    'Business',
  ];

  const [values, setValues] = React.useState({
    title: '',
    description: '',
    dateTimeStart: '',
    dateTimeEnd: '',
    city: '',
    street: '',
    building: '',
    amount: null,
    fee: null,
    feeVip: null,
  });

  const [categoriesValues, setCatValue] = React.useState([]);
  const [region, setRegionValue] = React.useState('');
  const [phone, setPhoneValue] = React.useState('');
  const [isResponsible, setResponsible] = React.useState(false);
  const [alertSuceess, setalertSuceess] = React.useState(false);
  const [alertError, setalertError] = React.useState(false);

  const handleResponsibleChange = event => {
    setResponsible(event.target.checked);
  };

  const handlePhoneChange = value => {
    setPhoneValue(value);
  };

  // console.log('Cat values', categoriesValues);

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const categoryValues = categoriesValues.map(category => {
    return { name: category };
  });

  const dispatch = useDispatch();
  const stripe_id = useSelector(state => state.userData.stripe_id);
  const username = useSelector(state => state.userData.name);
  const token = useSelector(state => state.userData.token);
  const error = useSelector(state => state.eventsData.addError);
  const addSuccess = useSelector(state => state.eventsData.addSuccess);
  useEffect(() => {
    return () => {
      setalertError(false);
      setalertSuceess(true);
      setValues({
        title: '',
        description: '',
        dateTimeStart: '',
        dateTimeEnd: '',
        city: '',
        street: '',
        building: '',
        amount: '',
        fee: null,
        feeVip: null,
      });
      setPhoneValue('');
      setResponsible(false);
      setRegionValue('');
      setCatValue([]);
    };
  }, [addSuccess]);

  useEffect(() => {
    return () => {
      setalertError(true);
      setalertSuceess(false);
    };
  }, [error]);

  const handleEeventSubmit = () => {
    console.log('submitting', values);
    dispatch(
      eventsActions.addEvent(
        values.title,
        values.description,
        values.dateTimeStart,
        values.dateTimeEnd,
        phone,
        values.street,
        values.building,
        values.city,
        region,
        categoryValues,
        values.fee,
        values.feeVip,
        values.amount,
        isResponsible,
        username
      )
    );
  };

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Add Event</h4>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem item xs={12} sm={6}>
            <div className={classes.text}>
              <TextField
                variant="outlined"
                required
                fullWidth
                autoFocus
                label="Name of Title"
                value={values.title}
                onChange={handleChange('title')}
              />
            </div>
          </GridItem>
          <GridItem item xs={12} sm={6}>
            <div className={classes.text}>
              {' '}
              <TextField
                variant="outlined"
                required
                fullWidth
                autoFocus
                label="Description"
                value={values.description}
                onChange={handleChange('description')}
              />
            </div>
          </GridItem>

          <GridItem item xs={12} sm={6}>
            <div className={classes.text}>
              <TextField
                id="datetime-local"
                label="Select Start Date and Time"
                type="datetime-local"
                required
                className={classes.textFieldDate}
                InputLabelProps={{
                  shrink: true,
                }}
                value={values.dateTimeStart}
                onChange={handleChange('dateTimeStart')}
              />
            </div>
          </GridItem>
          <GridItem item xs={12} sm={6}>
            <div className={classes.text}>
              <TextField
                id="datetime-local"
                label="Select End Date and Time"
                type="datetime-local"
                className={classes.textFieldDate}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                value={values.dateTimeEnd}
                onChange={handleChange('dateTimeEnd')}
              />
            </div>
          </GridItem>

          <GridItem item xs={12} sm={3}>
            <div className={classes.text}>
              <Autocomplete
                options={regions}
                classes={{
                  option: classes.option,
                }}
                required
                onChange={(event, newValue) => {
                  setRegionValue(newValue);
                }}
                value={region}
                autoHighlight
                getOptionLabel={option => option}
                renderOption={option => <React.Fragment>{option}</React.Fragment>}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Choose a state"
                    variant="outlined"
                    fullWidth
                    required
                    inputProps={{
                      ...params.inputProps,
                    }}
                  />
                )}
              />
            </div>
          </GridItem>
          <GridItem item xs={12} sm={3}>
            <div className={classes.text}>
              {' '}
              <TextField
                variant="outlined"
                required
                fullWidth
                autoFocus
                label="City"
                value={values.city}
                onChange={handleChange('city')}
              />
            </div>
          </GridItem>
          <GridItem item xs={12} sm={3}>
            <div className={classes.text}>
              {' '}
              <TextField
                variant="outlined"
                required
                fullWidth
                autoFocus
                label="Address 1"
                value={values.street}
                onChange={handleChange('street')}
              />
            </div>
          </GridItem>
          <GridItem item xs={12} sm={3}>
            <div className={classes.text}>
              {' '}
              <TextField
                variant="outlined"
                required
                fullWidth
                autoFocus
                label="Address 2"
                value={values.building}
                onChange={handleChange('building')}
              />
            </div>
          </GridItem>
          <GridItem item xs={12} sm={12}>
            <div className={classes.text}>
              <Autocomplete
                value={categoriesValues}
                onChange={(event, newValue) => {
                  setCatValue(newValue);
                }}
                multiple
                id="checkboxes-tags-demo"
                options={categories}
                disableCloseOnSelect
                getOptionLabel={option => option}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option}
                  </React.Fragment>
                )}
                style={{ width: 500 }}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Catergories"
                    placeholder="Choose categories"
                  />
                )}
              />
            </div>
          </GridItem>

          <GridItem item xs={12} sm={4}>
            <div className={classes.text}>
              {' '}
              <TextField
                variant="outlined"
                required
                fullWidth
                autoFocus
                name="numberformat"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                label="Ticket Price"
                value={values.fee}
                onChange={handleChange('fee')}
              />
            </div>
          </GridItem>
          <GridItem item xs={12} sm={4}>
            <div className={classes.text}>
              {' '}
              <TextField
                variant="outlined"
                fullWidth
                autoFocus
                name="numberformat"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                label="Vip Ticket Price"
                value={values.feeVip}
                onChange={handleChange('feeVip')}
              />
            </div>
          </GridItem>
          <GridItem item xs={12} sm={4}>
            <div className={classes.text}>
              {' '}
              <TextField
                variant="outlined"
                required
                fullWidth
                autoFocus
                name="amount"
                id="formatted-numberformat-input"
                label="Amount of Tickets"
                value={values.amount}
                onChange={handleChange('amount')}
              />
            </div>
          </GridItem>
          <GridItem item xs={6} sm={6}>
            <Typography variant="h6">
              <IconButton>
                <PhoneIcon />
              </IconButton>
              <MuiPhoneInput
                value={phone}
                onChange={handlePhoneChange}
                defaultCountry="am"
                required
                regions={'asia'}
                style={{ marginLeft: '30px' }}
                inputProps={{ minLength: 12, maxLength: 12 }}
              />
            </Typography>
          </GridItem>

          <GridItem item xs={6} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  required
                  checked={isResponsible}
                  onChange={handleResponsibleChange}
                  color="primary"
                />
              }
              label="EventNet is responsible"
            />
          </GridItem>
          <GridItem item>
            {' '}
            <div className={classes.text}>
              <Button
                variant="contained"
                color="primary"
                disabled={stripe_id === null}
                onClick={handleEeventSubmit}
              >
                Add Event
              </Button>
            </div>
          </GridItem>
          {stripe_id === null ? (
            <GridItem item>
              <div className={classes.text}>
                <Button
                  variant="contained"
                  color="primary"
                  href={`https://dashboard.stripe.com/express/oauth/authorize?response_type=code&client_id=ca_HNDkLsYFItQBDC0abe8NZwShn1joALjH&state=${token}&scope=read_write`}
                >
                  Add Stripe Account
                </Button>
              </div>
            </GridItem>
          ) : (
            ''
          )}
        </GridContainer>
      </CardBody>

      {alertError && error && error.length > 0 ? (
        <Alert
          severity="error"
          onClose={() => {
            setalertError(false);
          }}
        >
          {error}
        </Alert>
      ) : (
        ''
      )}
      {alertSuceess ? (
        <Alert
          severity="success"
          onClose={() => {
            setalertSuceess(false);
          }}
        >
          Event was successfully added!
        </Alert>
      ) : (
        ''
      )}
    </Card>
  );
}
