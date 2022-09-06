import Login from "./components/Login";
import Signup from "./components/Signup";
import TodoList from "./components/TodoList";
import { Provider, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import store from "./redux/store";
import {
	BrowserRouter,
	Navigate,
	Route,
	Router,
	Routes,
} from "react-router-dom";

function App() {
	const { info } = useSelector((state: RootState) => state.user);

	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={info.login ? <Navigate to={"/todo"} /> : <Login />}
					/>
					<Route
						path='/signup'
						element={info.login ? <Navigate to={"/todo"} /> : <Signup />}
					/>
					<Route path='/todo' element={<TodoList />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
