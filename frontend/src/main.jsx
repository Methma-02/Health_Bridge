import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FormProvider } from './contexts/FormContext';
import { Form2Provider } from './contexts/Form2Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FormProvider>
    <Form2Provider>
    <App />
    </Form2Provider>
    </FormProvider>
  </React.StrictMode>
);
