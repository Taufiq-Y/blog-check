import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import { Link, useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

import About from './home/About.jsx'

const useStyles = makeStyles({
  components: {
    background: "#ffffff",
    color: "black"
  },
  container: {
    justifyContent: 'center',
    '& > *': {
      padding: 20
    }
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
});
const Header = () => {
  const classes = useStyles();
  const history = useHistory()
  const { oktaAuth, authState } = useOktaAuth();

  if (authState && authState.isPending) return null;
  const login = async () => history.push('/login');
  const logout = async () => oktaAuth.signOut();

  const button = authState.isAuthenticated ?
  <button onClick={logout}
   style={{
     background: "unset",
     border: "none",
     textTransform: "uppercase",
     fontFamily: "Roboto",
     fontSize: 17,
     cursor : "pointer",
     opacity: 0.8,
   }}

   >Logout</button> :
  <button onClick={login}>Login</button>;
  return (
    <AppBar className={classes.components}>
      <Toolbar className={classes.container}>
        <Link className={classes.link} to='/'><Typography>HOME</Typography></Link>
        <Link className={classes.link} to='/About'><Typography>ABOUT</Typography></Link>
        <Typography>CONTACT</Typography>
        <Typography>{button}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
