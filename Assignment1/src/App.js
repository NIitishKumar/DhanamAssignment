import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [isHoliday, setIsHoliday] = useState(true);

  const handleClick = async () => {
    const res = await fetch("https://www.gov.uk/bank-holidays.json");
    const data = await res.json();
    setData(data.scotland.events);
    if (data) {
      data.scotland.events?.map((ele) => {
        if (ele.date >= from && ele.date <= to) {
          setIsHoliday(false);
        }
      });
    } else {
      setIsHoliday(true);
    }
  };

  const handleChange = async (e) => {
    if (e.target.name === "from") {
      setFrom(e.target.value);
    } else {
      setTo(e.target.value);
    }
    if (data) {
      data.map((ele) => {
        if (ele.date >= from && ele.date <= to) {
          console.log("dsfasdfs", isHoliday);
          setIsHoliday(false);
        }
      });
    } else {
      setIsHoliday(true);
    }
  };

  useEffect(async () => {
    let a = true;
    if (data)
      data.map((ele) => {
        if (ele.date >= from && ele.date <= to) {
          a = false;
        }
      });

    setIsHoliday(a);
  }, []);

  return (
    <div className="App">
      {console.log(isHoliday)}
      <h1>Scotland Holidays</h1>
      <label htmlFor="from"> From </label>
      <input id="from" name="from" type="date" onChange={handleChange}></input>
      <label htmlFor="to"> To </label>
      <input id="to" name="to" type="date" onChange={handleChange}></input>
      <br />
      <br />
      <button type="submit" onClick={handleClick}>
        Get holidays
      </button>
      {data
        ? data.map((ele) => {
            if (ele.date >= from && ele.date <= to) {
              return (
                <div>
                  <p>Title : {ele.title}</p>
                  <p>Date : {ele.date}</p>
                </div>
              );
            }
          })
        : ""}
      {isHoliday ? <p>Oops! No Holiday</p> : ""}
    </div>
  );
}

export default App;
