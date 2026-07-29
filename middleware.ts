import { next } from '@vercel/functions';

export const config = {
  runtime: 'nodejs',
};

export default function middleware(request: Request) {
  return next({
    headers: {
      'cache-control': 'private, no-store, max-age=0',
    },
  });
}
