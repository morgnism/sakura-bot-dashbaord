import { useFetcher } from '@remix-run/react';
import Button from '~/components/Button';
import { cn } from '~/utils/cn';

type ToggleSwitchProps = {
  name: string;
  label: string;
  enabled: boolean;
};

const ToggleSwitch = (props: ToggleSwitchProps) => {
  const fetcher = useFetcher();
  const enabled = fetcher.formData
    ? fetcher.formData.get('enabled') === 'true'
    : props.enabled;

  return (
    <fetcher.Form method="post">
      <input type="hidden" name="name" value={props.name} />
      <Button
        id={`${props.label}-switch`}
        className="bg-[#e5e7eb] relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition duration-200 ease-in-out focus:outline-none focus:shadow-[#4f46e5]"
        role="switch"
        name="enabled"
        value={enabled ? 'false' : 'true'}
        aria-checked={enabled}
        aria-label={
          enabled
            ? `Toggle ${props.label} setting On`
            : `Toggle ${props.label} setting Off`
        }
      >
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-[#3b82f6] transition duration-200 ease-in-out',
            enabled ? 'translate-x-5' : 'transform'
          )}
        ></span>
      </Button>
    </fetcher.Form>
  );
};

export default ToggleSwitch;
