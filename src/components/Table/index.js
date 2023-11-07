import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { deletItem, editExpenseStarted } from "../../redux/actions";
import { BsFillTrashFill, BsPenFill } from "react-icons/bs";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function Table() {
  const globalStateExpenses = useSelector((state) => state.wallet.expenses);
  const dispatch = useDispatch();

  const deleteExpense = (id) => {
    const filteredExpenses = globalStateExpenses.filter((exp) => exp.id !== id);
    dispatch(deletItem(filteredExpenses));
  };

  const editItem = (id) => {
    dispatch(editExpenseStarted(id));
  };

  const deleteIcon = (
    <Tooltip>
      <strong>Excluir</strong>
    </Tooltip>
  );

  const editIcon = (
    <Tooltip>
      <strong>Editar</strong>
    </Tooltip>
  );

  return (
    <div className="table-responsive table-custom element">
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
                <td className="col-1">
                  <OverlayTrigger placement="bottom" overlay={editIcon}>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => editItem(id)}
                    >
                      <BsPenFill />
                    </button>
                  </OverlayTrigger>
                  <OverlayTrigger placement="bottom" overlay={deleteIcon}>
                    <button
                      className="btn btn-primary"
                      onClick={() => deleteExpense(id)}
                    >
                      <BsFillTrashFill />
                    </button>
                  </OverlayTrigger>
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
