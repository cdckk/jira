import React from 'react'
import {Link} from 'react-router-dom'
import {Routes, Route} from 'react-router'
import {KanbanScreen} from 'screens/kanban'
import {EpicScreen} from 'screens/epic'
import {BrowserRouter as Router} from 'react-router-dom'

export const ProjectScreen = () => {
  return <div>
    <h1>Project</h1>
    <Link to={"kanban"}>看板</Link>
    <Link to={"epic"}>任务组</Link>
{/* 
    <Router> */}
      <Routes>
        <Route path={"/kanban"} element={<KanbanScreen />}></Route>
        <Route path={"/epic"} element={<EpicScreen />}></Route>
      </Routes>
    {/* </Router> */}
  </div>
}