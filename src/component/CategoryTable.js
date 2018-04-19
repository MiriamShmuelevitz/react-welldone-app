import React, { Component } from 'react';
import { TextField } from 'react-md';
import Modal from './common/Modal';
import BaseTable from './common/BaseTable';

const initstate = {
    data: {
        name: ''
    },
    error: false,
    mode: 'add'
}

class CategoryTable extends Component {
    state = initstate

    onView(id) {
        this.setState({ data: this.props.list.find(item => item.id === id), mode: 'view' })
        this.props.actions.setModal('cat', true)
    }

    onDelete(id) {
        this.props.actions.removeItem('category', id);
    }

    onEdit(id) {
        this.setState({ data: this.props.list.find(item => item.id === id), mode: 'edit' })
        this.props.actions.setModal('cat', true)
    }

    onChange = (val, e) => {
        const nameT = e.target.id
        this.setState({ data: { ...this.state.data, [e.target.id]: val } });
    }
    onEditSave() {
        const { name} = this.state.data;
        if (name === '') {
            this.setState({ error: true })
        } else {
            this.props.actions.editItem('category', this.state.data);
            this.setState({ data: {}, mode: 'add' });
            this.props.actions.setModal('cat', false)
        }
    }
    onSave() {
        const { name } = this.state.data;
        if (name === '') {
            this.setState({ error: true })
        } else {
            this.props.actions.addItem('category', this.state.data);
            this.setState({ data: {} })
            this.props.actions.setModal('cat', false)
        }

    }

    render() {
        const {modal_cat_visible = false, actions, list, removeItem, editItem} = this.props;
        const { mode} = this.state;
        const title = mode === 'add' ? 'Add category' : mode === 'view' ? 'View category' : 'Edit category';
        return (
            <div>
                <Modal
                    title={title}
                    onSave={() => mode === 'add' ? this.onSave() : this.onEditSave()}
                    fildes={[<TextField disabled={mode === 'view'} value={this.state.data.name || ''} errorText="This field is required." I error={this.state.error && this.state.data.name === ''} required onChange={(value, e) => this.onChange(value, e)} id="name" label="Name" placeholder="Category Nane" className="md-cell md-cell--12" />]}
                    visible={modal_cat_visible}
                    onCancel={() => {
                        actions.setModal('cat', false); this.setState(initstate)
                    }} />
                <BaseTable onView={(id) => this.onView(id)} onDelete={(id) => this.onDelete(id)} onEdit={(id) => this.onEdit(id)} dataList={list} headerList={['name']} />
            </div>
        );
    }
}

export default CategoryTable;
