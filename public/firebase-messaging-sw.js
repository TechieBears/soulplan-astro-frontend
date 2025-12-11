
importScripts('https://www.gstatic.com/firebasejs/12.6.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.6.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAKSkHF1P7qWtWWKWp4v63opC_Tvk6tiAM",
    authDomain: "soulplan-1.firebaseapp.com",
    projectId: "soulplan-1",
    storageBucket: "soulplan-1.firebasestorage.app",
    messagingSenderId: "788140167949",
    appId: "1:788140167949:web:172d2b95afb9ca5bbc5644",
    measurementId: "G-2KEYCCKWN9"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const processedMessages = new Set();

let backgroundMessageHandlerRegistered = false;

if (!backgroundMessageHandlerRegistered) {
    backgroundMessageHandlerRegistered = true;

    messaging.onBackgroundMessage((payload) => {
        console.log('[firebase-messaging-sw.js] Received background message ', payload);
        console.log('[firebase-messaging-sw.js] Message data:', payload.data);

        const messageId = payload.messageId || payload.fcmMessageId || `msg-${Date.now()}`;

        if (processedMessages.has(messageId)) {
            console.log('[firebase-messaging-sw.js] Duplicate message detected, skipping:', messageId);
            return Promise.resolve();
        }

        processedMessages.add(messageId);

        if (processedMessages.size > 50) {
            const firstId = Array.from(processedMessages)[0];
            processedMessages.delete(firstId);
        }

        console.log('[firebase-messaging-sw.js] Background mode - notification suppressed (only showing in foreground)');

        return Promise.resolve();
    });
}

self.addEventListener('notificationclick', (event) => {
    console.log('[firebase-messaging-sw.js] Notification click received.');
    console.log('[firebase-messaging-sw.js] Notification data:', event.notification.data);

    event.notification.close();

    const urlToOpen = event.notification.data?.click_action ||
        event.notification.data?.url ||
        '/';

    if (event.action) {
        console.log('[firebase-messaging-sw.js] Action clicked:', event.action);
    }

    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then((clientList) => {
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    if (client.url !== urlToOpen) {
                        return client.navigate(urlToOpen).then(() => client.focus());
                    }
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
