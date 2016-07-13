/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter
  // Platform
} from 'react-native'

import {
  Magnetometer
} from 'NativeModules'

import ImagePicker from 'react-native-image-picker'

var options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

class PhotoActive extends Component {
  constructor (props) {
    super(props)
    this.state = {x: 0, y: 0, z: 0}

    var app = this

    Magnetometer.setMagnetometerUpdateInterval(0.1) // in seconds
    DeviceEventEmitter.addListener('MagnetometerData', function (data) {
    /**
    * data.magneticField.x
    * data.magneticField.y
    * data.magneticField.z
    **/
      app.setState({
        x: data.magneticField.x,
        y: data.magneticField.y,
        z: data.magneticField.z
      })
    })
    Magnetometer.startMagnetometerUpdates() // you'll start getting AccelerationData events above
    // Magnetometer.stopMagnetometerUpdates()
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        // const source = {uri: 'data:image/jpegbase64,' + response.data, isStatic: true};

        // or a reference to the platform specific asset location
        // if (Platform.OS === 'ios') {
        const source = {uri: response.uri.replace('file://', ''), isStatic: true}
        // } else {
        //   const source = {uri: response.uri, isStatic: true}
        // }

        console.log('got image')

        this.setState({
          avatarSource: source
        })
      }
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          {this.state.x},{this.state.y},{this.state.z}
        </Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})

AppRegistry.registerComponent('PhotoActive', () => PhotoActive)
