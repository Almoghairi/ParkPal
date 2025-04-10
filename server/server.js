const express = require('express');
const cors = require('cors');
const CourseModel = require('./courses.js'); // Ensure this path is correct

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/courses', (req, res) => {
  try {
    const courses = CourseModel.getAllCourses(); // This function returns the courses array
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

app.get('/api/courses/:id', (req, res) => {
  try {
    const course = CourseModel.getCourseById(req.params.id);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course' });
  }
});

// Start the server using Express
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
