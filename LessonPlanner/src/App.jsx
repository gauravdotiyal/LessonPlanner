import {BrowserRouter,Route,Routes} from "react-router-dom"
import Login from "./components/Login"
import LessonPlanner from "./components/LessonPlanner"
 

function App() {
 
  return (
    <div>
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<Login/>} /> 
           <Route path="/lessonPlanner" element={<LessonPlanner/>} /> 
         </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
