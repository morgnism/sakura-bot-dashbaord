import { Outlet } from '@remix-run/react';
import RouteLayout from '~/components/Wrappers/RouteLayout';

export default function DashboardLayout() {
  return (
    <RouteLayout>
      <Outlet />
    </RouteLayout>
  );
}
