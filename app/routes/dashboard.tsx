import { Outlet } from '@remix-run/react';
import RouteWrapper from '~/components/Wrappers/RouteWrapper';

export default function DashboardLayout() {
  return (
    <RouteWrapper>
      <Outlet />
    </RouteWrapper>
  );
}
