import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const AdminDashboard = ({ navigation }) => {
  const [machines, setMachines] = useState([
    { id: 1, name: 'Servidor nº273', status: 'Ligado' },
    { id: 2, name: 'Servidor nº201', status: 'Desligado' },
    { id: 3, name: 'Ar-condicionado da sala 42', status: 'Defeituoso' },
    { id: 4, name: 'Ar-condicionado da sala 43', status: 'Defeituoso' },
    { id: 5, name: 'Sistema do bloco C', status: 'Ligado' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [machineToDelete, setMachineToDelete] = useState(null);

  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Esta máquina precisa de manutenção',
      text2: 'e não pode ser ligada enquanto estiver nesse estado',
      position: 'bottom'
    });
  }

  const handleToggleStatus = (id) => {
    const updatedMachines = machines.map(machine => {
      if (machine.id === id) {
        if (machine.status !== 'Defeituoso') {
          machine.status = machine.status === 'Ligado' ? 'Desligado' : 'Ligado';
        } else {
          showToast();
        }
      }
      return machine;
    });
    setMachines(updatedMachines);
  };

  const handleDeleteMachine = () => {
    const filteredMachines = machines.filter(machine => machine.id !== machineToDelete);
    setMachines(filteredMachines);
    setModalVisible(false);
  };

  const handleNavigateToAddMachine = () => {
    navigation.navigate("AddMachine", { machines, setMachines });
  };

  return (
    <View style={styles.container}>
      <View style={styles.dashboardContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("MainMenu")} style={styles.backButton}>
            <AntDesign name="leftcircleo" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Painel de Controle   </Text>
          <TouchableOpacity onPress={handleNavigateToAddMachine} style={styles.backButton}>
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {machines.map(machine => (
          <View key={machine.id} style={[styles.card, { borderColor: getStatusStyle(machine.status).color, shadowColor: getStatusStyle(machine.status).color }]}>
            <Text style={styles.machineName}>{machine.name}</Text>
            <TouchableOpacity onPress={() => handleToggleStatus(machine.id)} style={styles.toggleButton}>
              <Text style={[styles.status, getStatusStyle(machine.status)]}>{machine.status}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setMachineToDelete(machine.id);
              setModalVisible(true);
            }} style={styles.deleteButton}>
              <AntDesign name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Deletar esta máquina?</Text>
            <View style={{ flexDirection: 'row', gap: '40%' }}>
              <Button
                title="Cancelar"
                onPress={() => setModalVisible(false)}
              />
              <Button
                title="Deletar"
                onPress={handleDeleteMachine}
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const getStatusStyle = (status) => {
  switch (status) {
    case 'Ligado':
      return { color: '#6996ff' };
    case 'Desligado':
      return { color: '#F44336' };
    case 'Defeituoso':
      return { color: '#FFC107' };
    default:
      return {};
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
  },
  blueBar: {
    backgroundColor: '#004AF7',
    width: 20, // Adjust width as needed
  },
  dashboardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: '',
    paddingTop: 75
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 20,
  },
  backButtonIcon: {
    fontSize: 18,
    color: '#000000',
  },
  title: {
    fontSize: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5

  },
  machineName: {
    fontSize: 18,
    width: 120
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 30,
    paddingBottom: 20,
    paddingRight: 30,
    paddingLeft: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18
  },
});

export default AdminDashboard;
