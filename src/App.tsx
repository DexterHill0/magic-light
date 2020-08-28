import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonPage
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import '@ionic/react/css/core.css';

import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

//pages
import BluetoothScan from './pages/scan-devices/bluetooth/';
import WifiScan from './pages/scan-devices/wifi';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonPage>
        <IonRouterOutlet>
        <Route path="/scan-devices/bluetooth" component={BluetoothScan} exact={true} />
          <Route path="/scan-devices/wifi" component={WifiScan} exact={true} />

          <Route path="/" render={() => <Redirect to="/scan-devices/bluetooth" />} exact={true} />
        </IonRouterOutlet>
      </IonPage>
    </IonReactRouter>
  </IonApp>
);

export default App;
