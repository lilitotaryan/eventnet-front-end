import React from 'react';
// @material-ui/core components

import Popover from '@material-ui/core/Popover';
// import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';

import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import { useDispatch } from 'react-redux';
import { sortingActions, eventsActions } from 'redux/actions';

// import { useStyles } from './style';

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

export default function Categories() {
  const dispatch = useDispatch();

  async function dispatchEvents() {
    await dispatch(eventsActions.getEvents());
  }

  function dispatchSortCategories(category, isChecked) {
    dispatch(sortingActions.changeCategories(category, isChecked));
  }

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      dispatchSortCategories(value, false);
    } else {
      newChecked.splice(currentIndex, 1);
      dispatchSortCategories(value, true);
    }

    setChecked(newChecked);

    dispatchEvents();
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
            Category
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
                {categories.map(value => {
                  const labelId = `checkbox-list-label-category-${value}`;
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
