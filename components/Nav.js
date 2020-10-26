import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import SignOut from './SignOut'
import User from './User'
const Nav = () => (

    <NavStyles>
          <Link href="/theaters">
          <a>Shop</a>
          </Link>
            <>
            <Link href="/sell">
            <a>Sell</a>
            </Link>
            <Link href="/orders">
            <a>Orders</a>
            </Link>
            <Link href="/me">
            <a>Account</a>
            </Link>
            <SignOut />
            </>


            <>
            <Link href="/signup">
            <a>Sign In</a>
            </Link>
            </>
        </NavStyles>)

export default Nav;
