import { NavLink } from 'react-router-dom';

const links = [
  { to: '/account', label: 'Overview', end: true },
  { to: '/account/profile', label: 'Profile' },
  { to: '/account/orders', label: 'My Orders' },
  { to: '/account/addresses', label: 'Addresses' },
  { to: '/wishlist', label: 'Wishlist' },
];

export function AccountNav() {
  return (
    <nav className="account-nav" aria-label="Account navigation">
      <ul role="list">
        {links.map(l => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              end={l.end}
              className={({ isActive }) => `account-nav__link${isActive ? ' account-nav__link--active' : ''}`}
            >
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
