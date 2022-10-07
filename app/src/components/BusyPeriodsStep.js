import { useState } from 'react'
import Modal from './Modal'

const BusyPeriodsStep = ({ formData, setFormData }) => {
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
      <h1 className="text-4xl sm:text-7xl font-extrabold mb-8">Busy Periods</h1>
      {formData.busyPeriods.length > 0 ? (
        <ul className="mb-6">
          {formData.busyPeriods.map((busyPeriod, index) => (
            <li className="bg-gray-100 dark:bg-[#161b22] p-6 sm:p-16 rounded-md flex justify-between mb-4 last:mb-0" key={index}>
              <div>
                <div className="font-semibold">{busyPeriod.name}</div>
                <div>{busyPeriod.startTime} - {busyPeriod.endTime}</div>
              </div>
              <button onClick={() => removeBusyPeriod(index)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No busy periods have been added.</div>
      )}
      <Modal>
        <div>
          <h1 className="text-4xl sm:text-7xl font-extrabold mb-8">Add a Busy Period</h1>
          <div className="grid grid-cols-2 sm:grid-cols-10 gap-4 mb-4 last:mb-0">
            <div className="col-span-2">
              <label className="block mb-2">Name</label>
              <input className="bg-gray-100 dark:bg-[#161b22] px-4 py-2.5 rounded-md w-full" name="name" value={newBusyPeriod.name} onChange={(event) => updateNewBusyPeriod(event)} />
            </div>
            <div>
              <label className="block mb-2">Start Time</label>
              <input className="bg-gray-100 dark:bg-[#161b22] px-4 py-2.5 rounded-md w-full" name="startTime" type="time" value={newBusyPeriod.startTime} onChange={(event) => updateNewBusyPeriod(event)} />
            </div>
            <div>
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
      </Modal>
    </div>
  )
}

export default BusyPeriodsStep