import http from 'axios'

export default {
    createProject: data => http.post('projects', data),
    fetchProjects: data => http.get('projects', data),
}
