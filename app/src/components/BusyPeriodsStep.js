import { useState } from 'react'
import Modal from './Modal'

const BusyPeriodsStep = ({ formData, setFormData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const [newBusyPeriod, setNewBusyPeriod] = useState({ name: '', startTime: '', endTime: '' })
  
  const updateNewBusyPeriod = (event) => {
    const newNewBusyPeriod = {...newBusyPeriod}
    newNewBusyPeriod[event.target.name] = event.target.value
    setNewBusyPeriod(newNewBusyPeriod)
  }
  
  const addNewBusyPeriod = () => {
    setFormData({...formData, busyPeriods: [...formData.busyPeriods, newBusyPeriod]})
  }
  
  const removeBusyPeriod = (index) => {
    const newBusyPeriods = [...formData.busyPeriods]
    newBusyPeriods.splice(index, 1)
    setFormData({...formData, busyPeriods: newBusyPeriods})
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl xl:text-6xl 2xl:text-7xl font-extrabold">Busy Periods</h1>
        <button className="bg-gradient-to-br from-red-400 to-orange-400 px-4 py-2.5 rounded-md flex items-center" onClick={() => setIsModalOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 512 512">
            <title>Add</title>
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 112v288M400 256H112"/>
          </svg>
          Add
        </button>
      </div>
      {formData.busyPeriods.length > 0 ? (
        <ul className="mb-6">
          {formData.busyPeriods.map((busyPeriod, index) => (
            <li className="bg-gray-100 dark:bg-[#161b22] p-6 sm:p-8 rounded-md flex justify-between mb-4 last:mb-0" key={index}>
              <div>
                <div className="text-lg font-semibold">{busyPeriod.name}</div>
                <div>{busyPeriod.startTime} - {busyPeriod.endTime}</div>
              </div>
              <button onClick={() => removeBusyPeriod(index)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No busy periods have been added.</div>
      )}
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="fixed inset-0 flex justify-center items-center pointer-events-none">
          <div className="bg-white dark:bg-[#0d1117] p-8 rounded-md w-1/2 h-2/3 flex flex-col pointer-events-auto">
            <h1 className="text-xl font-semibold mb-8">Add a Busy Period</h1>
            <div className="grid grid-cols-1 sm:grid-cols-10 gap-4 mb-4 last:mb-0">
              <div className="sm:col-span-4">
                <label className="block mb-2">Name</label>
                <input className="bg-gray-100 dark:bg-[#161b22] px-4 py-2.5 rounded-md w-full" name="name" value={newBusyPeriod.name} onChange={(event) => updateNewBusyPeriod(event)} />
              </div>
              <div className="sm:col-span-3">
                <label className="block mb-2">Start Time</label>
                <input className="bg-gray-100 dark:bg-[#161b22] px-4 py-2.5 rounded-md w-full" name="startTime" type="time" value={newBusyPeriod.startTime} onChange={(event) => updateNewBusyPeriod(event)} />
              </div>
              <div className="sm:col-span-3">
                <label className="block mb-2">End Time</label>
                <input className="bg-gray-100 dark:bg-[#161b22] px-4 py-2.5 rounded-md w-full" name="endTime" type="time" value={newBusyPeriod.endTime} onChange={(event) => updateNewBusyPeriod(event)} />
              </div>
              <div>
                <label>Days</label>
                <div>
                  <div>
                    <input className="" type="checkbox" />
                    <label>M</label>
                  </div>
                </div>
              </div>
              <button onClick={addNewBusyPeriod}>Add</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default BusyPeriodsStep