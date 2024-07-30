import { forwardRef } from "react"

const Note = forwardRef(({ text, initialPosition, ...p }, ref) => {
    return (
        <div
            ref={ref}
            style={{
                position: 'absolute',
                left: `${initialPosition?.x}px`,
                top: `${initialPosition?.y}px`,
                border: '1px solid black',
                userSelect: 'none',
                padding: '10px',
                width: '200px',
                cursor: 'move',
                backgroundColor: 'lightyellow'
            }}
            {...p}
        >
            📌 {text}
        </div>
    )
})

export default Note