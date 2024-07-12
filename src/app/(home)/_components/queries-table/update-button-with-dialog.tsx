'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { QueryDataRow } from './get-queries-data';
import { Button } from '@/components/ui/button';
import QueryUpdateForm from './query-update-form';
import React from 'react';

type UpdateButtonWithDialogProps = {
  query: QueryDataRow;
};

export default function UpdateButtonWithDialog({
  query,
}: UpdateButtonWithDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Update</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Query</DialogTitle>
          <DialogDescription className="space-y-2">
            <p>Ticket ID: {query.ticketId}.</p>
            <p>All fields are optional!</p>
          </DialogDescription>
        </DialogHeader>
        <QueryUpdateForm onClose={() => setIsOpen(false)} query={query} />
      </DialogContent>
    </Dialog>
  );
}
