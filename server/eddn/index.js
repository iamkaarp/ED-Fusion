import zlib from 'zlib';
import zmq from 'zeromq';
import axios from 'axios'

const SOURCE_URL = 'tcp://eddn.edcd.io:9500';

async function run() {
  const sock = new zmq.Subscriber;

  sock.connect(SOURCE_URL);
  sock.subscribe('');
  console.log('EDDN listener connected to:', SOURCE_URL);

  for await (const [src] of sock) {
    const msg = JSON.parse(zlib.inflateSync(src));

    if(msg['$schemaRef'] === 'https://eddn.edcd.io/schemas/fssdiscoveryscan/1') {
      console.log('Received fss discovery')
      //console.log(msg.message)
    }

    if(msg['$schemaRef'] === 'https://eddn.edcd.io/schemas/fssallbodiesfound/1') {
      console.log('Received fss all')
      //console.log(msg.message)
    }
    
    if(msg['$schemaRef'] === 'https://eddn.edcd.io/schemas/commodity/3') {
      //console.log('Received commodity data:')
      
      const commodities = msg.message.commodities?.map(c => {
        return {
          buyPrice: c.buyPrice ? c.buyPrice : 0,
          sellPrice: c.sellPrice ? c.sellPrice : 0,
          meanPrice: c.meanPrice ? c.meanPrice : 0,
          demand: c.demand ? c.demand : 0,
          name: c.name ? c.name : '',
          stock: c.stock ? c.stock : 0,
          stockBracket: c.stockBracket ? c.stockBracket : 0,
          demandBracket: c.demandBracket ? c.demandBracket : 0,
        }
      })

      const payload = {
        system_name: msg.message.systemName,
        name: msg.message.stationName,
        market_id: msg.message.marketId,
        commodities
      }
      //console.log(payload)
      try {
        //await axios.post(`http://localhost:3333/stations/${payload.name}/commodities`, payload)
        //console.log(response.data)
      } catch(e) {
        console.log(e)
      }
      //console.log(response.data)
    }

    if(msg['$schemaRef'] === 'https://eddn.edcd.io/schemas/journal/1') {
      //console.log(msg.message.event)
      if(msg.message.event === 'Scan') {
        console.log(msg.message)
      }

      if(msg.message.event === 'FSDJump' && msg.message.BodyType === 'Star') {
        //console.log('Received FSD Data:');
        const { StarPos, StarSystem, SystemAddress, SystemEconomy, SystemSecondEconomy, SystemAllegiance, SystemGovernment, SystemSecurity, Population } = msg.message
        const payload = {
          name: StarSystem,
          address: SystemAddress,
          position: StarPos.join(';'),
          economy: SystemEconomy,
          second_economy: SystemSecondEconomy,
          security: SystemSecurity,
          government: SystemGovernment,
          allegiance: SystemAllegiance,
          population: Population
        }
        //console.log(payload)
        try {
          //await axios.post('http://localhost:3333/systems', payload)
          //console.log(response.data)
        } catch(e) {
          console.log(e)
        }
        //const response = await axios.post('http://localhost:3333/systems', payload)
        //console.log(response.data)
      }

      if(msg.message.event === 'Docked') {
        //console.log('Received Docking Data:')
        //console.log(msg.message)
        const { DistFromStarLS, MarketID, StarPos, StarSystem, StationAllegiance, StationEconomies, StationEconomy, StationFaction, StationGovernment, StationName, StationType, SystemAddress, StationServices, LandingPads } = msg.message
        const payload = {
          market_id: MarketID,
          name: StationName,
          system_name: StarSystem,
          address: SystemAddress,
          position: StarPos.join(';'),
          allegiance: StationAllegiance ? StationAllegiance : '',
          distance_from_star_LS: DistFromStarLS,
          economy: StationEconomy,
          economies: StationEconomies,
          government: StationGovernment,
          faction: StationFaction,
          type: StationType,
          max_landing_pad_size: LandingPads ? LandingPads.Large ? 'L' : LandingPads.Medium ? 'M' : 'S' : '',services: StationServices,
          services: StationServices
        }
        try {
          //await axios.post('http://localhost:3333/stations', payload)
          //console.log(response.data)
        } catch(e) {
          console.log(e)
        }
        //console.log(response.data)
      }
    }

    if(msg.message.event === 'Location') {
      //console.log(msg.message)
      if(msg.message.BodyType === 'Star') {
        //console.log('Received Star Location Data:');
        //console.log(msg.message)
        const { StarPos, StarSystem, SystemAddress, SystemEconomy, SystemSecondEconomy, SystemAllegiance, SystemGovernment, SystemSecurity, Population } = msg.message
        const payload = {
          name: StarSystem,
          address: SystemAddress,
          position: StarPos.join(';'),
          economy: SystemEconomy,
          second_economy: SystemSecondEconomy,
          security: SystemSecurity,
          government: SystemGovernment,
          allegiance: SystemAllegiance,
          population: Population
        }
        if(msg.message.Factions) {
          payload.factions = msg.message.Factions.map((faction) => {
            return {
              name: faction.Name,
              alignment: faction.Allegiance,
              government: faction.Government,
              influence: faction.Influence,
              state: faction.FactionState,
              happiness: faction.Happiness,
              activeStates: faction.ActiveStates ? faction.ActiveStates.map(s => s.State).join(';') : 'None',
              pendingStates: faction.PendingStates ? faction.PendingStates.map(s => s.State).join(';') : 'None',
              recoveringStates: faction.RecoveringStates ? faction.RecoveringStates.map(s => s.State).join(';') : 'None',
            }
          })
        }
        //console.log(payload.system_name)
        try {
         // await axios.post('http://localhost:3333/systems', payload)
        } catch(e) {
          console.log(e)
        }
      }
      if(msg.message.BodyType === 'Station' && msg.message.Docked) {
        //console.log('Received Docking Location Data:');
        //console.log(msg.message)
        const { DistFromStarLS, MarketID, StarPos, StarSystem, StationAllegiance, StationEconomies, StationEconomy, StationFaction, StationGovernment, StationName, StationType, SystemAddress, StationServices } = msg.message
        const payload = {
          market_id: MarketID,
          name: StationName,
          system_name: StarSystem,
          address: SystemAddress,
          position: StarPos.join(';'),
          allegiance: StationAllegiance ? StationAllegiance : '',
          distance_from_star_LS: DistFromStarLS,
          economy: StationEconomy,
          economies: StationEconomies,
          government: StationGovernment,
          faction: StationFaction,
          type: StationType,
          services: StationServices
        }
        if(msg.message.Factions) {
          payload.factions = msg.message.Factions.map((faction) => {
            return {
              name: faction.Name,
              alignment: faction.Allegiance,
              government: faction.Government,
              influence: faction.Influence,
              state: faction.FactionState,
              happiness: faction.Happiness,
              activeStates: faction.ActiveStates ? faction.ActiveStates.map(s => s.State).join(';') : 'None',
              pendingStates: faction.PendingStates ? faction.PendingStates.map(s => s.State).join(';') : 'None',
              recoveringStates: faction.RecoveringStates ? faction.RecoveringStates.map(s => s.State).join(';') : 'None',
            }
          })
        }
        //console.log(payload.system_name)
        try {
          //await axios.post('http://localhost:3333/stations', payload)
        } catch(e) {
          console.log(e)
        }
        //console.log(response.data)
      }
    }
  }
}

run();