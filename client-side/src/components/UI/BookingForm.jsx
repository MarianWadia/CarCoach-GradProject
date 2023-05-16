import React from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";

const BookingForm = ({service}) => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  if(service==="book"){
   return (
      <>
        <Form onSubmit={submitHandler}>
        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input type="text" placeholder="First Name" />
        </FormGroup>
        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <input type="text" placeholder="Last Name" />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input type="email" placeholder="Email" />
        </FormGroup>
        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <input type="number" placeholder="Phone Number" />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input type="text" placeholder="From Address" />
        </FormGroup>
        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <input type="text" placeholder="To Address" />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <select name="" id="">
            <option value="1 person">1 Person</option>
            <option value="2 person">2 Person</option>
            <option value="3 person">3 Person</option>
            <option value="4 person">4 Person</option>
            <option value="5+ person">5+ Person</option>
          </select>
        </FormGroup>
        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <select name="" id="">
            <option value="1 luggage">1 luggage</option>
            <option value="2 luggage">2 luggage</option>
            <option value="3 luggage">3 luggage</option>
            <option value="4 luggage">4 luggage</option>
            <option value="5+ luggage">5+ luggage</option>
          </select>
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input type="date" placeholder="Journey Date" />
        </FormGroup>
        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <input
            type="time"
            placeholder="Journey Time"
            className="time__picker"
          />
        </FormGroup>

        <FormGroup>
          <textarea
            rows={5}
            type="textarea"
            className="textarea"
            placeholder="Write"
          ></textarea>
        </FormGroup>
      </Form>
      </>
      )} else if(service==="earn"){
        return (
          <div>
            <Form onSubmit={submitHandler}>
          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input type="text" placeholder="First Name" />
          </FormGroup>
          <FormGroup className="booking__form d-inline-block ms-1 mb-4">
            <input type="text" placeholder="Last Name" />
          </FormGroup>

          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input type="email" placeholder="Email" />
          </FormGroup>
          <FormGroup className="booking__form d-inline-block ms-1 mb-4">
            <input type="number" placeholder="Phone Number" />
          </FormGroup>

          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input type="text" placeholder="Your Address" />
          </FormGroup>
          
          <FormGroup className="booking__form d-inline-block ms-1 mb-4">
            <input type="text" placeholder="Pickup Location" />
          </FormGroup>

          <FormGroup className="booking__form d-inline-block ms-1 mb-4">
            <input type="text" placeholder="Car Model" />
          </FormGroup>

          <FormGroup className="booking__form  d-inline-block ms-4 mb-4">
            <input type="file" placeholder="Upload you car image" className="upload__image__earn" />
          </FormGroup>

          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <select name="" id="">
              <option value="for rent">For Renting</option>
              <option value="for driving">For Driving Services</option>
            </select>
          </FormGroup>
          
          <FormGroup className="booking__form d-inline-block ms-1 mb-4">
            <select name="" id="">
              <option value="automatic">Automatic Car</option>
              <option value="manual">Manual Car</option>
            </select>
          </FormGroup>

          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input type="date" placeholder="Pickup Date" />
          </FormGroup>

          <FormGroup className="booking__form d-inline-block ms-1 mb-4">
            <input
              type="time"
              placeholder="Pickup Time"
              className="time__picker__earn"
            />
          </FormGroup>

          <FormGroup>
            <textarea
              rows={5}
              type="textarea"
              className="textarea"
              placeholder="Additional Details..."
            ></textarea>
          </FormGroup>

          <button className="contact__btn" type="submit">
              Upload Car
          </button>
        </Form>
        </div>
      )}
      else if(service==="join"){
        return(
          <div>
            <Form onSubmit={submitHandler}>
              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input type="text" placeholder="First Name" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                <input type="text" placeholder="Last Name" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input type="number" placeholder="Your Age" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                <input type="text" placeholder="Your Gender" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input type="email" placeholder="Email" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                <input type="number" placeholder="Phone Number" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input type="text" placeholder="Your Address" />
              </FormGroup>
          
              <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                <input type="text" placeholder="working Location" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input type="text" placeholder="Car Model" />
              </FormGroup>

              <FormGroup className="booking__form  d-inline-block ms-1 mb-4">
                <input type="number" placeholder="Years of Experience" />
              </FormGroup>

              <FormGroup className="booking__form  d-inline-block me-4 mb-4">
                <input type="file" placeholder="Upload you car image" className="upload__image__tutor" />
              </FormGroup>

              <FormGroup className="booking__form  d-inline-block ms-1 mb-4">
                <input type="file" placeholder="Upload you car image" className="upload__image__doc1" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <select name="" id="">
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </FormGroup>

              <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                <input type="date" placeholder="Pickup Date" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input
                  type="time"
                  placeholder="Pickup Time"
                  className="time__picker__join"
                />
              </FormGroup>

              <FormGroup>
                <textarea
                  rows={5}
                  type="textarea"
                  className="textarea"
                  placeholder="Additional Details..."
                ></textarea>
              </FormGroup>

              <button className="contact__btn" type="submit">
                  Upload Car
              </button>
            </Form>
        </div>
      )}
};

export default BookingForm;
