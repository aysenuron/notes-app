import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ThemeProvider } from './components/ui/theme-provider'

import Home from './routes/home'
import Layout from './assets/layouts/layout'
function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
