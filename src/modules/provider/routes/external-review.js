import ReviewForm from "@/modules/provider/views/external-review/ReviewForm";
import Layout from "@/modules/provider/views/external-review/Layout";

export default [
  {
    path: '/provider',
    component: Layout,
    children: [
      {
        path: '/provider/external-review/:token',
        name: 'provider.external-review',
        meta: {
          addClass: 'external-review-form'
        },
        component: ReviewForm,
      }
    ]
  },
]
