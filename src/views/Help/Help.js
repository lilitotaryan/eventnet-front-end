import React from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player/lazy';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Questions from './Questions';
import Grid from '@material-ui/core/Grid';
import CardAvatar from 'components/Card/CardAvatar.js';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer.js';
import avatar from 'views/MyProfile/Images/gmail.png';
import { useStyles } from 'views/MyProfile/style/MyProfileCss';

const styles = {
  playerWrapper: {
    position: 'relative',
    paddingTop: '56.25%' /* Player ratio: 100 / (1280 / 720) */,
  },

  reactPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
};

const userQuestions = [
  'How to get notified about recent events ?',
  'Do I get refund for the canceled events ?',
  'How many free tickets can I get ?',
  'What is the difference between responsible and irresponsible events ?',
];
const userAnswers = [
  'In the About Us section you can subscribe to our latest events.',
  'Yes, sure.',
  'Sorry, but only three of them :)',
  `For the responsible ones EventNet is required to ensure your money refund, in case the event is canceled, EventNet administration finds out that the event did not take place or the company deletes its account.
  `,
];
const companyQuestions = [
  'How much does EventNet charge for events ?',
  'How much does Stripe payment cost ?',
  'Am I also charged for free tickets ?',
  'What is the difference between responsible and irresponsible events ?',
];
const companyAnswers = [
  'If responsible 5 percent otherwise 10 percent.',
  'Stripe charges 3 percent of the payment.',
  'Yes, a fixed amount (1000 AMD for the whole service).',
  `For the responsible events you will not receive payment directly from the user, but a trusted escrow account is used to gather all the ticket payments, which will be transfered to your account after EventNet will be assured that the event took place.
For irresponsible ones, EventNet does not take any responsibility in  case the event will not take place and user payments are directly transfered to company's account.
`,
];

export default function Help() {
  const classes = useStyles();
  const user = useSelector(state => state.userData);

  const userHelp = userQuestions.map((elem, i) => (
    <Questions question={elem} answer={userAnswers[i]} />
  ));
  const companyHelp = companyQuestions.map((elem, i) => (
    <Questions question={elem} answer={companyAnswers[i]} />
  ));
  return (
    <>
      <GridContainer justify="flex-end">
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>If you need some help watch the video.</h4>
              <p className={classes.cardCategoryWhite}>
                Below the video you can find frequenlty asked questions.
              </p>
            </CardHeader>

            <CardBody>
              <Grid alignItems="center" alignContent="center">
                <GridItem style={{ marginLeft: '30px' }}>
                  <ReactPlayer
                    className={styles.reactPlayer}
                    url={
                      user.is_company
                        ? 'https://www.youtube.com/watch?v=3syoiiDQYww&feature=youtu.be'
                        : 'https://youtu.be/Bl2wv348VbM'
                    }
                    controls={true}
                  />
                </GridItem>
              </Grid>
              <List
                style={{ marginTop: '20px' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    style={{ fontSize: '30px' }}
                  >
                    Frequently asked Questions
                  </ListSubheader>
                }
                className={classes.root}
              >
                {user.is_company ? companyHelp : userHelp}
              </List>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="mailto:eventnet1999@gmail.com">
                <img src={avatar} alt="eventnet1999@gmail.com" />
              </a>
            </CardAvatar>
            <CardBody profile>
              <p>Still have questions ? Write us email and we will respond within 24 hours</p>
              <a href="mailto:eventnet1999@gmail.com">eventnet1999@gmail.com</a>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
