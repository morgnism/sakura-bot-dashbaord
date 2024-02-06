import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import MainLayout from '~/components/MainLayout';
import appScreenshot from '~/images/app-screenshot.png';
import { authenticator } from '~/server/auth.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await authenticator.isAuthenticated(request);
};

export default function HomePage() {
  return (
    <MainLayout>
      <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
        <section className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 md:pb-32 lg:flex lg:px-6 lg:py-40">
            <div className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-white md:text-6xl">
                Your Ultimate Discord Bot Companion
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#d1d5db]">
                Welcome to Sakura, the premier Discord bot designed to elevate
                your server experience to new heights. You unlock a world of
                fun, engagement, and seamless communication within your Discord
                community.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  to="/dashboard"
                  className=" rounded-md bg-[#6366f1] px-[0.875rem] py-[0.625rem] text-sm font-semibold text-white shadow-sm hover:bg-[hsl(239,84%,67%)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f46e5]"
                >
                  Add to Discord
                </Link>
                {/* <Link
                  to="#"
                  className="text-sm font-semibold leading-6 text-white"
                >
                  Explore Features
                </Link> */}
              </div>
            </div>
            <div className="mx-auto mt-16 flex max-w-2xl md:ml-10 md:mt-24 lg:ml-32 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none">
              <div className="max-w-3xl flex-none md:max-w-5xl lg:max-w-none">
                <img
                  src={appScreenshot}
                  alt="App screenshot"
                  width="2432"
                  height="1442"
                  className="w-[76rem] rounded-md border border-zinc-400"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
