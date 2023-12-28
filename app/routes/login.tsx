import { Form } from '@remix-run/react';
import { SocialsProvider } from 'remix-auth-socials';
import { AppRoutes } from '~/lib/constants';

interface SocialButtonProps {
  provider: SocialsProvider;
  label: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, label }) => (
  <Form action={`${AppRoutes.AUTH}/${provider}`} method="post">
    <button>{label}</button>
  </Form>
);

export default function Login() {
  return (
    <>
      <SocialButton
        provider={SocialsProvider.DISCORD}
        label="Login with Discord"
      />
    </>
  );
}
