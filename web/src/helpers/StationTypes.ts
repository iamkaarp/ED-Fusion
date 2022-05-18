const StationTypes = [
  { key: 'OnFootSettlement', value: 'Odyssey Settlement' },
  { key: 'CraterOutpost', value: 'Planetary Outpost' },
  { key: 'Orbis', value: 'Orbis Starport' },
  { key: 'Ocellus', value: 'Ocellus Starport' },
  { key: 'Outpost', value: 'Civilian Outpost' },
  { key: 'CraterPort', value: 'Planetary Port' },
  { key: 'Coriolis', value: 'Coriolis Starport' },
  { key: 'FleetCarrier', value: 'Fleet Carrier' },
  { key: 'Bernal', value: 'Bernal Starport' },
  { key: 'MegaShip', value: 'Mega ship' },
  { key: 'AsteroidBase', value: 'Asteroid Base' },
]

const getStationType = (type: string): string => {
  if (type === '') {
    return 'Unknown'
  }
  const t = StationTypes.filter((t) => t.key === type)[0].value
  return t
}

export default getStationType
