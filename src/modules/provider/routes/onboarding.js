import Layout from '@/modules/provider/views/onboarding/Layout'
import BasicInformation from '@/modules/provider/views/onboarding/BasicInformation'
import RatesAndLocation from '@/modules/provider/views/onboarding/RatesAndLocation'
import Availability from '@/modules/provider/views/onboarding/Availability'
import Licenses from '@/modules/provider/views/onboarding/Licenses'
import Experience from '@/modules/provider/views/onboarding/Experience'
import InsuranceProof from '@/modules/provider/views/onboarding/InsuranceProof'
import RatingsAndReviews from '@/modules/provider/views/onboarding/RatingsAndReviews'
import Confirmation from '@/modules/provider/views/onboarding/Confirmation'

export default [
  {
    path: '/onboarding',
    component: Layout,
    redirect: { name: 'provider.onboarding.basic-information' },
    meta: {
      auth: {
        roles: ['provider', 'admin']
      },
    },
    children: [
      {
        path: 'basic-information',
        name: 'provider.onboarding.basic-information',
        component: BasicInformation,
        meta: {
          step: 1,
          nextRedirect: { name: 'provider.onboarding.rates-and-location' },
          title: 'Basic Information',
          subtitle:
            'We encourage all members to include as much profile information as possible. This helps your team stand out against the competiiton.',
        },
      },
      {
        path: 'rates-and-location',
        name: 'provider.onboarding.rates-and-location',
        component: RatesAndLocation,
        meta: {
          step: 2,
          nextRedirect: { name: 'provider.onboarding.availability' },
          title: 'Rates and Location',
          subtitle:
            'Let your customers know how much you charge and where your willing to work.',
        },
      },
      {
        path: 'availability',
        name: 'provider.onboarding.availability',
        component: Availability,
        meta: {
          step: 3,
          nextRedirect: { name: 'provider.onboarding.licenses' },
          title: 'Availability',
          subtitle:
            'Let your customers know when your team is available to work.',
        },
      },
      {
        path: 'licenses',
        name: 'provider.onboarding.licenses',
        component: Licenses,
        meta: {
          step: 4,
          nextRedirect: { name: 'provider.onboarding.experience' },
          title: 'Licenses, Certifications and Training',
          subtitle:
            'What licenses/certifications does your team hold? This helps your customer know you’re qualified.',
        },
      },
      {
        path: 'experience',
        name: 'provider.onboarding.experience',
        component: Experience,
        meta: {
          step: 5,
          nextRedirect: { name: 'provider.onboarding.proof-of-insurance' },
          title: 'Experience',
          subtitle:
            'Tell us about your team’s experience. Show your customer you’ve done similar work.',
        },
      },
      {
        path: 'proof-of-insurance',
        name: 'provider.onboarding.proof-of-insurance',
        component: InsuranceProof,
        meta: {
          step: 6,
          nextRedirect: { name: 'provider.onboarding.ratings-and-reviews' },
          title: 'Proof of Insurance',
          subtitle:
            'Showing proof of insurance helps build trust with your customer.',
        },
      },
      {
        path: 'ratings-and-reviews',
        name: 'provider.onboarding.ratings-and-reviews',
        component: RatingsAndReviews,
        meta: {
          step: 7,
          nextBtnText: 'Send & Next',
          nextRedirect: { name: 'provider.onboarding.confirmation' },
          title: 'Ratings & Reviews',
          subtitle:
            'Make your profile shine, get some gold stars from former customers.',
        },
      },
      {
        path: 'confirmation',
        name: 'provider.onboarding.confirmation',
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
