import React, { Component } from 'react';
import CategoryTable from '../component/CategoryTable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setModal } from '../redux/reducers/AppReducer';
import { addItem, removeItem, editItem } from '../redux/reducers/ListReducer';

class CategoryTableContainer extends Component {
    render() {
        return (
            <CategoryTable {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        modal_cat_visible: state.AppReducer.modal_cat_visible,
        list: state.CategoryReducer
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ setModal, addItem, removeItem, editItem }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(CategoryTableContainer);
