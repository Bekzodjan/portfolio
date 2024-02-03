import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actions } from "./redux/reducer";
import "bootstrap/dist/css/bootstrap.min.css";
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
    <div className="">
      {props.loading ? (
        <Loading />
      ) : (
        <div>
          <div className="w-50 mx-auto d-flex justify-content-end mb-2">
          <button
            onClick={props.changeModal}
            className="btn my-btn_ btn-success w-25 "
          >
            +
          </button>
          </div>
          <div className="p-4 d-flex f-box_ gap-3 flex-wrap w-100 container">
            {props.videos.map((itm, i) => {
              return (
                <div
                  className="border p-2 _box"
                  key={itm.id}
                >
                  <h5
                    
                    className="text-center text-xl font-medium leading-tight mb-2"
                  >
                    {itm.name === "" ? "undefined" : itm.name}
                  </h5>
                  <h6 className="text-center mb-3 text-base font-medium leading-tight">There are <span className="text-danger">{itm.videos.length}</span> videos in this lesson</h6>
                  <p onClick={() => props.openInfo(itm)} className="text-primary mb-4">show click</p>
                  <button
                    onClick={() => props.deleteItmCard(itm.id)}
                    className="btn btn-danger"
                  >
                    Delete Lesson
                  </button>
                </div>
              );
            })}
          </div>
          <Rodal
            visible={props.isOpen}
            className="overflow-scroll"
            onClose={props.changeModal}
          >
            <form
              onSubmit={handleSubmit((data) =>
                props.myS({ data, videos: props.inputs })
              )}
            >
              <input
              placeholder="lesson name"
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
