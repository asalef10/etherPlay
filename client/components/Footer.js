import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-white body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <Link
        target='_blank'
          className="flex title-font font-medium items-center md:justify-start justify-center"
          href="/"
        >
          <span className="ml-3 text-xl">EtherPlay</span>
        </Link>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <Link target='_blank' href="https://github.com/asalef10/EtherPlay">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-brand-github"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a11.8 11.8 0 00-6.2 0c-2.5-1.6-3.5-1.3-3.5-1.3a4.2 4.2 0 00-.1 3.2 4.6 4.6 0 00-1.3 3.2c0 4.6 2.8 5.7 5.5 6-.6.6-.6 1.2-.5 2v3.5"></path>
            </svg>
          </Link>
          <Link
            className="ml-3"
            href="https://www.linkedin.com/in/asalef-alena-a043251ba/"
          >
            <svg
              fill="currentColor"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="0"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              ></path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </Link>
          &nbsp; &nbsp;
        </span>
      </div>
    </footer>
  );
}
