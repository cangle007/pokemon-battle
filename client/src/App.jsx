import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { setupStore } from './redux/setupStore';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Loader from '../src/components/Loader/Loader';
import MainContainer from '../src/containers/MainContainer';

const store = setupStore(); // Initialize the store

const App = () => {
  return (
    <div className='App'>
      <Provider store={store}>
        <Suspense fallback={<Loader />}>
          <Router basename={import.meta.env.BASE_URL}>
            <Routes>
              <Route path='/' element={<MainContainer />} />
            </Routes>
          </Router>
        </Suspense>
      </Provider>
    </div>
  );
};

export default App;
