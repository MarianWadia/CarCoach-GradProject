import React from 'react'
import { Container, Row, Col } from "reactstrap";
import DocumentTitle from "../components/DocumentTitle/DocumentTitle"
import CommonSection from '../components/UI/CommonSection'
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData";

const CarListing = () => {
  return (
    <DocumentTitle title="Renting cars">
      <CommonSection title="Cars for Renting" />
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
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col>

            {carData.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </DocumentTitle>
  )
}

export default CarListing