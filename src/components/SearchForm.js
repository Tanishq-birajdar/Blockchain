import React, { useState } from 'react';
import '../App.css'

const SearchForm = () => {
  const [accountNo, setAccountNo] = useState('');
  const [userData, setUserData] = useState({});
  const [assetData, setAssetData] = useState({});
  const [isDataVisible, setDataVisible] = useState(false);

  const handleInputChange = (e) => {
    setAccountNo(e.target.value);
  };

  const displayData = async () => {
    setDataVisible(true);
  };


  return (
    <section className="main p-4 bg-gray-100 min-h-screen gofor">
      <div id="search">
        <section className="cm-login max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <center>
            <p id="demo" className="text-xl font-semibold mb-4">Search your Land Record</p>
          </center>
          <form className="cm-login-form" onSubmit={(e) => e.preventDefault()}>
            <fieldset className="border border-gray-200 p-4 rounded">
              <center>
                <legend className="text-lg font-semibold">Land Record (Register II)</legend>
              </center>
              <input
                type="text"
                id="account_no"
                className="cm-text-input w-full bg-gray-200 mt-4 p-2 border border-gray-300 rounded"
                placeholder="Enter Account Number"
                value={accountNo}
                onChange={handleInputChange}
              />
            </fieldset>
            <button
              type="submit"
              className="cm-submit2 mt-4 w-full bg-[#56D9DE] hover:bg-[#29CBD1] text-white p-2 rounded text-lg font-semibold"
              onClick={displayData}
            >
              Search
            </button>
          </form>
          {isDataVisible && (
            <div className="search mt-6" id="search_container">
              <center>
                <h2 className="text-xl font-semibold underline mb-4">Land Details</h2>
              </center>
              <div className="font-bold text-green-700 mb-2">Personal Detail</div>
              <div className="blockchain-container-data">
                <div className="block-chain-50 flex mb-2">
                  <div className="block-chain-25 w-1/4 font-semibold">Name</div>
                  <div className="block-chain-75 w-3/4" id="search_name">{userData.name}</div>
                </div>
                <div className="block-chain-50 flex mb-2">
                  <div className="block-chain-25 w-1/4 font-semibold">Gender</div>
                  <div className="block-chain-75 w-3/4" id="search_gender">{userData.gender}</div>
                </div>
              </div>
              <div className="blockchain-container-data">
                <div className="block-chain-50 flex mb-2">
                  <div className="block-chain-25 w-1/4 font-semibold">Address</div>
                  <div className="block-chain-75 w-3/4" id="search_address">{userData.address}</div>
                </div>
                <div className="block-chain-50 flex mb-2">
                  <div className="block-chain-25 w-1/4 font-semibold">Phone</div>
                  <div className="block-chain-75 w-3/4" id="search_phone">{userData.phone}</div>
                </div>
              </div>
              <div className="font-bold text-green-700 mb-2">Property Detail</div>
              <div className="blockchain-container-data">
                <div className="block-chain-50 flex mb-2">
                  <div className="block-chain-25 w-1/4 font-semibold">Land Location</div>
                  <div className="block-chain-75 w-3/4" id="search_location">{assetData.location}</div>
                </div>
                <div className="block-chain-50 flex mb-2">
                  <div className="block-chain-25 w-1/4 font-semibold">District</div>
                  <div className="block-chain-75 w-3/4" id="search_district">{assetData.district}</div>
                </div>
              </div>
              <div className="blockchain-container-data">
                <div className="block-chain-50 flex mb-2">
                  <div className="block-chain-25 w-1/4 font-semibold">Plot no</div>
                  <div className="block-chain-75 w-3/4" id="search_plotno">{assetData.plotNo}</div>
                </div>
                <div className="block-chain-50 flex mb-2">
                  <div className="block-chain-25 w-1/4 font-semibold">Area</div>
                  <div className="block-chain-75 w-3/4" id="search_area">{assetData.area} (sqft)</div>
                </div>
              </div>
              <div className="blockchain-container-data">
                <div className="block-chain-50 flex mb-2">
                  <div className="block-chain-25 w-1/4 font-semibold">Asset value</div>
                  <div className="block-chain-75 w-3/4" id="search_assetvalue" style={{ color: 'red' }}>{assetData.assetValue} (₹)</div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </section>
  );
};

export default SearchForm;
