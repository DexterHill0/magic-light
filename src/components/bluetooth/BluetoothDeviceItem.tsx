import React from 'react';
import { IonIcon, IonSpinner, IonItem, IonAvatar, IonLabel} from '@ionic/react';
import { bluetoothOutline, checkmarkOutline, closeOutline, } from 'ionicons/icons';

import './BluetoothDeviceItem.css';

interface Props {
	name: string;
	mac: string;
	state: () => string;
	onClick: (id) => void;
}
interface State {
	icon: string;
}

class BluetoothDeviceItem extends React.Component<Props, State> {

	constructor(props) {
		super(props);

		this.state = {
			icon: closeOutline,
		}
	}

	private updateIcons = () => {
		const elementIndex = Array.prototype.slice.call(document.getElementsByClassName("device-list")[0].children).findIndex((data) => {return data.id === this.props.mac});

		const connectingIcon = document.getElementsByClassName("connecting-icons")[elementIndex]["style"];
		const spinnerIcon = document.getElementsByClassName("connecting-spinner")[elementIndex]["style"];

		switch (this.props.state()) {
			case 'not_connected':
				spinnerIcon.opacity = 0;
				connectingIcon.color = "var(--ion-color-danger)";
				connectingIcon.opacity = 1;
				this.setState({icon: closeOutline});
				break;
			case 'connecting':
				spinnerIcon.opacity = 1;
				connectingIcon.opacity = 0;
				this.setState({icon: ""});
				break;
			case 'connected':
				spinnerIcon.opacity = 0;
				connectingIcon.opacity = 1;
				connectingIcon.color = "var(--ion-color-success)";
				this.setState({icon: checkmarkOutline});
				break;
		}
	}

	public rerender = () => {
		this.updateIcons();
	}

	private wait = async () => {
		this.props.onClick(this.props.mac);
		this.rerender();
	}

	render() {
		return (
			<IonItem lines="none" class="item-container" id={this.props.mac} onClick={this.wait} >
				<IonAvatar slot="start" class="bluetooth-icon-container">
					<IonIcon icon={bluetoothOutline} class="bluetooth-icon"></IonIcon>
				</IonAvatar>
				<IonAvatar slot="end" class="connecting-icons-container">
					<IonIcon icon={this.state.icon} class="connecting-icons"></IonIcon>
					<IonSpinner name="dots" class="connecting-spinner"></IonSpinner>
				</IonAvatar>
				<IonLabel>
					<div className="device-name">{this.props.name ? this.props.name : "Unknown"}</div>
					<div className="device-mac">{this.props.mac}</div>
				</IonLabel>
			</IonItem>
		);
	}
}

export default BluetoothDeviceItem;
