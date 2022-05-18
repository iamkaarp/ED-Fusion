const Happiness = [
  { key: '$Faction_HappinessBand1;', value: 'Elated' },
  { key: '$Faction_HappinessBand2;', value: 'Happy' },
  { key: '$Faction_HappinessBand3;', value: 'Discontented' },
  { key: '$Faction_HappinessBand4;', value: 'Unhappy' },
  { key: '$Faction_HappinessBand5;', value: 'Despondent' },
]

const getHappiness = (type: string): string => {
  return Happiness.filter((t) => t.key === type)[0].value ?? 'Unknown'
}

export default getHappiness
