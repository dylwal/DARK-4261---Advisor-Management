import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, Image } from 'react-native';
import { API_URL } from '../API_Constants';



const LoginScreen = ({ onLogin, navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    fetch(`${API_URL}/advisors_application/verify/${username}/${password}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
      const statusCode = response.status;  
      return response.text().then(text => ({
        status: statusCode,
        text: text
      }));
    })
    .then(({ status, text }) => {
      console.log("Server Response:", text);  
      if (status === 200) {
        onLogin(username);
        navigation.navigate('Dashboard');
      } else {
        Alert.alert('Login Failed:', text);
      }
    })
    .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../Images/Logo.png')}
        style={styles.logo}
      />
      <TextInput
        placeholder="Username"
        placeholderTextColor="#34495e" 
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#34495e" 
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={() => handleLogin()} color="#3498db" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderRadius: 5,
    borderColor: '#3498db',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  logo: {
    width: 100,
    height: 100, 
    resizeMode: 'contain',
    marginBottom: 20, 
    alignSelf: 'center',
  }
});

export default LoginScreen;

