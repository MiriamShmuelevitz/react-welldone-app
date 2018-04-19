import React from 'react';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import ListItem from 'react-md/lib/Lists/ListItem';
import FontIcon from 'react-md/lib/FontIcons';

const ToolbarMenu = (props) => (
    <MenuButton id="user_menu" icon menuItems={[<ListItem primaryText="Logout" />, <ListItem primaryText="Feedback" />]}>
        <FontIcon >more_vert</FontIcon>
    </MenuButton>
);

export default ToolbarMenu;