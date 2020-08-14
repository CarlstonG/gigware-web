import api from '@/modules/tracker/services/tracker.api'

export default {
    createProject(context, form) {
        return new Promise((resolve, reject) => {
            api.createProject(form)
                .then(({ data }) => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    fetchProjects(context, form) {
        return new Promise((resolve, reject) => {
            api.fetchProjects(form)
                .then(({ data }) => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
}
