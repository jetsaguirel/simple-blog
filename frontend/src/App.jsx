import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto p-8">
        <div className="text-center">
          <div className="flex justify-center gap-8 mb-8">
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="h-24 p-6 hover:drop-shadow-lg transition-all" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="h-24 p-6 hover:drop-shadow-lg transition-all animate-spin-slow" alt="React logo" />
            </a>
          </div>
          
          <h1 className="text-5xl font-bold text-primary mb-8">
            Vite + React + Tailwind + DaisyUI
          </h1>
          
          <div className="card bg-base-200 shadow-xl max-w-md mx-auto">
            <div className="card-body">
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => setCount((count) => count + 1)}
              >
                Count is {count}
              </button>
              <p className="text-base-content/70 mt-4">
                Edit <code className="bg-base-300 px-2 py-1 rounded">src/App.jsx</code> and save to test HMR
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-base-content/60">
              Click on the Vite and React logos to learn more
            </p>
          </div>
          
          <div className="mt-8 flex justify-center gap-4">
            <div className="badge badge-success">Tailwind CSS v4 ✓</div>
            <div className="badge badge-info">DaisyUI ✓</div>
            <div className="badge badge-warning">React Router ✓</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
