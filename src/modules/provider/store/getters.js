export default {
  profile: (state) => state.provider_profile,
  profileAvailabilityDates: (state) => {
    const dates = state.provider_profile?.unavailabilities?.data;

    if (dates?.length > 1) {
      const start = new Date(dates[dates.length - 1].date);
      const end = new Date(dates[dates.length - 2].date);

      return { start, end };
    } else
      return {};
  },
  isLoading: (state) => state.provider_profile_state === 'loading'
}
