import './Navbar.css';

export default function Navbar() {
    return(
        <div>
            <nav>
                <ul>
                    <li>
                        <a href='/'>Home</a>
                    </li>
                    <li>
                        <a href='/login'>Login</a>
                    </li>
                    <li>
                        <a href='/register'>Register</a>
                    </li>
                    <li>
                        <a href='/profile'>Profile</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}