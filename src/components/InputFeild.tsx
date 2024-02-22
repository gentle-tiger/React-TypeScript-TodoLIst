import React, { useRef } from 'react';
import './styles.css';
interface Props {
    todo: string | undefined;
    setTodo: React.Dispatch<React.SetStateAction<string | undefined>>
    handleAdd: (e: React.FormEvent) => void;
}


// Generic type  
// FC? : Function Componemt 로 React,TypeScript를 조합하여 개발할 때 사용하는 타입.(함수형)
const InputFeild: React.FC<Props> = ({ todo, setTodo, handleAdd }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null); // inputElement

    return (
        <form className='input' onSubmit={(e) => {

            handleAdd(e)
            inputRef.current?.blur(); // Enter쳤을 때 텍스트 입력에서 포커스를 제거.
            // useRef를 사용하여 input 요소에 대한 ref를 생성하고, 해당 요소가 특정 조건에 따라 blur()메서드를 호출하여 포커스를 제거하도록 합니다. 
        }}>
            <input
                ref={inputRef}
                type="input"
                value={todo}
                onChange={e => setTodo(e.target.value)}
                placeholder='Enter a task' className="input_box"
            />
            <button className='input__submit' type='submit'>Go</button>
        </form>
    )
}

export default InputFeild
