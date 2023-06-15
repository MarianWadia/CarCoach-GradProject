const express = require('express');
const router = express.Router();
const pool = require('../db');



router.post('/sessions/:id?/:student_id', async (req, res) => {
    const { start_time, session_date, session_duration, location } = req.body;
    const admin_id = req.params.id || null;
    const {student_id} = req.params
    try {
      if(admin_id==null){
        res.json({unauthorizedMessage: "You should Login First. If You Don't have an account Signup Now!"});
      }else{
        const data = await pool.query(
          'INSERT INTO sessions (admin_id, student_id, start_time, session_date, session_duration, location) VALUES ($1, $2, $3, $4, $5, $6)',
         [admin_id, student_id, start_time, session_date, session_duration, location]
        );
        res.status(201).json({doneMessage: "Data Uploaded Successfully Thank You!"});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get("/sessions-students/:student_id?", async (req, res)=>{
    const {student_id} = req.params || null;
    try {
        if(student_id==null){
            res.json({unauthorizedMessage: "You should Login First. If You Don't have an account Signup Now!"});
        }else{
            const studentTutor = await pool.query(`SELECT ta.first_name, ta.last_name
            FROM tutors_applicants ta
            JOIN tutor_reservations tr ON ta.id = tr.tutor_id
            JOIN students st ON tr.id = st.reservation_id
            JOIN sessions s ON st.id = s.student_id
            WHERE st.id = ${student_id}`);
            const {first_name, last_name} = studentTutor.rows[0];
            const upcomingSession = await pool.query(`SELECT session_date, session_duration, start_time, location
            FROM sessions WHERE student_id = ${student_id}`);
            const sessionDetails = upcomingSession.rows[0];
            const data = await pool.query(`SELECT left_sessions FROM students WHERE id = ${student_id}`);
            const {left_sessions} = data.rows[0]
            res.status(200).json({
                tutorName: `${first_name} ${last_name}`,
                sessionsDetails: {sessionDetails, left_sessions}
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
  })

  router.get("/sessions-tutors/:tutor_id?", async (req, res)=>{
    const {tutor_id} = req.params || null;
    try {
        if(tutor_id==null){
            res.json({unauthorizedMessage: "You should Login First. If You Don't have an account Signup Now!"});
        }else{
            const response = await pool.query(`SELECT tr.name, tr.phone, tr.email, st.status, st.left_sessions, s.start_time, 
            s.location, s.session_date, s.session_duration 
            FROM tutor_reservations tr
            JOIN students st ON tr.id = st.reservation_id 
            JOIN sessions s ON st.id = s.student_id WHERE tr.tutor_id=${tutor_id}`);
            const studentsData  = response.rows;
            res.status(200).json(studentsData)
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
  })

  router.get("/sessions", async (req, res)=>{
    try {
        const result = await pool.query(`SELECT * FROM sessions`);
        const response = result.rows;
        res.status(200).json(response)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
  })

  // delete session by admin
  router.delete("/sessions/:session_id", async (req, res)=>{
  try {
    const {session_id} = req.params;
      const result = await pool.query(`DELETE FROM sessions WHERE id=${session_id}`);
      res.status(200).json({message: "Deleted successfully!"})
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
  }
})


module.exports = router;