import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import the icon component

import Screen1 from './Screen1';
import Screen2 from './Screeen2';
import Screen3 from './Screen3';


const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Screen1}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Scan"
          component={Screen2}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="qr-code-scanner" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="News"
          component={Screen3}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="library-books" size={size} color={color} />
            ),
          }}
        />
    </Tab.Navigator>
  )
}

export default BottomNavigator

const styles = StyleSheet.create({})
