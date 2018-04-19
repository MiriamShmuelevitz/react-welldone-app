import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import { BottomNavigation, FontIcon, Toolbar, Button } from 'react-md';
import { setModal } from './redux/reducers/AppReducer'
import LocationTableContainer from './container/LocationTableContainer';
import CategoryTableContainer from './container/CategoryTableContainer';
const links = [{
    label: 'Location',
    icon: <FontIcon>home</FontIcon>,
    to: `/`,
    component: Link,
}, {
    label: 'Category',
    icon: <FontIcon>home</FontIcon>,
    to: `/category`,
    component: Link,
}];
class RoutingExample extends Component {

    constructor(props) {
        super();
    }

    getInitialIndex = (pathname) => {
        let index = -1;
        links.some(({ to }, i) => {
            if (to === pathname) {
                index = i;
                return true;
            }
            return false;
        });

        return index === -1 ? 0 : index;
    };



    render() {

        return (
            <div >
                <BrowserRouter >
                    <Route
                        path='/'
                        render={({location}) => {
                            return (<div>
                                <Toolbar
                                    primary
                                    title={location.pathname === '/' ? 'Location' : 'Category'}
                                    actions={<Button icon onClick={() => this.props.actions.setModal(location.pathname === '/' ? 'loc' : 'cat', true)}> add  </Button>}
                                />
                                <Route path={links[0].to} exact component={LocationTableContainer} />
                                <Route path={links[1].to} component={CategoryTableContainer} />

                                <BottomNavigation
                                    dynamic
                                    links={links}
                                />
                            </div>)
                        }
                        }
                    >
                    </Route>
                </BrowserRouter>
            </div >
        );
    }
}

export default withRouter(connect(null, dispatch => ({
    actions: bindActionCreators({ setModal }, dispatch)
}))(RoutingExample));
