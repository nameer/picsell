import Card from "../components/Card";
import DashboardLayout from "../layout/DashboardLayout";

const Overview = () => (
  <DashboardLayout>
    <div className="flex items-center gap-4">
      <Card className="w-full px-8 text-left" title="TOTAL UPLOADS">
        <div className="text-xl font-bold">35</div>
      </Card>
      <Card className="w-full px-8 text-left" title="TOTAL USER ENGAGED ">
        <div className="text-xl font-bold">3,525 </div>
      </Card>
      <Card className="w-full px-8 text-left" title="TOTAL PROMOTERS">
        <div className="text-xl font-bold">3,525</div>
      </Card>
      <Card className="w-full px-8 text-left" title="TOTAL RETRACTORS">
        <div className="text-xl font-bold">1,245</div>
      </Card>
    </div>
  </DashboardLayout>
);

export default Overview;
