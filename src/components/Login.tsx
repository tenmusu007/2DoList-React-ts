import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../components/firebase";
import { action } from "../redux/slice";
import { RootState } from "../redux/store";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LoginStyled = styled.section`
	/* text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100vh; */
	/* background-color: lightcoral; */
	a {
		color: black;
		text-decoration: none;
		:hover{
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
	.inputText {
		padding: 10px;
	}
	.btnBox {
		display: flex;
		justify-content: space-between;

		.Btn {
			margin: 20px 0;
			border: none;
			background-color: white;
			padding: 10px;
			font-size: 15px;
			border-radius: 10px;
			:hover {
				background-color: black;
				color: white;
			}
		}
	}
`;

const Login: React.FC = () => {
	const dispatch = useDispatch();
	const { info } = useSelector((state: RootState) => state.user);
	const [errMsg, setErrMsg] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<Input>({
		email: "",
		password:""
	})
	const mailRef = useRef<HTMLInputElement>(null!);
	const passwordRef = useRef<HTMLInputElement>(null!);
	interface Input{
		email: string;
		password: string;
	}
	type User = {
		email: string;
		password: string;
		login: boolean;
	};
	const handleUserLogin = () => {
		const email: string = mailRef.current?.value;
		const password: string = passwordRef.current?.value;
		setInputValue({email:email, password:password})
	}
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const email: string = mailRef.current?.value;
		const password: string = passwordRef.current?.value;
		const cuurentUser: User = {
			email: email,
			password: password,
			login: true,
		};
		setInputValue(cuurentUser)
		signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			dispatch(action.login(cuurentUser));
			setErrMsg(false);
			// ...
		})
		.catch((error) => {
			console.log("no user");
			setErrMsg(true)
			setInputValue({email: "", password:""})
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};
	return (
		<LoginStyled>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div>
					{errMsg && <p className='errMsg'>This Email dosen't exsit</p>}
					<input
						type='email'
						ref={mailRef}
						// value={inputValue}
						placeholder={"email"}
						value={inputValue.email}
						// value={"tenmusu007@gmail.com"}
						onChange={handleUserLogin}
					/>
				</div>
				<div>
					<input
						type='password'
						ref={passwordRef}
						placeholder={"password"}
						value={inputValue.password}
						// value={"tenmusu007"}
						onChange={handleUserLogin}
					/>
				</div>
				<div className='btnBox'>
					<button className='Btn'>Login</button>
						<Link to={"/signup"}>
					<button className='Btn'>
							Create Account
					</button>
						</Link>
				</div>
			</form>
		</LoginStyled>
	);
};

export default Login;
