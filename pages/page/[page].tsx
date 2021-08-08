import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ReactElement } from 'react';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import * as t from 'io-ts';
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

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PageProps>> {
  return pipe(
    t.number.decode(Number.parseInt(context.params?.page as string)),
    TE.fromEither,
    TE.mapLeft(
      () => `Invalid page number (_${context.params?.page}_), please try again`
    ),
    TE.chain(getUsers('https://gorest.co.in/public-api/users/')),
    async (te) =>
      pipe(
        await te(),
        (either): GetServerSidePropsResult<PageProps> => ({
          props: {
            usersList: either,
          },
        })
      )
  );
}
