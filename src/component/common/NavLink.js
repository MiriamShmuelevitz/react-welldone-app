import React from 'react';
import {Link as RouterLink, Route} from 'react-router-dom';
import FontIcon from 'react-md/lib/FontIcons';
import ListItem from 'react-md/lib/Lists/ListItem';

const NavLink = ({label, to, exact, icon, onClick}) => {
  return (
    <Route path={to} exact={exact} >
      {({match}) => {
        let leftIcon;
        if (icon) {
          leftIcon = <FontIcon>{icon}</FontIcon>;
        }
        return (<ListItem
          component={RouterLink}
          active={!!match}
          to={to}
          primaryText={label}
          leftIcon={leftIcon}/>);
      }}
    </Route>
  )
};

export default NavLink;