import { PaginationResponse } from 'app-types';
import { getPaginationPages } from 'computations/pagination';
import { mapWithIndex } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import Link from 'next/link';
import { ReactElement } from 'react';

export default function Pagination({
  pagination,
}: {
  pagination: PaginationResponse;
}): ReactElement {
  const pageList = getPaginationPages(pagination);
  return (
    <div className="flex flex-wrap mt-12">
      {pipe(
        pageList,
        mapWithIndex((i, n) => (
          <Link key={n} href={`/page/${n}`}>
            <a
              className={`${
                n === pagination.page
                  ? 'bg-indigo-500 text-white font-black'
                  : 'bg-gray-100 font-extrabold hover:bg-gray-200'
              } ${
                i === 0
                  ? 'rounded-l-2xl'
                  : i === pageList.length - 1
                  ? 'rounded-r-2xl'
                  : ''
              } px-6 py-5 text-sm border border-gray-200 shadow`}
            >
              {n}
            </a>
          </Link>
        ))
      )}
    </div>
  );
}
