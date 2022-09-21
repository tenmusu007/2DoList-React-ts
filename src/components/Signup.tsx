import React, { useRef, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { action } from "../redux/slice";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
const SignupStyled = styled.section`
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
	.errMsg {
		color: #f94b68;
		font-size: 1rem;
		font-weight: 400;
	}
`;

const Signup: React.FC = () => {
	const { info } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const mailRef = useRef<HTMLInputElement>(null!);
	const passwordRef = useRef<HTMLInputElement>(null!);
	const [userInfo, setUserInfo] = useState<User[]>([]);
	const [warn, setWarn] =useState<boolean>(false)
	console.log("store", info);

	type User = {
		email: string;
		password: string;
	};
	console.log(userInfo[0]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const email: string = mailRef.current?.value;
		const password: string = passwordRef.current?.value;
		console.log(typeof email, typeof password);

		const newUser: User = {
			email: email,
			password: password,
		};
		console.log("signup", newUser);
		dispatch(action.register(newUser));
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);
				navigate("/")
				// ...
			})
			.catch((error) => {
setWarn(true)
				const errorCode = error.code;
				const errorMessage = error.message;
				// ..
			});
		setUserInfo([newUser]);
	};
	return (
		<SignupStyled>
			<h2>Sign up</h2>
			<form onSubmit={handleSubmit}>
				{warn && (
					<p className='errMsg'>password need to be more than 6 letters</p>
				)}
				<div>
					<input type='email' ref={mailRef} placeholder={"email"} />
				</div>
				<div>
					<input type='password' ref={passwordRef} placeholder={"password"} />
				</div>
				<div className='btnBox'>
					<button className='Btn'>Sign up</button>
					<Link to={"/"}>
						<button className='Btn'>Login</button>
					</Link>
				</div>
			</form>
		</SignupStyled>
	);
};

export default Signup;
