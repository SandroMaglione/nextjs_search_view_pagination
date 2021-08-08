import { PaginationResponse } from 'app-types';
import { append } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { last, range, NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';
import * as O from 'fp-ts/Option';

const getInitialPage = (currentPage: number): number =>
  pipe(
    currentPage - 2,
    O.fromPredicate((n) => n > 0),
    O.getOrElse(() => 1)
  );

const getFinalPage =
  (currentPage: number) =>
  (limit: number): number =>
    pipe(
      currentPage + 2,
      O.fromPredicate((n) => n <= limit),
      O.getOrElse(() => limit)
    );

export const getPaginationPages = ({
  limit,
  page,
}: PaginationResponse): NonEmptyArray<number> => {
  const initialPage = getInitialPage(page);
  const finalPage = getFinalPage(page)(limit);
  const pageList = range(initialPage, finalPage);
  return pipe(pageList, last, (n) =>
    n === limit ? pageList : pipe(pageList, append(limit))
  );
};
