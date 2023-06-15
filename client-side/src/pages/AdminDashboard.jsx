import React from 'react'
import "../styles/admin.css"
import {Link} from 'react-router-dom'
import CommonSection from '../components/UI/CommonSection'
import DocumentTitle from '../components/DocumentTitle/DocumentTitle'

const AdminDashboard = () => {
  return (
    <div>
        <CommonSection title="Admin Dashboard" />
        <div className='left__admin'>
            <Link to=''>
              <h4>users</h4>
            </Link>
            <Link to=''>
              <h4>Tutors</h4>
            </Link>
            <Link to=''>
              <h4>Reservations</h4>
            </Link>
            <Link to=''>
              <h4>Renting</h4>
            </Link>
            <Link to=''>
              <h4>Car Uploads</h4>
            </Link>
        </div>
    </div>
  )
}

export default AdminDashboard