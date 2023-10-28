import { useSelector } from "react-redux";
import './index.css';
import { totalExpenses } from "../../util/totalExpenses";

function WalletComponent () {
  const globlaStateUser = useSelector((state) => state.user.user) // pega dados do estado global.
  const globalWalletExpense = useSelector((state) => state.wallet.expenses) 

  const totalValueWallet = totalExpenses(globalWalletExpense);

  return(
    <div className="d-flex pt-3 justify-content-around align-items-center wallet-color">
      <div>
        <h3>Wallet</h3>
      </div>
      <div>
        <span>Email: { globlaStateUser.email } </span>
      </div>
      <div>
        <span>Despesa Total: R$ { totalValueWallet.toFixed(2).replace('.', ',') } BRL</span>
      </div>
    </div>
  );
}

export default WalletComponent;