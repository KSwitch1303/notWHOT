import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL
const Profile = (props) => {
  const [isPending, setIsPending] = useState(false);
  const {bank, setBank, accountNO, setAccountNO, accountName, setAccountName} = useContext(UserContext);
  const [fbank, setFbank] = useState(bank);
  const [faccountNO, setFaccountNO] = useState(accountNO);
  const [faccountName, setFaccountName] = useState(accountName);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    sendRequest();
  }

  const sendRequest = async () => {
    try {
      const response = await axios.post(`${apiUrl}/update`, { username: props.username, bank: fbank, accountNo: faccountNO, accountName: faccountName });
      const data = await response.data;
      if (data.success) {
        alert(data.message);
        setBank(fbank);
        setAccountNO(faccountNO);
        setAccountName(faccountName);
        props.setPage("home");
      } else {
        alert(data.message);
      }
      setIsPending(false);
    } catch (error) {
      alert(error);
    }
  }
  return ( 
    <div className="profile">
      <h1>Profile</h1>
      <div className="profileForm">
        <form className="profileFormContent" onSubmit={handleSubmit}>
        <div className="formgroup">
          <select disabled={isPending} onChange={(e) => setFbank(e.target.value)} value={fbank} name="bank" id="bank" required>
            <option value="" disabled>Select Bank</option>
            <option value="Opay">Opay</option>
            <option value="Palmpay">Palmpay</option>
            <option value="Wema">Wema</option>
            <option value="Zenith">Zenith</option>
            <option value="UBA">UBA</option>
            <option value="GTBank">GT Bank</option>
            <option value="FirstBank">Firs tBank</option>
            <option value="Access">Access</option>
          </select>
          </div>
          <div className="formgroup">
            <label htmlFor="accountNO">Account Number<span>*</span></label>
            <input disabled={isPending} onChange={(e) => setFaccountNO(e.target.value)} value={faccountNO} type="text" id="accountNO" name="accountNO" required />
          </div>
          <div className="formgroup">
            <label htmlFor="accountName">Account Name<span>*</span></label>
            <input disabled={isPending} onChange={(e) => setFaccountName(e.target.value)} value={faccountName} type="text" id="accountName" name="accountName" required />
          </div>
          <button disabled={isPending} type="submit">{isPending ? "Updating..." : "Update"}</button>
        </form>
      </div>
      <button onClick={() => props.setPage("home")}>Home</button>
    </div>
   );
}
 
export default Profile;