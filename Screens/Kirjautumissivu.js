import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, KeyboardAvoidingView, Alert } from 'react-native';
import { handleLogin } from '../components/Authentication'; // Tuodaan handleLogin

export default function Kirjautumissivu({ onLogin, navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        const success = await handleLogin(email, password, onLogin);
        if (success) {
            navigation.navigate('Arviointilomake'); // Siirrä arviointilomakesivulle
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <TextInput
                placeholder='Sähköposti'
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address" />
            <TextInput
                placeholder='Salasana'
                onChangeText={setPassword}
                value={password}
                secureTextEntry />
            <Button onPress={login} title='Kirjaudu' />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
});
