import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';

const App = () => {
  const zoomControlScript =
    "(function(){ var meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=0.99, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); })(); true;";
  const webviewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const setupState = event => {
    setCanGoBack(event?.canGoBack);
  };

  useEffect(() => {
    const goBack = () => {
      if (canGoBack === false) {
        Alert.alert(
          'Exit App',
          'Do you want to exit app?',
          [
            {text: 'No', onPress: () => console.log('No'), style: 'cancel'},
            {text: 'Yes', onPress: () => BackHandler?.exitApp()},
          ],
          {cancelable: false},
        );
      }
      webviewRef?.current?.goBack();
      return true;
    };

    BackHandler?.addEventListener('hardwareBackPress', () => goBack());

    return () =>
      BackHandler?.removeEventListener('hardwareBackPress', () => goBack());
  }, [canGoBack]);

  return (
    <SafeAreaView>
      <WebView
        ref={webviewRef}
        style={{flex: 1}}
        source={{uri: 'https://msmticketing.com.au'}}
        automaticallyAdjustContentInsets={false}
        domStorageEnabled={true}
        startInLoadingState={true}
        allowsInlineMediaPlayback={true}
        allowsBackForwardNavigationGestures
        onNavigationStateChange={e => setupState(e)}
        cacheEnabled={false}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
