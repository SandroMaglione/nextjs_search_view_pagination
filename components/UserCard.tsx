import { UserData } from 'app-types';
import Link from 'next/link';
import { ReactElement } from 'react';

export default function UserCard({ user }: { user: UserData }): ReactElement {
  return (
    <div className="flex flex-col gap-6 border border-gray-200 px-12 py-10 bg-gray-50 shadow rounded-2xl">
      <div className="flex-1">
        <h3 className="font-bold text-2xl text-gray-900 tracking-wide">
          {user.name}
        </h3>
        <p className="mt-1 text-sm font-light text-gray-900">{user.email}</p>
      </div>
      <div className="flex-none">
        <Link href={`/user/${user.id}`}>
          <a className="font-extrabold bg-indigo-400 hover:bg-indigo-500 block py-2 rounded-2xl text-white text-center">
            View user
          </a>
        </Link>
      </div>
    </div>
  );
}
