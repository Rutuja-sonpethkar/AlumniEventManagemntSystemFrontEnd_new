import axios from "axios";

const BASE_URL = "http://localhost:8080";

class AlumniServices {
  getDepartments() {
    return axios.get(`${BASE_URL}/api/ViewAllDepartemnt`);
  }

  getOrganizations() {
    return axios.get(`${BASE_URL}/api/viewAllOrgnzation`);
  }

  getBatches() {
    return axios.get(`${BASE_URL}/api/ViewAllBatches`);
  }
  getAdmins() {
    return axios.get(`${BASE_URL}/api/viewAllAdmin`);
  }
   getEvents  () {
    return axios.get(`${BASE_URL}/api/events/viewAllevents`);
  }
   getStudents () {
    return axios.get(`${BASE_URL}/api/viewAllAlumni`); // Adjust the endpoint if different
  }

 

}

export default new AlumniServices();
