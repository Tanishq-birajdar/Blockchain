import React, { useEffect, useState } from 'react';

const Register = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isRegisterVisible, setRegisterVisible] = useState(false);
  const [isAssetVisible, setAssetVisible] = useState(false);

  useEffect(() => {
    const toggleSubMenus = () => {
      document.querySelectorAll('.sub-btn').forEach((button) => {
        button.addEventListener('click', () => {
          button.nextElementSibling.classList.toggle('show');
          button.lastElementChild.classList.toggle('rotate');
        });
      });
    };

    toggleSubMenus();
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const showRegister = () => {
    setAssetVisible(false);
    setRegisterVisible(true);
  };

  const showAsset = () => {
    setRegisterVisible(false);
    setAssetVisible(true);
  };

  const createAccount = () => {
    // Implementation for create account functionality
  };

  const createAsset = () => {
    // Implementation for create asset functionality
  };

  return (
    <div>
      <div className="menu-btn" onClick={handleSidebarToggle}>
        <i className="fas fa-bars"></i>
      </div>
      <div className={`side-bar ${isSidebarOpen ? 'active' : ''}`}>
        <div className="close-btn" onClick={handleSidebarClose}>
          <i className="fas fa-times"></i>
        </div>
        <div className="menu">
          {/* Menu items */}
        </div>
      </div>
      <section className="main">
        <div id="register" style={{ display: isRegisterVisible ? 'block' : 'none' }}>
          <section className="cm-login">
            <center><p id="demo"> Welcome To Land Registy User Enrollment Portal</p></center>
            <form className="cm-login-form" onSubmit={(e) => e.preventDefault()}>
              <fieldset>
                <center><legend>User Register</legend></center>
                {/* Input fields */}
              </fieldset>
              <button type="submit" className="cm-submit2" onClick={createAccount}> Create Profile </button>
            </form>
          </section>
        </div>

        <div id="register_asset" style={{ display: isAssetVisible ? 'block' : 'none' }}>
          <section className="cm-login">
            <center><p id="demo"> Welcome To Assets Enrollment Portal</p></center>
            <form className="cm-login-form" onSubmit={(e) => e.preventDefault()}>
              <fieldset>
                <center><legend>Assest Register</legend></center>
                {/* Input fields */}
              </fieldset>
              <button type="submit" className="cm-submit2" onClick={createAsset}> Register Assest</button>
            </form>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Register;