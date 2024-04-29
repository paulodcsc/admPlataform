import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { v4 as uuidv4 } from 'uuid'; // Importing uuidv4 from uuid package

const AddMachine = ({ navigation, route }) => {
  const { machines, setMachines } = route.params;

  const [machineName, setMachineName] = useState('');
  const [connectionCode, setConnectionCode] = useState('');

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Máquina adicionada!',
      text2: 'A máquina adicionada já está disponível na dashboard',
      position: 'bottom'
    });
  }

  const handleAddMachine = () => {
    const randomId = Math.floor(Math.random() * 1000000); // Change 1000000 to whatever range you want
  
    const newMachine = {
      id: randomId,
      name: machineName,
      status: 'Desligado' // You can set default status here or leave it empty
    };
  
    setMachines([...machines, newMachine]);
  
    showToast();
    navigation.navigate("AdminDashboard");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="leftcircleo" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Cadastrar Máquina</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome da Máquina"
          value={machineName}
          onChangeText={text => setMachineName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Código de conexão"
          value={connectionCode}
          onChangeText={text => setConnectionCode(text)}
        />
        <TouchableOpacity onPress={handleAddMachine} style={styles.addButton}>
          <Text style={styles.buttonText}>Adicionar Máquina</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingTop: 75
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 20,
  },
  title: {
    fontSize: 24,
  },
  form: {
    width: '80%',
    height: '90%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#004AF7',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default AddMachine;
