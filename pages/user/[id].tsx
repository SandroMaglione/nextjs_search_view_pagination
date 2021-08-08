import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ReactElement } from 'react';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import * as t from 'io-ts';
import { ErrorMessage, UserData } from 'app-types';
import { pipe } from 'fp-ts/lib/function';
import { getUserById } from '@actions/actions';
import { useRouter } from 'next/dist/client/router';

interface PageProps {
  userData: E.Either<ErrorMessage, UserData>;
}

export default function UserById({ userData }: PageProps): ReactElement {
  const { back } = useRouter();
  return (
    <div className="mx-14 my-12">
      <div>
        <button type="button" onClick={back}>
          Back
        </button>
      </div>
      {pipe(
        userData,
        E.fold(
          (error) => <span>{error}</span>,
          ({ name, email }) => {
            return (
              <div>
                <h1>{name}</h1>
                <p>{email}</p>
              </div>
            );
          }
        )
      )}
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PageProps>> {
  return pipe(
    t.number.decode(Number.parseInt(context.params?.id as string)),
    TE.fromEither,
    TE.mapLeft(
      () => `Invalid user id (_${context.params?.id}_), please try again`
    ),
    TE.chain(getUserById('https://gorest.co.in/public-api/users/')),
    async (te) =>
      pipe(
        await te(),
        (either): GetServerSidePropsResult<PageProps> => ({
          props: {
            userData: pipe(
              either,
              E.map(({ data }) => data)
            ),
          },
        })
      )
  );
}
