import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const MainMenu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.blueBar}></View>
      <View style={styles.menuContent}>
        <TouchableOpacity onPress={() => navigation.navigate("AdminDashboard")} style={styles.menuItem}>
          <Text style={styles.menuText}>Painel de controle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Calendar")} style={styles.menuItem}>
          <Text style={styles.menuText}>Calendário</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.logoutItem}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
  menuContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  title: {
    fontSize: 24,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#c2c2c2',
    borderWidth: 1
  },
  logoutItem: {
    backgroundColor: '#eb4034',
    width: '80%',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  menuText: {
    fontSize: 18,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default MainMenu;