import { useState } from 'react';
import Notes from './components/Notes';

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: 'fhbhsbgfsdh sfsjnhjfsofsw9qiowb sffusd vsufifsfbshdsd fdifufsbh'
    },
    {
      id: 2,
      text: 'hvwfqwteweqwrewqerwq sfsjnhjfsofsw9qiowb sffusd vsufifsfbshdsd fdifufsbh'
    },
  ])
  return (
    <>
      <Notes notes={notes} setNotes={setNotes} />
    </>
  )
}

export default App