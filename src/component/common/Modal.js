import React, { Component } from 'react';
import {
  DialogContainer,
  TextField,
  Subheader
} from 'react-md';


export default class Modal extends Component {

  show = () => {
    this.props.onCancel();
  };

  hide = () => {
    this.props.onCancel();
  };

  onSave = () => {
    this.props.onSave();
  }

  render() {
    const { visible, fildes, mode, attentionMessage} = this.props;
    const actions = mode === 'view' || attentionMessage ? [{
      id: 'OK',
      primary: true,
      children: 'OK',
      onClick: this.hide,
    }] : [{
      id: 'dialog-cancel',
      secondary: true,
      children: 'Cancel',
      onClick: this.hide,
    }, {
      id: 'Save',
      primary: true,
      children: 'Save',
      onClick: this.onSave,
    }];


    return (
      <div>
        <DialogContainer
          id="focus-control-dialog"
          title={this.props.title}
          visible={this.props.visible}
          actions={actions}
          onHide={this.hide}
          contentClassName="md-grid"
          modal
        >             {fildes}
        </DialogContainer>
      </div>
    );
  }
}