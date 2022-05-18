import React, { FC } from 'react'
import IShip from '../../interfaces/IShip'

const Stats: FC<{ ship: IShip }> = ({ ship }) => {
  return (
    <>
      <div className="flex w-full">
        <div className="flex flex-col w-full">
          <div className="flex w-full">
            <div className="w-1/2">
              <p>Manufacturer</p>
            </div>
            <div className="w-1/2">
              <p>{ship.manufacturer}</p>
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-1/2">
              <p>Speed</p>
            </div>
            <div className="w-1/2">
              <p>{ship.stats.speed} m/s</p>
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-1/2">
              <p>Boost speed</p>
            </div>
            <div className="w-1/2">
              <p>{ship.stats.boost} m/s</p>
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-1/2">
              <p>Agility</p>
            </div>
            <div className="w-1/2">
              <p>{ship.stats.agility}</p>
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-1/2">
              <p>Crew</p>
            </div>
            <div className="w-1/2">
              <p>{ship.stats.crew}</p>
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-1/2">
              <p>Cost</p>
            </div>
            <div className="w-1/2">
              <p>{ship.price.toLocaleString()} Cr</p>
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-1/2">
              <p>Base shield</p>
            </div>
            <div className="w-1/2">
              <p>{ship.stats.shield} MJ</p>
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-1/2">
              <p>Base armour</p>
            </div>
            <div className="w-1/2">
              <p>{ship.stats.armour}</p>
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-1/2">
              <p>Hull mass</p>
            </div>
            <div className="w-1/2">
              <p>{ship.stats.hull} t</p>
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-1/2">
              <p>Mass-lock factor</p>
            </div>
            <div className="w-1/2">
              <p>{ship.stats.mass_lock}</p>
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-1/2">
              <p>Landing pad</p>
            </div>
            <div className="w-1/2">
              <p>{ship.stats.size}</p>
            </div>
          </div>
          {ship.rank !== '' && (
            <div className="flex w-full">
              <div className="w-1/2">
                <p>Required Rank</p>
              </div>
              <div className="w-1/2">
                <p>{ship.rank}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Stats
