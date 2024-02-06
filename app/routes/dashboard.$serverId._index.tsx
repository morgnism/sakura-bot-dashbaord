import { zodResolver } from '@hookform/resolvers/zod';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import {
  Link,
  isRouteErrorResponse,
  useFetcher,
  useLoaderData,
  useRouteError,
  useSubmit,
} from '@remix-run/react';
import { useForm } from 'react-hook-form';
import invariant from 'tiny-invariant';
import * as z from 'zod';
import {
  EnabledFeatures,
  activateGuild,
  getFeaturesActiveStatuses,
  initiateFeatures,
  setInitialChannels,
  setInitialRoles,
  updateFeatureStatus,
} from '~/api/guilds.server';
import ErrorLayout from '~/components/ErrorLayout';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '~/components/ui/form';
import { Switch } from '~/components/ui/switch';
import { FeatureKeys, FeatureMap } from '~/lib/features';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.serverId, 'Missing serverId param');
  try {
    await activateGuild(params.serverId);
    await initiateFeatures(params.serverId);
    await setInitialRoles(params.serverId);
    await setInitialChannels(params.serverId);
    return await getFeaturesActiveStatuses(params.serverId);
  } catch (error: any) {
    throw new Response(error, {
      status: 500,
    });
  }
};

type MappedFormFields = {
  [key: string]: z.ZodDefault<z.ZodBoolean>;
};

const formFields: MappedFormFields = Object.values(FeatureKeys).reduce(
  (a, name) => ({
    ...a,
    [name]: z.boolean().default(false),
  }),
  {}
);

const configFormSchema = z.object(formFields);

type ConfigFormData = z.infer<typeof configFormSchema>;

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.serverId, 'Missing serverId param');
  const formData = await request.formData();
  const payload: ConfigFormData = {};
  for (let [key, value] of formData.entries()) {
    payload[key] = value === 'true';
  }

  try {
    const result = configFormSchema.parse(payload);
    return updateFeatureStatus(params.serverId, result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten() };
    }
    throw error;
  }
};

const isEnabled = (
  value: any
): value is {
  enabled: boolean;
} => {
  return (
    value &&
    typeof value === 'object' &&
    !(value instanceof Date) &&
    'enabled' in value
  );
};

type FeatureConfigs = {
  name: string;
  enabled: boolean;
};

export const getFeatures = (allSettings: EnabledFeatures): FeatureConfigs[] => {
  const settings = Object.entries(allSettings);
  let configs = [];
  for (let [key, value] of settings) {
    if (isEnabled(value)) {
      configs.push({ name: key, enabled: value.enabled });
    }
  }
  return configs;
};

const mapFeatures = (configs: FeatureConfigs[]) => {
  for (let { name, enabled } of configs) {
    const feature = FeatureMap.get(name);
    if (feature) {
      FeatureMap.set(name, { ...feature, enabled });
    }
  }
  return Array.from(FeatureMap);
};

const mapFormDefaults = (): ConfigFormData => {
  const defaults: ConfigFormData = {};
  for (let [key, value] of FeatureMap.entries()) {
    defaults[key] = value.enabled;
  }
  return defaults;
};

export default function DashboardServerHomePage() {
  const allSettings = useLoaderData<typeof loader>();
  const configs = getFeatures(allSettings);
  const features = mapFeatures(configs);
  const defaults = mapFormDefaults();
  const form = useForm<ConfigFormData>({
    resolver: zodResolver(configFormSchema),
    defaultValues: defaults,
  });
  const submit = useSubmit();
  const fetcher = useFetcher();

  const onSubmit = (data: ConfigFormData) => {
    submit(data, { method: 'post', navigate: false });
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Sakura Modules</h2>
        </div>
        <p className="text-zinc-400">
          Activate the features you need for your bot.
        </p>
      </div>
      <Form {...form}>
        <fetcher.Form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-16 mt-14 grid w-full md:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
            {features.map(([key, feature]) => (
              <FormField
                key={key}
                control={form.control}
                name={key}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-[#27272a] p-4">
                    <div className="space-y-0.5 md:pr-2 pr-0">
                      <FormLabel className="text-base">
                        <Link
                          to={feature.to}
                          className="transition hover:underline"
                        >
                          {feature.label}
                        </Link>
                      </FormLabel>
                      <FormDescription>{feature.description}</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        type="submit"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </fetcher.Form>
      </Form>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorLayout header="Uh oh ...">
        <p>Status: {error.status}</p>
        <p>{error.data || error.data.message}</p>
      </ErrorLayout>
    );
  }

  let errorMessage = 'Unknown error';

  return (
    <ErrorLayout header="Uh oh ...">
      <p>Something went wrong.</p>
      <pre>{errorMessage}</pre>
    </ErrorLayout>
  );
}
