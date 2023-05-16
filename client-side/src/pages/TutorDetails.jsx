import React, { useEffect } from 'react'
import tutorData from "../assets/data/tutorData"
import { Container, Row, Col } from "reactstrap";
import DocumentTitle from '../components/DocumentTitle/DocumentTitle';
import { useParams } from "react-router-dom";
import BookingForm from '../components/UI/BookingForm';
import PaymentMethod from '../components/UI/PaymentMethod';
import {AiOutlineUser, AiFillMessage} from "react-icons/ai"
import {TbCertificate} from "react-icons/tb"
import {MdEventAvailable, MdLanguage} from "react-icons/md"
import {HiOutlineLocationMarker} from "react-icons/hi"


const TutorDetails = () => {
  const { name } = useParams();

  const singleTutorItem = tutorData.find((item) => item.name ===  name);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleTutorItem]);

  return (
    <DocumentTitle title={singleTutorItem.name}>
      <section>
        <Container>
          <Row>
            <Col lg="5" md="12" sm="12">
              <img src={singleTutorItem.imageUrl} alt="" className="w-100" />
            </Col>
            <Col lg="7" md="12" sm="12">
              <div className="car__info">
                <h2 className="section__title">{singleTutorItem.name}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                  {singleTutorItem.yearsOfExperience} <span>years of Experience</span>
                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    ({singleTutorItem.rating} ratings)
                  </span>
                </div>

                <p className="section__description">
                  {singleTutorItem.bio}
                </p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <AiOutlineUser color='#f9a826'/>{" "}
                    {singleTutorItem.gender}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <TbCertificate color='#f9a826'/>{" "}
                    <span>
                    {singleTutorItem.certifications.map((item, index)=>(
                      <span key={index}>{item}{index===singleTutorItem.certifications.length-1? " ": " - "}</span>
                      ))}
                    </span>
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <MdEventAvailable color='#f9a826' />{" "}
                    {singleTutorItem.availableDays.map((item, index)=>(
                      <span key={index}>{item}{index===singleTutorItem.availableDays.length-1? " ": " - "}</span>
                      ))}
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "1.8rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <HiOutlineLocationMarker color='#f9a826'/>{" "}
                    <span>{singleTutorItem.location}</span>
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <AiFillMessage color='#f9a826'/>{" "}
                    <span>
                      <span>{singleTutorItem.contact.email} - </span>
                      <span>{singleTutorItem.contact.phone}</span>
                    </span>
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                   <MdLanguage color='#f9a826' />{" "}
                   <span>
                    {singleTutorItem.languages.map((item, index)=>(
                      <span key={index}>{item}{index===singleTutorItem.languages.length-1? " ": " - "}</span>
                      ))}
                    </span>
                  </span>
                </div>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                <BookingForm service="book"/>
              </div>
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Payment Information</h5>
                <PaymentMethod />
              </div>
            </Col>

          </Row>
        </Container>
      </section>
    </DocumentTitle>
  )
}

export default TutorDetails