import { zodResolver } from '@hookform/resolvers/zod';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import {
  Form as RemixForm,
  useActionData,
  useLoaderData,
  useSubmit,
} from '@remix-run/react';
import { Check, ChevronsUpDown, XCircle } from 'lucide-react';
import { useEffect } from 'react';
import { UseFormReturn, useFieldArray, useForm } from 'react-hook-form';
import invariant from 'tiny-invariant';
import { z } from 'zod';
import { AutoRole } from '~/api/discord.server';
import {
  NonDefaultAutoRole,
  getAllRoles,
  saveAutoRole,
} from '~/api/roles.server';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Command, CommandGroup, CommandItem } from '~/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { ColorMap, ColorNames } from '~/lib/color-map';
import { cn } from '~/utils/cn';
import { titleCase } from '~/utils/title-case';

export const RoleAction = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  DEFAULT: 'DEFAULT',
} as const;

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.serverId, 'Missing serverId param');
  const allRoles = await getAllRoles(params.serverId);
  const autoRoles = allRoles.reduce((a: NonDefaultAutoRole[], role) => {
    if (role.action !== RoleAction.DEFAULT && typeof role.delay === 'number') {
      a.push({
        role: role.id,
        action: role.action,
        delay: role.delay,
      });
    }
    return a;
  }, []);
  return { allRoles, autoRoles };
};

const RoleActionState: [string, string] = [RoleAction.ADD, RoleAction.REMOVE];

const autorolesFormSchema = z.object({
  roles: z.array(
    z.object({
      role: z.string(), // role id
      action: z.enum(RoleActionState),
      delay: z.number(),
    })
  ),
});

type AutorolesFormData = z.infer<typeof autorolesFormSchema>;

const defaultInitialValue = { role: '', action: 'ADD', delay: 0 };
const prepareDefaultValues = (roles?: NonDefaultAutoRole[]) => {
  if (roles && roles.length) {
    return { roles };
  }
  return { roles: [defaultInitialValue] };
};

const RoleActionStates = [
  {
    value: RoleAction.ADD,
    label: titleCase(RoleAction.ADD),
    color: ColorMap.get(ColorNames.Green),
  },
  {
    value: RoleAction.REMOVE,
    label: titleCase(RoleAction.REMOVE),
    color: ColorMap.get(ColorNames.Red),
  },
];

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.serverId, 'Missing serverId param');
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());

  // FormData values are passed stringified
  if (typeof payload.roles === 'string') {
    payload.roles = JSON.parse(payload.roles);
  }

  try {
    const result = autorolesFormSchema.parse(payload);
    const data = await saveAutoRole(params.serverId, result);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, data: { roles: [] }, error: error.flatten() };
    }
    return { success: false, data: { roles: [] }, error };
  }
};

export default function AutoRolePage() {
  const { allRoles, autoRoles } = useLoaderData<typeof loader>();
  const form = useForm<AutorolesFormData>({
    resolver: zodResolver(autorolesFormSchema),
    defaultValues: prepareDefaultValues(autoRoles),
  });

  const { fields, append, remove } = useFieldArray({
    name: 'roles',
    control: form.control,
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
  }, [form.reset, submittedData]);

  const onSubmit = (data: AutorolesFormData) => {
    const roles = JSON.stringify(data.roles);
    submit({ roles }, { method: 'post' });
  };

  const handleAddInput = () => {
    append(defaultInitialValue);
  };

  const handleResetInput = (index: number) => {
    if (index === 0) {
      remove(index);
      handleAddInput();
    } else {
      remove(index);
    }
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
      {/* <pre className="rounded-md bg-zinc-800 p-4">
        <code className="text-white">
          {JSON.stringify(
            { autoRoles, isDirty: form.formState.isDirty },
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
          <Card>
            <CardHeader>
              <CardTitle>Roles List</CardTitle>
              <CardDescription>
                The role to assign to new members or remove from existing
                members. Use a delay time in minutes.
                <br />
                Note: 0 minutes will apply the role immediately.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 border-t border-zinc-800 grid gap-6">
              <FormField
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <div className="grid gap-2">
                      {fields.map((field, i) => (
                        <div key={field.id} className="grid grid-cols-3 gap-6">
                          <ComboBoxRoleField
                            form={form}
                            values={allRoles}
                            index={i}
                          />
                          <ComboBoxRoleActionField form={form} index={i} />
                          <div className="flex justify-between">
                            <FormField
                              control={form.control}
                              name={`roles.${i}.delay`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="0" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              className="rounded-full"
                              onClick={() => handleResetInput(i)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => append(defaultInitialValue)}
                    >
                      Add Role
                    </Button>
                  </FormItem>
                )}
              />
              <Button disabled={!form.formState.isDirty} type="submit">
                Save Auto Roles
              </Button>
            </CardContent>
          </Card>
        </RemixForm>
      </Form>
    </div>
  );
}

type ComboBoxRoleFieldProps = {
  form: UseFormReturn<AutorolesFormData, any, undefined>;
  values: AutoRole[];
  index: number;
};

const ComboBoxRoleField = ({ form, values, index }: ComboBoxRoleFieldProps) => (
  <FormField
    control={form.control}
    name={`roles.${index}.role`}
    render={({ field }) => {
      const value = values.find((role) => role.id === field.value);

      return (
        <FormItem className="flex flex-col">
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
                        form.setValue(`roles.${index}.role`, role.id, {
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
        </FormItem>
      );
    }}
  />
);

type ComboBoxRoleActionFieldProps = {
  form: UseFormReturn<AutorolesFormData, any, undefined>;
  index: number;
};

const ComboBoxRoleActionField = ({
  form,
  index,
}: ComboBoxRoleActionFieldProps) => (
  <FormField
    control={form.control}
    name={`roles.${index}.action`}
    render={({ field }) => {
      const action = RoleActionStates.find(
        (action) => action.value === field.value
      );

      return (
        <FormItem className="flex flex-col">
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
                    {field.value
                      ? action && (
                          <Badge
                            style={{
                              backgroundColor: action.color,
                            }}
                          >
                            {action.label}
                          </Badge>
                        )
                      : 'Select a role'}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="min-w-96 p-0">
              <Command>
                <CommandGroup>
                  {RoleActionStates.map((action) => (
                    <CommandItem
                      value={action.label}
                      key={action.value}
                      onSelect={() => {
                        form.setValue(`roles.${index}.action`, action.value, {
                          shouldDirty: true,
                        });
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          action.value === field.value
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      <Badge
                        style={{
                          backgroundColor: action.color,
                        }}
                      >
                        {action.label}
                      </Badge>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      );
    }}
  />
);
