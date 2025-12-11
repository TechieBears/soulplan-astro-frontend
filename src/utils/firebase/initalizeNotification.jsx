import {
    requestNotificationPermission,
    getFCMToken,
    onMessageListener,
    isNotificationSupported,
    getNotificationPermission
} from './fcmService'

/**
 * Initialize Firebase Cloud Messaging notifications
 * This function handles everything automatically:
 * 1. Checks if notifications are supported
 * 2. Requests permission if not granted
 * 3. Gets FCM token
 * 4. Sets up foreground message listener
 *
 * Call this function once in your App.jsx useEffect
 */
export const initializeNotifications = async () => {
    try {
        // Step 1: Check if notifications are supported
        if (!isNotificationSupported()) {
            console.warn('⚠️ Push notifications are not supported in this browser.')
            return
        }

        console.log('📱 Initializing push notifications...')

        // Step 2: Check current permission status
        let permission = getNotificationPermission()
        console.log('📋 Current permission status:', permission)

        // Step 3: Request permission if not granted
        if (permission !== 'granted') {
            console.log('🔔 Requesting notification permission...')
            const granted = await requestNotificationPermission()

            if (!granted) {
                console.log('❌ Notification permission denied by user.')
                return
            }

            permission = getNotificationPermission()
            console.log('✅ Notification permission granted!')
        } else {
            console.log('✅ Notification permission already granted!')
        }

        // Step 4: Get FCM token
        console.log('🔑 Getting FCM token...')
        const fcmToken = await getFCMToken()

        if (fcmToken) {
            console.log('✅ FCM Token obtained successfully:', fcmToken)
            // You can store this token or send it to your backend here
        } else {
            console.warn('⚠️ Failed to get FCM token. Permission might not be granted.')
            return
        }

        // Step 5: Set up foreground message listener
        console.log('👂 Setting up foreground message listener...')
        const unsubscribe = onMessageListener((payload) => {
            console.log('📨 Foreground message received:', payload)

            if (Notification.permission === 'granted') {
                const messageId = payload.messageId || payload.fcmMessageId || `msg-${Date.now()}`
                const notificationTitle = payload.notification?.title || payload.data?.title || 'New Notification'
                const notificationBody = payload.notification?.body || payload.data?.body || 'You have a new message'

                new Notification(notificationTitle, {
                    body: notificationBody,
                    icon: payload.notification?.icon || payload.data?.icon || '/vite.svg',
                    badge: '/vite.svg',
                    tag: `fcm-${messageId}`,
                    renotify: false,
                    requireInteraction: false,
                    data: {
                        ...payload.data,
                        messageId: messageId,
                        click_action: payload.data?.click_action || payload.fcmOptions?.link || '/',
                        originalPayload: JSON.stringify(payload)
                    },
                    image: payload.notification?.image || payload.data?.image,
                    timestamp: Date.now()
                })
            }
        })

        console.log('✅ Push notifications initialized successfully!')

        // Return unsubscribe function in case you need to clean up
        return unsubscribe
    } catch (error) {
        console.error('❌ Error initializing notifications:', error)
    }
}

export default initializeNotifications
