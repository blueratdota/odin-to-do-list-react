import { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import SampleData from './assets/SampleData'
import ToDoList from './components/ToDoList'

function App() {
  const [currentPage, setCurrentPage] = useState('/')
  const [toDoData, setToDoData] = useState('')
  const [notesData, setNotesData] = useState('')

  if (!localStorage.length) {
    localStorage.setItem('toDo', JSON.stringify(SampleData[0]))
    localStorage.setItem('notes', JSON.stringify(SampleData[1]))

    setToDoData(JSON.parse(localStorage.getItem('toDo')))
    setNotesData(JSON.parse(localStorage.getItem('notes')))
  }

  useEffect(() => {
    setToDoData(JSON.parse(localStorage.getItem('toDo')))
    setNotesData(JSON.parse(localStorage.getItem('notes')))
  }, [])


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
                <Link>Project 1</Link>
                <Link>Project 2</Link>
                <button>Add Project</button>
              </div>
            </div>
            <div>
              <Link>Notes</Link>
            </div>

          </div>
        </nav>
        <main className='bg-orange-100 basis-full'>
          <div >
            {currentPage === '/' ?
              <HomePage /> :
              <Outlet context={[toDoData, notesData]} />}
          </div>
        </main>
      </section>
      <footer>ree</footer>


    </div>

  )
}
export default App
