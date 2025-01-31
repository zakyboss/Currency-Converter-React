import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [currencyFrom, setCurrencyFrom] = useState("");
  const [currencyTo, setCurrencyTo] = useState("");
  const [amount, setAmount] = useState("");

  const currencyData = {
    currencyFrom,
    currencyTo,
    amount,
    setCurrencyFrom,
    setCurrencyTo,
    setAmount,
  };
  useEffect(
    function () {
      async function getCurrency() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`
        );
        const data = await res.json();
        console.log(data);
      }
      getCurrency();
    },
    [currencyFrom, currencyTo, amount]
  );
  return (
    <div className="App">
      <Header />
      <CurrencyChange>
        <MoneyForm currencyData={currencyData} />
      </CurrencyChange>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="headerContainer">
      <img src="./logo.jpeg" alt="money logo" id="logo" />
      <h1 id="header">Welcome to Money app </h1>
    </div>
  );
}

function CurrencyChange({ children }) {
  return <div className="currencyContainer">{children}</div>;
}

function MoneyForm({ currencyData }) {
  const {
    currencyFrom,
    currencyTo,
    amount,
    setCurrencyFrom,
    setCurrencyTo,
    setAmount,
  } = currencyData;

  return (
    <div className="formContainer">
      <div className="formRow">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount"
          className="amountInput"
        />
        <select
          value={currencyFrom}
          onChange={(e) => setCurrencyFrom(e.target.value)}
          className="currencySelect"
        >
          <option value="">From</option>
          <option value="USD">USD</option>
          <option value="CAD">CANADA</option>
          <option value="EUR">EUR</option>
          <option value="KSH">KSH</option>
        </select>
        <select
          value={currencyTo}
          onChange={(e) => setCurrencyTo(e.target.value)}
          className="currencySelect"
        >
          <option value="">To</option>
          <option value="USD">USD</option>
          <option value="CAD">CANADA</option>
          <option value="EUR">EUR</option>
          <option value="KSH">KSH</option>
        </select>
        <br />
        <span>
          <Output amount={amount} />
        </span>
      </div>
    </div>
  );
}
function Output({ amount }) {
  return (
    <div>
      <span>Amount is {amount}</span>
    </div>
  );
}
function Footer() {
  return (
    <div className="footerContainer">
      <h3>Made with love 💖 by &copy; Zakyboss</h3>
    </div>
  );
}

export default App;
