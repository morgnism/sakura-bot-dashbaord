import { Form } from '@remix-run/react';
import { SocialsProvider } from 'remix-auth-socials';
import Button from '~/components/Button';
import { AppRoutes } from '~/lib/constants';

interface SocialButtonProps {
  provider: SocialsProvider;
  label: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, label }) => (
  <Form action={`${AppRoutes.AUTH}/${provider}`} method="post">
    <Button>{label}</Button>
  </Form>
);

export default function LoginPage() {
  return (
    <SocialButton
      provider={SocialsProvider.DISCORD}
      label="Sign In With Discord"
    />
  );
}
