import "./Navigation.css";

import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import ProfileButton from "./ProfileButton-bonus";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/">
					Home
				</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
