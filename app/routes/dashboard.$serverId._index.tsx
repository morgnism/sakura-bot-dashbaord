import { zodResolver } from '@hookform/resolvers/zod';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { useFetcher, useLoaderData, useSubmit } from '@remix-run/react';
import { useForm } from 'react-hook-form';
import invariant from 'tiny-invariant';
import * as z from 'zod';
import { getFeatures, updateFeature } from '~/api/guilds.server';
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
import { FeatureConfigs } from '~/type';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.serverId, 'Missing serverId param');
  return await getFeatures(params.serverId);
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
    return updateFeature(params.serverId, result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten() };
    }
    return { error };
  }
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
  const configs = useLoaderData<typeof loader>();
  const features = mapFeatures(configs);
  const defaults = mapFormDefaults();
  const form = useForm<ConfigFormData>({
    resolver: zodResolver(configFormSchema),
    defaultValues: defaults,
  });
  const submit = useSubmit();
  const fetcher = useFetcher();

  const onSubmit = (data: ConfigFormData) => {
    submit(data, { method: 'post' });
  };

  return (
    <div className="px-4 md:px-6 lg:px-8">
      <div>
        <h3 className="mb-4 text-lg font-medium">DashboardServerHomePage</h3>
      </div>
      <Form {...form}>
        <fetcher.Form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-16 mt-14 grid w-full md:grid-cols-3 grid-cols-2 gap-10">
            {features.map(([key, feature]) => (
              <FormField
                key={key}
                control={form.control}
                name={key}
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start lg:flex-row lg:items-center justify-between rounded-lg border border-[#27272a] p-4">
                    <div className="space-y-0.5 pr-2 md:pr-0">
                      <FormLabel className="text-base">
                        {feature.label}
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
