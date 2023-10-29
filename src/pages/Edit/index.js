import { useDispatch, useSelector } from "react-redux";
import { fetchCurrency, walletExpenses } from "../../redux/actions";
import { useEffect, useState } from "react";
// import "./index.css";
import getCurrencies from "../../services/getCurrencies";

function Edit() {
  const globalState = useSelector((state) => state.wallet.currencies);
  const globalWallet = useSelector((state) => state.wallet.expenses);

  const initialState = {
    value: "",
    currency: "USD",
    method: "Dinheiro",
    tag: "Alimentação",
    description: "",
  };

  const dispatch = useDispatch();

  const meth = ["Dinheiro", "Cartão de crédito", "Cartão de débito"];

  const tagCategories = [
    "Alimentação",
    "Lazer",
    "Trabalho",
    "Transporte",
    "Saúde",
  ];

  const [expensesForm, setExpensesForm] = useState({
    id: "",
    value: "",
    currency: "USD",
    method: "Dinheiro",
    tag: "Alimentação",
    description: "",
    exchangeRates: {},
    editorState: true,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(fetchCurrency());
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    }
    fetchData();
  }, [dispatch]);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setExpensesForm({
      ...expensesForm,
      [name]: value,
    });
  };

  const saveDataOnClick = async (e) => {
    e.preventDefault();

    try {
      const exchange = await getCurrencies();

      const updatedExpensesForm = {
        ...expensesForm,
        exchangeRates: exchange,
      };

      dispatch(walletExpenses(updatedExpensesForm));

      // setExpensesForm(initialState);
    } catch (error) {
      console.error("Erro ao buscar as moedas:", error);
    }
  };

  const { value, description, currency, method, tag } = globalWallet;
  return (
    <div>
      <form className="d-sm-flex py-3 justify-content-around align-items-end wallet-form-color">
        <div className="form-group mx-3">
          <label htmlFor="value" className="letter">
            Valor:{" "}
          </label>
          <input
            type="number"
            name="value"
            value={value}
            className="form-control"
            placeholder="Despesa"
            onChange={handleChange}
          />
        </div>

        <div className="form-group mx-3">
          <label htmlFor="currency" className="letter">
            Moedas:{" "}
          </label>
          <select
            className="form-control"
            name="currency"
            value={currency}
            onChange={handleChange}
          >
            {globalState.map((e, i) => (
              <option key={i}>{e}</option>
            ))}
          </select>
        </div>

        <div className="form-group mx-3">
          <label htmlFor="method" className="letter">
            Método de pagamento:{" "}
          </label>
          <select
            className="form-control"
            name="method"
            value={method}
            onChange={handleChange}
          >
            {meth.map((pay, i) => (
              <option key={i}> {pay} </option>
            ))}
          </select>
        </div>

        <div className="form-group mx-3">
          <label htmlFor="tag" className="letter">
            Categotia:{" "}
          </label>
          <select
            className="form-control"
            name="tag"
            value={tag}
            onChange={handleChange}
          >
            {tagCategories.map((cat, i) => (
              <option key={i}> {cat} </option>
            ))}
          </select>
        </div>

        <div className="form-group mx-3">
          <label htmlFor="description" className="letter">
            Descrição:{" "}
          </label>
          <textarea
            className="form-control"
            name="description"
            value={description}
            onChange={handleChange}
            rows="1"
          ></textarea>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary mt-4"
            onClick={saveDataOnClick}
          >
            Adicionar Despesa
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
