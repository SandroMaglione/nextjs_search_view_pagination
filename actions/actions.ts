import { singleUserResponse, usersResponse } from '@validation/validation';
import { ErrorMessage, SingleUserResponse, UsersResponse } from 'app-types';
import axios, { AxiosResponse } from 'axios';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';

const validateUsersResponse = (
  response: AxiosResponse<unknown>
): E.Either<ErrorMessage, UsersResponse> =>
  pipe(
    usersResponse.decode(response.data),
    E.mapLeft(() => 'Error while validating users data')
  );

const validateSingleUserResponse = (
  response: AxiosResponse<unknown>
): E.Either<ErrorMessage, SingleUserResponse> =>
  pipe(
    singleUserResponse.decode(response.data),
    E.mapLeft(() => 'Error while validating user data')
  );

export const getUsers =
  (url: string) =>
  (page: number): TE.TaskEither<ErrorMessage, UsersResponse> =>
    pipe(
      TE.tryCatch(
        () => axios.get(`${url}`, { params: { page } }),
        (error) => `Error while fetching users: ${error}`
      ),
      TE.chain((response) =>
        pipe(response, validateUsersResponse, TE.fromEither)
      )
    );

export const getSearchUser =
  (url: string, page: number) =>
  (name: string): TE.TaskEither<ErrorMessage, UsersResponse> =>
    pipe(
      TE.tryCatch(
        () => axios.get(`${url}`, { params: { page, name } }),
        (error) => `Error while fetching users: ${error}`
      ),
      TE.chain((response) =>
        pipe(response, validateUsersResponse, TE.fromEither)
      )
    );

export const getUserById =
  (url: string) =>
  (id: number): TE.TaskEither<ErrorMessage, SingleUserResponse> =>
    pipe(
      TE.tryCatch(
        () => axios.get(`${url}${id}`),
        (error) => `Error while fetching user with id ${id}: ${error}`
      ),
      TE.chain((response) =>
        pipe(response, validateSingleUserResponse, TE.fromEither)
      )
    );
