import React from 'react';
import { 
	IonHeader, 
	IonToolbar, 
	IonTitle, 
	IonContent, 
	IonList, 
	IonIcon, 
	IonTabs, 
	IonTabBar, 
	IonTabButton, 
	IonRouterOutlet, 
	IonLabel, 
	IonSpinner, 
	IonFooter,
	IonButton, 
	IonButtons,
} from '@ionic/react';
import { 
	chevronForward, 
	wifiOutline, 
	bluetoothOutline 
} from 'ionicons/icons';

import './index.css';

import { Bluetooth } from '../../../globals/globals';

interface State {
	devices: any[];
}

class Main extends React.Component<{}, State> {
	_ = Bluetooth;

	state = {
		devices: [],
	}

	componentDidMount() {
		//window.addEventListener('load', () => { this.continueHandler(); });
		this._.bluetoothInitialize();
		// setInterval(() => {
		// 	this._.scan(10).then(() => {
		// 		this.setState({devices: this._.deviceItems});
		// 	});
		// }, 30000);
	}

	componentWillUnmount() {
	}

	async alert(header, sub, message, buttons): Promise<void> {
		const alert = document.createElement('ion-alert');
		alert.header = header;
		alert.subHeader = sub;
		alert.message = message;
		alert.buttons = buttons;


		document.body.appendChild(alert);
		return await alert.present();
	}

	continueHandler() {
		if(!this._.isAnyConnected()) {
			this.alert(
				"Continue?",
				"",
				"Are you sure you want to continue without selecting a device?",
				[{ text: 'Cancel', },
					{
						text: 'Okay',
						handler: () => { console.log('continue ok'); } //move to next screen
					}
				]
			);
		}
	}

	render() {
		return (
			<IonContent class="main-page" scrollY={false}>
			<IonHeader>
					<IonToolbar class="main-toolbar">
						<IonTitle class="main-toolbar-title" size="large">Select A Device</IonTitle>
						<IonButtons slot="end" >
							<IonButton slot="icon-only" onClick={() => this.continueHandler}>
								<IonIcon icon={chevronForward} slot="end" class="next-button" ></IonIcon>
							</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonHeader>
				<IonSpinner class="single-refresh-spinner"></IonSpinner>
				
				<IonContent class="mid-content">
					<IonList class="device-list">
						{
							this.state.devices.map(el => el)
						}
					</IonList>
				</IonContent>

				<IonFooter class="footer">
					<IonToolbar class="footer-toolbar">
						<IonTabs>
							<IonRouterOutlet></IonRouterOutlet>
							<IonTabBar slot="bottom" class="tab-bar">
								<IonTabButton tab="Wifi" href="/scan-devices/wifi" disabled={true}>
									<IonIcon icon={wifiOutline} class="button-wifi"></IonIcon>
									<IonLabel class="button-wifi button-wifi-label">Wifi</IonLabel>
								</IonTabButton>
								<IonTabButton tab="Bluetooth" href="/scan-devices/bluetooth">
									<IonIcon icon={bluetoothOutline} class="button-bluetooth"></IonIcon>
									<IonLabel class="button-bluetooth button-bluetooth-label">Bluetooth</IonLabel>

								</IonTabButton>
							</IonTabBar>
						</IonTabs>
					</IonToolbar>
				</IonFooter>
			</IonContent>
		);
	};
};
export default Main;
