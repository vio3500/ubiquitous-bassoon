import React from 'react';
import { useParams } from 'react-router-dom';

function CourseDetails() {
  const { course_id } = useParams();

  return <div>Course Details for ID: {course_id}</div>;
}

export default CourseDetails;