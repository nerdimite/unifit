/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import Link from "next/link";

import IndexNavbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";

export default function Index() {
  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-slate-600">
                UniFit - Experience the Future of Fitness at your Home
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-500">
                UniFit is a unified AI-powered fitness experience at your home
                which uses <strong>Augmented Reality</strong> and{" "}
                <strong>Pose Estimation</strong> to give you a personlized
                virtual fitness trainer.
              </p>
              <div className="mt-12">
                <a
                  href="/auth/login"
                  // target='_blank'
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-slate-400 active:bg-slate-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Sign Up / Login
                </a>
                {/* <a
                  href='/app'
                  className='github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-slate-700 active:bg-slate-600 uppercase text-sm shadow hover:shadow-lg'
                  target='_blank'
                >
                  Dashboard
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860-px"
          src="/images/Hero.png"
          alt="..."
        />
      </section>

      <section
        id="features"
        className="mt-48 md:mt-40 pb-40 relative bg-slate-100"
      >
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-slate-100 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
              <div
                className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-700"
                style={{
                  transform:
                    "scale(1) perspective(1040px) rotateY(15deg) rotateX(2deg) rotate(1deg)",
                }}
              >
                <img
                  alt="..."
                  src="images/feature.gif"
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 60 583 95"
                    className="absolute left-0 w-full block h-95-px -top-84-px"
                  >
                    {/* <polygon
                      points='-30, 100 983, 95 583, 65'
                      className='text-slate-600 fill-current'
                    ></polygon> */}
                  </svg>
                  <h4 className="text-xl font-bold text-white">Features</h4>
                  <p className="text-md font-light mt-2 text-white">
                    UniFit is a fitness app that helps you to get to your best
                    physical fitness. We help you to find the best workout for
                    you. We track the progress of your workouts and help you to
                    improve your fitness.
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="w-full md:w-6/12 px-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-slate-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <img src="images/progress-tracker.png" />
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Progress Tracker
                      </h6>
                      <p className="mb-4 text-slate-500">
                        Visualize your daily progress through a detailed graph
                        and much more! Stay consistent for better results.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-slate-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <img src="images/dumbell.png" />
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Workout Planner
                      </h6>
                      <p className="mb-4 text-slate-500">
                        It automatically creates a workout plan according to the
                        user's need.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-slate-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <img src="images/console.png" />
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">Gamify</h6>
                      <p className="mb-4 text-slate-500">
                        To gamify the experience, users can share their progress
                        with their friends and compete in a leaderboard.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-slate-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <img src="images/leaderboard.png" />
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Leaderboard
                      </h6>
                      <p className="mb-4 text-slate-500">
                        Users can virtual play augmented reality based fitness
                        games with their friends.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="vision" className="container mx-auto overflow-hidden pb-20">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-36">
              <div className="text-slate-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <img src="images/vision-icon.png" />
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Vision
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-slate-600">
                We strive to keep you fit and healthy by providing a platform
                which is user-friendly. We offer various workout plans and
                exercises to help you to get the best results.
              </p>
              <div className="block pb-6">
                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  User-Friendly
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Gamified
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Track and Transform
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  360 Degree Training
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Fun and Easy
                </span>
              </div>
            </div>

            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mt-32">
              <div className="relative flex flex-col min-w-0 w-full mb-6 mt-48 md:mt-0">
                <img
                  alt="..."
                  src="/images/vision.gif"
                  className="w-full align-middle rounded absolute shadow-lg max-w-100-px left-145-px -top-29-px z-3"
                />
                <img
                  alt="..."
                  src="/images/vision.gif"
                  className="w-full align-middle rounded-lg absolute shadow-lg max-w-210-px left-260-px -top-160-px"
                />
                <img
                  alt="..."
                  src="/images/vision.gif"
                  className="w-full align-middle rounded-lg absolute shadow-lg max-w-180-px left-40-px -top-225-px z-2"
                />
                <img
                  alt="..."
                  src="/images/vision.gif"
                  className="w-full align-middle rounded-lg absolute shadow-2xl max-w-200-px -left-50-px top-25-px"
                />
                <img
                  alt="..."
                  src="/images/vision.gif"
                  className="w-full align-middle rounded absolute shadow-lg max-w-580-px -left-20-px top-210-px"
                />
                <img
                  alt="..."
                  src="/images/vision.gif"
                  className="w-full align-middle rounded absolute shadow-xl max-w-120-px left-195-px top-95-px"
                />
              </div>
            </div>
          </div>

          <div id="team" className="flex flex-wrap items-center pt-32">
            <div className="w-full md:w-6/12 px-4 mr-auto ml-auto mt-32">
              <div className="justify-center flex flex-wrap relative">
                <div className="my-4 w-full lg:w-6/12 px-4">
                  <div className="bg-red-700 shadow-lg rounded-lg text-center p-8 hover:animate-bounce">
                    <img
                      alt="..."
                      className="shadow-md rounded-full max-w-full w-32 mx-auto  bg-white"
                      src="/images/bhavesh.jpg"
                    />
                    <p className="text-lg text-white mt-4 font-semibold">
                      Bhavesh Laddagiri
                    </p>
                  </div>
                  <div className="bg-sky-500 shadow-lg rounded-lg text-center p-8 mt-8 hover:animate-bounce">
                    <img
                      alt="..."
                      className="shadow-md rounded-full max-w-full w-32 mx-auto bg-white"
                      src="/images/abhishek.jpg"
                    />
                    <p className="text-lg text-white mt-4 font-semibold">
                      Abhishek Bhardwaj
                    </p>
                  </div>
                  <div className="bg-slate-700 shadow-lg rounded-lg text-center p-8 mt-8 hover:animate-bounce">
                    <img
                      alt="..."
                      className="shadow-md rounded-full max-w-full w-32 mx-auto bg-white"
                      src="/images/Vanika.jpg"
                    />
                    <p className="text-lg text-white mt-4 font-semibold">
                      Vanika Gehani
                    </p>
                  </div>
                </div>
                <div className="my-4 w-full lg:w-6/12 px-4 lg:mt-16 ">
                  <div className="bg-emerald-500 shadow-lg rounded-lg text-center p-8 hover:animate-bounce">
                    <img
                      alt="..."
                      className="shadow-md rounded-full max-w-full w-32 mx-auto bg-white"
                      src="/images/bhavya.jpg"
                    />
                    <p className="text-lg text-white mt-4 font-semibold">
                      Bhavya Gupta
                    </p>
                  </div>
                  <div className="bg-red-600 shadow-lg rounded-lg text-center p-8 mt-8 hover:animate-bounce">
                    <img
                      alt="..."
                      className="shadow-md rounded-full max-w-full w-32 mx-auto bg-white"
                      src="/images/aastha.jpg"
                    />
                    <p className="text-lg text-white mt-4 font-semibold">
                      Aastha Mishra
                    </p>
                  </div>
                  <div className="bg-yellow-500  shadow-lg rounded-lg text-center p-8 mt-8 hover:animate-bounce">
                    <img
                      alt="..."
                      className="shadow-md rounded-full max-w-full w-32 mx-auto bg-white"
                      src="/images/kunal.jpg"
                    />
                    <p className="text-lg text-white mt-4 font-semibold">
                      Kunal Srivastav
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
              <div className="text-slate-500 text-center inline-flex items-center justify-center mb-6 shadow-lg w-32 h-32 rounded-full bg-white">
                {/* <i className='fas fa-drafting-compass text-xl'></i> */}
                <img
                  src="images/binary-souls-logo.png"
                  width="100%"
                  height="100%"
                />
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Meet Team Binary Souls
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-slate-600">
                We are a team of passionate developers who are passionate about
                building the future of the web.
              </p>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-slate-600">
                We have created this web application to help people to get the
                easiest and reliable solution to get fit.
              </p>
              {/* <div className='block pb-6'>
                <span className='text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2'>
                  Alerts
                </span>
                <span className='text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2'>
                  Dropdowns
                </span>
                <span className='text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2'>
                  Menus
                </span>
                <span className='text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2'>
                  Modals
                </span>
                <span className='text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2'>
                  Navbars
                </span>
                <span className='text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2'>
                  Popovers
                </span>
                <span className='text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2'>
                  Tabs
                </span>
                <span className='text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2'>
                  Tooltips
                </span>
              </div> */}
            </div>
          </div>
        </div>

        {/* <div className='container mx-auto px-4 pb-32 pt-48'>
          <div className='items-center flex flex-wrap'>
            <div className='w-full md:w-5/12 ml-auto px-12 md:px-4'>
              <div className='md:pr-12'>
                <div className='text-slate-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white'>
                  <i className='fas fa-file-alt text-xl'></i>
                </div>
                <h3 className='text-3xl font-semibold'>
                  Complex Documentation
                </h3>
                <p className='mt-4 text-lg leading-relaxed text-slate-500'>
                  This extension comes a lot of fully coded examples that help
                  you get started faster. You can adjust the colors and also the
                  programming language. You can change the text and images and
                  you're good to go.
                </p>
                <ul className='list-none mt-6'>
                  <li className='py-2'>
                    <div className='flex items-center'>
                      <div>
                        <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-slate-500 bg-slate-50 mr-3'>
                          <i className='fas fa-fingerprint'></i>
                        </span>
                      </div>
                      <div>
                        <h4 className='text-slate-500'>
                          Built by Developers for Developers
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className='py-2'>
                    <div className='flex items-center'>
                      <div>
                        <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-slate-500 bg-slate-50 mr-3'>
                          <i className='fab fa-html5'></i>
                        </span>
                      </div>
                      <div>
                        <h4 className='text-slate-500'>
                          Carefully crafted code for Components
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className='py-2'>
                    <div className='flex items-center'>
                      <div>
                        <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-slate-500 bg-slate-50 mr-3'>
                          <i className='far fa-paper-plane'></i>
                        </span>
                      </div>
                      <div>
                        <h4 className='text-slate-500'>
                          Dynamic Javascript Components
                        </h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className='w-full md:w-6/12 mr-auto px-4 pt-24 md:pt-0'>
              <img
                alt='...'
                className='max-w-full rounded-lg shadow-xl'
                style={{
                  transform:
                    'scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)',
                }}
                src='/img/documentation.png'
              />
            </div>
          </div>
        </div> */}

        {/* <div className='justify-center text-center flex flex-wrap mt-24'>
          <div className='w-full md:w-6/12 px-12 md:px-4'>
            <h2 className='font-semibold text-4xl'>Beautiful Example Pages</h2>
            <p className='text-lg leading-relaxed mt-4 mb-4 text-slate-500'>
              Notus NextJS is a completly new product built using our past
              experience in web templates. Take the examples we made for you and
              start playing with them.
            </p>
          </div>
        </div> */}
      </section>

      {/* <section className='block relative z-1 bg-slate-600'>
        <div className='container mx-auto'>
          <div className='justify-center flex flex-wrap'>
            <div className='w-full lg:w-12/12 px-4  -mt-24'>
              <div className='flex flex-wrap'>
                <div className='w-full lg:w-4/12 px-4'>
                  <h5 className='text-xl font-semibold pb-4 text-center'>
                    Login Page
                  </h5>
                  <Link href='/auth/login'>
                    <div className='hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150'>
                      <img
                        alt='...'
                        className='align-middle border-none max-w-full h-auto rounded-lg'
                        src='/img/login.jpg'
                      />
                    </div>
                  </Link>
                </div>

                <div className='w-full lg:w-4/12 px-4'>
                  <h5 className='text-xl font-semibold pb-4 text-center'>
                    Profile Page
                  </h5>
                  <Link href='/profile'>
                    <div className='hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150'>
                      <img
                        alt='...'
                        className='align-middle border-none max-w-full h-auto rounded-lg'
                        src='/img/profile.jpg'
                      />
                    </div>
                  </Link>
                </div>

                <div className='w-full lg:w-4/12 px-4'>
                  <h5 className='text-xl font-semibold pb-4 text-center'>
                    Landing Page
                  </h5>
                  <Link href='/landing'>
                    <div className='hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150'>
                      <img
                        alt='...'
                        className='align-middle border-none max-w-full h-auto rounded-lg'
                        src='/img/landing.jpg'
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className='py-16 bg-slate-600 overflow-hidden text-center flex flex-wrap'>
        <center>
        <div className='container mx-auto'>
          <div className='flex flex-wrap justify-center'>
          <div className='flex flex-wrap justify-center w-full md:w-5/12 px-12 md:px-4 ml-auto mr-auto'>
            <img src='images/binary-souls-logo.png' width={300} height={300} />
            <h3 className='text-3xl mb-2 font-semibold leading-normal text-white'>
              Binary Souls
            </h3>
            <p className='text-lg font-light leading-relaxed mt-4 mb-4 text-slate-400'>
              Since{' '}
              <a
                href='https://tailwindcss.com/?ref=creative'
                className='text-slate-300'
                target='_blank'
              >
                Tailwind CSS
              </a>{' '}
              is an open source project we wanted to continue this movement too.
              You can give this version a try to feel the design and also test
              the quality of the code!
            </p>
            <p className='text-lg font-light leading-relaxed mt-0 mb-4 text-slate-400'>
              Get it free on Github and please help us spread the news with a
              Star!
            </p>
            <a
              href='https://github.com/creativetimofficial/notus-nextjs?ref=nnjs-index'
              target='_blank'
              className='github-star mt-4 inline-block text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-slate-700 active:bg-slate-600 uppercase text-sm shadow hover:shadow-lg'
            >
              Github Star
            </a>
          </div>

          <div className='w-full md:w-4/12 px-4 mr-auto ml-auto mt-32 relative'>
            <i className='fab fa-github text-slate-700 absolute text-55 -top-150-px -right-100 left-auto opacity-80'></i>
          </div>
          </div>
        </div>
        </center>
      </section> */}

      <section className="pb-16 bg-slate-600 relative pt-32">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-slate-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center bg-white shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10">
            <div className="w-full text-center lg:w-8/12">
              <p className="text-4xl text-center">
                <span role="img" aria-label="love">
                  💪
                </span>
              </p>
              <h3 className="font-semibold text-3xl">
                So are you ready to go on a journey to make fitness fun &
                maximise your potential?
              </h3>
              <p className="text-slate-500 text-lg leading-relaxed mt-4 mb-4">
                If yes, then you are at the right place. Hit the button down
                below to Sign Up with UniFit!
              </p>
              <div className="sm:block flex flex-col mt-10">
                <a
                  href="/auth/login"
                  // target='_blank'
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-2 bg-slate-400 active:bg-slate-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Sign Up
                </a>
              </div>
              <div className="text-center mt-16"></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

// export default function Home() {
//   return (
//     <Container>
//       <Head>
//         <title>UniFit</title>
//         <meta name="description" content="The Future of Fitness is Here" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <Prose>
//         <div>
//           <Navbar />
//         </div>

//         <h2>Experience the Future of Fitness at your Home</h2>
//         <Link href="/app" className="decoration-green-500">
//           Dashboard
//         </Link>
//       </Prose>
//     </Container>
//   );
// }
