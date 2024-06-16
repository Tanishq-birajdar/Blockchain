import React, { useState } from 'react';
import '../App.css'

const User = ({ storage }) => {
  const [showRegister, setShowRegister] = useState(true);
  const [showAssetRegister, setShowAssetRegister] = useState(false);

  const toggleRegister = () => {
    setShowRegister(true);
    setShowAssetRegister(false);
  };

  const toggleAssetRegister = () => {
    setShowAssetRegister(true);
    setShowRegister(false);
  };

  const createAccount = () => {
    const form_account = document.getElementById("account_no").value;
    const form_name = document.getElementById("name").value;
    const form_gender = document.getElementById("Gender").value;
    const form_address = document.getElementById("Address").value;
    const form_phone = document.getElementById("phone").value;
    const form_password = document.getElementById("password").value;

    // Placeholder for Web3 storage method call
    console.log("Form Data:", form_account, form_name, form_gender, form_address, form_phone, form_password);
  };

  const createAsset = () => {
    const form_account = document.getElementById("account_no_asset").value;
    const form_location = document.getElementById("Location").value;
    const form_district = document.getElementById("District").value;
    const form_plot = document.getElementById("Plot_no").value;
    const form_area = document.getElementById("Area").value;
    const form_asset = document.getElementById("Assest_value").value;

    // Placeholder for Web3 storage method call
    console.log("Asset Data:", form_account, form_location, form_district, form_plot, form_area, form_asset);
  };

  return (
    <section className="flex justify-center h-screen gofor">
      <div id="register" className={`w-full md:w-1/2 ${showRegister ? '' : 'hidden'}`}>
        <section className="cm-login bg-white text-black p-4 rounded-lg shadow-lg">
          <center><p className="text-2xl font-bold"> Welcome To Land Registry User Enrollment Portal</p></center>
          <form className="cm-login-form mt-2" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend className="text-black text-center text-lg font-bold">User Register</legend>
              <div className="flex flex-col mb-3">
                <label htmlFor="account_no" className="mb-1 text-lg font-semibold">Account No :</label>
                <input type="text" id="account_no" className="cm-text-input border rounded-md p-1" placeholder="&nbsp;&nbsp;Account No" />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="name" className="mb-1 text-lg font-semibold">Name :</label>
                <input type="text" id="name" className="cm-text-input border  rounded-md p-1" placeholder="&nbsp;&nbsp;Name" />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="Gender" className="mb-1 text-lg font-semibold">Gender :</label>
                <input type="text" id="Gender" className="cm-text-input border  rounded-md p-1" placeholder="&nbsp;&nbsp;Gender" />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="Address" className="mb-1 text-lg font-semibold">Address :</label>
                <input type="text" id="Address" className="cm-text-input border  rounded-md p-1" placeholder="&nbsp;&nbsp;Address" />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="phone" className="mb-1 text-lg font-semibold">Contact No :</label>
                <input type="text" id="phone" className="cm-text-input border  rounded-md p-1" placeholder="&nbsp;&nbsp;Contact no" />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="password" className="mb-1 text-lg font-semibold">Password :</label>
                <input type="password" id="password" className="cm-text-input border rounded-md p-1" placeholder="&nbsp;&nbsp;Password" />
              </div>
            </fieldset>
            <button type="submit" className="cm-submit2 mt-2 bg-[#56D9DE] hover:bg-[#29CBD1] p-2 w-full rounded-md text-white font-bold text-lg" onClick={createAccount}> Create Profile </button>
          </form>
          <button className="cm-submit2 mt-2 bg-[#56D9DE] hover:bg-[#29CBD1] p-2 w-full rounded-md text-white font-bold text-lg" onClick={toggleAssetRegister}> Register Asset </button>
        </section>
      </div>

      <div id="register_asset" className={`w-full md:w-1/2 ${showAssetRegister ? '' : 'hidden'}`}>
        <section className="cm-login bg-white text-black p-4 rounded-lg shadow-lg">
          <center><p className="text-2xl font-bold"> Welcome To Assets Enrollment Portal</p></center>
          <form className="cm-login-form " onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend className="text-black text-center text-lg font-bold">Asset Register</legend>
              <div className="flex flex-col mb-3">
                <label htmlFor="account_no_asset" className="mb-1 text-lg font-semibold">Account No :</label>
                <input type="text" id="account_no_asset" className="cm-text-input border rounded-md p-1" placeholder="&nbsp;&nbsp;Account No" />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="Location" className="mb-1 text-lg font-semibold">Location :</label>
                <input type="text" id="Location" className="cm-text-input border rounded-md p-1" placeholder="&nbsp;&nbsp;Location" />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="District" className="mb-1 text-lg font-semibold">District :</label>
                <input type="text" id="District" className="cm-text-input border rounded-md p-1" placeholder="&nbsp;&nbsp;District" />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="Plot_no" className="mb-1 text-lg font-semibold">Plot No :</label>
                <input type="text" id="Plot_no" className="cm-text-input border rounded-md p-1" placeholder="&nbsp;&nbsp;Plot No" />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="Area" className="mb-1 text-lg font-semibold">Area (in sqft) :</label>
                <input type="text" id="Area" className="cm-text-input border rounded-md p-1" placeholder="&nbsp;&nbsp;Area (in sqft)" />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="Assest_value" className="mb-1 text-lg font-semibold">Asset Value :</label>
                <input type="text" id="Assest_value" className="cm-text-input border rounded-md p-1" placeholder="&nbsp;&nbsp;Asset Value" />
              </div>
            </fieldset>
            <button type="submit" className="cm-submit2 mt-2  bg-[#56D9DE] hover:bg-[#29CBD1] p-2 w-full rounded-md text-white font-bold text-lg" onClick={createAsset}> Register Asset </button>
          </form>
          <button className="cm-submit2 mt-2  bg-[#56D9DE] hover:bg-[#29CBD1] p-2 w-full rounded-md text-white font-bold text-lg" onClick={toggleRegister}> Back to User Register </button>
        </section>
      </div>
    </section>
  );
};

export default User;
