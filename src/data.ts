export const site = {
  name: 'Oklahoma City Woodcarvers Club',
  shortName: 'OCWC',
  canonicalUrl: 'https://okcarver.com',
  phoneDisplay: '572-228-6292',
  phoneHref: 'tel:+15722286292',
  founded: 1965,
  dues: '$24 per household, per year',
  meetingSchedule: 'Fourth Tuesday at 7:00 p.m. (third Tuesday in November and December)',
  meetingVenue: 'Will Rogers Garden Exhibition Center',
  meetingAddress: '3400 NW 36th Street, Oklahoma City, OK 73112',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Will+Rogers+Garden+Exhibition+Center+3400+NW+36th+Street+Oklahoma+City+OK+73112',
  facebookUrl: 'https://www.facebook.com/groups/217513548580943/',
  calendarEmbedUrl: 'https://calendar.google.com/calendar/embed?src=woodcarvingokc%40gmail.com&ctz=America%2FChicago&mode=AGENDA&showTitle=0&showPrint=0&showCalendars=0',
  calendarPublicUrl: 'https://calendar.google.com/calendar/embed?src=woodcarvingokc%40gmail.com&ctz=America%2FChicago',
  showApplication2026: 'https://drive.google.com/file/d/1Wb7ttA5HPZqreA8T_cb6jYIt50mjvX4f/view',
  showRules2026: 'https://drive.google.com/file/d/19d8h3ZTeRkEfzExfoW4mp-z5-hL5xISU/view',
  bylawsUrl: 'https://drive.google.com/file/d/12qt_D8R8TBiZk4Sau1j0XexoaXZ2erAb/view',
  // Replace these values when the remaining public campaign/form URLs are available.
  zeffyMembershipUrl: 'https://www.zeffy.com/en-US/ticketing/oklahoma-city-woodcarvers-club-memberships',
  zeffyVendor2027Url: '',
  zeffyVolunteer2027Url: '',
  emailOctopusFormId: '17a8e89e-b11e-11f1-af2a-518b29e5e663',
  emailOctopusScriptUrl: 'https://eocampaign1.com/form/17a8e89e-b11e-11f1-af2a-518b29e5e663.js',
}

export const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Classes', to: '/classes' },
  { label: 'Membership', to: '/membership' },
  { label: 'Artistry in Wood', to: '/artistry-in-wood' },
  { label: 'Newsletters', to: '/newsletters' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
]

export const freeGroups = [
  {
    name: 'Woodcraft Store',
    schedule: 'Saturdays, 9:00 a.m.–noon',
    address: '9301 N May Avenue, Oklahoma City, OK',
    note: 'Call the location before your first visit to confirm materials and schedule.',
  },
  {
    name: 'Midwest City Senior Center',
    schedule: 'Mondays, 1:00–4:00 p.m. and Wednesdays, 9:00 a.m.–noon',
    address: '8251 E Reno Avenue, Midwest City, OK 73110',
    note: 'Located behind the post office and fire station.',
  },
  {
    name: 'Will Rogers Senior Center',
    schedule: 'Tuesdays, 12:15–3:00 p.m.',
    address: '3501 Pat Murphy Drive, Oklahoma City, OK 73112',
    note: 'A relaxed weekday carve-in for sharing projects and techniques.',
  },
  {
    name: 'Dale Robertson Center',
    schedule: 'Mondays, Wednesdays, and Fridays, 9:00 a.m.–noon',
    address: '1200 Lakeshore Drive, Yukon, OK 73099',
    note: 'Contact the center before attending for the first time.',
  },
  {
    name: 'Brand Senior Center',
    schedule: 'Wednesdays and Thursdays, 9:00–11:30 a.m.',
    address: '501 E Main Street, Moore, OK 73160',
    note: 'Friendly weekly carving time in Moore.',
  },
  {
    name: 'Edmond Senior Center',
    schedule: 'Thursdays, 12:30–3:30 p.m.',
    address: '2733 Marilyn Williams Drive, Edmond, OK 73003',
    note: 'The center currently lists an additional $15 annual fee.',
  },
  {
    name: 'First Christian Church',
    schedule: 'Wednesdays, 7:00–9:00 p.m.',
    address: '614 Manvel Avenue, Chandler, OK',
    note: 'An evening option for carvers in and around Chandler.',
  },
]

export const classInterests = [
  'Beginner carving and knife skills',
  'Knife sharpening',
  'Caricature carving',
  'Realistic wildlife carving and painting',
  'Relief carving',
  'Chip carving',
  'Power carving',
  'Cottonwood bark carving',
]

type Newsletter = { month: string; url: string; size: string }

