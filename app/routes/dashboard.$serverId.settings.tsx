import { zodResolver } from '@hookform/resolvers/zod';
import { RoleType } from '@prisma/client';
import { ActionFunctionArgs } from '@remix-run/node';
import { Form as RemixForm, useLoaderData, useSubmit } from '@remix-run/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { ControllerRenderProps, UseFormReturn, useForm } from 'react-hook-form';
import { LoaderFunctionArgs } from 'react-router';
import invariant from 'tiny-invariant';
import { z } from 'zod';
import { getServerSettings, updateServerSettings } from '~/api/guilds.server';
import { getAdminRoles } from '~/api/roles.server';
import AccordionCard from '~/components/AccordionCard';
import CopyButton from '~/components/CopyButton/CopyButton';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Command, CommandGroup, CommandItem } from '~/components/ui/command';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { ShortRole } from '~/lib/api';
import { DEFAULT_PREFIX } from '~/lib/constants';
import { cn } from '~/utils/cn';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.serverId, 'Missing serverId param');
  const [settings, { guildRoles, adminRoles }] = await Promise.all([
    getServerSettings(params.serverId),
    getAdminRoles(params.serverId),
  ]);
  return { settings, guildRoles, adminRoles };
};

const settingsFormSchema = z.object({
  prefix: z.string(),
  roles: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      color: z.string(),
      type: z.string(),
    })
  ),
});

type SettingsFormData = z.infer<typeof settingsFormSchema>;

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.serverId, 'Missing serverId param');
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());

  // FormData values are passed stringified
  if (typeof payload.roles === 'string') {
    payload.roles = JSON.parse(payload.roles);
  }

  try {
    const result = settingsFormSchema.parse(payload);
    return await updateServerSettings(params.serverId, result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten() };
    }
    return { error };
  }
};

const prepareRolesFormData = (allRoles: ShortRole[], formData: ShortRole[]) =>
  allRoles.map((role) => {
    const foundRole = formData.find((data) => data.id === role.id);
    if (foundRole) {
      return {
        ...role,
        type: RoleType.ADMINISTRATOR,
      };
    }

    return {
      ...role,
      type: RoleType.DEFAULT,
    };
  });

export default function GuildSettingsPage() {
  const { settings, guildRoles, adminRoles } = useLoaderData<typeof loader>();
  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      prefix: DEFAULT_PREFIX,
      roles: adminRoles,
    },
  });
  const submit = useSubmit();

  const onSubmit = (data: SettingsFormData) => {
    const preparedRoles = prepareRolesFormData(guildRoles, data.roles);
    const roles = JSON.stringify(preparedRoles);
    submit({ ...data, roles }, { method: 'post' });
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <CopyButton toCopy={settings.id} />
        </div>
        <p className="text-zinc-400">
          Adjust your server's Sakura bot settings.
        </p>
      </div>

      {/* TODO: delete after prod release */}
      {/* <pre className="rounded-md bg-zinc-800 p-4">
        <code className="text-white">
          {JSON.stringify({ ...settings, guildRoles, adminRoles }, null, 2)}
        </code>
      </pre> */}

      <Form {...form}>
        <RemixForm
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-6"
        >
          <AccordionCard
            title="Bot Commands"
            description="Adjust the prefix used to trigger Sakura."
            isOpenByDefault={true}
          >
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="prefix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commands prefix</FormLabel>
                    <FormControl>
                      <Input placeholder="$" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </AccordionCard>
          <AccordionCard
            title="Bot Admins"
            description="Set who can adjust Sakura and give her commands."
            isOpenByDefault={true}
          >
            <div className="grid gap-2">
              <ComboBoxMenuField form={form} values={guildRoles} />
            </div>
          </AccordionCard>
          {form.formState.isDirty && <Button type="submit">Save</Button>}
        </RemixForm>
      </Form>
    </div>
  );
}

type ComboBoxMenuFieldProps = {
  form: UseFormReturn<SettingsFormData, any, undefined>;
  values: ShortRole[];
};

const ComboBoxMenuField = ({ form, values }: ComboBoxMenuFieldProps) => (
  <FormField
    control={form.control}
    name="roles"
    render={({ field }) => (
      <FormItem className="flex flex-col">
        <FormLabel>Administrator Roles</FormLabel>
        <ComboboxDropdownMenu form={form} values={values} field={field} />
        <FormDescription>
          These are the roles that will have bot admin permissions.
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

type ComboboxDropdownMenuProps = {
  form: UseFormReturn<SettingsFormData, any, undefined>;
  field: ControllerRenderProps<SettingsFormData, 'roles'>;
  values: ShortRole[];
};

const ComboboxDropdownMenu = ({
  form,
  field,
  values,
}: ComboboxDropdownMenuProps) => {
  const selectedItems = values.reduce((a: ShortRole[], role) => {
    if (field.value.some((value) => value.id === role.id)) {
      a.push(role);
    }
    return a;
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              'w-[500px] justify-between h-[unset] min-h-10',
              !field.value && 'text-muted-foreground'
            )}
          >
            <div className="flex gap-2 flex-wrap">
              {field.value.length
                ? selectedItems.map((role) => (
                    <Badge
                      key={role.id}
                      style={{ backgroundColor: `#${role.color}` }}
                    >
                      {role.name}
                    </Badge>
                  ))
                : 'Select a role'}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command>
          <CommandGroup>
            {values.map((role) => (
              <CommandItem
                value={role.name}
                key={role.id}
                onSelect={() => {
                  const added = field.value.find(
                    (value) => value.id === role.id
                  );
                  if (added) {
                    const filtered = field.value.filter(
                      (value) => value.id !== added.id
                    );
                    form.setValue('roles', [...filtered], {
                      shouldDirty: true,
                    });
                  } else {
                    form.setValue('roles', [...field.value, role], {
                      shouldDirty: true,
                    });
                  }
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    field.value.find((value) => value.id === role.id)
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
                <Badge
                  key={role.id}
                  style={{ backgroundColor: `#${role.color}` }}
                >
                  {role.name}
                </Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
