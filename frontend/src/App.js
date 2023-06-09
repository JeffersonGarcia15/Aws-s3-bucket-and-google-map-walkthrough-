import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { Switch } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation/Navigation-bonus";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<Route path="/login">
						<LoginFormPage />
					</Route>
					<Route path="/signup">
						<SignupFormPage />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
