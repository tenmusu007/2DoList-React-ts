import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";

function App() {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState<Todo[]>([]);
	type Todo = {
		inputValue: string;
		id: number;
		checked: boolean;
	};
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value);
		setInputValue(e.target.value);
	};
	const hasndlerSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newToDo: Todo = {
			inputValue: inputValue,
			id: todos.length,
			checked: false,
		};
		setTodos([newToDo, ...todos]);
    setInputValue("");
	};
	const handleEdit = (id: number, inputValue: string) => {
		const newTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.inputValue = inputValue;
			}
			return todo;
		});
		setTodos(newTodos);
	};
	const handleChecked = (id: number, checked: boolean) => {
		const newTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.checked = !checked;
			}
			return todo;
		});
		setTodos(newTodos);
	};
	const handleDelte = (id: number) => {
		const deleted = todos.filter((todo) => todo.id !== id);
		setTodos(deleted);
	};

	return (
		<div className='App'>
			<div>
				<h2>To do LIst</h2>
				<form onSubmit={(e) => hasndlerSubmit(e)}>
					<input
						type='text'
						onChange={(e) => {
							handleChange(e);
						}}
						className='inputText'
					/>
					<input type='submit' value='submit' className='submitButton' />
				</form>
				<ul className='todoList'>
					{todos.map((todo) => {
						return (
							<li key={todo.id} className='todoList'>
								{/* {todo.inputValue} */}
								<input
									type='text'
									onChange={(e) => {
										handleEdit(todo.id, e.target.value);
									}}
									className='inputText'
									value={todo.inputValue}
									disabled={todo.checked}
								/>
								<input
									type='checkbox'
									onChange={(e) => {
										handleChecked(todo.id, todo.checked);
									}}
								/>
                <button onClick={(e) => handleDelte(todo.id)}>
                  delte
                </button>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

export default App;
