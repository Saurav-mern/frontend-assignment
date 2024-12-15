import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const recordsPerPage = 5; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
        );
        const result = await response.json();
        setData(result); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = data.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(data.length / recordsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <h1>Kickstarter Campaigns</h1>
      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>S.No</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((item) => (
            <tr key={item["s.no"]}>
              <td>{item["s.no"]}</td>
              <td>{item["percentage.funded"]}</td>
              <td>{item["amt.pledged"]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              background: currentPage === index + 1 ? "#007BFF" : "#f0f0f0",
              color: currentPage === index + 1 ? "white" : "black",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default App;
