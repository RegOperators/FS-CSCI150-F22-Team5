import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="container mx-auto px-6 sm:px-12 py-48 sm:py-56 2xl:py-64">
      <section className="flex flex-col items-center mb-32">
        <h1 className="text-3xl sm:text-6xl font-bold text-center mb-8">Classes are hard enough, signing up for them shouldn't be</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg text-center mb-8">RegOp is designed to make the process of class enrollment easier. Our goal is a one stop shop to the perfect day-to-day schedule.</p>
        <Link className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-4 py-2.5 rounded-md mb-16" to="/schedule-generator">Get started</Link>
        <div className="flex">
          <img className="min-w-0 rounded-md mr-8" src="https://fakeimg.pl/1536x864" alt="Desktop" />
          <img className="min-w-0 rounded-md" src="https://fakeimg.pl/360x760" alt="Mobile" />
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-12 mb-32">
        <div className="sm:col-span-6">
          <h1 className="text-4xl font-bold mb-8">How it works</h1>
          <p className="text-gray-500 dark:text-gray-400">RegOp is designed to be as user-friendly as possible. Simply select the courses you'd like to take, and add on any time you might be busy during the day. Then, sit back and let us create the perfect schedule for you!</p>
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-12">
        <div className="sm:col-span-6">
          <h1 className="text-4xl font-bold mb-8">About us</h1>
          <p className="text-gray-500 dark:text-gray-400">RegOp is a project dedicated to making the process of enrolling for courses as stress-free as possible. With our schedule generator, our goal is to help you make the perfect day-to-day schedule.</p>
        </div>
      </section>
    </div>
  )
}

export default Home