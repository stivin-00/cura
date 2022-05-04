/**
 * @author Amusoftech <er.amudeep@gmail.com>
 * @description Minimal example of Tab Navigations
 */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RoutesList} from './routes';
import {publicRoutes} from './publicRoutes';
import {appColors} from '../utils/appColors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function TabNavigationStack({isAuth}) {
  const [routes, setRoutes] = React.useState([...RoutesList]);
  const [publics, setPublics] = React.useState([...publicRoutes]);

  function Hom() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {routes?.map((route, key) => {
          const {name, component} = route;
          return <Stack.Screen key={key} name={name} component={component} />;
        })}
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={
          ({
            headerShown: false,
          },
          {
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
          })
        }>
        <Tab.Screen name="Hom" component={Hom} />
        {publics?.map((route, key) => {
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
    </NavigationContainer>
  );
}
