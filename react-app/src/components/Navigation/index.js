import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
import './Navigation.css';
import { logout } from '../../store/session';

function Navigation({ isLoaded }){
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user);

	const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
    }

	return (
		<ul className='nav-bar'>
			<div className='nav-home'>
				<NavLink exact to="/"><img src="/spongeebob.png" alt="HOME" /></NavLink>
				<a><h1><NavLink exact to="/">(Home)</NavLink></h1></a>
				{/* <NavLink exact to="/login">Login</NavLink>
				<NavLink exact to="/signup">Signup</NavLink> */}
			</div>
			{isLoaded && sessionUser && (
				<div className='nav-logout'>
					{/* <ProfileButton user={sessionUser} /> */}
					<button onClick={handleLogout}>Log Out</button>
				</div>
			)}
		</ul>
	);
}

export default Navigation;
