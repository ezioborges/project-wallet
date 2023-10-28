import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { deletItem, updateItem } from "../../redux/actions";

function Table() {
  const globalStateExpenses = useSelector((state) => state.wallet.expenses);
  const dispatch = useDispatch();

  const deleteExpense = ({ target }) => {
    const filteredExpenses = globalStateExpenses.filter(
      (exp) => exp.id !== +target.id
    );
    dispatch(deletItem(filteredExpenses));
  };

  return (
    <div>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {globalStateExpenses.map(
            ({
              id,
              description,
              tag,
              method,
              value,
              exchangeRates,
              currency,
            }) => (
              <tr key={id}>
                <th>{id + 1}</th>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>
                  {Number(exchangeRates[currency].ask * value).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    className="btn btn-primary"
                    id={id}
                    onClick={deleteExpense}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
