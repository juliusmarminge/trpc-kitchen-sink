/* eslint-disable @next/next/no-img-element */

// FIXME: can't use tsx in route handlers for now
export const Image = (props: {
  title: string;
  description: string;
  url: string;
}) => (
  <div tw="bg-zinc-900 h-full w-full text-white bg-cover flex flex-col p-14">
    <img
      src="https://assets.trpc.io/www/og-pattern-dark.svg"
      alt="background"
      tw="absolute"
    />
    <div tw="flex flex-col justify-center items-center w-full h-full">
      <img
        src="https://assets.trpc.io/icons/svgs/blue-bg-rounded.svg"
        width="100px"
        height="100px"
        alt="tRPC logo"
      />
      <h1 tw="text-6xl pt-3">{props.title}</h1>
      <p tw="text-center text-3xl text-zinc-300">{props.description}</p>
      <p tw="text-blue-500 text-3xl">{props.url}</p>
    </div>
  </div>
);
