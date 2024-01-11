import { ColumnDef } from '@tanstack/react-table';
import { ShortRoleActions } from '~/api/roles.server';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AutoRoleColum = {
  id?: string;
  name: string;
  action?: ShortRoleAction;
  delay: number;
};

export const AutoRoleColumns: ColumnDef<AutoRoleColum>[] = [
  {
    accessorKey: 'name',
    header: 'Role',
  },
  {
    accessorKey: 'action',
    header: 'Action',
  },
  {
    accessorKey: 'delay',
    header: 'Delay',
  },
];
