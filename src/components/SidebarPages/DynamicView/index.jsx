import { TabsComp } from "./components"
import "./index.scss"
export const DynamicView = ({
  sideButtons = [],
  stepperParams,
  viewTitle,
  notesProps = {},
  tabList = [],
}) => {
  return (
    <div className="dynamicViewPage">
      <TabsComp
        {...{
          sideButtons,
          stepperParams,
          viewTitle,
          tabList,
          notesProps,
        }}
      />
    </div>
  )
}
