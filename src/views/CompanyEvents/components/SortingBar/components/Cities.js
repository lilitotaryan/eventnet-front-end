import React from 'react';
// @material-ui/core components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import Popover from '@material-ui/core/Popover';
// import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';

import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import Button from '@material-ui/core/Button';

import { useDispatch } from 'react-redux';
import { sortingActions, eventsActions } from 'redux/actions';

// import { useStyles } from './style';

const cities = [
  'Yerevan',
  'Abovyan',
  'Vanadzor',
  'Dilijan',
  'Jermuk',
  'Sevan',
  'Tsaghkadzor',
  'Gyumri',
];

export default function Cities() {
  const dispatch = useDispatch();

  async function dispatchEvents() {
    await dispatch(eventsActions.getCompanyEvents());
  }

  function dispatchSortCities(city, isChecked) {
    dispatch(sortingActions.changeCities(city, isChecked));
  }

  //   const classes = useStyles();

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      dispatchSortCities(value, false);
    } else {
      newChecked.splice(currentIndex, 1);
      dispatchSortCities(value, true);
    }

    setChecked(newChecked);

    dispatchEvents(1);
    console.log('checked', value);
  };

  //   const classes = useStyles();

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {popupState => (
        <div>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            endIcon={<ExpandMoreIcon />}
            {...bindTrigger(popupState)}
          >
            City
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Box maxHeight={250} p={2}>
              <List maxHeight={250}>
                {cities.map(value => {
                  const labelId = `checkbox-list-label-city-${value}`;
                  return (
                    <ListItem
                      key={value}
                      role={undefined}
                      dense
                      button
                      onClick={handleToggle(value)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={value} />
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
