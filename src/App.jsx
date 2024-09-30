import { useState } from "react";

import ProjectsSidebar from "./components/ProjectSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  /*
  State for storing saved projects
  Undefined -> return NoProjectSelected component
  Null -> return NewProject component
  Id -> valid project
   */
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  //add task
  function handleAddTask(text) {
    setProjectsState(prevState => {
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: Math.random()
      }

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      }
    });
  }

  //delete task
  function handleDeleteTask(id) {
    setProjectsState(prevState => {
      return{
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      }
    })
  }

  //add project with id
  function handleSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    })
  }

  //start new project menu
  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    })
  }

  //handle cancel button
  function handleCancelAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    })
  }

  //
  function handleAddProject(projectData) {
    setProjectsState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random()
      }

      return {
        ...prevState,
        selectedProjectId: undefined, // to go back to NoProject menu
        projects: [...prevState.projects, newProject]
      }
    });
  }

  //handle delete project
  function handleDeleteProject() {
    setProjectsState(prevState => {
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      }
    })
  }

  // console.log(projectsState);
  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId)

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

  if(projectsState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  } else if(projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
