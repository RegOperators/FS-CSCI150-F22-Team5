import { Link } from 'react-router-dom'
import browserMockupLight from '../browser-mockup-light.png'

const Home = () => {
  return (
    <div className="font-['Manrope']">
      <header className="px-6 sm:px-12 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-semibold">RegOp</h1>
      </header>
      <div className="pt-24 sm:pt-32 2xl:pt-40 pb-48">
        <div className="container mx-auto px-6 sm:px-12">
          <section className="grid grid-cols-1 sm:grid-cols-12 gap-16 mb-32">
            <div className="sm:col-span-6">
              <h1 className="text-3xl xl:text-5xl 2xl:text-6xl font-bold mb-8">Classes are hard enough, signing up for them shouldn't be</h1>
              <p className="text-gray-500 sm:text-lg mb-8">RegOp is designed to make the process of class enrollment easier. Our goal is a one stop shop to the perfect day-to-day schedule.</p>
              <Link className="bg-indigo-500 hover:bg-indigo-400 text-white text-lg font-semibold px-4 py-2.5 rounded-md block w-max" to="/schedule-generator">Get started</Link>
            </div>
            <img className="sm:col-span-6 drop-shadow-2xl" src={browserMockupLight} alt="Browser Mockup" />
          </section>
          <section className="grid grid-cols-1 sm:grid-cols-12 gap-8 mb-24">
            <div className="sm:col-span-7">
              <h1 className="text-2xl sm:text-4xl font-bold mb-8">How it works</h1>
              <p className="text-gray-500">RegOp is designed to be as user-friendly as possible. Simply select the courses you'd like to take, and add on any time you might be busy during the day. Then, sit back and let us create the perfect schedule for you!</p>
            </div>
          </section>
          <section className="grid grid-cols-1 sm:grid-cols-12 gap-8 mb-24">
            <div className="sm:col-span-7">
              <h1 className="text-2xl sm:text-4xl font-bold mb-8">About us</h1>
              <p className="text-gray-500">RegOp is a project dedicated to making the process of enrolling for courses as stress-free as possible. With our schedule generator, our goal is to help you make the perfect day-to-day schedule.</p>
            </div>
          </section>
          <section className="grid grid-cols-1 sm:grid-cols-12 gap-8">
            <div className="sm:col-span-7">
              <h1 className="text-2xl sm:text-4xl font-bold mb-8">Install our PWA</h1>
              <p className="text-gray-500">Add RegOp to your home screen for easier access and a native-like experience.</p>
            </div>
          </section>
        </div>
      </div>
      <footer className="container mx-auto px-6 sm:px-12 py-8 text-gray-500">© {new Date().getFullYear()} RegOp</footer>
    </div>
  )
}

export default Home