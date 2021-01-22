import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userActions } from 'redux/actions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { theme } from '../style/MyProfileCss';
import { useDispatch } from 'react-redux';

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

export default function ScrollDialog() {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [checked, setChecked] = React.useState([0]);
  const [userCategories, setCategories] = React.useState([]);
  const favorite = useSelector(state => state.userFavorite);
  const loading = favorite.loading;
  const loaded = favorite.loaded;

  useEffect(() => {
    if (loaded) {
      console.log(favorite);

      getElements(favorite.categories);
    }
  }, [loading, loaded]);

  useEffect(() => {
    console.log('here');
    console.log(favorite);

    dispatch(userActions.getFavorites());
  }, []);

  function getElements(data) {
    let arr = [0];
    data.map(elem => {
      arr.push(elem.name);
    });
    setChecked(arr);
  }

  async function dispatchEvents() {
    // await dispatch(eventsActions.getEvents());
  }

  function dispatchSortCategories(category, isChecked) {
    // dispatch(sortingActions.changeCategories(category, isChecked));
  }

  // const baseUrl = 'https://www.eventnet-api-staging.ml/';

  // const headers = {
  //   'Content-Type': 'application/json',
  //   'JWT-TOKEN': document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, '$1'),
  //   'API-KEY': '12bf8fffa86840aee50aeb408621f0ba9c131d8e0edca457ec68a48674f1d4a5',
  // };
  // export
  // const getFavorites = () => {
  //   console.log(headers);

  //   const url = baseUrl + 'user/categories/';
  //   return new Promise(async (resolve, reject) => {
  //     const response = await Axios.get(url, {
  //       headers: headers,
  //     });
  //     console.log(response.data);
  //     response.data.OK
  //       ? setCategories(response.data.data)
  //       : reject({ err: response.data.errors[0].error_message });
  //   });
  // };

  // const postFavorites = data => {
  //   console.log(headers);

  //   const url = baseUrl + 'user/categories/';
  //   return new Promise(async (resolve, reject) => {
  //     const response = await Axios.post(url, data, {
  //       headers: headers,
  //     });
  //     console.log(response.data);
  //     response.data.OK
  //       ? setCategories(response.data.categories[0])
  //       : reject({ err: response.data.errors[0].error_message });
  //   });
  // };

  // const deleteFavorites = data => {
  //   console.log(headers);

  //   const url = baseUrl + 'user/categories/';
  //   return new Promise(async (resolve, reject) => {
  //     const response = await Axios.delete(url, data, {
  //       headers: headers,
  //     });
  //     console.log(response.data);
  //     response.data.OK
  //       ? getElements(response.data.categories[0])
  //       : reject({ err: response.data.errors[0].error_message });
  //   });
  // };
  // const userCategories = ['Party', 'Museum', 'Fashion'];

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      const data = newChecked.slice(1).map(elem => {
        let obj = {};
        obj.name = elem;
        return obj;
      });
      userActions.postFavorites({ categories: data });
      setCategories(newChecked.slice(1));
    } else {
      newChecked.splice(currentIndex, 1);
      userActions.deleteFavorites({ categories: [{ name: value }] });
      dispatchSortCategories(value, true);
    }

    setChecked(newChecked);
  };
  const handleClickOpen = scrollType => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Button
        color="primary"
        style={{ marginTop: theme.spacing(3) }}
        startIcon={<FavoriteIcon />}
        onClick={handleClickOpen('paper')}
      >
        Favorite
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Check your favorite categories</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            style={{ paddingRight: '35px', paddingLeft: '10px' }}
          >
            {loading ? (
              'loading...'
            ) : (
              <List>
                {categories.map(value => {
                  const labelId = `checkbox-list-label-category-${value}`;
                  return (
                    <ListItem key={value} role={undefined} dense>
                      {checked.slice(1).includes(value) ? (
                        <FavoriteIcon style={{ marginRight: theme.spacing(6), color: '#9C27B0' }} />
                      ) : (
                        <ListItemIcon style={{ marginRight: theme.spacing(2) }}>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                            style={{ color: '#9C27B0' }}
                            onClick={handleToggle(value)}
                          />
                        </ListItemIcon>
                      )}
                      <ListItemText id={labelId} primary={value} />
                      {checked.slice(1).includes(value) ? (
                        <IconButton
                          onClick={handleToggle(value)}
                          aria-label="delete"
                          style={{ color: '#f44336' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      ) : null}
                    </ListItem>
                  );
                })}
              </List>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
