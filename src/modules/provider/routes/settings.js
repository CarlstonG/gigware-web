import Layout from "../views/settings/Layout";
import BasicInformation from "../views/onboarding/BasicInformation";
import RatesAndLocation from "../views/onboarding/RatesAndLocation";
import Availability from "../views/onboarding/Availability";
import Licenses from "../views/onboarding/Licenses";
import Experience from "../views/onboarding/Experience";
import InsuranceProof from "../views/onboarding/InsuranceProof";
import RatingsAndReviews from "../views/onboarding/RatingsAndReviews";
import DeactivateAccount from "../views/settings/AccauntDeactivation";
import { getAuth } from "../../../plugins/auth/vue-auth-extension";

export default [
  {
    path: '/settings',
    component: Layout,
    name: 'provider.settings',
    redirect: () => {
      const $auth = getAuth();
      const user = $auth.user();
      return $auth.check('customer') ?
        { name: 'customer.settings' } :
        $auth.check('provider') ?
          user?.provider_profile?.is_registered ? { name: 'provider.settings.basic-information' } :
            { name: 'provider.onboarding.basic-information' } :
          { name: 'home' }
    },
    meta: {
      auth: {
        roles: ['provider', 'admin']
      },
      type: 'settings',
      nextBtnText: 'Save',
    },
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
          nextBtnText: 'Send',
        },
      },
      {
        path: 'deactivate-account',
        name: 'provider.settings.deactivate-account',
        component: DeactivateAccount,
        meta: {
          step: 8,
          title: 'DeactivateAccount',
          subtitle: '',
        },
      },
    ],
  }
]
