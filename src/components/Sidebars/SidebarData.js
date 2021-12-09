import {
  ClientsWhite,
  ContactsWhite,
  DashboardWhite,
  EstimationsWhite,
  FleetWhite,
  InspectionsWhite,
  LeadsWhite,
  OpportunitiesWhite,
  PermitDrawingsWhite,
  ProjectsWhite,
  SchedulingWhite,
  SubcontractorsWhite,
  SubLeadsWhite,
  TasksWhite,
} from "../../icons"

export const SidebarData = [
  {
    to: "/dashboard",
    src: DashboardWhite,
    title: "Dashboard",
  },
  { to: "/leads", src: LeadsWhite, title: "Leads" },
  { to: "/dob", src: SubLeadsWhite, title: "DOB" },
  {
    to: "/opportunities",
    src: OpportunitiesWhite,
    title: "Opportunities",
  },
  {
    to: "/estimations",
    src: EstimationsWhite,
    title: "Estimations",
  },
  { to: "/projects", src: ProjectsWhite, title: "Projects" },
  {
    to: "/scheduling",
    src: SchedulingWhite,
    title: "Scheduling",
  },
  {
    to: "/permitdrawings",
    src: PermitDrawingsWhite,
    title: "Permit Drawings",
  },
  {
    to: "/subcontractors",
    src: SubcontractorsWhite,
    title: "Subcontractors",
  },
  { to: "/accounts", src: ClientsWhite, title: "Clients" },
  { to: "/contacts", src: ContactsWhite, title: "Contacts" },
  {
    to: "/inspections",
    src: InspectionsWhite,
    title: "Inspections",
  },
  { to: "/tasksManager", src: TasksWhite, title: "Tasks" },
  { to: "/fleet", src: FleetWhite, title: "Fleet" },
  { to: "/documentation", src: PermitDrawingsWhite, title: "Documentation" },
]
