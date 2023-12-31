import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AdvisorApplication from './AdvisorApplication';
import LoginScreen from './Screens/loginScreen';
import DashboardScreen from './Screens/DashboardScreen';
import { API_URL } from './API_Constants';


const Stack = createStackNavigator();

const App = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState(null);
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} onLogin={setUsername} />}
        </Stack.Screen>
        <Stack.Screen name="Dashboard" component={DashboardScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default App;