import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#181825" />
      
      {/* Profile & Math Rush Logo Header */}
      <View style={styles.profileCard}>
        <View style={styles.logoBadgeContainer}>
          <Image 
            source={require('./assets/profile.png')} 
            style={styles.profileAvatar} 
          />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>PRO</Text>
          </View>
        </View>

        <View style={styles.userInfoContainer}>
          <Text style={styles.appNameTitle}>MATH RUSH</Text>
          <Text style={styles.developerSubText}>Developed by Developer</Text>
        </View>
      </View>

      {/* App Body Content */}
      <View style={styles.bodyContent}>
        <Text style={styles.welcomeText}>Welcome to Math Rush!</Text>
        <Text style={styles.subText}>Ready for the math challenge?</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181825',
    paddingTop: 40,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e2e',
    padding: 15,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#313244',
  },
  logoBadgeContainer: {
    position: 'relative',
  },
  profileAvatar: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderWidth: 2,
    borderColor: '#89b4fa',
  },
  badge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#f38ba8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  userInfoContainer: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  appNameTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#cdd6f4',
    letterSpacing: 1,
  },
  developerSubText: {
    fontSize: 13,
    color: '#a6adc8',
    marginTop: 2,
    fontWeight: '600',
  },
  bodyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#cdd6f4',
  },
  subText: {
    fontSize: 14,
    color: '#a6adc8',
    marginTop: 8,
  },
});
