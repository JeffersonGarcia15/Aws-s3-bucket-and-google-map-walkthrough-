import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalMenuItem from "./OpenModalMenuItem";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const openMenu = () => {
		if (showMenu) {
			return;
		}
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) {
			return;
		}

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const closeMenu = () => setShowMenu(false);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
		closeMenu();
	};

	const ulClassName = `profile-dropdown${showMenu ? "" : " hidden"}`;

	return (
		<>
			<button onClick={openMenu}>
				<i className="fas fa-user-circle" />
			</button>
			<ul className={ulClassName} ref={ulRef}>
				{user ? (
					<>
						<li>{user.username}</li>
						<li>
							{user.firstName} {user.lastName}
						</li>
						<li>{user.email}</li>
						<li>
							<button onClick={logout}>Log Out</button>
						</li>
					</>
				) : (
					<>
						<OpenModalMenuItem
							itemText="Log In"
							onItemClick={closeMenu}
							modalComponent={<LoginFormModal />}
						/>
						<OpenModalMenuItem
							itemText="Sign Up"
							onItemClick={closeMenu}
							modalComponent={<SignupFormModal />}
						/>
					</>
				)}
			</ul>
		</>
	);
}

export default ProfileButton;
