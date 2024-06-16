import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import '../App.css';

const ABI = [
  { 
    "constant": true,
    "inputs": [{"name": "_account", "type": "address"}],
    "name": "get_user",
    "outputs": [
      {"name": "name", "type": "string"},
      {"name": "email", "type": "string"},
      {"name": "phone", "type": "string"},
      {"name": "password", "type": "string"}
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{"name": "_account", "type": "address"}],
    "name": "get_asset",
    "outputs": [
      {"name": "location", "type": "string"},
      {"name": "district", "type": "string"},
      {"name": "plotNo", "type": "string"},
      {"name": "plotArea", "type": "string"},
      {"name": "plotPrice", "type": "uint256"}
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {"name": "_account", "type": "address"},
      {"name": "_location", "type": "string"},
      {"name": "_district", "type": "string"},
      {"name": "_plotNo", "type": "string"},
      {"name": "_plotArea", "type": "string"},
      {"name": "_plotPrice", "type": "uint256"}
    ],
    "name": "add_asset",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{"name": "_plotNo", "type": "string"}, {"name": "_account", "type": "address"}],
    "name": "add_khatiyan",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{"name": "_account", "type": "address"}],
    "name": "remove_user",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }
];

const CONTRACT_ADDRESS = 'your_contract_address';

const Mutation = () => {
  const [storage, setStorage] = useState(null);
  const [vendorDetails, setVendorDetails] = useState({});
  const [buyerDetails, setBuyerDetails] = useState({});
  const [form, setForm] = useState({
    vendorAccountNo: '',
    vendorPassword: '',
    buyerAccountNo: '',
    buyerPassword: '',
  });

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          const storageInstance = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
          setStorage(storageInstance);
        } catch (error) {
          console.error("User denied account access");
        }
      } else if (window.web3) {
        const web3 = new Web3(window.web3.currentProvider);
        const storageInstance = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
        setStorage(storageInstance);
      } else {
        console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
      }
    };

    init();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const fetchVendor = async () => {
    const { vendorAccountNo } = form;
    try {
      const userDetails = await storage.methods.get_user(vendorAccountNo).call();
      const assetDetails = await storage.methods.get_asset(vendorAccountNo).call();
      setVendorDetails({
        ...userDetails,
        ...assetDetails,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBuyer = async () => {
    const { buyerAccountNo } = form;
    try {
      const userDetails = await storage.methods.get_user(buyerAccountNo).call();
      const assetDetails = await storage.methods.get_asset(buyerAccountNo).call();
      setBuyerDetails({
        ...userDetails,
        ...assetDetails,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const transfer = async () => {
    const { vendorAccountNo, vendorPassword } = form;
    try {
      const response = await storage.methods.get_user(vendorAccountNo).call();
      if (vendorPassword === response[3]) {
        await initTransfer();
      } else {
        alert('Access Denied: Enter Correct Password');
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const validate = async () => {
    const { buyerAccountNo, buyerPassword } = form;
    try {
      const response = await storage.methods.get_user(buyerAccountNo).call();
      if (buyerPassword === response[3]) {
        await initMoneyTransfer();
      } else {
        alert('Access Denied: Enter Correct Password');
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const initTransfer = async () => {
    const { vendorAccountNo, buyerAccountNo } = form;
    const {
      location,
      district,
      plotNo,
      plotArea,
      plotPrice,
    } = vendorDetails;

    try {
      await storage.methods.add_asset(
        buyerAccountNo,
        location,
        district,
        plotNo,
        plotArea,
        plotPrice
      ).send({
        from: vendorAccountNo,
        gas: 4700000,
        gasPrice: '2000000000',
      });

      await storage.methods.add_khatiyan(plotNo, buyerAccountNo).send({
        from: vendorAccountNo,
        gas: 4700000,
        gasPrice: '2000000000',
      });

      fetchBuyer();
    } catch (error) {
      console.error(error);
    }
  };

  const initMoneyTransfer = async () => {
    const { vendorAccountNo, buyerAccountNo } = form;
    const plotPrice = vendorDetails.plotPrice;
    const value = plotPrice / 150000;

    try {
      await storage.methods.remove_user(vendorAccountNo).send({
        from: buyerAccountNo,
        gas: 4700000,
        value: Web3.utils.toWei(value.toString(), 'ether'),
        gasPrice: '2000000000',
      });

      setVendorDetails({
        location: 'Not Found',
        district: 'Not Found',
        plotNo: 'Not Found',
        plotArea: 'Not Found',
        plotPrice: 'Not Found',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen gofor bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Transfer Power of Attorney</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <form className="space-y-4">
          <fieldset className="border p-4 rounded">
            <legend className="text-lg font-semibold">Vendor</legend>
            <input
              type="text"
              name="vendorAccountNo"
              value={form.vendorAccountNo}
              onChange={handleChange}
              className="block w-full mt-2 p-2 border rounded bg-gray-200"
              placeholder="Enter Account Number"
            />
            <input
              type="password"
              name="vendorPassword"
              value={form.vendorPassword}
              onChange={handleChange}
              className="block w-full mt-2 p-2 border rounded bg-gray-200"
              placeholder="Enter Password"
            />
            <button
              type="button"
              onClick={fetchVendor}
              className="bg-[#56D9DE] hover:bg-[#29CBD1] text-white font-bold py-2 px-4 mt-4 rounded"
            >
              Fetch
            </button>
          </fieldset>

          {vendorDetails.name && (
            <div className="mt-4 border p-4 rounded bg-gray-50">
              <h3 className="text-lg font-semibold">Owner Detail</h3>
              <div className="mt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-semibold">Owner Name:</div>
                    <div>{vendorDetails.name}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Phone no:</div>
                    <div>{vendorDetails.phone}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Location:</div>
                    <div>{vendorDetails.location}</div>
                  </div>
                  <div>
                    <div className="font-semibold">District:</div>
                    <div>{vendorDetails.district}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Plot no:</div>
                    <div>{vendorDetails.plotNo}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Plot area:</div>
                    <div>{vendorDetails.plotArea}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Plot Price:</div>
                    <div>{vendorDetails.plotPrice}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>

        <form className="space-y-4 mt-6">
          <fieldset className="border p-4 rounded">
            <legend className="text-lg font-semibold">Vandee</legend>
            <input
              type="text"
              name="buyerAccountNo"
              value={form.buyerAccountNo}
              onChange={handleChange}
              className="block w-full mt-2 p-2 border rounded bg-gray-200"
              placeholder="Enter Account Number"
            />
            <input
              type="password"
              name="buyerPassword"
              value={form.buyerPassword}
              onChange={handleChange}
              className="block w-full mt-2 p-2 border rounded bg-gray-200"
              placeholder="Enter Password"
            />
            <button
              type="button"
              onClick={fetchBuyer}
              className="bg-[#56D9DE] hover:bg-[#29CBD1] text-white font-bold py-2 px-4 mt-4 rounded"
            >
              Fetch
            </button>
          </fieldset>

          {buyerDetails.name && (
            <div className="mt-4 border p-4 rounded bg-gray-50">
              <h3 className="text-lg font-semibold">Buyer Detail</h3>
              <div className="mt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-semibold">Buyer Name:</div>
                    <div>{buyerDetails.name}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Phone no:</div>
                    <div>{buyerDetails.phone}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Location:</div>
                    <div>{buyerDetails.location}</div>
                  </div>
                  <div>
                    <div className="font-semibold">District:</div>
                    <div>{buyerDetails.district}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Plot no:</div>
                    <div>{buyerDetails.plotNo}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Plot area:</div>
                    <div>{buyerDetails.plotArea}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Plot Price:</div>
                    <div>{buyerDetails.plotPrice}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={transfer}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Transfer
        </button>
        <button
          onClick={validate}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Validate
        </button>
      </div>
    </div>
  );
};

export default Mutation;
