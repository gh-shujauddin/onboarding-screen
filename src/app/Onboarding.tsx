import { StyleSheet, Text, View, SafeAreaView, Pressable, Platform, StatusBar } from 'react-native'
import { GestureDetector, Gesture, Directions } from 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Stack, router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutLeft } from 'react-native-reanimated';

const onboardingSteps = [
  {
    icon: 'snowflake',
    title: 'Welcome #DEVember',
    description: 'Expanding my skills for 24 days in React Native'
  },
  {
    icon: 'people-arrows',
    title: 'Learn and grow together',
    description: 'Learning by building 24 projects with React Native and Expo'
  },
  {
    icon: 'book-reader',
    title: 'Education for children',
    description: 'Contribute to the fundraiser "Education for Children" to help save the Children in their effort of providing education to every child '
  },
];
export default function App() {

  const [screenIndex, setScreenIndex] = useState(0);

  const data = onboardingSteps[screenIndex];

  const onContinue = () => {
    const isLastScreen = screenIndex === onboardingSteps.length - 1;
    if (isLastScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex + 1);
    }
  }

  const onBack = () => {
    const isFirstScreen = screenIndex === 0;
    if (isFirstScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex - 1);
    }
  }

  const endOnboarding = () => {
    setScreenIndex(0);
    router.back();
  }

  const swipes = Gesture.Simultaneous(
    Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
    Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack)
  );

  return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <StatusBar barStyle={"light-content"} />
        <View style={styles.stepIndicatorContainer}>
          {onboardingSteps.map((step, index) => (
            <View key={index} style={[styles.stepIndicator, { backgroundColor: screenIndex === index ? '#CEF202' : 'grey' }]} />
          ))}
        </View>
        <GestureDetector gesture={swipes} >
          <Animated.View style={styles.pageContent} key={screenIndex}>
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <FontAwesome5 style={styles.image} name={data.icon} size={150} color="#CEF202" />
            </Animated.View>
            <View style={styles.footer}>
              <Animated.Text entering={SlideInRight} exiting={SlideOutLeft} style={styles.title}>{data.title}</Animated.Text>
              <Animated.Text entering={SlideInRight.delay(50)} exiting={SlideOutLeft} style={styles.description}>{data.description}</Animated.Text>
              <View style={styles.buttonRow}>
                <Text onPress={endOnboarding} style={styles.buttonText}>Skip</Text>
                <Pressable onPress={onContinue} style={styles.button}>
                  <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        </GestureDetector>
      </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#15141A',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  pageContent: {
    flex: 1,
    padding: 20
  },
  title: {
    color: '#FDFDFD',
    fontSize: 50,
    fontFamily: 'InterBlack',
    letterSpacing: 1.3,
    marginVertical: 10,

  },
  description: {
    color: 'gray',
    fontFamily: 'Inter',
    fontSize: 20,
    lineHeight: 28
  },
  image: {
    alignSelf: 'center',
    margin: 20,
    marginTop: 80
  },
  footer: {
    marginTop: 'auto',
  },
  button: {
    backgroundColor: '#302e38',
    borderRadius: 50,
    alignItems: 'center',
    flex: 1

  },
  buttonRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  buttonText: {
    color: '#FDFDFD',
    fontFamily: 'InterSemi',
    fontSize: 16,
    padding: 15,
    paddingHorizontal: 25
  },
  stepIndicatorContainer: {
    gap: 8,
    flexDirection: 'row',
    marginVertical: 10
  },
  stepIndicator: {
    flex: 1,
    height: 3,
    backgroundColor: 'grey',
    borderRadius: 10
  }
});
