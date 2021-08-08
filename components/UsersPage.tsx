import { ReactElement } from 'react';
import { map } from 'fp-ts/lib/Array';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { ErrorMessage, UsersResponse } from 'app-types';
import SearchInput from './SearchInput';
import UserCard from './UserCard';
import Pagination from './Pagination';

export default function UsersPage({
  usersList,
}: {
  usersList: E.Either<ErrorMessage, UsersResponse>;
}): ReactElement {
  return (
    <div className="mx-14 my-12">
      <div>
        {pipe(
          usersList,
          E.fold(
            (error) => <span>{error}</span>,
            ({ data, meta }) => {
              return (
                <>
                  <SearchInput />
                  <div className="grid grid-cols-3 gap-20 mt-16">
                    {data.length === 0 ? (
                      <span className="font-light text-sm">
                        No user found...
                      </span>
                    ) : (
                      pipe(
                        data,
                        map((user) => <UserCard key={user.id} user={user} />)
                      )
                    )}
                  </div>
                  {data.length > 0 && (
                    <Pagination pagination={meta.pagination} />
                  )}
                </>
              );
            }
          )
        )}
      </div>
    </div>
  );
}
