import { Form } from '@remix-run/react';
import { SocialsProvider } from 'remix-auth-socials';
import { AppRoutes } from '~/lib/route';

type SocialButtonProps = {
  provider: SocialsProvider;
  label: string;
};

const SocialButton: React.FC<SocialButtonProps> = ({ provider, label }) => (
  <Form action={`${AppRoutes.AUTH}/${provider}`} method="post">
    <button type="submit">{label}</button>
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
