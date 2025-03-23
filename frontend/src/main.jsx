import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './donationcenter.css';
import { FormProvider } from './contexts/FormContext';
import { Form2Provider } from './contexts/Form2Context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <FormProvider>
      <Form2Provider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Form2Provider>
    </FormProvider>
  </StrictMode>
);
