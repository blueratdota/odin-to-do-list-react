import { useEffect, useState } from 'react'
import { Outlet, Link, json } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import { sampleToDo, sampleNotes } from './assets/SampleData'
import ToDoList from './components/ToDoList'
import AddProject from './components/AddProject'
import ProjectList from './components/ProjectList'

function App() {
  const [currentPage, setCurrentPage] = useState('/')
  const [currentProjectPage, setCurrentProjectPage] = useState()
  const [toDoData, setToDoData] = useState(() => {
    const localValue = localStorage.getItem('toDo')
    if (localValue == null) return []
    return JSON.parse(localValue)
  })
  const [notesData, setNotesData] = useState(() => {
    const localValue = localStorage.getItem('notes')
    if (localValue == null) return []
    return JSON.parse(localValue)
  })
  const [projectsData, setProjectsData] = useState(() => {
    const localValue = localStorage.getItem('projects')
    if (localValue == null) return []
    return JSON.parse(localValue)
  })


  useEffect(() => {
    localStorage.setItem('toDo', JSON.stringify(toDoData))
    localStorage.setItem('notes', JSON.stringify(notesData))
    localStorage.setItem('projects', JSON.stringify(projectsData))
  }, [toDoData, notesData, projectsData])

  return (
    <div className='bg-slate-600 h-screen flex flex-col'>
      <header>
        <h1 className='text-4xl bg-yellow-500 py-3 pl-8'><Link onClick={() => setCurrentPage('/')} to={'/'}>Odin Project: To Do List</Link></h1>
      </header>
      <section className='flex flex-1'>
        <nav className='bg-blue-700 basis-[15%]'>
          <div className='flex flex-col text-2xl px-4 pt-8 gap-3'>
            <div className='border-b pb-3'>
              <Link
                onClick={() => setCurrentPage('all-to-do')}
                to={'/all-to-do'}
              >
                All
              </Link>
            </div>
            <div className='flex flex-col gap-2 border-b pb-2'>
              <Link onClick={() => setCurrentPage('today-to-do')} to={'/today-to-do'}>Today</Link>
              <Link onClick={() => setCurrentPage('week-to-do')} to={'/week-to-do'}>Week</Link>
            </div>
            <div className='border-b pb-3'>
              <p className='mb-2'>Projects</p>
              <div className='flex flex-col gap-2 ml-5'>
                <ProjectList
                  projects={projectsData}
                >
                </ProjectList>
                <AddProject
                  projectsData={projectsData}
                  setProjectsData={setProjectsData}
                  onClick={() => setCurrentPage('projects-to-do')}
                ></AddProject>
              </div>
            </div>
            <div>
              <Link>Notes</Link>
            </div>


          </div>
        </nav>
        <main className='bg-orange-100 basis-full '>
          <div className='py-4 px-10'>
            {currentPage === '/' ?
              <HomePage /> :
              <Outlet context={
                {
                  toDoData: toDoData,
                  setToDoData: setToDoData,
                  currentPage: currentPage,
                  projectsData: projectsData,
                  setProjectsData: setProjectsData
                }} />
            }
          </div>
        </main>
      </section>
      <footer>ree</footer>


    </div>

  )
}
export default App
