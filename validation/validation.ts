import * as t from 'io-ts';

export const paginationResponse = t.type({
  total: t.number,
  pages: t.number,
  page: t.number,
  limit: t.number,
});

const metaResponse = t.type({
  pagination: paginationResponse,
});

const userGender = t.union([t.literal('male'), t.literal('female')]);
const userStatus = t.union([t.literal('inactive'), t.literal('active')]);

export const userData = t.type({
  id: t.number,
  name: t.string,
  email: t.string,
  gender: userGender,
  status: userStatus,
});

export const usersResponse = t.type({
  code: t.number,
  meta: metaResponse,
  data: t.array(userData),
});

export const singleUserResponse = t.type({
  code: t.number,
  meta: t.null,
  data: userData,
});
