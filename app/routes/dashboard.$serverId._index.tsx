import { LoaderFunctionArgs, json } from '@remix-run/node';
import invariant from 'tiny-invariant';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.serverId, 'Missing serverId param');
  return json({});
};

export default function DashboardServerHomePage() {
  return <div className="px-4 md:px-6 lg:px-8">DashboardServerHomePage</div>;
}
