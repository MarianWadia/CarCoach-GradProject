import React from 'react'
import DocumentTitle from "../components/DocumentTitle/DocumentTitle"
import CommonSection from "../components/UI/CommonSection"
import { Col, Container, Row } from 'reactstrap'
import BookingForm from '../components/UI/BookingForm'

const JoinUs = () => {
  return (
    <DocumentTitle title="Join us">
      <CommonSection title="Apply to be a Tutor" />
      <section>
        <Container>
          <Row>
            <Col lg="12" md="12">
              <h6 className="fw-bold mb-4">Apply Now To be a Tutor</h6>
              <BookingForm service="join"/>
            </Col>
          </Row>
        </Container>
      </section>

    </DocumentTitle>
  )
}

export default JoinUs