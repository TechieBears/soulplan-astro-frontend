import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-calendar/dist/Calendar.css';
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/firebase-messaging-sw.js', {
                scope: '/'
            })
            .then((registration) => {
                console.log('Service Worker registered successfully:', registration.scope)

                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing
                    if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                console.log('New service worker available. Reload to update.')
                            }
                        })
                    }
                })
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error)
            })

        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('Service worker controller changed')
            window.location.reload()
        })
    })
}

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
)
