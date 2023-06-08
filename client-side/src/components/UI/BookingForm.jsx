import React from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import { Link } from 'react-router-dom';

const BookingForm = ({service}) => {

  const submitHandler = (event) => {
    event.preventDefault();
  };

  if(service==="book"){
   return (
      <>
        <Form onSubmit={submitHandler}>
        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input type="text" required placeholder="First Name" />
        </FormGroup>
        <FormGroup className="booking__form d-inline-block mb-4">
          <input type="text" required placeholder="Last Name" />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input type="email" required placeholder="Email" />
        </FormGroup>
        <FormGroup className="booking__form d-inline-block mb-4">
          <input type="number" required placeholder="Phone Number" />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input type="text" required placeholder="From Address" />
        </FormGroup>
        <FormGroup className="booking__form d-inline-block mb-4">
          <input type="text" required placeholder="To Address" />
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
        <FormGroup className="booking__form d-inline-block mb-4">
          <select name="" id="">
            <option value="1 luggage">1 luggage</option>
            <option value="2 luggage">2 luggage</option>
            <option value="3 luggage">3 luggage</option>
            <option value="4 luggage">4 luggage</option>
            <option value="5+ luggage">5+ luggage</option>
          </select>
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input type="date" required placeholder="Journey Date" />
        </FormGroup>
        <FormGroup className="booking__form d-inline-block mb-4">
          <input
            type="time"
            required placeholder="Journey Time"
            className="time__picker"
          />
        </FormGroup>

        <FormGroup>
          <textarea
            rows={5}
            type="textarea"
            className="textarea"
            required placeholder="Write"
          ></textarea>
        </FormGroup>
      </Form>
      </>
      )} else if(service==="earn"){
        return (
          <div>
            <Form onSubmit={submitHandler}>
          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input type="text" required placeholder="First Name" />
          </FormGroup>

          <FormGroup className="booking__form d-inline-block mb-4">
            <input type="number" required placeholder="Phone Number" />
          </FormGroup>

          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input type="email" required placeholder="Email" />
          </FormGroup>

          <FormGroup className="booking__form d-inline-block mb-4">
            <input type="text" required placeholder="Your Address" />
          </FormGroup>         

          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input type="number" required placeholder="Speed Per Hour" />
          </FormGroup>
          
          <FormGroup className="booking__form d-inline-block mb-4">
            <input type="text" required placeholder="Pickup Location" />
          </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input type="text" required placeholder="Car Model" />
          </FormGroup>

          <FormGroup className="booking__form  d-inline-block mb-4">
            <input type="file" required placeholder="Upload you car image" className="upload__image__earn" />
          </FormGroup>

          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <select name="" id="">
              <option value="renting">For Renting</option>
              <option value="coaching">For Driving Services</option>
            </select>
          </FormGroup>
          
          <FormGroup className="booking__form d-inline-block mb-4">
            <select name="" id="">
              <option value="automatic">Automatic Car</option>
              <option value="manual">Manual Car</option>
            </select>
          </FormGroup>

          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input type="date" required className="time__picker__earn" />
          </FormGroup>

          <FormGroup className="booking__form d-inline-block mb-4">
            <input
              type="number"
              required placeholder="Price Per Hour"
            />
          </FormGroup>

          <FormGroup>
            <textarea
              rows={5}
              type="textarea"
              className="textarea"
              required placeholder="Additional Details..."
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
                <input type="text" required placeholder="First Name" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block mb-4">
                <input type="text" required placeholder="Last Name" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input type="number" required placeholder="Your Age" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block mb-4">
                <input type="text" required placeholder="Your Gender" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input type="email" required placeholder="Email" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block mb-4">
                <input type="tel" required placeholder="Phone Number" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input type="text" required placeholder="Your Address" />
              </FormGroup>

              <FormGroup className="booking__form  d-inline-block mb-4">
                <input type="number" required placeholder="Years of Experience" />
              </FormGroup>

              <FormGroup className="booking__form  d-inline-block me-4 mb-4">
                <input type="file" required placeholder="Upload you car image" className="upload__image__tutor" />
              </FormGroup>

              <FormGroup className="booking__form  d-inline-block mb-4">
                <input type="file" required placeholder="Upload you car image" className="upload__image__doc1" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input
                  type="time"
                  required placeholder="Pickup Time"
                  className="time__picker__join"
                />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block mb-4">
                <input type="date" required placeholder="Pickup Date" />
              </FormGroup>
              

              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input type="text" required placeholder="working Location" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block mb-4">
                <select name="" id="" placeholder="Have a car">
                  <option value="">Have A car</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </FormGroup>

              <FormGroup>
                <textarea
                  rows={5}
                  type="textarea"
                  className="textarea"
                  required placeholder="Additional Details..."
                ></textarea>
              </FormGroup>

              <button className="contact__btn" type="submit">
                  Apply Now
              </button>

              <Link to="/upload-car" >
                <button  className="contact__btn ms-2" type="button">
                    Upload car Details Here
                </button>
              </Link>
            </Form>
          </div>
      )}
      
      else if(service==="tutorCar"){
        return (
          <div>
            <Form onSubmit={submitHandler}>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <input type="text" required placeholder="Car Model" />
            </FormGroup>

            <FormGroup className="booking__form  d-inline-block mb-4">
              <input type="file" required placeholder="Upload you car image" className="upload__image__earn" />
            </FormGroup>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <input type="text" required placeholder="Car color" />
            </FormGroup>
            
            <FormGroup className="booking__form d-inline-block mb-4">
              <select name="" id="">
                <option value="automatic">Automatic Car</option>
                <option value="manual">Manual Car</option>
              </select>
            </FormGroup>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <input type="text" required placeholder="License plate" />
            </FormGroup>

            <FormGroup className="booking__form d-inline-block mb-4">
              <input
                type="text"
                required placeholder="Year Model"
              />
            </FormGroup>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input type="number" required placeholder="Speed Per Hour" />
          </FormGroup>

            <FormGroup className="booking__form d-inline-block mb-4">
              <input
                type="number"
                required placeholder="price per hour"
              />
            </FormGroup>

            <FormGroup>
              <textarea
                rows={5}
                type="textarea"
                className="textarea"
                required placeholder="Additional Details..."
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
