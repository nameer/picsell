import Card from "../../components/Card";
import DashboardLayout from "../../layout/DashboardLayout";
import { ArrowUp, Plus } from "../../assets/icons";
import Table from "../../components/Table";
import { projectsTableColumns, projectsTableData } from "./consts";
import Button from '../../components/Button/Button'

const Overview = () => (
  <DashboardLayout>
    <div className="h-full flex flex-col">
      <div className="flex items-start justify-between">
        <div className="text-left mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Hey David</h1>
          <p className="text-gray-500">
            here’s your overall product performance today
          </p>
        </div>
        <Button icon={<Plus />} size="large">Create New</Button>
      </div>
      <div className="flex items-center gap-4 mb-10">
        <Card className="w-full px-8 text-left" title="TOTAL UPLOADS">
          <div className="text-xl font-bold">35</div>
        </Card>
        <Card className="w-full px-8 text-left" title="TOTAL USER ENGAGED ">
          <div className="text-xl font-bold">3,525 </div>
        </Card>
        <Card className="w-full px-8 text-left" title="TOTAL PROMOTERS">
          <div className="flex items-end justify-between">
            <div className="text-xl font-bold">3,525</div>
            <div className="flex items-center gap-1">
              <div className="text-green-500 font-medium">+36%</div>
              <ArrowUp />
            </div>
          </div>
        </Card>
        <Card className="w-full px-8 text-left" title="TOTAL RETRACTORS">
          <div className="flex items-end justify-between">
            <div className="text-xl font-bold">1,245</div>
            <div className="flex items-center gap-1">
              <div className="text-green-500 font-medium">+36%</div>
              <ArrowUp />
            </div>
          </div>
        </Card>
      </div>
      <div className="grow flex flex-col">
        <div className="text-lg font-semibold text-left mb-4">Projects</div>
        <Table
          className="grow h-0 overflow-y-auto"
          columns={projectsTableColumns}
          data={projectsTableData}
          onItemSelect={() => {}}
        />
      </div>
    </div>
  </DashboardLayout>
);

export default Overview;
