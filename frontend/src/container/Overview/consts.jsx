import { DotsHorizontalIcon } from "../../assets/icons";
import Chip from "../../components/Chip";

const getStatusChipVariant = (status) => {
  switch (status) {
    case "Completed":
      return "success";
    case "Training in progress":
      return "warning";
    default:
      return "";
  }
};

export const projectsTableColumns = [
  { id: "id", heading: "ID", value: (item) => item.id },
  { id: "fileName", heading: "File name", value: (item) => item.fileName },
  { id: "createOn", heading: "Create on", value: (item) => item.createdOn },
  { id: "updatedOn", heading: "Updated On", value: (item) => item.updatedOn },
  {
    id: "status",
    heading: "Status",
    value: (item) => (
      <Chip text={item.status} variant={getStatusChipVariant(item.status)} />
    ),
  },
  {
    id: "actions",
    heading: "Actions",
    value: (item) => <DotsHorizontalIcon />,
  },
];

export const projectsTableData = [
  {
    id: "#3251",
    fileName: "Coffee explainer video ",
    createdOn: "22nd Jan s4",
    updatedOn: "22nd Jan 24",
    status: "Training in progress",
  },
  {
    id: "#3251",
    fileName: "Coffee explainer video ",
    createdOn: "22nd Jan s4",
    updatedOn: "22nd Jan 24",
    status: "Completed",
  },
  {
    id: "#3251",
    fileName: "Coffee explainer video ",
    createdOn: "22nd Jan s4",
    updatedOn: "22nd Jan 24",
    status: "Completed",
  },
  {
    id: "#3251",
    fileName: "Coffee explainer video ",
    createdOn: "22nd Jan s4",
    updatedOn: "22nd Jan 24",
    status: "Completed",
  },
  {
    id: "#3251",
    fileName: "Coffee explainer video ",
    createdOn: "22nd Jan s4",
    updatedOn: "22nd Jan 24",
    status: "Completed",
  },
  {
    id: "#3251",
    fileName: "Coffee explainer video ",
    createdOn: "22nd Jan s4",
    updatedOn: "22nd Jan 24",
    status: "Completed",
  },
  {
    id: "#3251",
    fileName: "Coffee explainer video ",
    createdOn: "22nd Jan s4",
    updatedOn: "22nd Jan 24",
    status: "Completed",
  },
  {
    id: "#3251",
    fileName: "Coffee explainer video ",
    createdOn: "22nd Jan s4",
    updatedOn: "22nd Jan 24",
    status: "Completed",
  },
  {
    id: "#3251",
    fileName: "Coffee explainer video ",
    createdOn: "22nd Jan s4",
    updatedOn: "22nd Jan 24",
    status: "Completed",
  },
  {
    id: "#3251",
    fileName: "Coffee explainer video ",
    createdOn: "22nd Jan s4",
    updatedOn: "22nd Jan 24",
    status: "Completed",
  },
  {
    id: "#3251",
    fileName: "Coffee explainer video ",
    createdOn: "22nd Jan s4",
    updatedOn: "22nd Jan 24",
    status: "Completed",
  },
  {
    id: "#3251",
    fileName: "Coffee explainer video ",
    createdOn: "22nd Jan s4",
    updatedOn: "22nd Jan 24",
    status: "Completed",
  },
  {
    id: "#3251",
    fileName: "Coffee explainer video ",
    createdOn: "22nd Jan s4",
    updatedOn: "22nd Jan 24",
    status: "Completed",
  },
  {
    id: "#3251",
    fileName: "Coffee explainer video ",
    createdOn: "22nd Jan s4",
    updatedOn: "22nd Jan 24",
    status: "Completed",
  },
];
