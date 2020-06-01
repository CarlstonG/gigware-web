export default [
  {
    title: 'Team size',
    name: 'team_size',
    options: [
      { option: '0-5', value: '0-5' },
      { option: '5-10', value: '5-10' },
      { option: '10-20', value: '10-20' },
      { option: '20+', value: '20+' },
    ]
  },
  {
    title: 'Rates',
    name: 'rates',
    options: [
      { option: '< 50$', value: '-50' },
      { option: '$50 - $100', value: '50-100' },
      { option: '$100 - $150', value: '100-150' },
      { option: '$150+', value: '150+' },
    ]
  },
  {
    title: 'Availability',
    name: 'availability',
    options: [
      { option: 'Available Now', value: 'now' },
      { option: 'Available this month', value: 'month' },
    ]
  },
]
