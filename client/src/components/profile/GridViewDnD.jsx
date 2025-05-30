import {closestCenter, DndContext, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {useState} from "react";
import './GridView.css'
import GridViewItem from "./GridViewItem.jsx";

const initialItems = {
    item1: { id: "item1", content: "C Language", x: 50, y: 50 },
    item2: { id: "item2", content: "Python", x: 200, y: 50 },
    item3: { id: "item3", content: "Linux", x: 350, y: 50 },
    item4: { id: "item4", content: "Javascript", x: 50, y: 160 },
    item5: { id: "item5", content: "React", x: 200, y: 160 },
    item6: { id: "item6", content: "Node.js", x: 350, y: 160 },
};

function GridViewDnD(props) {
    const [fields, setFields] = useState(initialItems);
    const [activeId, setActiveId] = useState(null);
    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 8, // Require 8px of movement before dragging starts
        },
    }));

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    // TODO vymysliet velkosti
    const handleDragEnd = (event) => {
        const { delta, active } = event;
        setActiveId(null);

        setFields((prev) => {
            const item = prev[active.id];
            if (!item) return prev;

            // Calculate new position with boundary checking
            const containerWidth = 800; // Adjust based on your container
            const containerHeight = 600;
            const itemWidth = 120;
            const itemHeight = 80;

            let newX = Math.max(0, Math.min(item.x + delta.x, containerWidth - itemWidth));
            let newY = Math.max(0, Math.min(item.y + delta.y, containerHeight - itemHeight));

            return {
                ...prev,
                [active.id]: {
                    ...item,
                    x: newX,
                    y: newY,
                },
            };
        });
    };

    const handleDragCancel = () => {
        setActiveId(null);
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragCancel={handleDragCancel} onDragEnd={handleDragEnd}>
            <div className="dashed-grid">
                {Object.values(fields).map((field) => (
                    <GridViewItem key={field.id} id={field.id} x={field.x} y={field.y} content={field.content} isDragging={activeId === field.id} />
                ))}
            </div>
        </DndContext>
    )
}

export default GridViewDnD;