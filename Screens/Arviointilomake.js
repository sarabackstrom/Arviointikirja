//import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Alert, Button, StyleSheet, TextInput, View, FlatList, Text, SafeAreaView } from 'react-native';

import { app } from '../firebaseConfig';
import { getDatabase, ref, push, onValue } from "firebase/database";
import { getAuth } from 'firebase/auth';

const auth = getAuth();

export default function Arviointilomake() {

    const [arviointi, setArviointi] = useState({
        user: auth.currentUser ? auth.currentUser.uid : null,
        tyoskentely: 0,
        osaaminen: 0,
        kommentti: ''
    });


    const [arvioinnit, setArvioinnit] = useState([]);

    const database = getDatabase(app);

    const handleSaveArviointi = () => {
        if (arviointi.user && (arviointi.tyoskentely || arviointi.osaaminen)) {
            const arviointiData = {
                userId: arviointi.user,
                tyoskentely: arviointi.tyoskentely,
                osaaminen: arviointi.osaaminen,
                kommentti: arviointi.kommentti
            };
            push(ref(database, 'arvioinnit/'), arviointiData)
                .then(() => {
                    Alert.alert('Success', 'Arviointi tallennettu!');
                    setArviointi({
                        userId: auth.currentUser ? auth.currentUser.uid : null,
                        tyoskentely: 0,
                        osaaminen: 0,
                        kommentti: ''
                    });
                })
                .catch((error) => {
                    console.error('Virhe tallentamisessa:', error);
                    Alert.alert('Error', 'Tapahtui virhe arvioinnin tallennuksessa');
                });
        } else {
            Alert.alert('Error', 'Käyttäjä on oltava tiedossa ja vähintään toinen arviointikenttä on täytettävä');
        }
    };

    //kuuntelija joka päivittää tietokannan Arvioinnit-tiedot
    useEffect(() => {
        const itemsRef = ref(database, 'arvioinnit/');
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setArvioinnit(Object.values(data));
            } else {
                setArvioinnit([]); // Handle the case when there are no items
            }
        })
    }, []);



    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                placeholder='Työskentelyn numero'
                onChangeText={text => setArviointi({ ...arviointi, tyoskentely: Number(text) })}
                value={arviointi.tyoskentely} />
            <TextInput
                placeholder='Osaamisen numero'
                onChangeText={text => setArviointi({ ...arviointi, osaaminen: Number(text) })}
                value={arviointi.osaaminen} />
            <TextInput
                placeholder='kommentti'
                onChangeText={text => setArviointi({ ...arviointi, kommentti: text })}
                value={arviointi.kommentti} />
            <Button onPress={handleSaveArviointi} title='Save' />
            <FlatList
                renderItem={({ item }) =>
                    <View style={styles.container}>
                        <Text style={{ fontSize: 18 }}>
                            {item.tyoskentely || 'N/A'}, {item.osaaminen || 'N/A'}, {item.kommentti || 'Ei kommenttia'}
                        </Text>
                    </View>}
                data={arvioinnit} />

            {/*<StatusBar style="auto" /> VOIKO POISTAA?*/}
        </SafeAreaView>
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