import zlib from 'zlib';
import zmq from 'zeromq';
import axios from 'axios'

const SOURCE_URL = 'tcp://eddn.edcd.io:9500';

const whitelist = ['EDDiscovery', 'E:D Market Connector [Windows]', 'E:D Market Connector [Linux]', 'GameGlass',  'E:D Market Connector [Mac OS]', 'EDSM', 'EDDI']

async function run() {
  const sock = new zmq.Subscriber;

  sock.connect(SOURCE_URL);
  sock.subscribe('');
  console.log('EDDN listener connected to:', SOURCE_URL);

  for await (const [src] of sock) {
    const msg = JSON.parse(zlib.inflateSync(src));
    //console.log(msg)
    try {
      const response = await axios.post(`http://localhost:3333/eddn/receive`, { data: msg })
      //console.log(response.data)
    } catch(e) {
      console.log(e)
    }
    if(whitelist.includes(msg.header.softwareName)) {

      if(msg['$schemaRef'] === 'https://eddn.edcd.io/schemas/fssdiscoveryscan/1') {
        //console.log('Received fss discovery')
        //console.log(msg.message)
      }

      if(msg['$schemaRef'] === 'https://eddn.edcd.io/schemas/fssallbodiesfound/1') {
        //console.log('Received fss all')
      }

      if(msg['$schemaRef'] === 'https://eddn.edcd.io/schemas/outfitting/2') {
        console.log('Received outfitting')
        const { systemName, stationName, marketId, modules } = msg.message
        const payload = {
          system_name: systemName,
          name: stationName,
          market_id: marketId,
          modules,
          message: msg
        }

        try {
          // await axios.post(`http://localhost:3333/stations/${payload.name}/modules`, payload)
          //console.log(response.data)
        } catch(e) {
          console.log(e)
        }
      }

      if(msg['$schemaRef'] === 'https://eddn.edcd.io/schemas/shipyard/2') {
        console.log('Received shipyard')
        const { systemName, stationName, marketId, ships } = msg.message
        const payload = {
          system_name: systemName,
          name: stationName,
          market_id: marketId,
          ships,
          message: msg
        }
        
        try {
          // await axios.post(`http://localhost:3333/stations/${payload.name}/ships`, payload)
          //console.log(response.data)
        } catch(e) {
          console.log(e)
        }
      }
      
      if(msg['$schemaRef'] === 'https://eddn.edcd.io/schemas/commodity/3') {
        console.log('Received commodity data')
        
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
          commodities,
          message: msg
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
          //console.log(msg.message)
          //console.log(msg.message.hasOwnProperty('StarType'))
          if(msg.message.hasOwnProperty('StarType')) {
            console.log('Received star data')
            const { StarPos, StarSystem, SystemAddress, StarType, BodyName, StellarMass, DistanceFromArrivalLS } = msg.message
            const payload = {
              name: StarSystem,
              address: SystemAddress,
              position: StarPos.join(';'),
              bodyName: BodyName,
              stellarMass: StellarMass,
              distance: DistanceFromArrivalLS,
              isMain: DistanceFromArrivalLS === 0,
              type: StarType,
              message: msg
            }
            //console.log(msg.message)
            //console.log(payload)
            try {
              // await axios.post('http://localhost:3333/bodies/stars', payload)
              //console.log(response.data)
            } catch(e) {
              console.log(e)
            }
          }

          if(msg.message.hasOwnProperty('PlanetClass')) {
            console.log('Received planet data')
            const { StarPos, StarSystem, SystemAddress, BodyName, MassEM, DistanceFromArrivalLS, PlanetClass, Composition, Materials, Landable, AtmosphereType } = msg.message
            const payload = {
              name: StarSystem,
              address: SystemAddress,
              position: StarPos.join(';'),
              bodyName: BodyName,
              distance: DistanceFromArrivalLS,
              mass: MassEM ? MassEM : 0,
              atmosphere: AtmosphereType ? AtmosphereType : 'None',
              compositions: Composition ? Object.keys(Composition).map(k => { return { type: k, amount: Composition[k] } }) : [],
              materials: Materials ? Materials.map(m => { return { type: m.Name, amount: m.Percent } }) : [],
              landable: Landable,
              class: PlanetClass,
              message: msg
            }

            //console.log(payload)

            try {
              // await axios.post('http://localhost:3333/bodies/planets', payload)
              //console.log(response.data)
            } catch(e) {
              console.log(e)
            }
          }
        }

        if(msg.message.event === 'FSDJump' && msg.message.BodyType === 'Star') {
          console.log('Received FSD Data');
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
            population: Population,
            message: msg
          }
          //console.log(payload)
          try {
            // await axios.post('http://localhost:3333/systems', payload)
            //console.log(response.data)
          } catch(e) {
            console.log(e)
          }
          // // await axios.post('http://localhost:3333/systems', payload)
          //console.log(response.data)
        }

        if(msg.message.event === 'Docked') {
          console.log('Received Docking Data')
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
            landingPads: LandingPads ? LandingPads : { Large: 0, Medium: 0, Small: 0 },
            max_landing_pad_size: '-',
            services: StationServices,
            message: msg
          }
          //console.log(JSON.stringify(payload))
          try {
            // await axios.post('http://localhost:3333/stations', payload)
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
          console.log('Received Star Location Data')
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
            population: Population,
            message: msg
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
          console.log('Received Docking Location Data')
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
            services: StationServices,
            message: msg
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
            // await axios.post('http://localhost:3333/stations', payload)
          } catch(e) {
            console.log(e)
          }
          //console.log(response.data)
        }
      }
    } else {
      console.log(whitelist.includes(msg.header.softwareName),msg.header.softwareName)
    }
  }
}

run();