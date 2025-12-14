import api from './config'

const GetCourses = () => api.get('/courses/');
const GetCourseDetail = (id) => api.get(`/courses/${id}/`);
const GetEnrolledCourses = () => api.get('/my-courses/');
const EnrollCourse = (courseId) => api.post('/enroll/', { course: courseId });
const GetCourseUnits = (courseId) => api.get(`/courses/${courseId}/units/`);
const GetUnitDetail = (unitId) => api.get(`/units/${unitId}/`);

export { GetCourses, GetCourseDetail, GetEnrolledCourses, EnrollCourse, GetCourseUnits, GetUnitDetail }