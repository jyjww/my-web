import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import '../mobile.css'
import App from './App.tsx'
import ResumeEdit from './pages/ResumeEdit.tsx'

const isEditPage = import.meta.env.DEV && window.location.pathname === '/resume-edit';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isEditPage ? <ResumeEdit /> : <App />}
  </StrictMode>,
)
