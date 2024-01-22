import { zodResolver } from '@hookform/resolvers/zod';
import { ActionFunctionArgs } from '@remix-run/node';
import {
  Form as RemixForm,
  useActionData,
  useLoaderData,
  useSubmit,
} from '@remix-run/react';
import { useEffect } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { LoaderFunctionArgs } from 'react-router';
import invariant from 'tiny-invariant';
import { z } from 'zod';
import { ShortRole } from '~/api/discord.server';
import {
  ShortGuildChannel,
  getServerChannels,
  getServerSettings,
  updateServerSettings,
} from '~/api/guilds.server';
import { RoleType, getAdminRoles } from '~/api/roles.server';
import AccordionCard from '~/components/AccordionCard';
import CopyButton from '~/components/CopyButton/CopyButton';
import { Icons } from '~/components/icons';
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
import { DEFAULT_PREFIX } from '~/lib/constants';
import { cn } from '~/utils/cn';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.serverId, 'Missing serverId param');
  const [settings, guildRoles, guildChannels] = await Promise.all([
    getServerSettings(params.serverId),
    getAdminRoles(params.serverId),
    getServerChannels(params.serverId),
  ]);
  const adminRolesIds = guildRoles.reduce((a: string[], role) => {
    if (role.type !== RoleType.ADMINISTRATOR) {
      return a;
    }
    a.push(role.id);
    return a;
  }, []);

  const selectedChannelId = String(
    guildChannels.find((channel) => channel.isUpdatesChannel)?.id
  );
  return {
    settings,
    guildRoles,
    adminRolesIds,
    guildChannels,
    selectedChannelId,
  };
};

const settingsFormSchema = z.object({
  prefix: z.string(),
  roles: z.array(z.string()),
  updatesChannel: z.string(),
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

  if (typeof payload.channels === 'string') {
    payload.channels = JSON.parse(payload.channels);
  }

  try {
    const result = settingsFormSchema.parse(payload);
    const data = await updateServerSettings(params.serverId, result);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, data: null, error: error.flatten() };
    }
    return { success: false, data: null, error };
  }
};

const exampleCommands = ['help', 'moderators'];

export default function GuildSettingsPage() {
  const {
    settings,
    guildRoles,
    adminRolesIds,
    guildChannels,
    selectedChannelId,
  } = useLoaderData<typeof loader>();
  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      prefix: DEFAULT_PREFIX,
      roles: adminRolesIds,
      updatesChannel: selectedChannelId,
    },
  });
  const submit = useSubmit();
  const submittedData = useActionData<typeof action>();

  useEffect(() => {
    if (
      form.formState.isSubmitSuccessful &&
      submittedData &&
      submittedData.success
    ) {
      // update defaultValues to save input fields
      form.reset(form.getValues());
    }
  }, [form.formState, submittedData, form.reset]);

  const onSubmit = (data: SettingsFormData) => {
    const roles = JSON.stringify(data.roles);
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
          {JSON.stringify(
            { ...settings, adminRolesIds, selectedChannelId },
            null,
            2
          )}
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
                    <div className="flex gap-2">
                      {exampleCommands.map((cmd) => (
                        <Badge key={cmd} variant="outline">
                          {field.value}
                          <FormDescription>{cmd}</FormDescription>
                        </Badge>
                      ))}
                    </div>
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
              <ComboBoxRoleField form={form} values={guildRoles} />
            </div>
          </AccordionCard>
          <AccordionCard
            title="Updates Channel"
            description="Tell Sakura where to publish new updates."
            isOpenByDefault={true}
          >
            <div className="grid gap-2">
              {/* <FormField
                control={form.control}
                name="updatesChannel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Guild Channels</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a guild channel" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {guildChannels.map(({ id, name }) => (
                          <SelectItem key={id} value={id}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      All bot communicates apart from text and slash commands
                      will appear in this channel.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <ComboBoxChannelsField form={form} values={guildChannels} />
            </div>
          </AccordionCard>
          {form.formState.isDirty && <Button type="submit">Save</Button>}
        </RemixForm>
      </Form>
    </div>
  );
}

type ComboBoxRoleFieldProps = {
  form: UseFormReturn<SettingsFormData, any, undefined>;
  values: ShortRole[];
};

const ComboBoxRoleField = ({ form, values }: ComboBoxRoleFieldProps) => (
  <FormField
    control={form.control}
    name="roles"
    render={({ field }) => (
      <FormItem className="flex flex-col">
        <FormLabel>Administrator Roles</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  'justify-between h-[unset] min-h-10',
                  !field.value && 'text-muted-foreground'
                )}
              >
                <div className="flex gap-2 flex-wrap">
                  {field.value.length
                    ? values
                        .filter((role) => field.value.includes(role.id))
                        .map((role) => (
                          <Badge
                            key={role.id}
                            style={{ backgroundColor: `#${role.color}` }}
                          >
                            {role.name}
                          </Badge>
                        ))
                    : 'Select a role'}
                </div>
                <Icons.chevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="min-w-96 p-0">
            <Command>
              <CommandGroup>
                {values.map((role) => (
                  <CommandItem
                    value={role.name}
                    key={role.id}
                    onSelect={() => {
                      const added = field.value.find(
                        (value) => value === role.id
                      );
                      if (added) {
                        const filtered = field.value.filter(
                          (value) => value !== added
                        );
                        form.setValue('roles', [...filtered], {
                          shouldDirty: true,
                        });
                      } else {
                        form.setValue('roles', [...field.value, role.id], {
                          shouldDirty: true,
                        });
                      }
                    }}
                  >
                    <Icons.check
                      className={cn(
                        'mr-2 h-4 w-4',
                        field.value.find((value) => value === role.id)
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
        <FormDescription>
          These are the roles that will have bot admin permissions.
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

type ComboBoxChannelsFieldProps = {
  form: UseFormReturn<SettingsFormData, any, undefined>;
  values: ShortGuildChannel[];
};

const ComboBoxChannelsField = ({
  form,
  values,
}: ComboBoxChannelsFieldProps) => (
  <FormField
    control={form.control}
    name="updatesChannel"
    render={({ field }) => (
      <FormItem className="flex flex-col">
        <FormLabel>Administrator Roles</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  'justify-between h-[unset] min-h-10',
                  !field.value && 'text-muted-foreground'
                )}
              >
                <div className="flex gap-2 flex-wrap">
                  {field.value.length
                    ? values
                        .filter((channel) => field.value === channel.id)
                        .map((channel) => (
                          <div key={channel.id} className="flex items-center">
                            <Icons.hash className="h-4 w-4 mr-1" />
                            {channel.name}
                          </div>
                        ))
                    : 'Select a role'}
                </div>
                <Icons.chevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="min-w-96 p-0">
            <Command>
              <CommandGroup>
                {values.map((channel) => (
                  <CommandItem
                    value={channel.name}
                    key={channel.id}
                    onSelect={() => {
                      form.setValue('updatesChannel', channel.id, {
                        shouldDirty: true,
                      });
                    }}
                  >
                    <Icons.check
                      className={cn(
                        'mr-2 h-4 w-4',
                        channel.id === field.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <div className="flex items-center">
                      <Icons.hash className="h-4 w-4 mr-1" />
                      {channel.name}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <FormDescription>
          These are the roles that will have bot admin permissions.
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);
