import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header} from 'react-native-elements'
import {Provider} from 'react-redux';

import Home from './app/Screens/Home';
import Favorites from './app/Screens/Favorites'
import store from './app/store/store';


const Tab = createBottomTabNavigator();
const configureStore =store();

export default class App extends Component {

  render() {

    return (
      <Provider store ={configureStore} >
      <NavigationContainer>
      <Header
           centerComponent={{ text: 'Launches', style: { color: '#fff' } }}
           />
      <Tab.Navigator
              screenOptions={({ route }) => ({
                //Set icon to tabs buttons
                tabBarIcon: ({ color, size }) => {
                  let iconName;
      
                  if (route.name === 'Home') {
                    iconName = 'ios-home'

                  } else if (route.name === 'Favorites') {
                    iconName =  'ios-list' 
                  }
      
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
              }} >                
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Favorites" component={Favorites} />

      </Tab.Navigator>
      </NavigationContainer> 
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,

  },
});

