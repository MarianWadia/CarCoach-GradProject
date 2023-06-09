import React, { useCallback, useEffect, useState } from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import axios from "axios"

const BookingForm = ({service}) => {
  const [userId, setUserId] = useState(useParams().id)
  const [responseObject, setResponseObject] = useState({});
  // const [tutorId, setTutorId] = useState(0)



  const submitTutorHandler = useCallback(async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    
    const response = await axios.post(`http://localhost:8080/api/tutors-applicants/${userId}`, data);
    const responseData  = await response.data;
    setResponseObject(responseData);
    console.log(responseObject);
    window.location=responseData.redirectionLink;
    // setTutorId(responseObject.tutorId);
  },[])
  const tutorMessage = responseObject?.message;
  // const tutorId = responseObject?.tutorId;

  const {tutorId} = useParams();
  const submitTutorCarHandler = useCallback(async(event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    
    const response = await axios.post(`http://localhost:8080/api/tutors-applicants/car/${tutorId}`, data);
    const responseData  = await response.data;
    setResponseObject(responseData);
    console.log(responseObject);
  }, [tutorId])
  const tutorCarMessage = responseObject?.message;

  if(service==="book"){
   return (
      <>
        <Form onSubmit={''}>
        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input type="text" required placeholder="First Name" name="first_name"/>
        </FormGroup>
        <FormGroup className="booking__form d-inline-block mb-4">
          <input type="text" required placeholder="Last Name" name="last_name"/>
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input type="email" required placeholder="Email" name="email" />
        </FormGroup>
        <FormGroup className="booking__form d-inline-block mb-4">
          <input type="number" required placeholder="Phone Number" name="phone"/>
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input type="text" required placeholder="From Address" name="from_address" />
        </FormGroup>
        <FormGroup className="booking__form d-inline-block mb-4">
          <input type="text" required placeholder="To Address" name="to_address" />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <select name="persons" id="">
            <option value="1 person">1 Person</option>
            <option value="2 person">2 Person</option>
            <option value="3 person">3 Person</option>
            <option value="4 person">4 Person</option>
            <option value="5+ person">5+ Person</option>
          </select>
        </FormGroup>
        <FormGroup className="booking__form d-inline-block mb-4">
          <select name="luggage" id="">
            <option value="1 luggage">1 luggage</option>
            <option value="2 luggage">2 luggage</option>
            <option value="3 luggage">3 luggage</option>
            <option value="4 luggage">4 luggage</option>
            <option value="5+ luggage">5+ luggage</option>
          </select>
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input type="date" required placeholder="Journey Date" name="date"/>
        </FormGroup>
        <FormGroup className="booking__form d-inline-block mb-4">
          <input
            type="time"
            required placeholder="Journey Time"
            className="time__picker"
            name="time"
          />
        </FormGroup>

        <FormGroup>
          <textarea
            rows={5}
            type="textarea"
            className="textarea"
            required placeholder="Write"
            name="details"
          ></textarea>
        </FormGroup>
      </Form>
      </>
      )} else if(service==="earn"){
        return (
          <div>
            <Form onSubmit={''}>
          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input type="text" required placeholder="First Name" name="first_name"/>
          </FormGroup>

          <FormGroup className="booking__form d-inline-block mb-4">
            <input type="number" required placeholder="Phone Number" name="last_name" />
          </FormGroup>

          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input type="email" required placeholder="Email" name="email"/>
          </FormGroup>

          <FormGroup className="booking__form d-inline-block mb-4">
            <input type="text" required placeholder="Your Address" name="address" />
          </FormGroup>         

          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input type="number" required placeholder="Speed Per Hour" name="hour_speed" />
          </FormGroup>
          
          <FormGroup className="booking__form d-inline-block mb-4">
            <input type="text" required placeholder="Pickup Location" name="from_address"/>
          </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input type="text" required placeholder="Car Model" name="model"  />
          </FormGroup>

          <FormGroup className="booking__form  d-inline-block mb-4">
            <input type="file" required placeholder="Upload you car image" name= "car_image" className="upload__image__earn" />
          </FormGroup>

          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <select name="usage" id="">
              <option value="renting">For Renting</option>
              <option value="coaching">For Driving Services</option>
            </select>
          </FormGroup>
          
          <FormGroup className="booking__form d-inline-block mb-4">
            <select name="motor_type" id="">
              <option value="automatic">Automatic Car</option>
              <option value="manual">Manual Car</option>
            </select>
          </FormGroup>

          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input type="date" required className="time__picker__earn" name="available_from"/>
          </FormGroup>

          <FormGroup className="booking__form d-inline-block mb-4">
            <input
              type="number"
              required placeholder="Price Per Hour"
              name="hour_price"
            />
          </FormGroup>

          <FormGroup>
            <textarea
              rows={5}
              type="textarea"
              className="textarea"
              required placeholder="Additional Details..."
              name="details"
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
            <Form onSubmit={submitTutorHandler}>
              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input type="text" required placeholder="First Name"name="first_name" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block mb-4">
                <input type="text" required placeholder="Last Name" name="last_name"  />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input type="number" required placeholder="Your Age" name="age" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block mb-4">
                <input type="text" required placeholder="Your Gender" name="gender" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input type="email" required placeholder="Email" name="email" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block mb-4">
                <input type="tel" required placeholder="Phone Number" name="phone" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input type="text" required placeholder="Your Address" name="address" />
              </FormGroup>

              <FormGroup className="booking__form  d-inline-block mb-4">
                <input type="number" required placeholder="Years of Experience" name="experience_years" />
              </FormGroup>

              <FormGroup className="booking__form  d-inline-block me-4 mb-4">
                <input type="file" required placeholder="Upload you car image" className="upload__image__tutor" name="driver_image" />
              </FormGroup>

              <FormGroup className="booking__form  d-inline-block mb-4">
                <input type="file" required placeholder="Upload you car image" className="upload__image__doc1" name="driver_license" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input
                  type="time"
                  required placeholder="Pickup Time"
                  className="time__picker__join"
                  name="interview_time"
                />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block mb-4">
                <input type="date" required placeholder="Pickup Date"name="interview_date" />
              </FormGroup>
              

              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input type="text" required placeholder="working Location" name="working_location" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block mb-4">
                <select name="is_own_car" id="" placeholder="Have a car">
                  <option value="">Have A car</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </FormGroup>

              <FormGroup>
                <textarea
                  rows={5}
                  type="textarea"
                  className="textarea"
                  required placeholder="Write a Brief About Yourself..."
                  name="bio"
                ></textarea>
              </FormGroup>
              {tutorMessage && <p>{tutorMessage}</p>}
              <button className="contact__btn" type="submit">
                  Apply Now
              </button>

              {/* <Link to={id ? `join-us/${id}/upload-car/${tutorId}`: 'join-us/upload-car'} >
                <button  className="contact__btn ms-2" type="button">
                    Upload car Details Here
                </button>
              </Link> */}
            </Form>
          </div>
      )}
      
      else if(service==="tutorCar"){
       
        return (
          <div>
            <Form onSubmit={submitTutorCarHandler}>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <input type="text" required placeholder="Car Model" name="model" />
            </FormGroup>

            <FormGroup className="booking__form  d-inline-block mb-4">
              <input type="file" required placeholder="Upload you car image" className="upload__image__earn" name= "car_image"/>
            </FormGroup>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <input type="text" required placeholder="Car color" name="color" />
            </FormGroup>
            
            <FormGroup className="booking__form d-inline-block mb-4">
              <select name="motor_type" id="">
                <option value="automatic">Automatic Car</option>
                <option value="manual">Manual Car</option>
              </select>
            </FormGroup>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <input type="text" required placeholder="License plate" name="license_plate" />
            </FormGroup>

            <FormGroup className="booking__form d-inline-block mb-4">
              <input
                type="text"
                required placeholder="Year Model"
                name="year"
              />
            </FormGroup>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input type="number" required placeholder="Speed Per Hour" name="hour_speed" />
          </FormGroup>

            <FormGroup className="booking__form d-inline-block mb-4">
              <input
                type="number"
                required placeholder="price per hour"
                name="hour_price"
              />
            </FormGroup>

            <FormGroup>
              <textarea
                rows={5}
                type="textarea"
                className="textarea"
                required placeholder="Additional Details..."
                name="details"
              ></textarea>
            </FormGroup>
            {tutorCarMessage && <p>{tutorCarMessage}</p>}
            <button className="contact__btn" type="submit">
                Upload Car
            </button>
          </Form>
        </div>
      )}
};

export default BookingForm;
