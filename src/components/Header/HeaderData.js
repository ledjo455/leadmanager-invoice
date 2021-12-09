import { CoreWhiteLogo } from '../../icons'

export const companyOptions = ({ companyLogos }) => {
  const formattedCompanyLogos = companyLogos?.reduce(
    (acc, { fileName, base64 }) => ({ ...acc, [fileName]: base64 }),
    {}
  )
  return [
    {
      value: 'Core Scaffold Systems Inc',
      color: '#1F2A44',
      src: CoreWhiteLogo,
    },
    {
      value: 'Central Scaffold & Hoist LLC',
      color: ' #E8622B',
      src: formattedCompanyLogos['CENTRAL logo'],
    },
  ]
}

export const HeaderKeys = [
  'jobSiteAddress',
  'projectName',
  'accountName',
  'documentInfo',
  'contactFirstName',
  'contactLastName',
  'driverName',
  'leadCompany',
  'location',
  'opportunityAddress',
  'scheduleAddress',
  'fleetName',
]
export const HeaderData = [
  {
    title: 'Dashboard',
  },
  {
    to: '/leads',
    coreEndPoints: [{ title: 'leads', path: 'leads/', referId: 'leadId' }],
    title: 'Leads',
  },
  {
    to: '/opportunities',
    coreEndPoints: [
      {
        title: 'opportunities',
        path: 'opportunities/',
        referId: 'opportunityId',
      },
    ],
    title: 'Opportunities',
  },
  {
    to: '/estimations',
    coreEndPoints: [
      { title: 'estimations', path: 'estimations/', referId: 'estimationId' },
    ],
    title: 'Estimations',
  },
  {
    to: '/projects',
    coreEndPoints: [
      { title: 'projects', path: 'projects/', referId: 'projectId' },
    ],
    title: 'Projects',
  },
  {
    to: '/scheduling',
    coreEndPoints: [
      { title: 'scheduling', path: 'scheduling/', referId: 'scheduleId' },
    ],
    title: 'Scheduling',
  },
  {
    to: '/permitdrawings',
    coreEndPoints: [
      { title: 'permitDrawings', path: 'projects/', referId: 'projectId' },
    ],
    title: 'Permit Drawings',
  },
  {
    to: '/accounts',
    coreEndPoints: [
      { title: 'accounts', path: 'accounts/', referId: 'accountId' },
    ],
    title: 'Clients',
  },
  {
    to: '/contacts',
    coreEndPoints: [
      { title: 'contacts', path: 'contacts/', referId: 'contactId' },
    ],
    title: 'Contacts',
  },
  {
    to: '/inspections',
    coreEndPoints: [
      { title: 'inspections', path: 'projects/', referId: 'projectId' },
    ],
    title: 'Inspections',
  },
  {
    to: '/tasksManager',
    coreEndPoints: [{ title: 'tasksManagement', path: 'tasksManagement/' }],
    title: 'Tasks',
  },
  {
    to: '/fleet',
    coreEndPoints: [
      { title: 'fleet', path: 'fleet/', referId: 'fleetId' },
      { title: 'fleetActivity', path: 'fleet/', referId: 'fleetId' },
      {
        title: 'fleetViolations',
        path: 'fleets/violation/',
        referId: 'summons_number',
      },
      {
        title: 'fleetDispatching',
        path: 'fleets/dispatching/',
        referId: 'dispatchId',
      },
      { title: 'fleetDocumentation', path: 'fleet/', referId: 'fleetId' },
      { title: 'fleetInspections', path: 'fleet/', referId: 'fleetId' },
      { title: 'fleetIncidents', path: 'fleet/', referId: 'fleetId' },
      { title: 'drivers', path: 'fleets/drivers/', referId: 'driverId' },
    ],
    title: 'Fleet',
  },
]
