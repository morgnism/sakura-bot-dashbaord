import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Form as RemixForm, useLoaderData, useSubmit } from '@remix-run/react';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import invariant from 'tiny-invariant';
import { z } from 'zod';
import { ShortGuildChannel, getServerChannels } from '~/api/guilds.server';
import { getWelcomeChannelSettings } from '~/api/welcome.server';
import { EmbedContainer, EmbedMessageBody } from '~/components/Embed';
import TextArea from '~/components/MessageEditors';
import { Document } from '~/components/MessageEditors/TextArea';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Command, CommandGroup, CommandItem } from '~/components/ui/command';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { cn } from '~/utils/cn';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.serverId, 'Missing serverId param');
  const [welcomeChannelSettings, guildChannels] = await Promise.all([
    getWelcomeChannelSettings(params.serverId),
    getServerChannels(params.serverId),
  ]);

  return {
    enabled: welcomeChannelSettings.enabled,
    channelId: welcomeChannelSettings.channelId,
    dmEnabled: welcomeChannelSettings.dmEnabled,
    message: welcomeChannelSettings.message,
    selectedChannelId: welcomeChannelSettings.channelId,
    guildChannels,
  };
};

const welcomeChannelFormSchema = z.object({
  welcomeChannel: z.string(),
});

type WelcomeChannelFormData = z.infer<typeof welcomeChannelFormSchema>;

const defaultMessageValue = [
  {
    id: '1',
    type: ELEMENT_PARAGRAPH,
    children: [{ text: '' }],
  },
];

const initialValue = [
  {
    id: '1',
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text: '~~strike through text~~',
      },
    ],
  },
];

export default function WelcomeChannelPage() {
  const {
    enabled,
    channelId,
    dmEnabled,
    message,
    selectedChannelId,
    guildChannels,
  } = useLoaderData<typeof loader>();
  const form = useForm<WelcomeChannelFormData>({
    resolver: zodResolver(welcomeChannelFormSchema),
    defaultValues: {
      welcomeChannel: selectedChannelId,
    },
  });
  const submit = useSubmit();

  const [editorsBlocks, setEditorBlocks] = useState<Document[][]>([
    initialValue,
  ]);

  const handleAddEditorBlock = () => {
    const tempArr = [...editorsBlocks];
    const card: Document[] = defaultMessageValue;
    tempArr.push(card);
    setEditorBlocks(tempArr);
  };

  const handleRemoveEditorBlock = (index: number) => {
    if (index > -1) {
      const rest = editorsBlocks.filter((_, i) => i !== index);
      if (rest.length) {
        setEditorBlocks(rest);
      }
    }
  };

  const onSubmit = (data: WelcomeChannelFormData) => {
    submit(data, { method: 'post' });
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Welcome Channel</h2>
        </div>
        <p className="text-zinc-400">Welcome your new members to the server.</p>
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
          <Card>
            <CardHeader>
              <CardTitle>Choose a Welcome Channel</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 border-t border-zinc-800 grid gap-6">
              <ComboBoxChannelsField form={form} values={guildChannels} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Customize Your Welcome Channel</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 border-t border-zinc-800 flex flex-col gap-6">
              <EmbedContainer>
                {editorsBlocks.map((block, i) => (
                  <EmbedMessageBody
                    key={i}
                    onRemove={() => handleRemoveEditorBlock(i)}
                  >
                    <TextArea data={block} />
                  </EmbedMessageBody>
                ))}
              </EmbedContainer>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleAddEditorBlock}
              >
                Add Element <Icons.plus className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          <Button disabled={!form.formState.isDirty} type="submit">
            Save
          </Button>
        </RemixForm>
      </Form>
    </div>
  );
}

type ComboBoxChannelsFieldProps = {
  form: UseFormReturn<WelcomeChannelFormData, any, undefined>;
  values: ShortGuildChannel[];
};

const ComboBoxChannelsField = ({
  form,
  values,
}: ComboBoxChannelsFieldProps) => (
  <FormField
    control={form.control}
    name="welcomeChannel"
    render={({ field }) => (
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
                    ? values
                        .filter((channel) => field.value === channel.id)
                        .map((channel) => (
                          <div key={channel.id} className="flex items-center">
                            <Icons.hash className="h-4 w-4 mr-1" />
                            {channel.name}
                          </div>
                        ))
                    : 'Select a channel'}
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
                      form.setValue('welcomeChannel', channel.id, {
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
          Pick the channel for welcome messages and important information.
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);
