import { useSelector } from 'react-redux';
import { getUser } from '../../data/savedUser';
import Header from '../../components/Header';
import WalletComponent from '../../components/WalletComponent';
import WalletForm from '../../components/WalletForm';
import Table from '../../components/Table';

function Wallet() {

  const globalState = useSelector((state) => state.user.user) //aqui eu pego o component do estado global.
  const user = getUser(); // aqui eu pego os dados do localStorage.

    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <WalletComponent />
        </div>
        <div>
          <WalletForm />
        </div>
        <div>
          <Table />
        </div>
      </div>
    );
  }

export default Wallet;
