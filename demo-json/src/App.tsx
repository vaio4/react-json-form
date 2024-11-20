import { useState } from 'react';
import './App.css';
import Form from './components/Form';
import './index.css'
function App() {

  const [dark, setDark] = useState(false);

  return (
    <div className={
      dark ? "dark" : ""
    }>
      <Form dark={dark} setDark={setDark} />
    </div>
  )
}

export default App
