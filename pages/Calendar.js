import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Button, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const CalendarPage = ({ navigation }) => {
    const [events, setEvents] = useState({
        '2024-04-29': [{ id: 1, name: 'Manutenção do sistema do bloco M', description: 'Levar o cartão de acesso' }],
        '2024-05-02': [{ id: 2, name: 'Cadastro das novas biometrias', description: 'Falar com Adriano na sala M06' }],
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [markedDates, setMarkedDates] = useState({});

    const handleDatePress = (date) => {
        setSelectedDate(date.dateString);
        // setModalVisible(true);
    };

    useEffect(() => {
        const markedDatesData = Object.keys(events).reduce((markedDates, date) => {
            markedDates[date] = { marked: true };
            return markedDates;
        }, {});

        setMarkedDates(markedDatesData);
    }, [events]);

    const handleAddEvent = () => {
        const newEvent = { id: Math.random(), name: eventName, description: eventDescription };
        const updatedEvents = { ...events };
        if (updatedEvents[selectedDate]) {
            updatedEvents[selectedDate].push(newEvent);
        } else {
            updatedEvents[selectedDate] = [newEvent];
        }
        setEvents(updatedEvents);
        setModalVisible(false);
    };

    const handleDeleteEvent = (eventId) => {
        const updatedEvents = { ...events };
        if (updatedEvents[selectedDate]) {
            updatedEvents[selectedDate] = updatedEvents[selectedDate].filter(event => event.id !== eventId);
        }
        setEvents(updatedEvents);
        setModalVisible(false);
    };

    const EventItem = ({ item }) => (
        <View style={styles.eventItem}>
            <Text style={styles.eventName}>{item.name}</Text>
            <Text style={styles.eventDescription}>{item.description}</Text>
            <TouchableOpacity onPress={() => handleDeleteEvent(item.id)}>
                <AntDesign name="delete" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.calendarContainer}>
                <Calendar
                    onDayPress={(date) => {
                        setSelectedDate(date.dateString);
                    }}
                    markedDates={markedDates}
                />
            </View>
            <Button
                style={{ paddingTop: 50 }}
                title="Criar evento"
                onPress={() => setModalVisible(true)}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{selectedDate}</Text>
                        <Text style={styles.modalText}>Nome do evento:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setEventName(text)}
                            value={eventName}
                        />
                        <Text style={styles.modalText}>Descrição/observação:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setEventDescription(text)}
                            value={eventDescription}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                            <Button
                                title="Cancelar"
                                onPress={() => setModalVisible(false)}
                                color={'gray'}
                            />
                            <Button
                                title="Criar evento  "
                                onPress={handleAddEvent}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.eventListContainer}>
                <FlatList
                    data={events[selectedDate] || []}
                    renderItem={({ item }) => <EventItem item={item} />}
                    keyExtractor={item => item.id.toString()}
                    ListEmptyComponent={<Text>Sem eventos nesta data</Text>}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 90
    },
    calendarContainer: {
        flex: 1,
        width: '100%',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    input: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    eventListContainer: {
        flex: 1,
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    eventItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    eventName: {
        fontSize: 16,
        width: 110,
        fontWeight: 'bold',
    },
    eventDescription: {
        fontSize: 14,
        width: 130,
    },
    backButton: {
        position: 'absolute',
        top: 55,
        left: 20,
    },
    backButtonText: {
        color: '#004AF7',
        fontSize: 16,
    },
});

export default CalendarPage;
