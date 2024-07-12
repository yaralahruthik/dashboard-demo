import useSWR from 'swr';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { getAssignedDepartments } from '../../_actions';
import { convertUnderscoresToSpacesAndCapitalize } from '@/utils/text';
import { Skeleton } from '@/components/ui/skeleton';
import { QueryUpdateDataType } from './update-schema';

type AssignedDepartmentProps = {
  form: UseFormReturn<QueryUpdateDataType>;
  description?: React.ReactNode;
};

function useAssignedDepartments() {
  return useSWR('assigned-departments', getAssignedDepartments, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
}

export default function AssignedDepartment({
  form,
  description,
}: AssignedDepartmentProps) {
  const { data, isLoading } = useAssignedDepartments();

  return (
    <FormField
      control={form.control}
      name="assignment"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Assigned Department</FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Assigned Department" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.map((department) => (
                  <SelectItem key={department.value} value={department.value!}>
                    {convertUnderscoresToSpacesAndCapitalize(department.value!)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
