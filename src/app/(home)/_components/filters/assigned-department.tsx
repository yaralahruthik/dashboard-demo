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
import { convertUnderscoresToSpacesAndCapitalize } from '@/utils/text';
import { Skeleton } from '@/components/ui/skeleton';

type AssignedDepartmentProps = {
  form: UseFormReturn<FiltersFormType>;
};

function useAssignedDepartments() {
  return useSWR('assigned-departments', getAssignedDepartments, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
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
                {data?.map(
                  (department) =>
                    department.value && (
                      <SelectItem
                        key={department.value}
                        value={department.value}
                      >
                        {convertUnderscoresToSpacesAndCapitalize(
                          department.value,
                        )}
                      </SelectItem>
                    ),
                )}
              </SelectContent>
            </Select>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
