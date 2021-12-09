export const AuthenticatedMock = {
  exact: false,
  path: "/projects/:id",
  title: "Projects/view",
  auth: true,
  children: [
    {
      title: "Tasks",
      write: true,
    },
    {
      title: "Projects",
      write: true,
    },
    {
      title: "Estimations",
      children: [
        {
          title: "Amount",
          write: true,
        },
      ],
      write: true,
    },
    {
      title: "Opportunities",
      children: [
        {
          title: "Amount",
          write: true,
        },
      ],
      write: true,
    },
    {
      title: "Documentation",
      write: true,
    },
    {
      title: "Scheduling",
      write: true,
    },
    {
      title: "Emails",
      write: true,
    },
    {
      title: "Notes",
      write: true,
    },
  ],
  write: true,
}
