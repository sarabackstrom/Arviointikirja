import './gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Alert } from 'react-native';
import Kirjautumissivu from './Screens/Kirjautumissivu';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Arviointilomake from './Screens/Arviointilomake';
import React, { useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { app } from './firebaseConfig';

const Drawer = createDrawerNavigator();

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const auth = getAuth(app);
  
    const handleLogout = async (navigation) => {
        try {
            await signOut(auth);
            setIsAuthenticated(false);
            Alert.alert("Uloskirjautuminen onnistui!");
            navigation.navigate('Kirjautuminen'); // Siirrä kirjautumissivulle
        } catch (error) {
            Alert.alert("Virhe uloskirjautumisessa", error.message);
        }
    };

    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName={isAuthenticated ? "Arviointilomake" : "Kirjautuminen"}>
                <Drawer.Screen name="Kirjautuminen">
                    {({ navigation }) => <Kirjautumissivu onLogin={() => setIsAuthenticated(true)} navigation={navigation} />}
                </Drawer.Screen>
                {isAuthenticated && (
                    <>
                        <Drawer.Screen name="Arviointilomake" component={Arviointilomake} />
                        <Drawer.Screen name="Kirjaudu ulos">
                            {({ navigation }) => (
                                <Button title="Kirjaudu ulos" onPress={() => handleLogout(navigation)} />
                            )}
                        </Drawer.Screen>
                    </>
                )}
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


