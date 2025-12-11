import "./App.css";
import { Provider } from 'react-redux';
import store from "./redux/store";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
let persistor = persistStore(store);
import { PrimeReactProvider } from 'primereact/api';
import ProjectRoutes from "./routes/ProjectRoutes";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import gsap from 'gsap';
import { SplitText, ScrollTrigger } from 'gsap/all';
import { useEffect } from "react";
import { initializeNotifications } from './utils/firebase/initalizeNotification';
// import ComingSoonModal from "./components/Modals/ComingSoonModal";

const App = () => {
    gsap.registerPlugin(SplitText, ScrollTrigger);

    useEffect(() => {
        initializeNotifications();
    }, []);
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {/* <ComingSoonModal isVisible={true} /> */}
                    <PrimeReactProvider>
                        <ProjectRoutes />
                    </PrimeReactProvider>
                </PersistGate>

            </Provider>
        </>
    )
}

export default App;
