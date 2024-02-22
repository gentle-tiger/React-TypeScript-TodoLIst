import React, { Dispatch, SetStateAction } from 'react'
import './styles.css'
import SingleTodo from './SingleTodo';
import { Todo } from '../model';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
    todos: Todo[],
    setTodos: React.Dispatch<SetStateAction<Todo[]>>,
    completedTodos: Todo[],
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }: Props) => {
    return (
        <div className='container'>
            <Droppable droppableId="TodosList" >
                {(provided, snapshot) => (
                    <div
                        className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="todos__heading">Active Tasks</span>
                        {
                            todos.map((todo, index) => (
                                <SingleTodo
                                    index={index}
                                    key={todo.id}
                                    todo={todo} // todo는 map을 돌면서 주는 것임. useState로 받는 것이 아님.
                                    todos={todos}
                                    setTodos={setTodos}
                                />
                            ))
                        }
                        {provided.placeholder}
                    </div>
                )}

            </Droppable>
            <Droppable droppableId="TodosRemove">
                {(provided, snapshot) => (
                    <div
                        className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete" : ""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="todos__heading">Completed Tasks</span>
                        {
                            completedTodos.map((todo, index) =>
                                <SingleTodo
                                    index={index}
                                    key={todo.id}
                                    todo={todo} // todo는 map을 돌면서 주는 것임. useState로 받는 것이 아님.
                                    todos={completedTodos}
                                    setTodos={setCompletedTodos}
                                />

                            )
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default TodoList
