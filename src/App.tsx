import { useRef, useState } from 'react';
import './App.css';
import InputFeild from './components/InputFeild';
import { Todo } from './model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>(); // input text 창
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const ref = useRef();
  const handleAdd = (e: React.FormEvent) => {
    if (todos.length < 8) {
      e.preventDefault();
      if (todo) { // todos는 배열이기에 배열을 나열한 후 해당 배열에 넣을 객체를 todos의 형식으로 만들어 todos 배열에 담는다. 
        setTodos([...todos, { id: Date.now(), todo, isDone: false }]) // Date.now()메서드는 현재 시간을 반환한다. 
        setTodo(""); // false는 기본값. 
        // console.log(todos, completedTodos);
      }
    } else {
      //  completed todolist를 삭ㄴ제하고 싶은데. 
      }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // todo 목록을 다른 곳으로 이동시키면 destination의 값이 todoRemove 또는 index가 해당 칸의 값으로 바뀐다. 
    // console.log(result);  
    if (!destination) return; // null(움직이지 않았다면) 그대로 종료한다. 

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todos,
      complete = completedTodos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1)
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1)
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add)
    }

    setCompletedTodos(complete);
    setTodos(active);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} >

      <div className="App">
        <span className='heading'>Taskify</span>
        <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos} />
      </div>

    </DragDropContext>
  );
}

export default App;
