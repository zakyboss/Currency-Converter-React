import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [currencyFrom, setCurrencyFrom] = useState("");
  const [currencyTo, setCurrencyTo] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const currencyData = {
    currencyFrom,
    currencyTo,
    amount,
    setCurrencyFrom,
    setCurrencyTo,
    setAmount,
    result,
  };
  useEffect(
    function () {
      const controller = new AbortController();

      if (!amount || !currencyFrom || !currencyTo) {
        return;
      }

      async function getCurrency() {
        if (currencyFrom === currencyTo) {
          setResult(amount);
          return;
        }
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error("Failed to fetch currency data");
          }

          const data = await res.json();

          if (!data.rates || !data.rates[currencyTo]) {
            throw new Error("No conversion rate found");
          }

          setResult(data.rates[currencyTo]);
          setError(null);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error("Currency conversion error:", err.message);
            setError(err.message);
            setResult(null);
          }
        } finally {
          setIsLoading(false);
        }
      }

      getCurrency();

      return function () {
        controller.abort();
      };
    },
    [currencyFrom, currencyTo, amount]
  );
  return (
    <div className="App">
      <Header />
      <CurrencyChange>
        <MoneyForm
          currencyData={currencyData}
          isLoading={isLoading}
          error={error}
        />
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

function MoneyForm({ currencyData, isLoading, error }) {
  const {
    currencyFrom,
    currencyTo,
    amount,
    setCurrencyFrom,
    setCurrencyTo,
    setAmount,
    result,
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
          <Output result={result} isLoading={isLoading} error={error} />
        </span>
      </div>
    </div>
  );
}
function Output({ result, isLoading, error }) {
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {result !== null && <p>Converted Amount: {result}</p>}{" "}
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
