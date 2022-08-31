import {
	ChangeEvent,
	FormEvent,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { action, userSlice } from "../redux/slice";
import {
	BrowserRouter,
	Navigate,
	Route,
	Router,
	Routes,
	useNavigate,
} from "react-router-dom";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";
import {
	addDoc,
	collection,
	DocumentData,
	getDocs,
	updateDoc,
	arrayUnion,
	setDoc,
	doc,
	query,
	where,
} from "firebase/firestore";
import { db } from "../components/firebase";
import styled from "styled-components";

import "../App.css";
const TodoListStyled = styled.section`
	a {
		color: black;
		text-decoration: none;
		:hover {
			color: white;
		}
	}
	border-radius: 20px;
	.errMsg {
		color: #f94b68;
		font-size: 1rem;
		font-weight: 400;
	}
	input {
		margin: 10px 0;
		border: none;
		font-size: 15px;
		border-radius: 10px;
		padding: 10px;
		:focus {
			border: none;
		}
	}
	.submitForm {
		display: flex;
		justify-content: space-around;
		align-items: baseline;
	}
	.inputText {
		padding: 10px;
		width: 50%;
		background-color: #3eb489;
	}
	.unInputText {
		padding: 10px;
		width: 50%;
		background-color: white;
	}
	.btnBox {
		display: flex;
		justify-content: space-between;
	}
	.checkbox {
		/* margin-right: 10px; */
	}
	.Btn {
		margin: 20px 0 20px 5px;
		border: none;
		background-color: white;
		padding: 10px;
		font-size: 12px;
		border-radius: 10px;
		:hover {
			background-color: black;
			color: white;
		}
	}
	.dleteBtn {
		border: none;
		background-color: white;
		border-radius: 10px;
		padding: 10px;
		font-size: 12px;
	}
`;
function TodoList() {
	type fromFirebase = {
		data: any;
		docId: string;
	};
	type FirebaseArr = {
		todoArr: any[];
	};
	const { info } = useSelector((state: RootState) => state.user);
	// console.log(info);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState("");
	const [count, setCount] = useState<number>(0);
	const [docId, setDocId] = useState<any>([]);
	const [currentUser, setCurrentUser] = useState<fromFirebase>({
		data: {
			authur: "",
			todoArr: [],
		},
		docId: "",
	});
	const [todos, setTodos] = useState<FirebaseArr>({
		todoArr: [],
	});
	console.log("localUser", currentUser);
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			const users: any = auth.currentUser;
			const getData = async () => {
				const q = query(
					collection(db, "TodoList"),
					where("authur", "==", users.email)
				);
				const querySnapshot = await getDocs(q);
				const newArr: object[] = [];
				querySnapshot.forEach((doc) => {
					newArr.push(doc.data());
					setCurrentUser({ data: doc.data(), docId: doc.id });
					console.log(doc.id, " => ", doc.data());
				});
				if (newArr.length === 0) {
					console.log("no account");
					const Adduser = async () => {
						const docRef = await addDoc(collection(db, "TodoList"), {
							authur: users.email,
							todoArr: [],
						});
					};
					Adduser();
					setCount(count + 1);
				} else {
					console.log("account exsist");
				}
			};
			getData();
			if (users) {
			} else {
			}
		});
	}, [count]);

	const addFirebase = async (newTodo: any) => {
		const docId: any = localStorage.getItem("docId");
		const switchedDocId = JSON.parse(docId);
		try {
			const docRef = await updateDoc(doc(db, "TodoList", currentUser.docId), {
				todoArr: arrayUnion(newTodo),
			});
			setCount(count + 1);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};
	const putFirebase = async (data: object) => {
		try {
			const docRef = await setDoc(doc(db, "TodoList", currentUser.docId), {
				authur: currentUser.data.authur,
				todoArr: data,
			});
			setCount(count + 1);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};
	const hasndlerSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newToDo = {
			inputValue: inputValue,
			id: currentUser.data.todoArr.length,
			checked: false,
		};
		setInputValue("");

		addFirebase(newToDo);
	};
	const handleEdit = (id: number, inputValue: string) => {
		const newTodos = currentUser.data.todoArr.map(
			(todo: { id: number; inputValue: string }) => {
				if (todo.id === id) {
					todo.inputValue = inputValue;
				}
				return todo;
			}
		);
		putFirebase(newTodos);
	};
	const handleChecked = (id: number, checked: boolean) => {
		const newTodos = currentUser.data.todoArr.map(
			(todo: { id: number; checked: boolean }) => {
				if (todo.id === id) {
					todo.checked = !checked;
				}
				return todo;
			}
		);
		putFirebase(newTodos);
	};
	const handleDelte = (id: number) => {
		const deleted = currentUser.data.todoArr.filter(
			(todo: { id: number }) => todo.id !== id
		);
		setTodos(deleted);
		putFirebase(deleted);
	};
	const handleLogout = () => {
		addFirebase(todos.todoArr);
		dispatch(action.logout());
		return navigate("/");
	};

	return (
		<div className='App'>
			<TodoListStyled>
				<div>
					<h2>To do List</h2>
					<h3> currentUser : {currentUser.data.authur}</h3>
					<button onClick={handleLogout} className='Btn'>
						Logout
					</button>
					<form onSubmit={(e) => hasndlerSubmit(e)} className='submitForm'>
						<input
							type='text'
							onChange={(e) => {
								handleChange(e);
							}}
						/>
						<input type='submit' value='submit' className='Btn' />
					</form>
					<ul className='todoList'>
						{currentUser.data.todoArr.map((item: any, index: number) => {
							// console.log(item);
							return (
								<li key={index} className='todoList'>
									<input
										type='text'
										onChange={(e) => {
											handleEdit(item.id, e.target.value);
										}}
										className={item.checked ? "inputText" : "unInputText"}
										value={item.inputValue}
										disabled={item.checked}
									/>
									<input
										type='checkbox'
										onChange={(e) => {
											handleChecked(item.id, item.checked);
										}}
										className='checkbox'
										checked={item.checked}
									/>
									<button
										onClick={(e) => handleDelte(item.id)}
										className='dleteBtn'
									>
										delte
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			</TodoListStyled>
		</div>
	);
}

export default TodoList;
