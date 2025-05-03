import React, { useRef, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, BackHandler, SafeAreaView, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import config from './config';
import { useEffect } from 'react';

const WebViewScreen: React.FC = () => {
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);

  // 위에서 정의한 INJECTED_JAVASCRIPT 여기에 추가
  const INJECTED_JAVASCRIPT = `...`; // 위의 코드 사용

  return (
      <SafeAreaView style={styles.container}>
        {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0066cc" />
            </View>
        )}

        <WebView
            ref={webViewRef}
            source={{ uri: config.webUrl }}
            style={styles.webview}
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            injectedJavaScript={INJECTED_JAVASCRIPT}
            injectedJavaScriptBeforeContentLoaded={`
          window.onerror = function(message, sourcefile, lineno, colno, error) {
            return true;
          };
        `}
            onNavigationStateChange={(navState) => {
              if (navState.loading === false) {
                webViewRef.current?.injectJavaScript(INJECTED_JAVASCRIPT);
              }
            }}
            onMessage={(event) => {
              console.log('WebView message:', event.nativeEvent.data);
            }}
            containerStyle={{flex: 1, marginBottom: -50}} // 웹뷰 컨테이너 스타일
            contentInset={{bottom: 50}} // iOS에서 하단 여백 추가
            automaticallyAdjustContentInsets={false}
            scrollEnabled={true}
            bounces={false}
            hideKeyboardAccessoryView={true}
            renderLoading={() => (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#0066cc" />
                </View>
            )}
        />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',  // 상대적 위치 지정
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    zIndex: 1,
  },
  // 하단 오버레이 스타일 - 링크를 가리는 용도
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#ffffff',
    zIndex: 10,
  },
});

export default WebViewScreen;