import { messaging, getToken, onMessage } from './firebase';
const VAPID_KEY = 'BM4KLWYD2RYOmjt5USOl2bd6gMWelG6nnOEZKixsPuyGG2EHnzJVpsszKr6RfyflXYS-8ePwJcpzp20syFHaIvE';

export const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            return true;
        } else {
            console.log('Notification permission denied.');
            return false;
        }
    } catch (error) {
        console.error('Error requesting notification permission:', error);
        return false;
    }
};

export const getFCMToken = async () => {
    try {
        if (!messaging) {
            console.error('Firebase messaging not initialized');
            return null;
        }

        // Check if service worker is supported
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.ready;

            const currentToken = await getToken(messaging, {
                vapidKey: VAPID_KEY,
                serviceWorkerRegistration: registration,
            });

            if (currentToken) {
                console.log('FCM Token:', currentToken);
                return currentToken;
            } else {
                console.log('No registration token available. Request permission to generate one.');
                return null;
            }
        } else {
            console.error('Service Worker not supported');
            return null;
        }
    } catch (error) {
        console.error('An error occurred while retrieving token:', error);
        return null;
    }
};

export const onMessageListener = (callback) => {
    if (!messaging) {
        console.error('Firebase messaging not initialized');
        return () => { }; // Return empty unsubscribe function
    }

    // Set up continuous listener
    const unsubscribe = onMessage(messaging, (payload) => {
        console.log('Message received in foreground:', payload);
        if (callback) {
            callback(payload);
        }
    });

    // Return unsubscribe function
    return unsubscribe;
};

export const isNotificationSupported = () => {
    return 'Notification' in window && 'serviceWorker' in navigator;
};

export const getNotificationPermission = () => {
    if (!('Notification' in window)) {
        return 'not-supported';
    }
    return Notification.permission;
};
