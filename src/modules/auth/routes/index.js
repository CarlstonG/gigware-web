import Registration from '@/modules/auth/views/Registration'
import Login from '@/modules/auth/views/Login'

import Onboarding from '@/modules/auth/views/onboarding/Layout'
import BasicInformation from '@/modules/auth/views/onboarding/BasicInformation'
import RatesAndLocation from '@/modules/auth/views/onboarding/RatesAndLocation'
import Availability from '@/modules/auth/views/onboarding/Availability'
import Licenses from '@/modules/auth/views/onboarding/Licenses'
import Experience from '@/modules/auth/views/onboarding/Experience'
import InsuranceProof from '@/modules/auth/views/onboarding/InsuranceProof'
import RatingsAndReviews from '@/modules/auth/views/onboarding/RatingsAndReviews'
import Confirmation from '@/modules/auth/views/onboarding/Confirmation'

export default [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/registration',
    name: 'register',
    component: Registration,
  },
  {
    path: '/onboarding',
    component: Onboarding,
    redirect: { name: 'onboarding.basic-information' },
    children: [
      {
        path: 'basic-information',
        name: 'onboarding.basic-information',
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
        name: 'onboarding.rates-and-location',
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
        name: 'onboarding.availability',
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
        name: 'onboarding.licenses',
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
        name: 'onboarding.experience',
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
        name: 'onboarding.proof-of-insurance',
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
        name: 'onboarding.ratings-and-reviews',
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
        name: 'onboarding.confirmation',
        component: Confirmation,
        meta: {
          step: 8,
          title: 'Confirmation',
          subtitle: '',
        },
      },
    ],
  },
]
