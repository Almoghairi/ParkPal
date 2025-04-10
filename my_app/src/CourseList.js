// CourseList.js
import React, { useState, useEffect } from 'react';

function Course() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/courses');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setCourses(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="course-list">
      <h1>Available Courses</h1>
      <div className="course-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h2>{course.title}</h2>
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Description:</strong> {course.description}</p>
            <p><strong>Enrolled Students:</strong> {course.enrolledStudents}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Course;
