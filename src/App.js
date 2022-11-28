import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTodo,
  addTodo,
  checkTodo,
  updateTodo,
} from "./features/TodoSlice";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit2, FiX, FiCheck } from "react-icons/fi";

import {} from "./animation";

const App = () => {
  const ref = useRef(null);
  const getRef = ref.current;
  useEffect(() => {}, []);

  const dispatch = useDispatch();
  const { todoList } = useSelector((state) => state.todo);
  const [value, setValue] = useState("");
  const [menu, setMenu] = useState("showSelect");

  const [menuContent, setMenuContent] = useState("all");

  const [line, setLine] = useState({
    transform: "translate(0%,0%)",
    backgroundColor: "rgb(98, 0, 238)",
    height: "2px",
    width: "50%",
    transition: "0.4s",
  });

  const [pageChange] = useState({
    cursor: "pointer",
    color: "rgb(0, 0, 0)",
    transform: "translateY(0px)",
    transition: "all 0.4s ease 0s",
  });

  const [labelTransform, setLabelTransform] = useState({
    transform: "translate(-244%, -134%)",
    backgroundColor: "rgb(255,255,255)",
    transition: "all 0.3s ease 0s",
    pointerEvents: "none",
    color: "gray",
  });

  const [zoomEffect, setZoomEffect] = useState({
    backgroundColor: "0d6efd",
    borderColor: "0d6efd",
    transform: "scale(1.0)",
  });

  const [dataPending, setDataPending] = useState({});
  const [dataCompleted, setDataCompleted] = useState({});
  const [dataSearching, setDataSearching] = useState({});
  const [checkUpdate, setCheckUpdate] = useState();
  const [updateContent, setUpdateContent] = useState();

  const getDataWork = () => {
    const newDataCompleted = todoList.filter((item) => {
      return item.checked === true;
    });
    setDataCompleted(newDataCompleted);

    const newDataPending = todoList.filter((item) => {
      return item.checked === false;
    });
    setDataPending(newDataPending);
  };

  const searchItem = (value) => {
    const searchData = todoList.filter((item) => {
      return item.content.toLowerCase().includes(value);
    });
    setDataSearching(searchData);
  };

  useEffect(() => {
    getDataWork();
    searchItem();
  }, [todoList]);

  const renderItem = () => {
    if (menu === "showSelect") {
      if (menuContent === "all") {
        return todoList.map((item, id) =>
          checkUpdate === item.id ? (
            <li
              className="list-group-item d-flex row align-items-center border-0 mb-2"
              style={{ backgroundColor: "#f4f6f7" }}
              key={id}
            >
              <div className="col-2">
                <input
                  style={{ accentColor: "#0d6efd" }}
                  className="border-primary"
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => dispatch(checkTodo(item.id))}
                />
              </div>

              <div className="col position-relative dateHoverToggle test">
                <input
                  className="mb-0"
                  style={{ height: "100%" }}
                  defaultValue={item.content}
                  onChange={(e) => setUpdateContent(e.target.value)}
                />
              </div>
              <span className="dateHover">Thứ Ba - 26/7/2022 - 00:00</span>

              <div className="col text-end">
                <div className="me-2">
                  <span className="mx-2">
                    <FiCheck
                      className="hover-tool-icon"
                      style={{ color: "green" }}
                      onClick={() => {
                        dispatch(
                          updateTodo([
                            {
                              id: item.id,
                              content: updateContent
                                ? updateContent
                                : item.content,
                            },
                          ])
                        );
                        setUpdateContent();
                        setCheckUpdate();
                      }}
                    />
                  </span>
                  <span>
                    <FiX
                      className="hover-tool-icon"
                      style={{ color: "red" }}
                      onClick={() => setCheckUpdate()}
                    />
                  </span>
                </div>
              </div>
            </li>
          ) : (
            <li
              className="list-group-item d-flex row align-items-center border-0 mb-2"
              style={{ backgroundColor: "#f4f6f7" }}
              key={id}
            >
              <div className="col-2 p">
                <input
                  style={{
                    display: "flex",
                    accentColor: "#0d6efd",
                    height: "20px",
                    width: "20px",
                  }}
                  className="border-primary"
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => dispatch(checkTodo(item.id))}
                />
              </div>

              <div className="col position-relative dateHoverToggle test">
                <i className="mb-0" style={{ fontSize: "12px" }}>
                  {item.date}
                </i>
                <p className="mb-0 p-0" style={{ fontSize: "18px" }}>
                  {item.content}
                </p>
              </div>
              <div className="col text-end">
                <i className="mb-1 me-3" style={{ fontSize: "12px" }}>
                  {item.time}
                </i>
                <div className="me-2">
                  <span className="mx-2">
                    <AiFillDelete
                      className="hover-tool-icon"
                      onClick={() => dispatch(removeTodo(item.id))}
                    />
                  </span>
                  <span>
                    <FiEdit2
                      className="hover-tool-icon"
                      onClick={() => setCheckUpdate(item.id)}
                    />
                  </span>
                </div>
              </div>
            </li>
          )
        );
      }
      if (menuContent === "completed") {
        return dataCompleted.map((item, id) =>
          checkUpdate === item.id ? (
            <li
              className="list-group-item d-flex row align-items-center border-0 mb-2"
              style={{ backgroundColor: "#f4f6f7" }}
              key={id}
            >
              <div className="col-2">
                <input
                  style={{ accentColor: "#0d6efd" }}
                  className="border-primary"
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => dispatch(checkTodo(item.id))}
                />
              </div>

              <div className="col position-relative dateHoverToggle test">
                <input
                  className="mb-0"
                  style={{ height: "100%" }}
                  defaultValue={item.content}
                  onChange={(e) => setUpdateContent(e.target.value)}
                />
              </div>
              <span className="dateHover">Thứ Ba - 26/7/2022 - 00:00</span>

              <div className="col text-end">
                <div className="me-2">
                  <span className="mx-2">
                    <FiCheck
                      className="hover-tool-icon"
                      style={{ color: "green" }}
                      onClick={() => {
                        dispatch(
                          updateTodo([
                            {
                              id: item.id,
                              content: updateContent
                                ? updateContent
                                : item.content,
                            },
                          ])
                        );
                        setUpdateContent();
                        setCheckUpdate();
                      }}
                    />
                  </span>
                  <span>
                    <FiX
                      className="hover-tool-icon"
                      style={{ color: "red" }}
                      onClick={() => setCheckUpdate()}
                    />
                  </span>
                </div>
              </div>
            </li>
          ) : (
            <li
              className="list-group-item d-flex row align-items-center border-0 mb-2"
              style={{ backgroundColor: "#f4f6f7" }}
              key={id}
            >
              <div className="col-2 p">
                <input
                  style={{
                    display: "flex",
                    accentColor: "#0d6efd",
                    height: "20px",
                    width: "20px",
                  }}
                  className="border-primary"
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => dispatch(checkTodo(item.id))}
                />
              </div>

              <div className="col position-relative dateHoverToggle test">
                <i className="mb-0" style={{ fontSize: "12px" }}>
                  {item.date}
                </i>
                <p className="mb-0 p-0" style={{ fontSize: "18px" }}>
                  {item.content}
                </p>
              </div>
              <div className="col text-end">
                <i className="mb-1 me-3" style={{ fontSize: "12px" }}>
                  {item.time}
                </i>
                <div className="me-2">
                  <span className="mx-2">
                    <AiFillDelete
                      className="hover-tool-icon"
                      onClick={() => dispatch(removeTodo(item.id))}
                    />
                  </span>
                  <span>
                    <FiEdit2
                      className="hover-tool-icon"
                      onClick={() => setCheckUpdate(item.id)}
                    />
                  </span>
                </div>
              </div>
            </li>
          )
        );
      }
      if (menuContent === "pending") {
        return dataPending.map((item, id) =>
          checkUpdate === item.id ? (
            <li
              className="list-group-item d-flex row align-items-center border-0 mb-2"
              style={{ backgroundColor: "#f4f6f7" }}
              key={id}
            >
              <div className="col-2">
                <input
                  style={{ accentColor: "#0d6efd" }}
                  className="border-primary"
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => dispatch(checkTodo(item.id))}
                />
              </div>

              <div className="col position-relative dateHoverToggle test">
                <input
                  className="mb-0"
                  style={{ height: "100%" }}
                  defaultValue={item.content}
                  onChange={(e) => setUpdateContent(e.target.value)}
                />
              </div>
              <span className="dateHover">Thứ Ba - 26/7/2022 - 00:00</span>

              <div className="col text-end">
                <div className="me-2">
                  <span className="mx-2">
                    <FiCheck
                      className="hover-tool-icon"
                      style={{ color: "green" }}
                      onClick={() => {
                        dispatch(
                          updateTodo([
                            {
                              id: item.id,
                              content: updateContent
                                ? updateContent
                                : item.content,
                            },
                          ])
                        );
                        setUpdateContent();
                        setCheckUpdate();
                      }}
                    />
                  </span>
                  <span>
                    <FiX
                      className="hover-tool-icon"
                      style={{ color: "red" }}
                      onClick={() => setCheckUpdate()}
                    />
                  </span>
                </div>
              </div>
            </li>
          ) : (
            <li
              className="list-group-item d-flex row align-items-center border-0 mb-2"
              style={{ backgroundColor: "#f4f6f7" }}
              key={id}
            >
              <div className="col-2 p">
                <input
                  style={{
                    display: "flex",
                    accentColor: "#0d6efd",
                    height: "20px",
                    width: "20px",
                  }}
                  className="border-primary"
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => dispatch(checkTodo(item.id))}
                />
              </div>

              <div className="col position-relative dateHoverToggle test">
                <i className="mb-0" style={{ fontSize: "12px" }}>
                  {item.date}
                </i>
                <p className="mb-0 p-0" style={{ fontSize: "18px" }}>
                  {item.content}
                </p>
              </div>
              <div className="col text-end">
                <i className="mb-1 me-3" style={{ fontSize: "12px" }}>
                  {item.time}
                </i>
                <div className="me-2">
                  <span className="mx-2">
                    <AiFillDelete
                      className="hover-tool-icon"
                      onClick={() => dispatch(removeTodo(item.id))}
                    />
                  </span>
                  <span>
                    <FiEdit2
                      className="hover-tool-icon"
                      onClick={() => setCheckUpdate(item.id)}
                    />
                  </span>
                </div>
              </div>
            </li>
          )
        );
      }
    } else if (
      menu === "searchSelect" &&
      menuContent === "all" &&
      dataSearching.length
    ) {
      return dataSearching.map((item, id) => (
        <li
          className="list-group-item d-flex row align-items-center border-0 mb-2"
          style={{ backgroundColor: "#f4f6f7" }}
          key={id}
        >
          <div className="col-2">
            <input
              style={{ accentColor: "#0d6efd" }}
              className="border-primary"
              type="checkbox"
              disabled="disabled"
              readOnly
              checked={item.checked}
            />
          </div>

          <div className="col position-relative dateHoverToggle test">
            <i className="mb-0" style={{ fontSize: "12px" }}>
              {item.date}
            </i>
            <p className="mb-0 p-0" style={{ fontSize: "18px" }}>
              {item.content}
            </p>
          </div>

          <div className="col text-end">
            <i className="mb-1 me-3" style={{ fontSize: "12px" }}>
              {item.time}
            </i>
            <div className="me-2">
              <span className="mx-2"></span>
            </div>
          </div>
        </li>
      ));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted ✅");
  };

  const addTask = (value) => {
    if (value) {
      dispatch(
        addTodo({
          task: value,
        })
      );
      setValue("");
    }
  };

  return (
    <>
      <section className="w-100 mt-3">
        <div className="container" style={{ width: "600px" }}>
          <div className="row justify-content-center">
            <div className="col-10">
              <div className="card p-4" style={{ borderRadius: "0.75rem" }}>
                <div className="card-body">
                  <div className="text-center text-primary fs-1  mb-3 pb-3">
                    <span
                      onClick={() => {
                        console.log(todoList);
                      }}
                      role="button"
                    >
                      Todo App
                    </span>
                  </div>

                  <form
                    className="mb-3"
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    <div className="d-flex justify-content-center align-items-center text-center">
                      <div className="form-outline flex-fill">
                        <input
                          type="text"
                          value={value}
                          id="task"
                          className="position-relative form-control shadow-none"
                          onChange={(e) => setValue(e.target.value)}
                          onFocus={() => {
                            setLabelTransform({
                              ...labelTransform,
                              color: "rgb(60,135,255)",
                              transform: "translate(-244%, -214%)",
                            });
                          }}
                          onBlur={() => {
                            setLabelTransform({
                              ...labelTransform,
                              color: "gray",
                              transform: "translate(-244%, -134%)",
                            });
                            setTimeout(() => {
                              setValue("");
                            }, 500);
                          }}
                        />
                        <label
                          className="position-absolute align-items-center"
                          id="label-input"
                          style={labelTransform}
                        >
                          Add new
                        </label>
                      </div>
                      <div className="ms-2">
                        <button
                          type="submit"
                          id="ZoomEffect"
                          onClick={() => {
                            setZoomEffect({
                              ...zoomEffect,
                              transform: "scale(0.95)",
                            });
                            if (menu === "showSelect") {
                              addTask(value);
                            }
                            setTimeout(() => {
                              setZoomEffect({
                                ...zoomEffect,
                                transform: "scale(1.0)",
                              });
                            }, 100);
                          }}
                          className="btn btn-primary buttonAdd shadow-none"
                          style={
                            menu === "searchSelect"
                              ? {
                                  ...zoomEffect,
                                  backgroundColor: "grey",
                                  borderColor: "grey",
                                }
                              : {
                                  ...zoomEffect,
                                  backgroundColor: "#0d6efd",
                                  borderColor: "#0d6efd",
                                }
                          }
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="d-flex justify-content-center row text-center px-4">
                    <div
                      style={
                        menu === "showSelect"
                          ? {
                              ...pageChange,
                              color: "rgb(98, 0, 238)",
                              transform: "translateY(-2px)",
                            }
                          : {
                              ...pageChange,
                              color: "rgb(0, 0, 0)",
                              transform: "translateY(2px)",
                            }
                      }
                      className="col pb-2 fw-bold"
                      onClick={() => {
                        setMenu("showSelect");
                        setLine({ ...line, transform: "translate(0%,0%)" });
                      }}
                    >
                      Show
                    </div>
                    <div
                      style={
                        menu === "searchSelect"
                          ? {
                              ...pageChange,
                              color: "rgb(98, 0, 238)",
                              transform: "translateY(-2px)",
                            }
                          : {
                              ...pageChange,
                              color: "rgb(0, 0, 0)",
                              transform: "translateY(2px)",
                            }
                      }
                      className="col pb-2 fw-bold"
                      onClick={() => {
                        setMenu("searchSelect");
                        setLine({ ...line, transform: "translate(100%,0%)" });
                        setMenuContent("all");
                        searchItem("");
                      }}
                    >
                      Search
                    </div>
                  </div>
                  <div className="line" style={line}></div>
                  {menu === "showSelect" && (
                    <div
                      className="d-flex justify-content-between row text-center align-items-center p-2"
                      style={{
                        borderTop: "1px solid rgb(191, 191, 191)",
                        borderBottom: "1px solid rgb(191, 191, 191)",
                        height: "50px",
                      }}
                    >
                      <div
                        style={
                          menuContent === "all"
                            ? {
                                borderRadius: "6px",
                                cursor: "pointer",
                                backgroundColor: "rgb(23, 152, 251)",
                                color: "#fff",
                                transition: "all 0.4s ease 0s",
                                transform: "scale(1.02)",
                              }
                            : {
                                borderRadius: "6px",
                                cursor: "pointer",
                                backgroundColor: "#fff",
                                color: "#000",
                                transition: "all 0.4s ease 0s",
                                transform: "scale(0.9)",
                              }
                        }
                        className="col mx-3"
                        onClick={() => {
                          setMenuContent("all");
                        }}
                      >
                        All
                      </div>
                      <div
                        style={
                          menuContent === "completed"
                            ? {
                                borderRadius: "6px",
                                cursor: "pointer",
                                backgroundColor: "rgb(23, 152, 251)",
                                color: "#fff",
                                transition: "all 0.4s ease 0s",
                                transform: "scale(1.02)",
                              }
                            : {
                                borderRadius: "6px",
                                cursor: "pointer",
                                backgroundColor: "#fff",
                                color: "#000",
                                transition: "all 0.4s ease 0s",
                                transform: "scale(0.9)",
                              }
                        }
                        className="col"
                        onClick={() => {
                          setMenuContent("completed");
                        }}
                      >
                        Completed
                      </div>
                      <div
                        style={
                          menuContent === "pending"
                            ? {
                                borderRadius: "6px",
                                cursor: "pointer",
                                backgroundColor: "rgb(23, 152, 251)",
                                color: "#fff",
                                transition: "all 0.4s ease 0s",
                                transform: "scale(1.02)",
                              }
                            : {
                                borderRadius: "6px",
                                cursor: "pointer",
                                backgroundColor: "#fff",
                                color: "#000",
                                transition: "all 0.4s ease 0s",
                                transform: "scale(0.9)",
                              }
                        }
                        className="col"
                        onClick={() => {
                          setMenuContent("pending");
                        }}
                      >
                        Pending
                      </div>
                    </div>
                  )}
                  {menu === "searchSelect" && (
                    <div
                      className="d-flex justify-content-center row text-center py-2 align-items-center"
                      style={{
                        borderTop: "1px solid rgb(191, 191, 191)",
                        borderBottom: "1px solid rgb(191, 191, 191)",
                        height: "50px",
                      }}
                    >
                      <div className="">
                        <input
                          className="w-100"
                          type="text"
                          placeholder="What task are you looking for?"
                          style={{
                            borderRadius: "5px",
                            padding: "0 0 0 1rem",
                            border: "1px solid rgb(153, 153, 153)",
                            height: "32px",
                            outline: "none",
                          }}
                          onChange={(e) => {
                            searchItem(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <ul
                    className="mt-3 list-group m-0"
                    style={{
                      overflowY: "scroll",
                      overflowX: "hidden",
                      height: "200px",
                    }}
                  >
                    {todoList.length ? (
                      renderItem()
                    ) : (
                      <h5 className="text-center text-black mt-4">
                        You don't have any task here
                      </h5>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
