import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetItineraryQuery,
  useUpdateItineraryMutation,
} from "../redux/api/itinerary.api";
import { MdCancel, MdDelete, MdLibraryAdd } from "react-icons/md";
import { planTypes } from "../constants/planTypes";
import Loading from "./Loading";

const EditItinerary = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { plan: planData, itinerary: itineraryData } = useSelector(
    (state) => state.planDetails
  );
  const [
    UpdateItineraryApiCall,
    { isLoading: isUpdateItineraryMutationLoading },
  ] = useUpdateItineraryMutation();

  const [itinerary, setItinerary] = useState([
    {
      day: "",
      date: "",
      desc: "",
      plans: [{ type: "", plan: "", time: "", link: "" }],
    },
  ]);
  const [note, setNote] = useState();

  const {
    data,
    error,
    isLoading: isGetItineraryQueryLoading,
  } = useGetItineraryQuery(planId);

  useEffect(() => {
    if (planId) {
      if (planData && planId === planData._id) {
        setItinerary(itineraryData?.itinerary);
        setNote(itineraryData?.note);
      } else {
        if (data) {
          setItinerary(data?.data?.itinerary?.itinerary);
          setNote(data?.data?.itinerary?.note);
        } else if (error) {
          // console.log(error);
          toast.error(error?.data?.message || "Failed to fetch plan");
        }
      }
    }
  }, [planId, data, error, dispatch]);

  const handleAddDay = (e, index) => {
    e.preventDefault();

    const newDays = [...itinerary];

    const nextDay = parseInt(newDays[index].day, 10) + 1;

    let date = new Date(newDays[index].date);
    // Add 1 day to the date
    date.setDate(date.getDate() + 1);
    // Format the new date as "yyyy-MM-dd"
    let nextDateStr = date.toISOString().split("T")[0];

    newDays.splice(index + 1, 0, {
      day: nextDay,
      date: nextDateStr,
      desc: "",
      plans: [{ type: "", plan: "", time: "10:00", link: "" }],
    });

    setItinerary(newDays);
  };

  const handleDeleteDay = (e, index) => {
    e.preventDefault();

    const newDays = itinerary.filter((_, i) => i !== index);
    setItinerary(newDays);
  };

  // const handleDayInputChange = (dayIndex, field, value) => {
  //   const newDays = [...itinerary];
  //   newDays[dayIndex][field] = value;
  //   setItinerary(newDays);
  // };

  const handleDayInputChange = (dayIndex, field, value) => {
    const newDays = itinerary.map((day, index) => {
      if (index === dayIndex) {
        return {
          ...day,
          [field]: value, // Use computed property name for dynamic field assignment
        };
      }
      return day; // Return the existing day object for other indices
    });
    setItinerary(newDays);
  };

  // const handlePlanInputChange = (dayIndex, planIndex, field, value) => {
  //   const newDays = [...itinerary];
  //   newDays[dayIndex].plans[planIndex][field] = value;
  //   setItinerary(newDays);
  // };

  const handlePlanInputChange = (dayIndex, planIndex, field, value) => {
    const newDays = itinerary.map((day, index) => {
      if (index === dayIndex) {
        const updatedPlans = day.plans.map((plan, pIndex) => {
          if (pIndex === planIndex) {
            return {
              ...plan,
              [field]: value, // Use computed property name for dynamic field assignment
            };
          }
          return plan; // Return the existing plan object for other indices
        });
        return {
          ...day,
          plans: updatedPlans,
        };
      }
      return day; // Return the existing day object for other indices
    });
    setItinerary(newDays);
  };

  const handleAddPlan = (e, dayIndex, planIndex) => {
    e.preventDefault();

    // Create a deep copy of the itinerary
    const newDays = [...itinerary];
    newDays[dayIndex] = {
      ...newDays[dayIndex],
      plans: [...newDays[dayIndex].plans],
    };

    newDays[dayIndex].plans.splice(planIndex + 1, 0, {
      type: "",
      plan: "",
      time: "10:00",
      link: "",
    });
    setItinerary(newDays);
  };

  const handleDeletePlan = (e, dayIndex, planIndex) => {
    e.preventDefault();

    // Create a deep copy of the itinerary
    const newDays = [...itinerary];
    newDays[dayIndex] = {
      ...newDays[dayIndex],
      plans: [...newDays[dayIndex].plans],
    };
    // Modify the plans array
    newDays[dayIndex].plans.splice(planIndex, 1);

    // Update the state
    setItinerary(newDays);
  };

  const filledItineraryData = { itinerary, note };

  const handleUpdateItinerary = async (e) => {
    e.preventDefault();

    try {
      const res = await UpdateItineraryApiCall({
        planId,
        data: filledItineraryData,
      }).unwrap();
      toast.success(res?.message);
      // navigate("/");
      navigate(`/plans/${res.data.plan._id}`);
    } catch (err) {
      // console.log(err);
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  const handleClose = () => {
    navigate(`/plans/${planId}`);
  };

  return (
    <div className="overflow-hidden space-y-5">
      <div className="space-y-1">
        <div className="flex flex-row items-center justify-between">
          <div className="font-Poppins text-2xl font-bold text-slate-800">
            Update the Itinerary
          </div>
          <div className="cursor-pointer" onClick={handleClose}>
            <MdCancel className="text-2xl text-slate-800 hover:text-black" />
          </div>
        </div>
        <div className="font-Poppins text-base font-medium text-slate-500">
          Edit the itinerary of this plan
        </div>
      </div>
      {
        (!itinerary[0].day && !itinerary[0].date) || isGetItineraryQueryLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            {" "}
            <Loading />{" "}
          </div>
        ) : (
          <div>
            <form className="w-full space-y-4" onSubmit={handleUpdateItinerary}>
              <div className="space-y-2">
                {itinerary &&
                  itinerary.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="space-y-2 bg-slate-200 rounded-sm p-2"
                    >
                      <div className="flex items-center justify-between space-x-5">
                        <div className="flex items-center justify-start space-x-2">
                          <label
                            htmlFor="day"
                            className="font-Poppins block text-xl font-medium leading-6 text-gray-800"
                          >
                            Day<span className="text-red-600"> *</span>
                          </label>
                          <div className="">
                            <input
                              id="day"
                              name="day"
                              type="number"
                              required
                              value={day.day}
                              onChange={(e) =>
                                handleDayInputChange(
                                  dayIndex,
                                  "day",
                                  e.target.value
                                )
                              }
                              className="font-Poppins appearance-none outline-none block w-12 rounded-sm border-0 px-1.5 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-start space-x-2">
                          <button
                            className="p-2 aspect-square rounded-sm bg-blue-400 hover:bg-blue-500 text-blue-900"
                            onClick={(e) => handleAddDay(e, dayIndex)}
                          >
                            <MdLibraryAdd />
                          </button>
                          {(dayIndex > 0 || itinerary.length > 1) && (
                            <button
                              className="p-2 aspect-square rounded-sm bg-red-500 hover:bg-red-600 text-red-900"
                              onClick={(e) => handleDeleteDay(e, dayIndex)}
                            >
                              <MdDelete />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-start space-x-2">
                        <label
                          htmlFor="date"
                          className="font-Poppins block font-medium leading-6 text-gray-800"
                        >
                          Date<span className="text-red-600"> *</span>
                        </label>
                        <div className="">
                          <input
                            id="date"
                            name="date"
                            type="date"
                            required
                            value={day.date}
                            onChange={(e) =>
                              handleDayInputChange(dayIndex, "date", e.target.value)
                            }
                            className="font-Poppins appearance-none outline-none block w-full rounded-sm border-0 px-1.5 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="desc"
                          className="font-Poppins block font-medium leading-6 text-gray-800"
                        >
                          Description
                        </label>
                        <div className="">
                          <textarea
                            id="desc"
                            name="desc"
                            type="desc"
                            value={day.desc}
                            onChange={(e) =>
                              handleDayInputChange(dayIndex, "desc", e.target.value)
                            }
                            className="font-Poppins appearance-none outline-none block w-full rounded-sm border-0 px-1.5 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="font-Poppins block font-medium leading-6 text-gray-800">
                          Plans<span className="text-red-600"> *</span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="border-collapse border-2 border-gray-400 min-w-full font-Poppins">
                            <thead>
                              <tr>
                                <th className="border-2 border-gray-400 min-w-12"></th>
                                <th className="border-2 border-gray-400 min-w-36">
                                  Type
                                </th>
                                <th className="border-2 border-gray-400 min-w-72">
                                  Plan<span className="text-red-600"> *</span>
                                </th>
                                <th className="border-2 border-gray-400 min-w-36">
                                  Time
                                </th>
                                <th className="border-2 border-gray-400 min-w-36">
                                  Link
                                </th>
                                <th className="border-2 border-gray-400 min-w-12"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {day.plans &&
                                day.plans.map((plan, planIndex) => (
                                  <tr key={planIndex} className="">
                                    {planIndex > 0 || day.plans.length > 1 ? (
                                      <td
                                        className="flex items-center justify-center text-center border border-gray-400 bg-red-600 hover:bg-red-800 text-white cursor-pointer"
                                        onClick={(e) => handleDeletePlan(e, dayIndex, planIndex)}
                                      >
                                        DEL
                                      </td>
                                    ) : (
                                      <td></td>
                                    )}
                                    <td className="border border-gray-400">
                                      <select
                                        type="text"
                                        value={plan.type}
                                        onChange={(e) =>
                                          handlePlanInputChange(
                                            dayIndex,
                                            planIndex,
                                            "type",
                                            e.target.value
                                          )
                                        }
                                        className="font-Poppins appearance-none outline-none block w-full rounded-sm border-0 px-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
                                      >
                                        <option value="" disabled>
                                          Select type
                                        </option>
                                        {planTypes &&
                                          planTypes.map((item, index) => (
                                            <option key={index} value={item}>
                                              {item}
                                            </option>
                                          ))}
                                      </select>
                                    </td>
                                    <td className="border border-gray-400">
                                      <input
                                        type="text"
                                        value={plan.plan}
                                        onChange={(e) =>
                                          handlePlanInputChange(
                                            dayIndex,
                                            planIndex,
                                            "plan",
                                            e.target.value
                                          )
                                        }
                                        className="font-Poppins appearance-none outline-none block w-full rounded-sm border-0 px-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
                                      />
                                    </td>
                                    <td className="border border-gray-400">
                                      <input
                                        type="time"
                                        value={plan.time}
                                        onChange={(e) =>
                                          handlePlanInputChange(
                                            dayIndex,
                                            planIndex,
                                            "time",
                                            e.target.value
                                          )
                                        }
                                        className="font-Poppins appearance-none outline-none block w-full rounded-sm border-0 px-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
                                      />
                                    </td>
                                    <td className="border border-gray-400">
                                      <input
                                        type="text"
                                        value={plan.link}
                                        onChange={(e) =>
                                          handlePlanInputChange(
                                            dayIndex,
                                            planIndex,
                                            "link",
                                            e.target.value
                                          )
                                        }
                                        className="font-Poppins appearance-none outline-none block w-full rounded-sm border-0 px-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
                                      />
                                    </td>
                                    <td
                                      className="border border-gray-400 flex items-center justify-center text-center bg-green-500 hover:bg-green-700 text-white cursor-pointer"
                                      onClick={(e) => handleAddPlan(e, dayIndex, planIndex)}
                                    >
                                      Add
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div>
                <label
                  htmlFor="note"
                  className="font-Poppins block font-medium leading-6 text-gray-800"
                >
                  Note
                </label>
                <div className="">
                  <textarea
                    id="note"
                    name="note"
                    type="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="font-Poppins appearance-none outline-none block w-full rounded-sm border-0 px-1.5 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="pt-5">
                {isUpdateItineraryMutationLoading ? (
                  <div className="font-Poppins flex w-full justify-center rounded-sm bg-indigo-700 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700">
                    Updating the Itinerary ...
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="font-Poppins flex w-full justify-center rounded-sm bg-indigo-700 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
                  >
                    Update the Itinerary
                  </button>
                )}
              </div>
            </form>
          </div>
        )
      }
    </div>
  );
};

export default EditItinerary;
