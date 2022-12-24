import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';

const List = React.memo(({
    id, 
    title, 
    completed, 
    todoData, 
    setTodoData, 
    provided, 
    snapshot, 
    handleClick
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const handleCompleteChange = (id) => {
        let newTodoData = todoData.map((data) => {
          if(data.id === id) {
            data.completed = !data.completed;
          }
        return data;
        });
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
      };

    const handleEditChange = (event) => {
        setEditedTitle(event.target.value);
    }

    const handleSubmit = (event) => {
        let newTodoData = todoData.map(data => {
            if(data.id === id) {
                data.title = editedTitle;
            }
            return data;
        })
        setTodoData(newTodoData)
        setIsEditing(false);
        localStorage.setItem("todoData", JSON.stringify(newTodoData));
    };

  if(isEditing) {
    return(
        <div className="flex items-center justify-between w-full px-4 py-1 my-1 text-gray-600 bg-gray-100 border rounded">
        <form onSubmit={handleSubmit}>
            <input
                className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
                value={editedTitle}
                onChange={handleEditChange}

            />
        </form>
        <div className="items-center">
            <button
                class="px-4 py-2 float-right"
                onClick={() => setIsEditing(false)}
                type="button"
            >
                x
            </button>
            <button
              onClick = {handleSubmit}
              className="px-4 py-2 float-right"    type="submit"
            >
                save
            </button>
        </div>
    </div>
    )
  } else {
    return (
        <div 
            key={id} 
            {...provided.draggableProps} 
            ref={provided.innerRef} 
            {...provided.dragHandleProps}
            className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}>
            <div className="items-center">
                <input 
                    type="checkbox" 
                    onChange={() => handleCompleteChange(id)} 
                            defaultChecked={completed} 
                />{" "}
                <span className={completed ? "line-through" : undefined}>{title}</span>
            </div>
            <div className="items-center">
                <button 
                  className="px-4 py-2 float-right" onClick={() => handleClick(id)}>
                    <MdDelete />
                </button>
                <button 
                  className="px-4 py-2 float-right" onClick={() => setIsEditing(true)}>
                    Edit
                </button>
            </div>
        </div>


    );
  }
}
);

export default List