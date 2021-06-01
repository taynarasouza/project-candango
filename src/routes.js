import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// import {createBottomTabNavigator} from 'react-navigation-tabs';

import LoginView from './views/LoginView';
import SignUpView from './views/SignUpView';
import PasswordView from './views/PasswordView';
import NewPasswordView from './views/NewPasswordView';

import HomeView from './views/HomeView';
import BagView from './views/BagView';
import MarkerView from './views/MarkerView';
import ProfileView from './views/ProfileView';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createStackNavigator(
          {
            LoginView,
            SignUpView,
            PasswordView,
            NewPasswordView,
          },
          {
            defaultNavigationOptions: {
              // headerTransparent: true,
              headerBackTitle: 'Voltar',
              headerTintColor: '#000',
              headerLeftContainerStyle: {
                marginLeft: 20,
              },
            },
          },
        ),
        App: createStackNavigator(
          {
            HomeView,
            BagView,
            ProfileView,
            MarkerView,
          },
          {
            defaultNavigationOptions: {
              // headerTransparent: true,
              headerBackTitle: 'Voltar',
              headerTintColor: '#000',
              headerLeftContainerStyle: {
                marginLeft: 20,
              },
            },
          },
          {
            resetOnBlur: true,
          },
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      },
    ),
  );
