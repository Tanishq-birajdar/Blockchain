import React, { useState } from 'react';
import Web3 from 'web3';
import '../App.css'

const Records = () => {
  const [showTable, setShowTable] = useState(false);
  const [records, setRecords] = useState([]);

  const init = async () => {
    const web3 = new Web3("http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(abi, contractAddress);
    return { web3, accounts, contract };
  };

  // Fetch data from blockchain
  const fetchData = async () => {
    const { web3, accounts, contract } = await init();
    const recordsData = [];

    for (const account of accounts) {
      const user = await contract.methods.get_user(account).call();
      const asset = await contract.methods.get_asset(account).call();

      if (user[0] !== "Not Found") {
        recordsData.push({
          accountNo: account,
          name: user[0],
          gender: user[1],
          address: user[2],
          phone: user[3],
          plotLocation: asset[0],
          plotDistrict: asset[1],
          plotNo: asset[2],
          plotArea: asset[3],
          plotPrice: asset[4]
        });
      }
    }

    setRecords(recordsData);
    setShowTable(true);
  };

  const abi = [
    {
      "constant": true,
      "inputs": [{"name": "account", "type": "address"}],
      "name": "get_user",
      "outputs": [
        {"name": "name", "type": "string"},
        {"name": "gender", "type": "string"},
        {"name": "address", "type": "string"},
        {"name": "phone", "type": "string"}
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{"name": "account", "type": "address"}],
      "name": "get_asset",
      "outputs": [
        {"name": "location", "type": "string"},
        {"name": "district", "type": "string"},
        {"name": "plotNo", "type": "string"},
        {"name": "area", "type": "string"},
        {"name": "price", "type": "string"}
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    // Add other contract methods as needed
  ];

  // Replace 'contractAddress' with your actual contract address
  const contractAddress = 'your_contract_address_here';

  return (
    <section className="main bg-gray-200 min-h-screen gofor">
      <div id="search" className="flex justify-center items-center py-8">
        <section className="cm-logins bg-white p-8 rounded shadow-lg w-full lg:w-3/4 xl:w-1/2">
          <form className="cm-login-form" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend className="text-center text-2xl font-bold mb-4">Land Record</legend>
              <button
                type="submit"
                className="cm-submit2 bg-[#56D9DE] hover:bg-[#29CBD1] text-white py-2 px-4 rounded w-full text-lg font-semibold"
                onClick={fetchData}
              >
                Click here to see all users land records
              </button>
            </fieldset>
            <br />
            {showTable && (
              <div className="tabledata" id="tableshow">
                <table id="myytab" className="w-full bg-white border-collapse border">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                      <th className="head border px-4 py-2">Account no</th>
                      <th className="head border px-4 py-2">Name</th>
                      <th className="head border px-4 py-2">Gender</th>
                      <th className="head border px-4 py-2">Address</th>
                      <th className="head border px-4 py-2">Land location</th>
                      <th className="head border px-4 py-2">District</th>
                      <th className="head border px-4 py-2">Plot no</th>
                      <th className="head border px-4 py-2">Area (sqft)</th>
                      <th className="head border px-4 py-2">Asset value</th>
                      <th className="head border px-4 py-2">Phone no</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record, index) => (
                      <tr key={index} className="text-gray-800">
                        <td className="border px-4 py-2">{record.accountNo}</td>
                        <td className="border px-4 py-2">{record.name}</td>
                        <td className="border px-4 py-2">{record.gender}</td>
                        <td className="border px-4 py-2">{record.address}</td>
                        <td className="border px-4 py-2">{record.plotLocation}</td>
                        <td className="border px-4 py-2">{record.plotDistrict}</td>
                        <td className="border px-4 py-2">{record.plotNo}</td>
                        <td className="border px-4 py-2">{record.plotArea}</td>
                        <td className="border px-4 py-2">{record.plotPrice}</td>
                        <td className="border px-4 py-2">{record.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </form>
        </section>
      </div>
    </section>
  );
};

export default Records;
