import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import { StyleSheet, View, Text, Pressable, Button } from 'react-native';

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Click on continue for onboarding</Text>
      <Link href={"Onboarding"} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  text: {
    color: 'black',
    fontFamily: 'InterSemi',
    fontSize: 18,
    padding: 15
  },
  button: {
    backgroundColor: '#302e38',
    borderRadius: 50,
    alignItems: 'center',
    width: 200,
    alignSelf: 'center'

  },
  buttonText: {
    color: '#FDFDFD',
    fontFamily: 'InterSemi',
    fontSize: 16,
    padding: 15,
    paddingHorizontal: 25
  },
});
