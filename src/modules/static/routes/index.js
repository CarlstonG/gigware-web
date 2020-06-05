import Faq from "@/modules/static/views/Faq";
import Terms from "@/modules/static/views/Terms";
import ContactUs from "@/modules/static/views/ContactUs";

export default [
    {
        path: '/faq',
        name: 'faq',
        component: Faq,
    },
    {
        path: '/terms',
        name: 'terms',
        component: Terms,
    },
    {
        path: '/contact-us',
        name: 'contact-us',
        component: ContactUs,
    },
]
