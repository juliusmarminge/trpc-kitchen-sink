/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import { getFont } from '~/utils/og-fonts';
import { docsParams } from '~/utils/zod-params';

export const config = {
  runtime: 'edge',
};

export const GET = async (req: Request) => {
  const inter = await getFont({
    family: 'Inter',
    weights: [400, 700, 900] as const,
  });

  const parsed = docsParams.decodeRequest(req);

  if (!parsed.success) {
    return new Response(parsed.error.toString(), { status: 400 });
  }

  const props = parsed.data.input;
  const { hostname } = new URL(req.url);

  return new ImageResponse(
    (
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
          <p tw="text-blue-500 text-3xl">
            {hostname}/{props.slug}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        { name: 'Inter', data: inter[900], weight: 900 },
        { name: 'Inter', data: inter[700], weight: 700 },
        { name: 'Inter', data: inter[400], weight: 400 },
      ],
    },
  );
};