export const newsletters: Record<string, Newsletter[]> = {
  '2026': [
    { month: 'September', url: 'https://drive.google.com/file/d/1SGhwQnVjS78a1skCFn040LXlt8BCAXss/view', size: '1.0 MB' },
    { month: 'August', url: 'https://drive.google.com/file/d/1rN86vMWChdga4aMueC18taRLVHa0dBgD/view', size: '650 KB' },
    { month: 'July', url: 'https://drive.google.com/file/d/10w7Fq_yi2P5hOhgRtWRW_kN8uauobYiH/view', size: '1.2 MB' },
    { month: 'June', url: 'https://drive.google.com/file/d/1HPt1k1WxJJ2QqUqLEWxwTrgvzf5df7zt/view', size: '1.2 MB' },
    { month: 'May', url: 'https://drive.google.com/file/d/1o0qRZlj_iulBrRnSqRZOv-yI7rnkuYrs/view', size: '1.4 MB' },
    { month: 'April', url: 'https://drive.google.com/file/d/1p8hI7WVZb8V4ikUTrsZ0tdoDI3-f0Ktz/view', size: '1.7 MB' },
    { month: 'March', url: 'https://drive.google.com/file/d/1lbDlKDJ69pE1bjN-LIXIb9pr803974GW/view', size: '2.0 MB' },
    { month: 'February', url: 'https://drive.google.com/file/d/1sb8nv6iSHAs6oatgbfThHp90zbfrKcHB/view', size: '830 KB' },
    { month: 'January', url: 'https://drive.google.com/file/d/1FG1_RTk4yt63T-JqEC70IeI0qte3_btp/view', size: '802 KB' },
  ],
  '2025': [
    { month: 'December', url: 'https://drive.google.com/file/d/140C1MrnQpeTZgo-usAYZVS2TT1qcHkxL/view', size: '1.2 MB' },
    { month: 'November', url: 'https://drive.google.com/file/d/1-ne_c6jXve4_D1823W-sBJxqcRPng7Oh/view', size: '1.7 MB' },
    { month: 'October', url: 'https://drive.google.com/file/d/16qPjQhy_MfspQHjRw0gdy1krBiINbVlv/view', size: '1.7 MB' },
    { month: 'September', url: 'https://drive.google.com/file/d/13jZfxoyVgNE3GGlK74zCji-ywK72Kevr/view', size: '1.1 MB' },
    { month: 'August', url: 'https://drive.google.com/file/d/1Lauan0dY2L5x8z6izxyAGKYFkzE3Nc11/view', size: '4.8 MB' },
    { month: 'July', url: 'https://drive.google.com/file/d/10BhsHIOl24Ce4DP7kRsHoI-7XnHVlRFB/view', size: '5.2 MB' },
    { month: 'June', url: 'https://drive.google.com/file/d/1mLRmbwF27DCK1Zj8SPg6J9qZRrKOAAgN/view', size: '990 KB' },
    { month: 'May', url: 'https://drive.google.com/file/d/1VzV2LaPM0GZGbZhKqxP4bTkdr43zg1Eb/view', size: '1.1 MB' },
    { month: 'April', url: 'https://drive.google.com/file/d/1GS24Lss0VY7ld_1CQZEAoqzC5crGmflp/view', size: '1.6 MB' },
    { month: 'March', url: 'https://drive.google.com/file/d/16T--Y53mAAKyMU2wSVe71UZgmHz29BMi/view', size: '1.6 MB' },
    { month: 'February', url: 'https://drive.google.com/file/d/1JY-ZIxoolbeecXFWVPkZfeo0Bnoi3lnR/view', size: '1.4 MB' },
    { month: 'January', url: 'https://drive.google.com/file/d/1n6MZ6tMfJEmKubtLBKoUIwd3WzxH4hTp/view', size: '691 KB' },
  ],
}

export const newsletterFolderArchives = [
  { year: '2024', url: 'https://drive.google.com/drive/folders/12AtYAmy9ZSu36gbbCcAGAomL6CaZcOeD' },
  { year: '2023', url: 'https://drive.google.com/drive/folders/1xIh78hsc72PwTNNTgI-Z0vvKldToW6P8' },
  { year: '2022', url: 'https://drive.google.com/drive/folders/18KnB9oSDKLiqZNr7HPtbUqGe_7usF0TU' },
  { year: '2021', url: 'https://drive.google.com/drive/folders/1JKx5j0pVVyyBROxfuca8ClVuHdbXd5ik' },
  { year: '2020', url: 'https://drive.google.com/drive/folders/1lRzlyh9LgCoV-YGEuDi_FAUeEvFX3As9' },
]
