declare module 'app-types' {
  import('@validation/validation');
  import('io-ts');
  import { TypeOf } from 'io-ts';
  import {
    usersResponse,
    singleUserResponse,
    userData,
    paginationResponse,
  } from '@validation/validation';

  type ErrorMessage = string;

  type PaginationResponse = TypeOf<typeof paginationResponse>;
  type UserData = TypeOf<typeof userData>;
  type UsersResponse = TypeOf<typeof usersResponse>;
  type SingleUserResponse = TypeOf<typeof singleUserResponse>;
}
