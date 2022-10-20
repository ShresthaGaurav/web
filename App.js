import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const App = () => {
  return (
    <WebView source={{uri: 'https://google.com'}} style={{marginTop: 20}} />
  );
};

export default App;

const styles = StyleSheet.create({});
