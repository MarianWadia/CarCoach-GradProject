import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import DocumentTitle from "../components/DocumentTitle/DocumentTitle.js";
import CommonSection from "../components/UI/CommonSection";
import swal from "sweetalert"
import axios from "axios"

import "../styles/contact.css";

const socialLinks = [
  {
    url: "#",
    icon: "ri-facebook-line",
  },
  {
    url: "#",
    icon: "ri-instagram-line",
  },
  {
    url: "#",
    icon: "ri-linkedin-line",
  },
  {
    url: "#",
    icon: "ri-twitter-line",
  },
];

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/contact-us', {
        name: name,
        email: email,
        message: message
      });

      setSuccess(true);
      if(success){
        swal({
          title: "Thank you for contacting us!",
          text: "We will contact you back shortly!",
          icon: "success",
          button: "Done",
        });
        setName('');
        setEmail('');
        setMessage('');
      }
      
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
      if(error){
        swal({
          title: "Try Again later",
          text: "An error occurred. Please try again later!",
          icon: "error",
          button: "close",
        });
      }
    }
  };



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <DocumentTitle title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Get In Touch</h6>

              <Form onSubmit={handleSubmit}>
                <FormGroup className="contact__form">
                  <Input placeholder="Your Name" type="text" value={name} onChange={(event) => setName(event.target.value)}/>
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input placeholder="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                    rows="5"
                    placeholder="Your Message Here..."
                    className="textarea textarea__contact"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  ></textarea>
                </FormGroup>

                <Button className="contact__btn" type="submit">
                  Send Message
                </Button>
              </Form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0">
                  123 El Sheikh Zayed, Cairo, Egypt
                </p>
                <div className=" d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className="section__description mb-0">+1-202-555-0149</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">carcoach578@gmail.com</p>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>

                <div className=" d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social__link-icon"
                    >
                      <i class={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </DocumentTitle>
  );
};

export default Contact;
