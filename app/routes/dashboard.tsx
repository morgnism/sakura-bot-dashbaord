import { LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { AppRoutes } from '~/lib/constants';
import { authenticator } from '~/server/auth.server';

export let loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: AppRoutes.LOGOUT,
  });

  return { user };
};

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Welcome {user.displayName}!</h1>
      <p>This is a protected page</p>
      <Form action="/logout" method="post">
        <button>Logout</button>
      </Form>
      <ul>
        {user.guilds.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
