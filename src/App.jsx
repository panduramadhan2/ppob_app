// In App.js in a new project

import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from './components/BottomTab';
import {
  DompetElektronik,
  HomeScreen,
  LayananPLN,
  PLNPascabayar,
  PLNPrabayar,
  Pulsa,
  SuccessNotif,
  TopupDompet,
} from './pages';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function Transaksi() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}
function Profile() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Profile!</Text>
    </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Transaksi"
        component={Transaksi}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="My Tabs"
          component={MyTabs}
          initialRouteName="MyTabs"
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Pulsa"
          component={Pulsa}
          options={{title: 'Topup Pulsa & Data'}}
        />
        <Stack.Screen
          name="LayananPLN"
          component={LayananPLN}
          options={{title: 'Pilih Layanan PLN'}}
        />
        <Stack.Screen
          name="PLNPrabayar"
          component={PLNPrabayar}
          options={{title: 'PLN Prabayar'}}
        />
        <Stack.Screen
          name="PLNPascabayar"
          component={PLNPascabayar}
          options={{title: 'PLN Pascabayar'}}
        />
        <Stack.Screen
          name="SuccessNotif"
          component={SuccessNotif}
          options={{title: ''}}
        />
        <Stack.Screen
          name="DompetElektronik"
          component={DompetElektronik}
          options={{title: 'Dompet Elektronik'}}
        />
        <Stack.Screen
          name="TopupDompet"
          component={TopupDompet}
          options={{title: 'Topup Dompet Elektronik'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
