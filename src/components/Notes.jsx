import { createRef, useEffect, useRef } from "react"
import Note from "./Note"

const Notes = ({ notes, setNotes }) => {
    const noteRefs = useRef([])
    const determineNewPosition = () => {
        const maxX = window.innerWidth - 250
        const maxY = window.innerHeight - 250
        return {
            x: Math.floor(Math.random() * maxX),
            y: Math.floor(Math.random() * maxY),
        }
    }
    const dragStartHandler = (note, e) => {
        const { id } = note
        const noteRef = noteRefs.current[id].current
        const rect = noteRef.getBoundingClientRect()
        const offsetX = e.clientX - rect.left
        const offsetY = e.clientY - rect.top
        const startPosition = note.position
        const handleMouseMove = e => {
            const newX = e.clientX - offsetX
            const newY = e.clientY - offsetY
            noteRef.style.left = `${newX}px`
            noteRef.style.top = `${newY}px`
        }
        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            const finalRect = noteRef.getBoundingClientRect()
            const newPosition = {
                x: finalRect.left,
                y: finalRect.top
            }
            if (checkForOverlap(id)) {
                noteRef.style.left = `${startPosition.x}px`
                noteRef.style.top = `${startPosition.y}px`
            } else {
                updateNotePosition(id, newPosition)
            }
        }
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }
    const updateNotePosition = (id, newPosition) => {
        const updatedNotes = notes.map(note => note.id === id ? {
            ...note,
            position: newPosition
        }
            :
            note
        )
        setNotes(updatedNotes)
        localStorage.setItem('notes', JSON.stringify(updatedNotes))
    }
    const checkForOverlap = id => {
        const noteRef = noteRefs.current[id].current
        const currentRect = noteRef.getBoundingClientRect()
        return notes.some(note => {
            if (note.id === id) return false
            const otherNoteRef = noteRefs.current[note.id].current
            const otherRect = otherNoteRef.getBoundingClientRect()
            return !(
                currentRect.left > otherRect.right ||
                currentRect.right < otherRect.left ||
                currentRect.top > otherRect.bottom ||
                currentRect.bottom < otherRect.top)
        })
    }
    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || []
        const updatedNotes = notes.map(note => {
            const savedNote = savedNotes.find(n => n.id === note.id)
            if (savedNote) return { ...note, position: savedNote.position }
            else {
                const position = determineNewPosition()
                return { ...note, position }
            }
        })
        setNotes(updatedNotes)
        localStorage.setItem('notes', JSON.stringify(updatedNotes))
    }, [notes.length])
    return (
        <div>
            {notes.map(note => <Note
                initialPosition={note.position}
                key={note.id}
                text={note.text}
                onMouseDown={e => dragStartHandler(note, e)}
                ref={
                    noteRefs.current[note.id]
                        ?
                        noteRefs.current[note.id]
                        :
                        noteRefs.current[note.id] = createRef()
                } />)}
        </div>
    )
}

export default Notes