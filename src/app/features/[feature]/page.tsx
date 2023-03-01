import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Sandbox } from './sandbox';

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="overflow-hidden rounded-md border border-zinc-200 shadow-xl shadow-zinc-800 dark:border-zinc-700">
        <Tabs defaultValue="basic">
          <TabsList className="mx-auto h-12 w-full rounded-none">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="wizard">Multistep Wizard</TabsTrigger>
            <TabsTrigger value="form-action" disabled>
              File Uploads
            </TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="border-none">
            <Sandbox /** some prop telling what code to run */ />
          </TabsContent>
          <TabsContent value="wizard" className="border-none">
            <Sandbox /** some prop telling what code to run */ />
          </TabsContent>
          <TabsContent value="form-action" className="border-none">
            <Sandbox /** some prop telling what code to run */ />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
