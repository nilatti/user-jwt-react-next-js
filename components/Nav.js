import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import SignOut from './SignOut'
import User from './User'
const Nav = () => (
  <User>
        {({data: {me}}) => (

          <NavStyles>
            <Link href="/items">
            <a>Shop</a>
            </Link>
            { me && (
              <>

              <Link href="/sell">
              <a>Sell</a>
              </Link>
              <Link href="/orders">
              <a>Orders</a>
              </Link>
              <Link href="/me">
              <a>Welcome, {me.email}</a>
              </Link>
              <SignOut />
              </>
            )}
            { !me && (
              <>
              <Link href="/signup">
              <a>Sign In</a>
              </Link>
              </>
            )}
          </NavStyles>
        )}
      </User>)

export default Nav;
