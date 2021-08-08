import { ReactElement, useState } from 'react';
import { map } from 'fp-ts/lib/Array';
import Link from 'next/link';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { ErrorMessage, UsersResponse } from 'app-types';
import { getPaginationPages } from 'computations/pagination';

export default function UsersPage({
  usersList,
}: {
  usersList: E.Either<ErrorMessage, UsersResponse>;
}): ReactElement {
  const [name, setName] = useState<string>('');
  return (
    <div className="mx-14 my-12">
      <div>
        {pipe(
          usersList,
          E.fold(
            (error) => <span>{error}</span>,
            ({ data, meta }) => {
              return (
                <div>
                  <div>
                    <label htmlFor="name">Search user by name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Write user name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Link href={`/search/1/${name}`}>
                      <a>Search</a>
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-20 mt-8">
                    {pipe(
                      data,
                      map((user) => {
                        return (
                          <div key={user.id}>
                            <h3>{user.name}</h3>
                            <p>{user.email}</p>
                            <Link href={`/user/${user.id}`}>
                              <a>View user</a>
                            </Link>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div className="flex flex-wrap">
                    {pipe(
                      getPaginationPages(meta.pagination),
                      map((n) => (
                        <Link key={n} href={`/page/${n}`}>
                          <a
                            className={`${
                              n === meta.pagination.page
                                ? 'bg-indigo-300'
                                : 'bg-gray-100 hover:bg-gray-200'
                            } p-4 text-sm font-bold border border-gray-200 shadow`}
                          >
                            {n}
                          </a>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              );
            }
          )
        )}
      </div>
    </div>
  );
}
