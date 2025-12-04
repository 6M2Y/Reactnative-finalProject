import React from 'react';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChildLocationMap = ({ route }: any) => {
  const { childLocData } = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_DEFAULT}
        mapType="standard"
        initialRegion={{
          latitude: childLocData.location?.latitude,
          longitude: childLocData.location?.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: childLocData.location?.latitude,
            longitude: childLocData.location?.longitude,
          }}
          title={childLocData.name}
          description={`Last updated: ${new Date(
            childLocData.location?.updatedAt,
          ).toLocaleString()}`}
        />
      </MapView>
    </SafeAreaView>
  );
};

export default ChildLocationMap;
