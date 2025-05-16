import { BrowserRouter, Route, Routes } from 'react-router'
import { ThemeProvider } from './components/ui/theme-provider'

import Home from './routes/home'
import Note from './routes/noteDetail'
import NewNote from './routes/newNote' 
import Layout from './assets/layouts/layout'
function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path=':id' element={<Note />} />
            <Route path='new' element={<NewNote />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
