import { DynamicView } from "../DynamicView";
import Accounting from "./Accounting/Accounting";
import projects from "../../../dataLayer/projects.json";
export const DynamicProjectsView = () => {
  const projectTitle = projects[0].project;
  return (
    <DynamicView
      {...{
        viewTitle: projectTitle,
        tabList: [
          {
            tab: "Accounting",
            component: Accounting,
            props: {
              activeAccountingTab: "Applications",
            },
          },
        ],
      }}
    />
  );
};
