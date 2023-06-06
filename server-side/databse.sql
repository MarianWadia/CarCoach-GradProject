CREATE DATABASE IF NOT EXISTS carcoach;

-- *DONE*
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  reset_token VARCHAR(255) DEFAULT NULL,
  reset_token_expires_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

-- *DONE*
CREATE TABLE IF NOT EXISTS tutors_applicants (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  age INTEGER NOT NULL,
  gender VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  is_own_car BOOLEAN,
  is_accepted BOOLEAN NOT NULL DEFAULT FALSE,
  experience_years INTEGER NOT NULL,
  driver_license VARCHAR(255) NOT NULL,
  driver_image VARCHAR(255) NOT NULL,
  working_location VARCHAR(255) NOT NULL,
  interview_time TIME NOT NULL,
  interview_date DATE NOT NULL,
  bio TEXT NOT NULL
);

-- *Not Created yet
-- CREATE TABLE IF NOT EXISTS tutor_cars (
--   id SERIAL PRIMARY KEY,
--   tutor_id INTEGER REFERENCES tutors_applicants(id),
--   -- motor_type ENUM('manual', 'automatic') NOT NULL,
--   -- model VARCHAR(255) NOT NULL,
--   -- year INTEGER NOT NULL,
--   -- color VARCHAR(255),
--   -- license_plate VARCHAR(20) UNIQUE NOT NULL,
--   car_image VARCHAR(255) NOT NULL,
--   car_id INTEGER REFERENCES car_uploads(id),
--   usage VARCHAR(255) DEFAULT 'coaching' NOT NULL,
-- )

CREATE TABLE IF NOT EXISTS car_uploads (
  id SERIAL PRIMARY KEY,
  tutor_id INTEGER REFERENCES tutors_applicants(id),
  motor_type VARCHAR(255) NOT NULL CHECK (motor_type IN ('manual', 'automatic')),
  model VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  color VARCHAR(255),
  license_plate VARCHAR(20) UNIQUE NOT NULL,
  car_image VARCHAR(255) NOT NULL,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  owner_id INTEGER REFERENCES users(id),
  usage VARCHAR(255) NOT NULL CHECK (usage IN ('coaching', 'renting')),
  is_tutor BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT
);

CREATE TABLE IF NOT EXISTS tutor_reservations (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  tutor_id INTEGER REFERENCES tutors(id),
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  status VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS reservation_payments (
  id SERIAL PRIMARY KEY,
  reservation_id INTEGER REFERENCES tutor_reservations(id),
  amount NUMERIC NOT NULL,
  payment_time TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS tutor_payments (
  id SERIAL PRIMARY KEY,
  tutor_id INTEGER REFERENCES tutors(id),
  amount NUMERIC NOT NULL,
  payment_time TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS rentals (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  reservation_id INTEGER REFERENCES tutor_reservations(id),
  car_id INTEGER REFERENCES cars(id),
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  pickup_location TEXT,
  return_location TEXT,
  status VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS rental_payments (
  id SERIAL PRIMARY KEY,
  rental_id INTEGER REFERENCES rentals(id),
  amount NUMERIC NOT NULL,
  payment_time TIMESTAMP WITH TIME ZONE NOT NULL
);

-- *DONE*
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  message_timestamp TIMESTAMP WITH TIME ZONE NOT NULL
);

