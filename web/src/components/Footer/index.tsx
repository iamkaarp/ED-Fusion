import React, { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className="w-full bg-gray-800" style={{ zIndex: 999 }}>
      <div className="grid grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
        <div>
          <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">Company</h2>
          <ul className="text-gray-300">
            <li className="mb-4">
              <a href="#" className=" hover:underline">
                About
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Brand Center
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">Help center</h2>
          <ul className="text-gray-300">
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Discord Server
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Twitter
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Facebook
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">Legal</h2>
          <ul className="text-gray-300">
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Licensing
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Terms &amp; Conditions
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">Download</h2>
          <ul className="text-gray-300">
            <li className="mb-4">
              <a href="#" className="hover:underline">
                iOS
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Android
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Windows
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                MacOS
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="px-4 py-6 bg-gray-700 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-300 sm:text-center">
          © 2022 <a href="https://ed-fusion.com">ED-Fusion</a>. All Rights Reserved.
        </span>
        <div className="flex mt-4 space-x-6 sm:justify-center md:mt-0" />
      </div>
    </footer>
  )
}

export default Footer
