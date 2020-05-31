import Layout from "../views/settings/Layout";
import BasicInformation from "../views/settings/BasicInformation";
import RatesAndLocation from "../views/settings/RatesAndLocation";
import Availability from "../views/settings/Availability";
import Licenses from "../views/settings/Licenses";
import Experience from "../views/settings/Experience";
import InsuranceProof from "../views/settings/InsuranceProof";
import RatingsAndReviews from "../views/settings/RatingsAndReviews";
import Confirmation from "../views/settings/Confirmation";

export default [
  {
    path: '/settings',
    component: Layout,
    name: 'provider.settings',
    redirect: { name: 'provider.settings.basic-information' },
    children: [
      {
        path: 'basic-information',
        name: 'provider.settings.basic-information',
        component: BasicInformation,
        meta: {
          step: 1,
          title: 'Basic Information',
          subtitle:
            'We encourage all members to include as much profile information as possible. This helps your team stand out against the competiiton.',
        },
      },
      {
        path: 'rates-and-location',
        name: 'provider.settings.rates-and-location',
        component: RatesAndLocation,
        meta: {
          step: 2,
          title: 'Rates and Location',
          subtitle:
            'Let your customers know how much you charge and where your willing to work.',
        },
      },
      {
        path: 'availability',
        name: 'provider.settings.availability',
        component: Availability,
        meta: {
          step: 3,
          title: 'Availability',
          subtitle:
            'Let your customers know when your team is available to work.',
        },
      },
      {
        path: 'licenses',
        name: 'provider.settings.licenses',
        component: Licenses,
        meta: {
          step: 4,
          title: 'Licenses, Certifications and Training',
          subtitle:
            'What licenses/certifications does your team hold? This helps your customer know you’re qualified.',
        },
      },
      {
        path: 'experience',
        name: 'provider.settings.experience',
        component: Experience,
        meta: {
          step: 5,
          title: 'Experience',
          subtitle:
            'Tell us about your team’s experience. Show your customer you’ve done similar work.',
        },
      },
      {
        path: 'proof-of-insurance',
        name: 'provider.settings.proof-of-insurance',
        component: InsuranceProof,
        meta: {
          step: 6,
          title: 'Proof of Insurance',
          subtitle:
            'Showing proof of insurance helps build trust with your customer.',
        },
      },
      {
        path: 'ratings-and-reviews',
        name: 'provider.settings.ratings-and-reviews',
        component: RatingsAndReviews,
        meta: {
          step: 7,
          title: 'Ratings & Reviews',
          subtitle:
            'Make your profile shine, get some gold stars from former customers.',
        },
      },
      {
        path: 'confirmation',
        name: 'provider.settings.confirmation',
        component: Confirmation,
        meta: {
          step: 8,
          title: 'Confirmation',
          subtitle: '',
        },
      },
    ],
  }
]
