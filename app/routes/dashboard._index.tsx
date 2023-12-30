import { LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import MainLayout from '~/components/Wrappers/MainLayout';
import { AppRoutes } from '~/lib/constants';
import { authenticator } from '~/server/auth.server';
import { imageUrlBuilder } from '~/utils/image-url-builder';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: AppRoutes.HOME,
  });
};

export default function DashboardServersPage() {
  const user = useLoaderData<typeof loader>();

  return (
    <MainLayout>
      <div className="relative z-[1] mx-auto mt-10 flex max-w-[948px] flex-col items-center px-10">
        <h1 className="text-5xl font-bold text-white">Select a Server</h1>
        <div className="mb-16 mt-14 grid w-full grid-cols-[1fr_1fr_1fr] gap-10">
          {user.guilds.map(({ id, icon, name }) => (
            <Link key={id} to={`/dashboard/${id}`}>
              <div className="w-full">
                <div className="relative flex h-40 w-full items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 z-[1] scale-[1.4] opacity-30 blur-[10px]"></div>
                  <img
                    className="relative z-[2] h-40 w-40 shrink-0 rounded-full border-2 border-solid border-[#f2f4fb]"
                    src={imageUrlBuilder(id, icon, { resource: 'icons' })}
                    alt={`${name} Logo`}
                  />
                </div>
                <div className="mt-4 flex items-start justify-between">
                  <div className="mr-3">
                    <h3 className="overflow-hidden text-ellipsis p-0 text-center text-base font-bold leading-6 text-[#f2f4fb]">
                      {name}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
