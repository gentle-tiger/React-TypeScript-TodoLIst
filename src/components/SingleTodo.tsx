import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model'
import { MdDone } from "react-icons/md";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import './styles.css'
import TodoList from './TodoList';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
    index: number;
    todo: Todo, //model.ts를 직접 import 해줌.
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}


const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {

    const [edit, setEdit] = useState<boolean>(false); // 편집모드가 켜져 있는지 여부에 관계없이 트랙을 유지(편집용)
    const [editTodo, setEditTodo] = useState<string>(todo.todo); // 편집기의 값을 유지함 (사용자가 클릭시 todo.todo로 이동함.)

    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)
        )
    }
    const handleDelete = (id: number) => {
        setTodos(
            todos.filter((todo) =>
                todo.id !== id ? { ...todo } : undefined
                // todo.id !== id  // teacher
            ))
    }

    const handleEdit = (e: React.FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault(); // 화면이 새로 고쳐지지 않게.
        setTodos(
            todos.map((todo) => (
                todo.id === id ? { ...todo, todo: editTodo } : todo // editTodo는 input의 value임.
            ))
        )
        setEdit(!edit); // 화면 원상복귀
    }
    // input에 focus 해주기.
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided, snapshot) => (
                <form
                    className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
                    onSubmit={(e) => handleEdit(e, todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {/* span 태그, 즉 할일이 작성되어 있는 곳 */}
                    {edit ? (
                        <input
                            ref={inputRef}
                            value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className='todos__single--text' /> // todo.todo 그 자치를 넣음. 
                    ) :
                        todo.isDone ?
                            (<s className="todos__single--text">{todo.todo}</s>) : // 스트라이크 태그 
                            (<span className="todos__single--text">{todo.todo}</span>)
                    }


                    <div className='icons'>
                        <span
                            className="icon"
                            onClick={() => {
                                if (!edit && !todo.isDone) { // 사용자가클릭을 했을 때 편집을 하고 있지 않으며(!edit), todo가 완료되지 않았을 때(!todo.isDone)
                                    setEdit(!edit) // edit를 반전시켜 편집상태를 활성화합니다.  
                                }
                            }}><AiFillEdit />
                        </span>
                        <span className="icon" onClick={() => handleDelete(todo.id)}><MdDone /></span>
                        <span className="icon" onClick={() => handleDone(todo.id)} > <AiFillDelete /></span >
                    </div >
                </form >
            )}
        </Draggable>
    )
}

export default SingleTodo
