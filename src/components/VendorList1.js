import React, { useState } from 'react';
import Web3 from 'web3';

const VendorList1 = () => {
  const [showTable, setShowTable] = useState(false);
  const [currentOwner, setCurrentOwner] = useState('');
  const [plotNo, setPlotNo] = useState('');
  const [vendors, setVendors] = useState([]);

  const init = async () => {
    const web3 = new Web3("http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(abi, contractAddress);
    return { web3, accounts, contract };
  };

  const fetchData = async () => {
    const { web3, contract } = await init();
    const plot = document.getElementById("plot_no").value;
    setPlotNo(plot);
    
    const p = await contract.methods.get_khatiyan(plot).call();
    const ac = p[0][p[1] - 1];

    const vendorsData = [];
    for (let i = p[1] - 1; i >= 0; i--) {
      const user = await contract.methods.get_user(p[0][i]).call();
      vendorsData.push(`Vendor: ${p[1] - i} - ${user[0]}`);
    }

    const currentOwnerData = await contract.methods.get_user(ac).call();

    setCurrentOwner(currentOwnerData[0]);
    setVendors(vendorsData);
    setShowTable(true);
  };

  const abi = [
    // Define your ABI here
  ];

  const contractAddress = 'your_contract_address_here';

  return (
    <section className="main">
      <div id="search" className="flex justify-center items-center py-8">
        <section className="cm-logins bg-white p-8 rounded shadow-lg w-full lg:w-3/4 xl:w-1/2">
          <form className="cm-login-form" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <center>
                <legend className="text-xl font-bold">Vendor list</legend>
              </center>
              <input
                type="text"
                id="plot_no"
                className="cm-text-input bg-gray-200 px-4 py-2 rounded w-full"
                placeholder="Enter the plot number"
              />
              <button
                type="submit"
                className="cm-submit2 bg-[#56D9DE] hover:bg-[#29CBD1] text-white py-2 px-4 rounded w-full mt-4 text-lg font-semibold"
                onClick={fetchData}
              >
                Click to show the vendor list
              </button>
            </fieldset>
            <br />
            <div className={showTable ? "tabledata1" : "hidden"} id="tabledata1">
              <h5 className="text-2xl font-bold text-center">Current Owner</h5>
              <h5 className="mt-4">Plot No.</h5>
              <p className="font-bold text-red-500" id="_plot">{plotNo}</p>
              <div className="dat bg-black text-white mt-4">
                <h5 id="_name">{currentOwner}</h5>
              </div>
            </div>
            <div className={showTable ? "tabledata" : "hidden"} id="tableshow">
              <table id="myytab" className="w-full bg-white border-collapse border mt-8">
                <tbody>
                  {vendors.map((vendor, index) => (
                    <tr key={index} className="text-gray-800">
                      <td className="border px-4 py-2">{vendor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

export default VendorList1;
