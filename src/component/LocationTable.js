import React, { Component } from 'react';
import { TextField, SelectField } from 'react-md';
import { sortBy } from 'lodash/collection';
import Modal from './common/Modal';
import BaseTable from './common/BaseTable';
import ModalGoogleMap from './common/ModalGoogleMap';
const initialstate = {
  data: {
    name: '',
    address: '',
    coordinates: '',
    category: ''
  },
  error: false,
  mode: 'add',
  ascending: false,
  visible: false
}
class LocationTable extends Component {

  state = initialstate;

  componentWillReceiveProps(props, newProps) {
    if (props.list !== newProps.list) {
      this.setState({ sortedLocation: undefined })
    }
  }

  sort = () => {
    const ascending = !this.state.ascending;
    const sortedLocation = this.state.sortedLocation ? this.state.sortedLocation.slice() : this.props.list.slice();
    sortedLocation.reverse();

    this.setState({ ascending, sortedLocation });
  };

  onView(id) {
    this.setState({ data: this.props.list.find(item => item.id === id) })
    // this.props.actions.setModal('loc', true)
    this.setState({visible: true})
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

  onChangeSelect = (val, index, e, type) => {
    this.setState({ data: { ...this.state.data, [type]: val } });
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
    const {modal_loc_visible = false, actions, list, categoryList = []} = this.props;
    const { mode} = this.state;
    const title = mode === 'add' ? 'Add location' : mode === 'view' ? 'View location' : 'Edit location';
    return (
      <div>
        <Modal
          attentionMessage={categoryList.length === 0}
          mode={mode}
          title={title}
          onSave={() => mode === 'add' ? this.onSave() : this.onEditSave()}
          fildes={categoryList.length === 0 ? [<div className="md-cell md-cell--12" >  <span style={{ color: 'DodgerBlue' }}>Category is empty, please add a category before adding a location </span> </div>] : [
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
            <SelectField
              value={this.state.data.category || ''}
              id="category"
              label="Category"
              placeholder="Category"
              className="md-cell md-cell--12"
              menuItems={this.props.categoryList}
              errorText="This field is required."
              error={this.state.error && this.state.data.category === ''}
              required
              onChange={(value, index, e) => this.onChangeSelect(value, index, e, 'category')}
              disabled={mode === 'view'}
            />
          ]}
          visible={modal_loc_visible}
          onCancel={() => { actions.setModal('loc', false); this.setState(initialstate) }} />
        <BaseTable
          onView={(id) => this.onView(id)}
          onDelete={(id) => this.onDelete(id)}
          onEdit={(id) => this.onEdit(id)}
          dataList={this.state.sortedLocation || this.props.list}
          onSort={this.sort}
          headerList={[{ name: 'name', sorted: true }, { name: 'address' }, { name: 'coordinates' }, { name: 'category' }]} />
        <ModalGoogleMap location={this.state.date} visible={this.state.visible} onHide={() => this.setState({ visible: false })} />
      </div>
    );
  }
}

export default LocationTable;
