import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, StatusBar, StyleSheet, Image, Animated} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {appColors} from '../utils/appColors';
// import Home from '../screens/Home';
import {RoutesList} from './routes';
import {publicRoutes} from './publicRoutes';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function Hom() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#BD0F0F',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginTop: -5,
          padding: 0,
        },
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      }}>
      {publicRoutes?.map((route, key) => {
        const {name, component, options} = route;
        return (
          <Tab.Screen
            key={key}
            name={name}
            component={component}
            options={options}
          />
        );
      })}
    </Tab.Navigator>
  );
}

export default function MainStack() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="#f9f7fa"
        zIndex={2}
        backgroundColor={appColors.primary}
        animated={true}
      />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Hom"
          component={Hom}
          options={{headerShown: false}}
        />
        {RoutesList?.map((route, key) => {
          const {name, component} = route;
          return <Stack.Screen key={key} name={name} component={component} />;
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
