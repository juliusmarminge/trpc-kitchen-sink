import { ImageResponse } from '@vercel/og';
import { getFont } from '~/utils/og-fonts';
import { docsParams } from '~/utils/zodParams';

import { Image } from './image';

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

  return new ImageResponse(
    // FIXME: can't use tsx in route handlers for now
    Image({ ...props }),
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
