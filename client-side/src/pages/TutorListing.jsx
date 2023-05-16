import React from 'react'
import { Container, Row, Col } from "reactstrap";
import DocumentTitle from "../components/DocumentTitle/DocumentTitle"
import CommonSection from '../components/UI/CommonSection'
import TutorItem from "../components/UI/TutorItem";
import tutorData from "../assets/data/tutorData";

const TutorListing = () => {
  return (
    <DocumentTitle title="Reserver Tutor">
      <CommonSection title="Driving Tutors" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i class="ri-sort-asc"></i> Sort By
                </span>

                <select>
                  <option>Select</option>
                  <option value="low">By Female</option>
                  <option value="high">By Male</option>
                </select>
              </div>
            </Col>

            {tutorData.map((item) => (
              <TutorItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </DocumentTitle>
  )
}

export default TutorListing