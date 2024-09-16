import React, { useState } from "react";
import { FaSearch, FaInfoCircle } from "react-icons/fa";
import { supabase } from "../utils/supabaseClient";

const Update = () => {
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [sheetName, setSheetName] = useState("");
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [action, setAction] = useState("view");
  const [rowNo, setRowNo] = useState("");
  const [rowData, setRowData] = useState({});
  const [message, setMessage] = useState("");

  const fetchRows = async () => {
    const { data: spreadsheetData, error: spreadsheetError } = await supabase
      .from("spreadsheet")
      .select("id")
      .eq("spreadsheet_id", spreadsheetId)
      .single();

    if (spreadsheetError || !spreadsheetData) {
      setMessage("Spreadsheet not found");
      return;
    }

    const { data: sheetData, error: sheetError } = await supabase
      .from("sheet")
      .select("id, title_array")
      .eq("spreadsheet_id", spreadsheetData.id)
      .eq("sheet_name", sheetName)
      .single();

    if (sheetError || !sheetData) {
      setMessage("Sheet not found");
      return;
    }

    setColumns(sheetData.title_array);

    const { data: rowsData, error: rowsError } = await supabase
      .from("row")
      .select("*")
      .eq("sheet_id", sheetData.id);

    if (rowsError) {
      setMessage("Error fetching rows");
      return;
    }

    setRows(rowsData);
    setMessage("");
  };

  const handleSubmit = async () => {
    if (action === "insert") {
      console.log("Insert action triggered with data:", rowData);
    } else if (action === "update") {
      console.log(
        "Update action triggered for row no:",
        rowNo,
        "with data:",
        rowData
      );
    } else if (action === "delete") {
      console.log("Delete action triggered for row no:", rowNo);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Update Rows</h1>

      <div className="max-w-3xl mx-auto mb-8 flex items-center">
        <input
          type="text"
          placeholder="Enter Spreadsheet ID"
          value={spreadsheetId}
          onChange={(e) => setSpreadsheetId(e.target.value)}
          className="flex-grow p-3 rounded-l-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Enter Sheet Name"
          value={sheetName}
          onChange={(e) => setSheetName(e.target.value)}
          className="flex-grow p-3 border-2 border-l-0 border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={fetchRows}
          className="bg-blue-500 text-white p-4 rounded-r-lg hover:bg-blue-600 transition duration-300"
        >
          <FaSearch />
        </button>
      </div>

      {/* Action Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        {["view", "insert", "update", "delete"].map((tab) => (
          <button
            key={tab}
            onClick={() => setAction(tab)}
            className={`p-3 rounded-lg ${
              action === tab ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Row Number Input (for update and delete) */}
      {(action === "update" || action === "delete") && (
        <div className="max-w-3xl mx-auto mb-8">
          <input
            type="number"
            placeholder="Enter Row Number"
            value={rowNo}
            onChange={(e) => setRowNo(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
      )}

      {/* Row Data Inputs (for insert and update) */}
      {(action === "insert" || action === "update") && (
        <div className="max-w-3xl mx-auto mb-8">
          {columns.map((column) => (
            <input
              key={column}
              type="text"
              placeholder={`Enter ${column}`}
              value={rowData[column] || ""}
              onChange={(e) =>
                setRowData({ ...rowData, [column]: e.target.value })
              }
              className="w-full p-3 mb-4 border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          ))}
        </div>
      )}

      {/* Submit Button */}
      {action !== "view" && (
        <div className="max-w-3xl mx-auto mb-8">
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300"
          >
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </button>
        </div>
      )}

      {/* Display Rows */}
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {rows.length > 0 && (
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2">Row No</th>
                {columns.map((col) => (
                  <th key={col} className="px-4 py-2 border-b-2">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-2 border-b">{row.row_no}</td>
                  {columns.map((col) => (
                    <td key={col} className="px-4 py-2 border-b">
                      {row.data[col] || ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Display message */}
      {message && <p className="text-red-500 text-center mt-4">{message}</p>}
    </div>
  );
};

export default Update;
