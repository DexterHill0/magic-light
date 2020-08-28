//https://www.npmjs.com/package/cordova-plugin-bluetoothle

//startScan => connect => ...
//                        disconnect => close
//                        connect => disconnect => close => connect
//::updating icons::

//bond/unbond
//discover

import React, { createRef } from 'react';

import { BluetoothLE as ble } from '@ionic-native/bluetooth-le/';
import { OpenNativeSettings } from '@ionic-native/open-native-settings'
import isEqual from 'lodash.isequal';

import BluetoothDeviceItem from './BluetoothDeviceItem';

const _Bluetooth = () => {

	let states: {} = {};
	let deviceRefs: {} = {};
	let deviceItems: any[] = [];

	const serviceUuids: string[] = [];

	const ble = new Bluetooth();

	const bluetoothInitialize = () => {
		ble.initialize();
	}

	const scan = async (t) => {
		let d = await ble.scan(t);
		d.forEach(e => {
			if(!checkAlreadyExists(e)) {
				createDeviceItem(e, true);
			}
		})
	}

	const connect = (id) => {
		updateDeviceItemState(id, 'connecting');
		checkAlreadyConnecting(id);

		ble.connect(id);
	}

	const checkAlreadyExists = (d) => {
		let a = false;
		deviceItems.forEach(item => { 
			if(d.address === item.props.mac) {
				a = true;
			}
		});
		return a;
	}

	const isAnyConnected = () => {
		deviceItems.forEach(item => { //disconnecting any other currently connected devices and changing their respective states
			if ((item.props.state() === 'connecting' || item.props.state() === 'connected')) {
				return true;
			}
		});
		return false;
	}

	const checkAlreadyConnecting = (id) => {
		deviceItems.forEach(item => { //disconnecting any other currently connected devices and changing their respective states
			if ((item.props.state() === 'connecting' || item.props.state() === 'connected') && item.props.mac !== id) {
				updateDeviceItemState(item.props.mac, 'not_connected');
				deviceRefs[item.props.mac].current.rerender();

				ble.disconnect(item.props.mac);
			}
		});
	}

	const createDeviceItem = (data, isFromUnpaired) => {
		if(states[data.address] === ""){
			return; //device already added to list
		}
		if(isFromUnpaired) {
			serviceUuids.push(...data.advertisement.serviceUuids);
			states = {...states, [data.address]: data.advertisement.isConnectable ? 'not_connected' : 'connected'};
		}

		deviceRefs = {...deviceRefs, [data.address]: createRef<BluetoothDeviceItem>()};
		deviceItems.push(<BluetoothDeviceItem key={data.address} ref={deviceRefs[data.address]} mac={data.address} name={data.name} onClick={(id) => connect(id)} state={() => {return states[data.address]}}></BluetoothDeviceItem>);
	}

	const updateDeviceItemState = (id, connectingState) => {
		states[id] = connectingState;
	}

	return (
		{deviceItems, bluetoothInitialize, scan, isAnyConnected}
	);
}
export default _Bluetooth; 


class Bluetooth {
	isEnabled: boolean;
	devices: any[] = [];

	constructor() {
		this.isEnabled = false;
	}

	initialize(): void {	
		ble.initialize({
			"request": true,
			"statusReceiver": true,
			"restoreKey": "magic-light-ble"
		}).subscribe((result) => {
			if (result.status === "disabled") {
				this.isEnabled = false;
				document.addEventListener("resume", this.onResume, true);
				this.alert(
					"Error",
					"",
					"Bluetooth is not enabled. Please enable Bluetooth and try again.",
					[{
							text: 'Settings',
							handler: () => { OpenNativeSettings.open("bluetooth");}
						},{
							text: 'Okay',
							handler: () => { this.onResume(); }
					}]
				);
			}
			else {
				this.isEnabled = true;
			}
		});

		ble.stopScan();
	}

	async scan(scantime): Promise<any[]> {
		if(this.isEnabled) {
			ble.startScan({
				"allowDuplicates": false,
			}).subscribe((result) => {
				if(result.status === "scanResult") {
					this.pushIfNotExists(result);
				}
			})

			await this.timeout(scantime);

			ble.stopScan().then((result) => {
				if(result.status !== "scanStopped") {
					//warn user?
				}
			});
		}
		return this.devices;
	}

	async connect(id): Promise<boolean> {
		this.alert(
			"Error",
			"",
			"There was an error connecting to the Bluetooth device. Make sure the device is turned on and try again.",
			['OK']);

		return false;
	}

	async disconnect(id): Promise<boolean> {
		return false;
	}


	pushIfNotExists(d): void {
		let count = 0;
		if(this.devices.length > 0) {
			this.devices.forEach(e => {
				if(!isEqual(d, e)) {
					count++;
				}
			});
			if(count >= this.devices.length) {
				this.devices.push(d);
			}
		}
		else {
			this.devices.push(d);
		}
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

	timeout(s): Promise<object> {
		return new Promise(resolve => setTimeout(resolve, s * 1000));
	}
 
	onResume(): void {
		ble.isEnabled().then((result) => {
			if(result.isEnabled){
				this.isEnabled = true;
				//document.removeEventListener("resume", this.onResume);
			}
		});
	}
}




