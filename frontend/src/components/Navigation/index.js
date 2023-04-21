import "./Navigation.css";

import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import ProfileButton from "./ProfileButton";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = (
			<li>
				<ProfileButton user={sessionUser} />
			</li>
		);
	} else {
		sessionLinks = (
			<li>
				<OpenModalButton buttonText="Log In" modalComponent={<LoginFormModal />} />
				{/* <NavLink to="/login">Log In</NavLink> */}
				<OpenModalButton buttonText="Sign Up" modalComponent={<SignupFormModal />} />
				{/* <NavLink to="/signup">Sign Up</NavLink> */}
			</li>
		);
	}

	return (
		<ul>
			<li>
				<NavLink exact to="/">
					Home
				</NavLink>
			</li>
			{isLoaded && sessionLinks}
		</ul>
	);
}

export default Navigation;
