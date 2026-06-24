import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import '../mobile.css'
import App from './App.tsx'
import ResumeEdit from './pages/ResumeEdit.tsx'
import CoverLetterEdit from './pages/CoverLetterEdit.tsx'

const path = window.location.pathname;
const isResumeEdit = path.endsWith('/resume-edit');
const isCoverLetterEdit = path.endsWith('/cv-edit');

function Page() {
  if (isResumeEdit) return <ResumeEdit />;
  if (isCoverLetterEdit) return <CoverLetterEdit />;
  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
