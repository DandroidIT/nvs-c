const base = {
  title: 'NVS-C',
  http: `${window.location.protocol}//${window.location.hostname}:4005`,
  wss: `wss://${window.location.hostname}:4005`,
  cookie_base: 'nvs_base',
  menu: [{
    title: 'Wizard Setup',
    caption: '',
    icon: 'mdi-radar',
    link: '/setup'
  }, {
    title: 'Dashbord',
    caption: '',
    icon: 'mdi-view-dashboard-outline',
    link: '/'
  }, {
    title: 'Video Wall',
    caption: '',
    icon: 'mdi-monitor-dashboard',
    link: '/videowall'
  }, {
    title: 'Calendar Alarms',
    caption: '',
    icon: 'mdi-home-alert-outline',
    link: '/calendaralarms'
  }, {
    title: 'Settings',
    caption: '',
    icon: 'mdi-cogs',
    link: '/settings'
  }]
}
export { base }