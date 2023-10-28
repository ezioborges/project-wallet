import { useSelector } from "react-redux";
import "./index.css";
import { totalExpenses } from "../../util/totalExpenses";

function WalletComponent() {
  const globlaStateUser = useSelector((state) => state.user.user); // pega dados do estado global.
  const globalWalletExpense = useSelector((state) => state.wallet.expenses);

  const totalValueWallet = totalExpenses(globalWalletExpense);

  return (
    <div className="pt-3 wallet-color">
      <div className="row m-0">
        <div className="col-sm-12 col-md-4 d-flex justify-content-center align-items-center">
          <h3 className="letter">Wallet</h3>
        </div>
        <div className="col-sm-12 col-md-4 d-flex justify-content-center align-items-center">
          <span className="letter">Email: {globlaStateUser.email} </span>
        </div>
        <div className="col-sm-12 col-md-4 d-flex justify-content-center align-items-center">
          <span className="letter">
            Despesa Total: R$ {totalValueWallet.toFixed(2).replace(".", ",")}{" "}
            BRL
          </span>
        </div>
      </div>
    </div>
  );
}

export default WalletComponent;
