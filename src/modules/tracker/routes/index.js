import TrackerLayout from '@/modules/tracker/views/tracker/Tracker'

export default [
    {
        path: '/tracker/dashboard',
        name: 'tracker.dashboard',
        component: TrackerLayout,
        beforeEnter: (to, from, next) => {
            // check for tracker
            if (localStorage.getItem('tracker') != null) {
                next()
            } else {
                window.location.href = '/tracker-login'
            }

        },
        meta: {
            title: 'Tracker Dashboard',
            requiresAuth: true
        }
    }
]
