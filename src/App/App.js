import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Loading from "../assets/loading.gif";
import Sending from "../assets/sending.gif";

const URL_API =
  localhost.hostname === "localhost"
    ? "http://localhost:3000/mews"
    : "https://mews-server.herokuapp.com/mews";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [data, setData] = useState({ user: "", msg: "" });
  const ref = useRef(data.user);
  const [meowers, setMeowers] = useState([]);

  const ClickedHandler = (e) => {
    e.preventDefault();
    setSending(true);
    fetch(URL_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    })
      .then((res) => res.json())
      .then(() => {
        setData({ user: "", msg: "" });
        setSending(false);
        ref.current.focus();
      });
  };

  const AllMeowers = async () => {
    const res = await fetch(URL_API);
    const data = await res.json();
    if (data.length > meowers.length) setMeowers(data);
  };

  useEffect(() => {
    setLoading(true);
    AllMeowers();
    setLoading(false);
  }, [data]);

  return (
    <div className="app">
      <div className="app__title">Title for meower app</div>
      <img
        src={Sending}
        alt="Sending..."
        className={"app__sending" + (sending ? "" : " hidden")}
      />
      <form className={"app__form" + (sending ? " hidden" : "")}>
        <label
          htmlFor="user"
          className="app__input--label app__input--label-user"
        >
          Name user
        </label>
        <input
          type="text"
          id="user"
          name="user"
          className="app__input--value app__input--value-user"
          placeholder="input name user"
          value={data.user}
          onChange={(e) => setData({ ...data, user: e.target.value })}
          ref={ref}
        />
        <br />
        <label
          htmlFor="msg"
          className="app__input--label app__input--label-msg"
        >
          Message
        </label>
        <input
          type="text"
          id="msg"
          name="msg"
          className="app__input--value app__input--value-msg"
          placeholder="Input message for your cat"
          value={data.msg}
          onChange={(e) => setData({ ...data, msg: e.target.value })}
        />
        <input
          type="submit"
          value="Send"
          className="app__btn--send"
          onClick={ClickedHandler}
        />
      </form>
      <img
        src={Loading}
        alt="Loading..."
        className={"app__loading" + (loading ? "" : " hidden")}
      />
      <ul>
        {meowers.map((value, index) => (
          <li key={index}>
            {value.values.user} {value.values.msg}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
