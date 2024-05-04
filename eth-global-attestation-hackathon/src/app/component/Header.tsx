import React from 'react';

function Header({ onConnect, loggedIn, address, disconnect }: any) {
  console.log(address, loggedIn);
  return (
    <header className="bg-gov-blue text-white w-full fixed top-0 left-0 z-10 shadow-md">
      <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <img src={"/logo.png"} alt="EthGlobal MockGov Logo" className="h-20 mr-4 rounded-xl" />
          <h1 className="text-xl font-bold">EthGlobal MockGov</h1>
        </div>
        <div className="text-xs">
          {!loggedIn && <button className="bg-white text-gov-blue py-2 px-4 rounded hover:bg-gray-200 transition-colors duration-200" onClick={onConnect}>
            Connect
          </button>}
          {loggedIn && <>{address} <button className="bg-white text-gov-blue py-2 px-4 rounded hover:bg-gray-200 transition-colors duration-200" onClick={disconnect}>
            Disconnect
          </button></>}
        </div>
      </div>
    </header>
  )
}

export default Header;
