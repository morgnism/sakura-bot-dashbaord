import { zodResolver } from '@hookform/resolvers/zod';
import { RoleAction } from '@prisma/client';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import {
  Form as RemixForm,
  useActionData,
  useLoaderData,
  useSubmit,
} from '@remix-run/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import invariant from 'tiny-invariant';
import { z } from 'zod';
import { AutoRole } from '~/api/discord.server';
import {
  NonDefaultAutoRole,
  getAllRoles,
  saveAutoRole,
} from '~/api/roles.server';
import DataTable from '~/components/DataTable';
import { AutoRoleColumns } from '~/components/DataTable/Columns';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
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
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { cn } from '~/utils/cn';
import { titleCase } from '~/utils/title-case';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.serverId, 'Missing serverId param');
  const { allRoles, autoRoles } = await getAllRoles(params.serverId);
  return { allRoles, autoRoles };
};

const RoleActionState: [string, string] = [RoleAction.ADD, RoleAction.REMOVE];

const autorolesFormSchema = z.object({
  role: z.string(), // role id
  action: z.enum(RoleActionState),
  delay: z.number(),
});

type AutorolesFormData = z.infer<typeof autorolesFormSchema>;

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.serverId, 'Missing serverId param');
  const formData = await request.formData();
  const formEntries = Object.fromEntries(formData.entries());
  const payload = {
    ...formEntries,
    delay: Number(formEntries.delay),
  };

  try {
    const result = autorolesFormSchema.parse(payload);
    const data = await saveAutoRole(params.serverId, result);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, data: [], error: error.flatten() };
    }
    return { success: false, data: [], error };
  }
};

export default function AutoRolePage() {
  const { allRoles, autoRoles } = useLoaderData<typeof loader>();
  const form = useForm<AutorolesFormData>({
    resolver: zodResolver(autorolesFormSchema),
    defaultValues: {
      role: '',
      action: RoleAction.ADD,
      delay: 0,
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
      form.reset({ ...form.getValues(), role: '' });
    }
  }, [form.formState, submittedData, form.reset]);

  const onSubmit = (data: AutorolesFormData) => {
    submit(data, { method: 'post' });
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Auto Roles</h2>
        </div>
        <p className="text-zinc-400">
          Adjust your server's Sakura bot settings.
        </p>
      </div>

      {/* TODO: delete after prod release */}
      <pre className="rounded-md bg-zinc-800 p-4">
        <code className="text-white">
          {JSON.stringify(
            { autoRoles, isDirty: form.formState.isDirty },
            null,
            2
          )}
        </code>
      </pre>

      <div className="grid w-full sm:grid-cols-2 grid-cols-1 gap-10">
        <Form {...form}>
          <RemixForm
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-6"
          >
            <Card>
              <CardContent className="pt-6 border-zinc-800 grid gap-6">
                <ComboBoxRoleField form={form} values={allRoles} />
                <FormField
                  control={form.control}
                  name="delay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Delay</FormLabel>
                      <FormControl>
                        <Input placeholder="0" {...field} />
                      </FormControl>
                      <FormDescription>
                        Delay to add the role in minutes.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="action"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Autorole action</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {RoleActionState.map((action) => (
                            <FormItem
                              key={action}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={action} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {titleCase(action)}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={!form.formState.isDirty} type="submit">
                  Add to Auto Roles
                </Button>
              </CardContent>
            </Card>
          </RemixForm>
        </Form>
        <DataTable columns={AutoRoleColumns} data={autoRoles} />
      </div>
    </div>
  );
}

type ComboBoxRoleFieldProps = {
  form: UseFormReturn<AutorolesFormData, any, undefined>;
  values: AutoRole[];
};

const ComboBoxRoleField = ({ form, values }: ComboBoxRoleFieldProps) => (
  <FormField
    control={form.control}
    name="role"
    render={({ field }) => {
      const value = values.find((role) => role.id === field.value);

      return (
        <FormItem className="flex flex-col">
          <FormLabel>Available Roles</FormLabel>
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
                    {field.value ? (
                      <Badge
                        key={value?.id}
                        style={{
                          backgroundColor: `#${value?.color}`,
                        }}
                      >
                        {value?.name}
                      </Badge>
                    ) : (
                      'Select a role'
                    )}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                        form.setValue('role', role.id, {
                          shouldDirty: true,
                        });
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          role.id === field.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      <Badge
                        key={role.id}
                        style={{
                          backgroundColor: `#${role.color}`,
                        }}
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
            The role to assigned/removed to members.
          </FormDescription>
          <FormMessage />
        </FormItem>
      );
    }}
  />
);
