import { Link, InertiaLinkProps } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function NavLink({
  active = false,
  children,
  ...props
}: InertiaLinkProps & { active: boolean }) {
  const [className, setClassName] = useState('');

  useEffect(() => {
    if (active) {
      setClassName('border-indigo-500 text-gray-900');
    } else {
      setClassName(
        'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:text-gray-700 focus:border-gray-300',
      );
    }
  }, []);

  const base =
    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none';

  return (
    <Link {...props} className={`${base} ${className}`}>
      {children}
    </Link>
  );
}
