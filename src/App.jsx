// Imports order

// React library
// Third party libraries

// Utils

// Custom components

// CSS / SCSS

import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import Login from './components/auth/login/Login';
import Dashboard from './components/library/dashboard/Dashboard';
import ErrorNotFound from './components/error/ErrorNotFound';
import Protected from './components/protected/Protected';
import Register from './components/auth/register/Register';
import { ToastContainer } from 'react-toastify';

const App = () => {

  return (
    <div className='d-flex justify-content-center'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<Protected />}>
            <Route path='/library/*' element={<Dashboard />} />
          </Route>
          <Route path='*' element={<ErrorNotFound />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </div>
  )

}

export default App
