import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const StudModSubmission = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);

  // const [moduleName, setModuleName] = useState("");
  // const [title, setTitle] = useState("");
  // const [dueDate, setDueDate] = useState("");
  // const [submittedDate, setSubmittedDate] = useState("");
  // const [submittionStatus, setSubmittionStatus] = useState("");

  const [moduleName, setModuleName] = useState(""); //to create a new state when
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [dateUploaded, setDateUploaded] = useState("");
  const [allImage, setAllTmage] = useState(null);

  const moduleNameInputRef = useRef(null);
  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const dateUploadedInputRef = useRef(null);

  useEffect(() => {
    if (uploadSuccess) {
      setReloadPage(true);
    }
  }, [uploadSuccess]);

  useEffect(() => {
    if (reloadPage) {
      window.location.reload();
    }
  }, [reloadPage]);

  //description, file, dateUploaded, allImage moduleName:String,
  // title:String,
  // description:String,
  // pdf:String,
  // dateUploaded:Date,

  const getItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/studmodulesub/get-studmodSubfiles"
      );
      setItems(res.data.items);

      setLoading(false);

      console.log(res.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("moduleName", moduleName);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", fileInputRef.current.files[0]);
      formData.append("dateUploaded", dateUploaded);

      const item = await axios.post(
        "http://localhost:5000/studmodulesub/upload-studmodSubfiles",
        formData
      );
      console.log(item);
      if (item.data.status === "ok") {
        alert("You have submitted successfully!");
        viewItem();
      }

      setModuleName("");
      setTitle("");
      setDescription("");
      setDateUploaded("");

      moduleNameInputRef.current.value = "";
      titleInputRef.current.value = "";
      descriptionInputRef.current.value = "";
      dateUploadedInputRef.current.value = "";

      fileInputRef.current.value = null;

      setUploadSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const viewItem = (itemId) => {
    window.open(
      `http://localhost:5000/api/v1/items/view/${itemId}`,
      "_blank",
      "noreferrer"
    );
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(
        `http://localhost:5000/studmodulesub/deletefile/${itemId}`
      );

      console.log("Item removed successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div class="container">
        <p class="display-4">Student Submission</p>
        <div class="m-2">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td class="mx-2">Module Name</td>
                <td>
                  <input
                    type="text"
                    class="mx-2"
                    id="formGroupExampleInput"
                    ref={moduleNameInputRef}
                    onChange={(e) => setModuleName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td class="mx-2">Title</td>
                <td>
                  <input
                    type="text"
                    class="mx-2"
                    id="formGroupExampleInput"
                    ref={titleInputRef}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td class="mx-2">Description</td>
                <td>
                  <input
                    type="text"
                    class="mx-2"
                    id="formGroupExampleInput"
                    ref={descriptionInputRef}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td class="mx-2">Submitted Date</td>
                <td>
                  <input
                    type="date"
                    class="mx-2"
                    id="formGroupExampleInput"
                    ref={dateUploadedInputRef}
                    onChange={(e) => setDateUploaded(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <form>
          <div class="form-group">
            <input
              type="file"
              class="file mx-5"
              id="exampleFormControlFile1"
              ref={fileInputRef}
            />

            <button
              type="button"
              class="btn btn-success mx-5"
              onClick={addItem}
            >
              Upload
            </button>

            {/* 
                <button type="button" class="btn btn-secondary" onClick={() => viewItem(id)}>View</button>
                 */}
          </div>
        </form>

        <div className="items">
          {items &&
            items.map((item) => (
              <div className="item" key={item._id}>
                <h6>{item.moduleName}</h6>
                <button
                  type="button"
                  class="btn btn-secondary mx-3"
                  onClick={() => viewItem(item._id)}
                >
                  View File
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default StudModSubmission;
