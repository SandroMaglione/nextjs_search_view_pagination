import { GetServerSidePropsResult } from 'next';
import { ReactElement } from 'react';
import * as E from 'fp-ts/Either';
import { ErrorMessage, UsersResponse } from 'app-types';
import { pipe } from 'fp-ts/lib/function';
import { getUsers } from '@actions/actions';
import UsersPage from '@components/UsersPage';

interface PageProps {
  usersList: E.Either<ErrorMessage, UsersResponse>;
}

export default function Home({ usersList }: PageProps): ReactElement {
  return <UsersPage usersList={usersList} />;
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<PageProps>
> {
  return pipe(
    await getUsers('https://gorest.co.in/public-api/users/')(1)(),
    (either): GetServerSidePropsResult<PageProps> => ({
      props: {
        usersList: either,
      },
    })
  );
}
