import React, { Component } from 'react';
import {
    DialogContainer,
} from 'react-md';
import SimpleMap from '../GoogleMap';



export default class ModalGoogleMap extends Component {


    render() {
        const { visible, fildes, mode, attentionMessage} = this.props;
        const actions = [{
            id: 'dialog-cancel',
            secondary: true,
            children: 'Close',
            onClick: this.props.onHide,
        }];
        return (
            <div>
                <DialogContainer
                    actions={actions}
                    visible={this.props.visible}
                    contentClassName="md-grid"
                    modal
                    focusOnMount={false}
                    id="simple-list-dialog"
                >
                    <div style={{ width: '100%', height: '400px' }}>
                        <SimpleMap googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `400px` }} />}
                            mapElement={<div style={{ height: `100%` }} />} />
                    </div>
                </DialogContainer>
            </div >
        );
    }
}