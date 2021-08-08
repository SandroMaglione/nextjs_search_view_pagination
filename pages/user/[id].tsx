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
      <div className="flex gap-12 items-center">
        <div>
          <button
            type="button"
            onClick={back}
            className="bg-gray-100 hover:bg-gray-50 h-10 w-10 rounded-full shadow border border-gray-200 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
        </div>
        <div className="border-l border-gray-200 pl-12">
          {pipe(
            userData,
            E.fold(
              (error) => <span>{error}</span>,
              ({ name, email, gender, status }) => {
                return (
                  <>
                    <h1 className="font-black text-3xl text-gray-800 tracking-widest">
                      {name}
                    </h1>
                    <p className="font-light tracking-wide mt-1">{email}</p>
                    <div className="mt-4 flex flex-wrap gap-4">
                      <span
                        className={`${
                          status === 'inactive' ? 'bg-red-500' : 'bg-green-600'
                        } font-bold text-sm text-white px-5 py-2 rounded-3xl`}
                      >
                        {status}
                      </span>
                      <span
                        className={`${
                          gender === 'female' ? 'bg-pink-600' : 'bg-blue-500'
                        } font-bold text-sm text-white  px-5 py-2 rounded-3xl`}
                      >
                        {gender}
                      </span>
                    </div>
                  </>
                );
              }
            )
          )}
        </div>
      </div>
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
