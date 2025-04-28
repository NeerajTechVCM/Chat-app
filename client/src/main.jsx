import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './Context/AuthProvider'
import SearchProvider from './Context/SearchUserContext'
import SocketProvider from './Context/SocketContext'
import TypingProvider from './Context/TypingContext'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <SearchProvider>
        <TypingProvider>
          <SocketProvider>
            <ChakraProvider>
              <App />
            </ChakraProvider>

          </SocketProvider>
        </TypingProvider>


      </SearchProvider>

    </AuthProvider>
    </BrowserRouter>
      );
