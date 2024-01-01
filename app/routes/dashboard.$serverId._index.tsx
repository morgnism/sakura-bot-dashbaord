import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { getFeatures, updateFeature } from '~/api/guilds.server';
import ToggleCard from '~/components/ToggleCard';
import { Feature, FeatureMap } from '~/lib/constants';
import { FeatureConfigs } from '~/type';

const mapEnabledFeatures = (configs: FeatureConfigs[]) =>
  configs.reduce((a: Array<Feature & { key: string }>, { name, enabled }) => {
    const feature = FeatureMap.get(name);
    if (feature) {
      a.push({ ...feature, key: name, enabled });
    }
    return a;
  }, []);

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.serverId, 'Missing serverId param');
  return await getFeatures(params.serverId);
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.serverId, 'Missing serverId param');
  const formData = await request.formData();
  return updateFeature(params.serverId, {
    name: formData.get('name') as string,
    enabled: formData.get('enabled') === 'true',
  });
};

export default function DashboardServerHomePage() {
  const configs = useLoaderData<typeof loader>();
  const features = mapEnabledFeatures(configs);

  return (
    <div className="px-4 md:px-6 lg:px-8">
      DashboardServerHomePage
      <div className="mb-16 mt-14 grid w-full grid-cols-[1fr_1fr_1fr] gap-10">
        {features.map(({ key, to, label, enabled }) => (
          <ToggleCard
            key={key}
            name={key}
            to={to}
            label={label}
            enabled={enabled}
          />
        ))}
      </div>
    </div>
  );
}
