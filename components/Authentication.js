import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";
import { app } from '../firebaseConfig';

const auth = getAuth(app);

export const handleLogin = async (email, password, onLogin) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(email);
        console.log(user);
        onLogin(); // Aseta isAuthenticated true
        Alert.alert("Kirjautuminen onnistui!", `Tervetuloa, ${user.email}!`);
        return true; // Palauta onnistuminen
    } catch (error) {
        const errorMessage = error.message;
        console.error("Virhe kirjautumisessa:", errorMessage);
        Alert.alert("Virhe kirjautumisessa", errorMessage);
        return false; // Palauta epäonnistuminen
    }
};


{/*import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { Alert, TextInput, StyleSheet, Button, KeyboardAvoidingView } from "react-native";
import { getDatabase, ref, set } from "firebase/database";
import { app } from '../firebaseConfig';

export default function Authentication({ navigation, onLogin, onLogout }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [kayttajanimi, setKayttajanimi] = useState('');

    const database = getDatabase(app);
    const auth = getAuth();

    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Tallenna käyttäjätiedot tietokantaan
            await set(ref(database, 'kayttajat/' + user.uid), {
                uid: user.uid,
                email: user.email,
                kayttajanimi: kayttajanimi
            });

            console.log("Käyttäjä tallennettu tietokantaan");
            Alert.alert("Rekisteröinti onnistui!", `Tervetuloa, ${user.email}!`);
        } catch (error) {
            console.error("Virhe rekisteröitymisessä:", error.message);
            Alert.alert("Virhe rekisteröitymisessä", error.message);
        }
    };

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(email);
            console.log(user);
            onLogin();
            Alert.alert("Kirjautuminen onnistui!", `Tervetuloa, ${user.email}!`);
        } catch (error) {
            const errorMessage = error.message;
            console.error("Virhe kirjautumisessa:", errorMessage);
            Alert.alert("Virhe kirjautumisessa", errorMessage);
        }
    };
}


    const handleLogout = () => {
        signOut(auth).then(() => {
            if (onLogout) {
                onLogout(); // Varmista, että onLogout on määritelty
            }
            Alert.alert("Uloskirjautuminen onnistui!");
        }).catch((error) => {
            console.error("Virhe uloskirjautumisessa:", error);
            Alert.alert("Virhe uloskirjautumisessa", error.message);
        });
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
            <TextInput
                placeholder='Käyttäjänimi'
                onChangeText={setKayttajanimi}
                value={kayttajanimi} />
            <Button onPress={handleSignUp} title='Luo tunnus' />
            <Button onPress={handleLogin} title='Kirjaudu' />
            <Button onPress={handleLogout} title='Kirjaudu ulos' />
        </KeyboardAvoidingView>
    ); 
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});*/}

