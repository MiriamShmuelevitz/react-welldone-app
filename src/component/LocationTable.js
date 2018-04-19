import React, { Component } from 'react';
import { TextField } from 'react-md';
import Modal from './common/Modal';
import BaseTable from './common/BaseTable';
const initialstate = {
  data: {
    name: '',
    address: '',
    coordinates: '',
    category: ''
  },
  error: false,
  mode: 'add'
}
class LocationTable extends Component {

  state = initialstate

  onView(id) {
    this.setState({ data: this.props.list.find(item => item.id === id), mode: 'view' })
    this.props.actions.setModal('loc', true)
  }

  onDelete(id) {
    this.props.actions.removeItem('location', id);
  }

  onEdit(id) {
    this.setState({ data: this.props.list.find(item => item.id === id), mode: 'edit' })
    this.props.actions.setModal('loc', true);
  }

  onChange = (val, e) => {
    this.setState({ data: { ...this.state.data, [e.target.id]: val } });
  }

  onEditSave() {
    const { name, address, coordinates, category} = this.state.data;
    if (name === '' || this.state.data.address === '' || coordinates === '' || category === '') {
      this.setState({ error: true })
    } else {
      this.props.actions.editItem('location', this.state.data);
      this.setState({ data: {}, mode: 'add' });
      this.props.actions.setModal('loc', false)
    }
  }

  onSave() {
    const { name, address, coordinates, category} = this.state.data;
    if (name === '' || this.state.data.address === '' || coordinates === '' || category === '') {
      this.setState({ error: true })
    } else {
      this.props.actions.addItem('location', this.state.data);
      this.setState({ data: {} });
      this.props.actions.setModal('loc', false)
    }
  }

  render() {
    const {modal_loc_visible = false, actions, list} = this.props;
    const { mode} = this.state;
    const title = mode === 'add' ? 'Add location' : mode === 'view' ? 'View location' : 'Edit location';
    return (
      <div>
        <Modal
          title={title}
          onSave={() => mode === 'add' ? this.onSave() : this.onEditSave()}
          fildes={[
            <TextField
              errorText="This field is required."
              error={this.state.error && this.state.data.name === ''}
              required
              disabled={mode === 'view'}
              onChange={(value, e) => this.onChange(value, e)}
              id="name"
              label="Name"
              placeholder="Location name"
              className="md-cell md-cell--12"
              value={this.state.data.name || ''}
            />,
            <TextField
              error={this.state.error && this.state.data.address === ''}
              errorText="This field is required."
              required
              disabled={mode === 'view'}
              onChange={(value, e) => this.onChange(value, e)}
              id="address"
              label="Address"
              placeholder="Address"
              className="md-cell md-cell--12"
              value={this.state.data.address || ''}
            />,
            <TextField
              error={this.state.error && this.state.data.coordinates === ''}
              errorText="This field is required."
              required
              disabled={mode === 'view'}
              onChange={(value, e) => this.onChange(value, e)}
              id="coordinates"
              label="Coordinates"
              placeholder="Coordinates"
              className="md-cell md-cell--12"
              value={this.state.data.coordinates || ''}
            />,
            <TextField
              error={this.state.error && this.state.data.category === ''}
              errorText="This field is required."
              required
              disabled={mode === 'view'}
              onChange={(value, e) => this.onChange(value, e)}
              id="category"
              label="Category"
              placeholder="Category"
              className="md-cell md-cell--12"
              value={this.state.data.category || ''}
            />
          ]}
          visible={modal_loc_visible}
          onCancel={() => { actions.setModal('loc', false); this.setState(initialstate) }} />
        <BaseTable onView={(id) => this.onView(id)} onDelete={(id) => this.onDelete(id)} onEdit={(id) => this.onEdit(id)} dataList={list} headerList={['name', 'address', 'coordinates', 'category']} />
      </div>
    );
  }
}

export default LocationTable;
