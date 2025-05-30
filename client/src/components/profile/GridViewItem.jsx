import { useDraggable } from "@dnd-kit/core"

const GridViewItem = ({ id, x, y, isDragging}) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })

    const style = {
        position: "absolute",
        left: x,
        top: y,
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : "none",
        backgroundColor: isDragging ? "gray" : "transparent",
        cursor: isDragging ? "grabbing" : "grab",
        boxShadow: isDragging
            ? "0 8px 25px rgba(0,0,0,0.3)"
            : "0 4px 12px rgba(0,0,0,0.15)",
        transition: isDragging ? "none" : "all 0.1s ease",
        zIndex: isDragging ? 1000 : 1
    }

    return (
        <div ref={setNodeRef} className="gridViewItem" style={style} {...attributes} {...listeners}>
            <h3>{id}</h3>
            <p>Some content...</p>
        </div>
    )
}

export default GridViewItem