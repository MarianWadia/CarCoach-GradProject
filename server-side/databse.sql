CREATE DATABASE IF NOT EXISTS carcoach;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) UNIQUE NOT NULL,
  last_name VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT
);

CREATE TABLE IF NOT EXISTS tutors (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  is_own_car BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS cars (
  id SERIAL PRIMARY KEY,
  motor_type VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  color VARCHAR(255),
  license_plate VARCHAR(20) UNIQUE NOT NULL,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  owner_id INTEGER REFERENCES users(id),
  tutor_id INTEGER REFERENCES tutors(id)
);

CREATE TABLE IF NOT EXISTS tutor_reservations (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  tutor_id INTEGER REFERENCES tutors(id),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  location TEXT,
  status VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS reservation_payments (
  id SERIAL PRIMARY KEY,
  reservation_id INTEGER REFERENCES tutor_reservations(id),
  amount NUMERIC NOT NULL,
  payment_time TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS tutor_payments (
  id SERIAL PRIMARY KEY,
  tutor_id INTEGER REFERENCES tutors(id),
  amount NUMERIC NOT NULL,
  payment_time TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS rentals (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  reservation_id INTEGER REFERENCES tutor_reservations(id),
  car_id INTEGER REFERENCES cars(id),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  pickup_location TEXT,
  return_location TEXT,
  status VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS rental_payments (
  id SERIAL PRIMARY KEY,
  rental_id INTEGER REFERENCES rentals(id),
  amount NUMERIC NOT NULL,
  payment_time TIMESTAMP NOT NULL
);