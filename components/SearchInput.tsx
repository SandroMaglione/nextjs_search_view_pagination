import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { ReactElement, useState } from 'react';

export default function SearchInput(): ReactElement {
  const { push } = useRouter();
  const [name, setName] = useState<string>('');
  const searchUrl = name.length > 0 ? `/search/1/${name}` : '/';
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="name" className="font-medium text-gray-800 text-sm">
        Search user by name
      </label>
      <div className="flex">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Write user name"
          className="px-6 py-2 border focus:outline-none border-gray-200 rounded-l-2xl bg-gray-50"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              push(searchUrl);
            }
          }}
        />
        <Link href={searchUrl}>
          <a className="bg-indigo-600 flex items-center justify-center text-white px-8 hover:bg-indigo-500 py-2 font-extrabold rounded-r-2xl">
            Search
          </a>
        </Link>
      </div>
    </div>
  );
}
