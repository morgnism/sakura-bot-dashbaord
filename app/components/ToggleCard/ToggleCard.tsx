import { Link } from '@remix-run/react';
import ToggleSwitch from '../Buttons/ToggleSwitch';

type ToggleCardProps = {
  name: string;
  to: string;
  label: string;
  enabled: boolean;
};

const ToggleCard = ({ name, to, label, enabled }: ToggleCardProps) => {
  return (
    <div className="w-full">
      <Link to={`./${to}`}>{label}</Link>
      <ToggleSwitch name={name} label={label} enabled={enabled} />
    </div>
  );
};

export default ToggleCard;
