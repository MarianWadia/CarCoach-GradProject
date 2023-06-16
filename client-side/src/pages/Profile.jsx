import React from 'react'
import DocumentTitle from '../components/DocumentTitle/DocumentTitle'
import CommonSection from '../components/UI/CommonSection'
import "../styles/profile.css"

const Profile = () => {
  return (
    <DocumentTitle title="Profile">
      <CommonSection title="Your Profile" />
      <section>
        <h1 className='brand__name__profile'>CarCoach</h1>
            <div className="signup__form__profile">
                <h2 className='welcome__text__profile'>Welcome Back</h2>
            </div>
        </section>
    </DocumentTitle>
  )
}

export default Profile