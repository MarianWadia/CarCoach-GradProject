import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "reactstrap";
import DocumentTitle from "../components/DocumentTitle/DocumentTitle"
import CommonSection from '../components/UI/CommonSection'
import TutorItem from "../components/UI/TutorItem";
import axios from "axios"



const TutorListing = () => {
  const [data, setData] = useState(null);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/tutors-applicants');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log(data);

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
                  <option value="low">Female</option>
                  <option value="high">Male</option>
                </select>
              </div>
            </Col> 

            {data?data.map((item) => (
              <TutorItem item={item} key={item.id} />
            )):(<p>Loading data...</p>)}
          </Row>
        </Container>
      </section>
    </DocumentTitle>
  )
}

export default TutorListing