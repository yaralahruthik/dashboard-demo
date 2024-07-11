import useSWR from 'swr';
import {
  FormControl,
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
import { FiltersFormType } from './filters-form';
import { getAssignedDepartments } from '../../_actions';
import { covertUnderscoresToSpacesAndCapitalize } from '@/utils/formatKey';
import { Skeleton } from '@/components/ui/skeleton';

type AssignedDepartmentProps = {
  form: UseFormReturn<FiltersFormType>;
};

function useAssignedDepartments() {
  return useSWR('assigned-departments', getAssignedDepartments);
}

export default function AssignedDepartment({ form }: AssignedDepartmentProps) {
  const { data, isLoading } = useAssignedDepartments();

  return (
    <FormField
      control={form.control}
      name="assignment"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Assigned Department</FormLabel>
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
                    {covertUnderscoresToSpacesAndCapitalize(department.value!)}
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
