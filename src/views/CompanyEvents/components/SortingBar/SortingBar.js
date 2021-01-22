import React from 'react';
// @material-ui/core components

import { useDispatch } from 'react-redux';

// core components
// import GridContainer from 'components/Grid/GridContainer.js';
// import Event from './components/Event';
// import GridItem from 'components/Grid/GridItem.js';

// import { useDispatch, useSelector } from 'react-redux';
import { eventsActions, sortingActions } from 'redux/actions';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import Categories from './components/Categories';
import Cities from './components/Cities';
import Region from './components/States';

import { useStyles } from './style';

export default function SortingBar() {
  const dispatch = useDispatch();

  async function dispatchEvents() {
    await dispatch(eventsActions.getCompanyEvents());
  }

  // useEffect(() => {
  //   async function fetchData() {
  //     await dispatchEvents(1);
  //   }
  //   fetchData();
  // }, []);

  function handleAll() {
    dispatch(sortingActions.changeIsAll());
    dispatchEvents();
  }

  function handleOrderingASC() {
    dispatch(sortingActions.changeOrdering('asc'));
    dispatchEvents();
  }
  function handleOrderingDEC() {
    dispatch(sortingActions.changeOrdering('des'));
    dispatchEvents();
  }

  const classes = useStyles();

  return (
    <div className={classes.ButtonGroup}>
      <ButtonGroup color="primary" size="large">
        <Button color="primary" onClick={handleAll}>
          All
        </Button>
        <Button color="primary" onClick={handleOrderingASC} endIcon={<ArrowUpwardIcon />}>
          Price
        </Button>
        <Button color="primary" onClick={handleOrderingDEC} endIcon={<ArrowDownwardIcon />}>
          Price
        </Button>
        <Categories />
        <Region />
        <Cities />
        {/* <PopupState variant="popover" popupId="demo-popup-popover">
          {popupState => (
            <div>
              <Button
                size="large"
                variant="outlined"
                color="primary"
                endIcon={<ExpandMoreIcon />}
                {...bindTrigger(popupState)}
              >
                Date
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
                <Box p={2}>
                  <Typography>The content of the Popover.</Typography>
                </Box>
              </Popover>
            </div>
          )}
        </PopupState> */}
      </ButtonGroup>
    </div>
  );
}
