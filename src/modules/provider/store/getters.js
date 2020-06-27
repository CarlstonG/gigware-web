import { convertDatesToSpans } from "@/core/misc/convert-dates-to-spans";

export default {
  profile: (state) => state.provider_profile,
  profileAvatarUrl: state => state.provider_profile?.user?.images?.data?.length ?
    state.provider_profile?.user.images.data[state.provider_profile?.user.images.data.length - 1].url : null,
  profileExternalReviewsCount: (state) => state.provider_profile?.external_reviews?.data?.length || 0,
  profileExternalReviewsAverage: (state, getter) => getter.profileExternalReviewsAverageFn(state.provider_profile?.external_reviews?.data),
  profileExternalReviewsAverageFn: () => (reviewsData) => {
    const reviews = reviewsData || []
    const total = reviews.length;
    if (!total) return 0;
    const sum = reviews.map(a => a.rating).reduce((a, b) => a + b) / total;
    const f = sum.toFixed(1);
    const n = Math.round(f);
    return f - n > 0 ? f : n;
  },
  profileAvailabilityDates: (state) => {
    const dates = state.provider_profile?.unavailabilities?.data.map(date => date.date);
    return convertDatesToSpans(dates);
  },
  isLoading: (state) => state.provider_profile_state === 'loading'
}
