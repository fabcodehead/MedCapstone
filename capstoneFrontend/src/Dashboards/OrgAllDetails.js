import React, { useState, useEffect } from 'react'
import '../Landing Page/Navbar.css'
import './styles.css'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import { Button } from '../Landing Page/Button'
import '../Landing Page/Navbar.css'
import { signout } from '../CallingApi/patientapi'

function OrgAllDetails({ history }) {
  console.log(history)

  const {
    age,
    allergies,
    bloodgroup,
    createdAt,
    emergency_no,
    gender,
    medication,
    occur_cond,
  } = history.location.state

  const { patient_name } = history.location.state.userinfo

  console.log(
    age,
    allergies,
    bloodgroup,
    createdAt,
    emergency_no,
    gender,
    medication,
    occur_cond
  )
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  useEffect(() => {
    showButton()
    window.addEventListener('resize', showButton)
    return () => {
      window.removeEventListener('resize', showButton)
    }
  }, [])
  //
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar'>
          <div className='navbar-container container'>
            <Link
              to='/org/dashboard'
              className='navbar-logo'
              onClick={closeMobileMenu}>
              Dashboard
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <div
                  className='nav-links'
                  onClick={
                    (closeMobileMenu,
                    () => {
                      history.push('/org/allDetails', history.location.state)
                    })
                  }>
                  Basic Details
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className='nav-links'
                  onClick={
                    (closeMobileMenu,
                    () => {
                      history.push(
                        '/org/dashboard/graph',
                        history.location.state
                      )
                    })
                  }>
                  Health Status
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className='nav-links'
                  onClick={
                    (closeMobileMenu,
                    () => {
                      history.push(
                        '/org/dashboard/prescription',
                        history.location.state
                      )
                    })
                  }>
                  Prescriptions
                </div>
              </li>
              <li className='nav-btn'>
                {button ? (
                  <Button
                    buttonStyle='btn--outline'
                    onClick={() => {
                      signout(() => {
                        history.push('/users/login')
                      })
                    }}>
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    buttonStyle='btn--outline'
                    buttonSize='btn--mobile'
                    onClick={
                      (closeMobileMenu,
                      () => {
                        signout(() => {
                          history.push('/users/login')
                        })
                      })
                    }>
                    Sign Out
                  </Button>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>

      {/*<div>
        <h1>This is Organisation view panal</h1>
        <Link to='/org/dashboard'>
          {' '}
          <button>Go back To Dashboard</button>{' '}
        </Link>
        <br></br>
        <br></br>
        <button
          onClick={() => {
            history.push('/org/dashboard/prescription', history.location.state)
          }}>
          Prescription
        </button>
        <br></br>
        <button
          onClick={() => {
            history.push('/org/dashboard/graph', history.location.state)
          }}>
          Graph
        </button>
        <br></br>
      </div>*/}
      <div className='wrapper'>
        <title>Basic Details</title>
        <div className='form'>
          <div className='inputfield'>
            <p>
              {' '}
              Name : <b>{patient_name}</b>
            </p>
          </div>
          <div className='inputfield'>
            <p>
              {' '}
              Age : <b>{age}</b>
            </p>
          </div>
          <div className='inputfield'>
            <p>
              Gender : <b>{gender}</b>
            </p>
          </div>
          <div className='inputfield'>
            <p>
              Allergies : <b>{allergies}</b>
            </p>
          </div>
          <div className='inputfield'>
            <p>
              Bloodgroup : <b>{bloodgroup}</b>
            </p>
          </div>
          <div className='inputfield'>
            <p>
              Medication : <b>{medication}</b>
            </p>
          </div>
          <div className='inputfield'>
            <p>
              Occured Condition : <b>{occur_cond}</b>
            </p>
          </div>
          <div className='inputfield'>
            <p>
              Emergency Number : <b>{emergency_no}</b>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrgAllDetails
