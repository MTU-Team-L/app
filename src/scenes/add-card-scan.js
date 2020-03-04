import React, {useRef} from 'react';
import {SafeAreaView} from 'react-native';
// eslint-disable-next-line import/namespace
import {RNCamera} from 'react-native-camera';

export default () => {
  const camera = useRef(null);

  return (
    <>
      <RNCamera
        ref={camera}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel'
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel'
        }}
        onCameraReady={() => console.log('camera ready')}
        onTextRecognized={console.log}
      />
      <SafeAreaView/>
    </>
  );
};
