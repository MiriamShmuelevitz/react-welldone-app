import React, { Component } from 'react';
import LocationTable from '../component/LocationTable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setModal} from '../redux/reducers/AppReducer';
import { addItem, removeItem, editItem } from '../redux/reducers/ListReducer';

class LocationTableContainer extends Component {
    render() {
        return (
            <LocationTable {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        modal_loc_visible: state.AppReducer.modal_loc_visible,
        list: state.LocationReducer
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ setModal, addItem, removeItem, editItem }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(LocationTableContainer);
