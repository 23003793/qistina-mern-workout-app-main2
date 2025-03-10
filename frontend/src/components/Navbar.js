import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {

    const { logout } = useLogout();

    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }

    return (
        <header>
            <div class="container">
                <Link to="/">
                <h1>Welcome to Workout Buddy!💪🏻</h1>
                </Link>

                <nav>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log Out</button>
                        </div>
                    )}
                    { !user && (
                        <div>
                            <Link to="/login">Log In</Link>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;