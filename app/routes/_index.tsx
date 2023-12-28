import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { authenticator } from '~/server/auth.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: '/dashboard',
  });

  return user;
};

export default function HomePage() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Welcome to Remix</h1>
      <p>
        <a href="/login">Please log in</a>
      </p>
    </div>
  );
}
