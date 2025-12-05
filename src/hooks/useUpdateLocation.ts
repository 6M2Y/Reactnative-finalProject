import { useEffect } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from "react-native-geolocation-service";
import { updateLocationData } from '../api/locationApi';


export const useUpdateLocation = (user: any) => {
    useEffect(() => {
        if (!user || user.role !== 'child') return;
        
        const updateLocation = async () => {
            //request permission
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert("Location permission denied");
                    return;
                }
            }

        //if granted
        Geolocation.getCurrentPosition(
            async postion => {
                const { latitude, longitude } = postion.coords;
                try {
                    await updateLocationData(user._id, latitude, longitude);

                } catch (error: any) {
                    Alert.alert("Error updating location" + error.message);
                }
            },
            error => {
                Alert.alert("Location error" + error);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 8000 });
    };
    updateLocation();
}, [user]);
};
