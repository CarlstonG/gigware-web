import { required } from 'vuelidate/lib/validators'

export default {
    createProject: {
        form: {
            project_name: { required },
            street: { required },
            city: { required },
            province: { required },
            zip_code: { required },
            country: { required },
        },
    }
}
