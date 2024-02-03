import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actions } from "./redux/reducer";
import "bootstrap/dist/css/bootstrap.css";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Loading from "./Loading";
import { useForm } from "react-hook-form";

export const App = (props) => {
  const { handleSubmit, register, reset } = useForm();

  useEffect(() => {
    props.get();
    console.log(props);
  }, []);

  return (
    <div className="p-2">
      {props.loading ? (
        <Loading />
      ) : (
        <div>
          <button
            onClick={props.changeModal}
            className="btn btn-secondary mb-2"
          >
            Add video
          </button>
          <div style={{ gap: "1%" }} className="d-flex w-100 flex-wrap mt-3">
            {props.videos.map((itm, i) => {
              return (
                <div
                  style={{ width: "16%" }}
                  className="card cursor-pointer p-1 justify-end"
                  key={itm.id}
                >
                  <h1
                    onClick={() => props.openInfo(itm)}
                    className="text-3xl m-5 text-center"
                  >
                    {itm.name === "" ? "undefined" : itm.name}
                  </h1>
                  <button
                    onClick={() => props.deleteItmCard(itm.id)}
                    className="btn btn-danger"
                  >
                    delete
                  </button>
                </div>
              );
            })}
          </div>
          <Rodal
            visible={props.isOpen}
            height={"auto"}
            onClose={props.changeModal}
          >
            <form
              onSubmit={handleSubmit((data) =>
                props.myS({ data, videos: props.inputs })
              )}
            >
              <input
                {...register("name")}
                className="form-control mb-2 mt-4"
                type="text"
              />
              <div key={"salom"}>
                {props.inputs.map((itm, i) => (
                  <div className="flex gap-1 mb-1 items-center" key={itm.id}>
                    <input
                      onChange={(value) =>
                        props.changeNameV({ i, value: value.target.value })
                      }
                      value={itm.nameV}
                      placeholder="name of video"
                      className="form-control"
                      type="text"
                    />
                    <input
                      onChange={(value) =>
                        props.changeUrl({ i, value: value.target.value })
                      }
                      value={itm.url}
                      placeholder="url of video"
                      className="form-control"
                      type="text"
                    />
                    <button
                      onClick={() => props.deleteItm(i)}
                      type="button"
                      className="btn bg-danger btn-danger"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={props.newInput}
                type="button"
                className="btn btn-outline-info "
              >
                add input
              </button>
              <button type="submit" className="btn ml-1 btn-outline-success">
                save
              </button>
            </form>
          </Rodal>

          {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}

          <Rodal
            visible={props.isOpenInfo}
            // visible={true}
            // height={"auto"}
            onClose={props.changeModalInfo}
          >
            <div>
              <h1 className="text-5xl text-center border-b pb-1">Info</h1>
              {props.currentUser.videos
                ? props.currentUser.videos.map((itm) => (
                    <li className="text-3xl mt-2">
                      {itm.nameV}
                      <span className="mx-3">-</span>
                      <a
                        href={itm.url}
                        target="_blank"
                        className="text-blue-600"
                      >
                        video
                      </a>
                    </li>
                  ))
                : ""}
            </div>
          </Rodal>
        </div>
      )}
    </div>
  );
};

export default connect((state) => ({ ...state }), actions)(App);
