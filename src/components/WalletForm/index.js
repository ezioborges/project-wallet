import { useDispatch, useSelector } from "react-redux";
import { editExpenseFinished, fetchCurrency, walletExpenses } from "../../redux/actions";
import { useEffect, useState } from "react";
import "./index.css";
import getCurrencies from "../../services/getCurrencies";

function WalletForm() {
  const globalState = useSelector((state) => state.wallet.currencies);
  const globalWallet = useSelector((state) => state.wallet);

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

  useEffect(() => {
    editorMode();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setExpensesForm({
      ...expensesForm,
      [name]: value,
    });
  };

  async function buildExpense() { //monta uma nova despesa
    try {
      const exchange = await getCurrencies();

      const updatedExpensesForm = {
        ...expensesForm,
        exchangeRates: exchange,
      };

      return updatedExpensesForm;
    } catch (error) {
      console.error("Erro ao buscar as moedas:", error);
      throw error;
    }
  }

  const saveDataOnClick = async () => { // salva um novo despesa

    const updatedExpensesForm = await buildExpense();

    dispatch(walletExpenses(updatedExpensesForm));

    setExpensesForm(initialState);
  };

  const editorMode = () => {
    const { editor, expenses, idToEdit } = globalWallet;

    if (editor) {
      const { value, description, currency, method, tag } = expenses.find(
        (exp) => exp.id === idToEdit
      );

      setExpensesForm({
        value,
        currency,
        description,
        method,
        tag,
      });
    }
  };

  const updateButton = async () => { //atualiza uma despesa
    const { expenses, idToEdit } = globalWallet;

    const updatedExpensesForm = await buildExpense();

    const newExpenses = expenses.map((exp) =>
      exp.id === idToEdit
        ? {
            ...exp,
            ...updatedExpensesForm,
          }
        : exp
    );

    dispatch(editExpenseFinished(newExpenses));

    setExpensesForm(initialState);
  };

  const { value, description, currency, method, tag } = expensesForm;
  const { editor } = globalWallet;
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
            onClick={(e) => {
              e.preventDefault();
              if (editor) {
                updateButton();
              } else {
                saveDataOnClick();
              }
            }}
          >
            { editor ? 'Editar despesa' : 'Adicionar Despesas' }
          </button>
        </div>
      </form>
    </div>
  );
}

export default WalletForm;
