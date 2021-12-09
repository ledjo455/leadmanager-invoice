import React, { useState, createContext } from "react";
import projects from "../projects.json";
export const ProjectContext = createContext();

export const ContextProvider = (props) => {
  const [data, setData] = useState(projects);
  return (
    <div>
      <ProjectContext.Provider value={[data, setData]}>
        {props.children}
      </ProjectContext.Provider>
    </div>
  );
};
