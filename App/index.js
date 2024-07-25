// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, ScrollView, View, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

export default function App() {
    const [hero, setHero] = useState('');
    const [villain, setVillain] = useState('');
    const [plot, setPlot] = useState('');
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false);

    const generateStory = async () => {
        if (!hero || !villain || !plot) {
            Alert.alert('Error', 'Please fill out all fields');
            return;
        }
        
        setLoading(true);
        try {
            const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
                messages: [
                    { role: "system", content: "You are a helpful assistant. Please generate a fairy tale based on the given hero, villain, and plot." },
                    { role: "user", content: `Create a fairy tale with a hero named ${hero}, a villain named ${villain}, and a plot involving ${plot}.` }
                ],
                model: "gpt-4o"
            });
            const { data } = response;
            setStory(data.response);
        } catch (error) {
            Alert.alert('Error', 'Something went wrong while generating the story.');
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Fairy Tale Generator</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Hero"
                        placeholderTextColor="#AAA"
                        value={hero}
                        onChangeText={setHero}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Villain"
                        placeholderTextColor="#AAA"
                        value={villain}
                        onChangeText={setVillain}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Plot"
                        placeholderTextColor="#AAA"
                        value={plot}
                        onChangeText={setPlot}
                    />
                    <Button
                        title="Generate Story"
                        onPress={generateStory}
                    />
                </View>
                
                {loading ? (
                    <ActivityIndicator size="large" color="#FFF" />
                ) : (
                    <Text style={styles.story}>{story}</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark background color
        paddingTop: 50, // Margin from top to avoid overlapping with status bar
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF', // Light text color for dark mode
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: '#FFF', // Light text color for inputs
    },
    story: {
        marginTop: 20,
        fontSize: 16,
        color: '#FFF', // Light text color for story output
        textAlign: 'justify',
    },
});