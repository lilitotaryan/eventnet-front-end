import React from 'react';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Email from 'views/HomePage/modules/views/Subscribe/Email';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer.js';
import { useStyles, theme } from 'views/MyProfile/style/MyProfileCss';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const style = {
  textField: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    maxWidth: 400,
  },
};
export default function AboutUs() {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <GridContainer justify="flex-end">
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>About Us</h4>
              <p className={classes.cardCategoryWhite}>
                We provide fast and secure event booking and trade
              </p>
            </CardHeader>

            <CardBody>
              <p>
                Armenian people are known for their unique and unlimited hospitality. Therefore, to
                help both locals and tourists to enjoy our culture and events, we tried to create a
                handy tool called EventNet. Our aim is to make EventNet a valuable software for
                event management and ticketing. We believe that it will be practical for anyone who
                plans to have a good time or visit Armenia (after the corona) for some time and
                enjoy to the fullest. Our platform will help its users to learn about events and
                purchase online tickets, which are happening not only in Yerevan but also in whole
                Armenia.
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Enter Your Email</h4>
              <p className={classes.cardCategoryWhite}>Subscribe for latest events</p>
            </CardHeader>
            <CardBody profile>
              <Email classes={style} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </MuiThemeProvider>
  );
}
