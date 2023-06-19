import React from 'react'
import CardProductVendor from '../../components/Cards/CardProductVendor'

export default function listPackageVendors() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <CardProductVendor/>
        </div>
      </div>
    </>
  )
}
