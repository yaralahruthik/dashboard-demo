import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function KPIs() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardDescription>Total Number of Tickets</CardDescription>
          <CardTitle className="text-4xl">100</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center justify-between gap-2">
              <span>Accepted</span>
              <span>46</span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span>Rejected</span>
              <span>20</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="h-full justify-between">
          <CardDescription>Average Assignment Time Per Ticket</CardDescription>
          <CardTitle className="text-4xl">3 mins</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="h-full justify-between">
          <CardDescription>Number of AI Assignments</CardDescription>
          <CardTitle className="text-4xl">23</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="h-full justify-between">
          <CardDescription>Number of Manual Assignments</CardDescription>
          <CardTitle className="text-4xl">7</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
