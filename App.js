import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, Button, FlatList, Text } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App () {
  const [contacts, setContacts] = useState([]);

  const getContacts = async() => {
    const {status} = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const {data} = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
        });
        
        if (data.length > 0) {
          //console.log(data);
          setContacts(data);
        }
      }
  }

  return (
    <View style={styles.container}>
      <FlatList 
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => 
          <Text>{item.name}     {item.phoneNumbers[0].number}</Text>
        } 
        data={contacts}
        style={styles.listStyle} 
      />
      <Button title="GET CONTACTS" onPress={getContacts} style={{marginBottom: 10, marginTop: 10}}></Button>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 20
  },
  listStyle: {
    marginBottom: 10
  }
});

