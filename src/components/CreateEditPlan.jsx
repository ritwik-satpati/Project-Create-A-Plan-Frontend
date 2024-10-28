import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreatePlanMutation,
  useUpdatePlanMutation,
} from "../redux/api/plan.api";
import { useDispatch, useSelector } from "react-redux";
import { useGetItineraryQuery } from "../redux/api/itinerary.api";
import { MdCancel } from "react-icons/md";

const CreateEditPlan = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [CreatePlanApiCall, { isLoading: isCreatePlanMutationLoading }] =
    useCreatePlanMutation();
  const [UpdatePlanApiCall, { isLoading: isUpdatePlanMutationLoading }] =
    useUpdatePlanMutation();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [access, setAccess] = useState("Public");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [pageType, setPageType] = useState("create");

  const {
    data,
    error,
    isLoading: isGetItineraryQueryLoading,
  } = useGetItineraryQuery(planId);

  useEffect(() => {
    if (planId) {
      setPageType("edit");

      if (data) {
        setName(data?.data?.plan.name);
        setAbout(data?.data?.plan.about);
        setAccess(data?.data?.plan.access);
      } else if (error) {
        console.log(error);
        toast.error(error?.data?.message || "Failed to fetch plan");
      }
    }
  }, [planId, data, error, dispatch]);

  const filledPlanData = { name, about, access };

  const handleCreatePlan = async (e) => {
    e.preventDefault();

    if (name && about && access) {
      try {
        const res = await CreatePlanApiCall(filledPlanData).unwrap();
        toast.success(res?.message);
        navigate(`/plans/${res.data.plan._id}`);
      } catch (err) {
        toast.error(err?.data?.message || "Something went wrong");
      }
    } else {
      toast.error("Please fill all required * field!");
    }
  };

  const handleUpdatePlan = async (e) => {
    e.preventDefault();

    if (name && about && access) {
      try {
        const res = await UpdatePlanApiCall({
          planId,
          data: filledPlanData,
        }).unwrap();
        toast.success(res?.message);
        navigate(`/plans/${res.data.plan._id}`);
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || "Something went wrong");
      }
    } else {
      toast.error("Please fill all required * field!");
    }
  };

  const handleClose = () => {
    if (planId) {
      navigate(`/plans/${planId}`);
    } else {
      navigate(`/plans`);
    }
  };

  return (
    <div className="overflow-hidden space-y-5">
      <div className="space-y-1">
        <div className="flex items-center justify-between space-x-2">
          <div className="font-Poppins text-2xl font-bold text-slate-800">
            {planId ? <p>Update the Plan</p> : <p>Create A Plan</p>}
          </div>
          <div className="cursor-pointer" onClick={handleClose}>
            <MdCancel className="text-2xl text-slate-800 hover:text-black" />
          </div>
        </div>
        <div className="font-Poppins text-base font-medium text-slate-500">
          {planId ? (
            <p>Edit all the details of this plan</p>
          ) : (
            <p>Entry all the details of the plan</p>
          )}
        </div>
      </div>
      <div>
        <form className="w-full space-y-4">
          <div className="space-y-2">
            <div className="font-Poppins text-xl font-bold text-slate-800">
              Basic Details
            </div>
            <div className="space-y-2">
              <div>
                <label
                  htmlFor="name"
                  className="font-Poppins block font-medium leading-6 text-gray-800"
                >
                  Plan Name / Trip Name<span className="text-red-600"> *</span>
                </label>
                <div className="">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="font-Poppins appearance-none outline-none block w-full rounded-sm border-0 px-1.5 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="about"
                  className="font-Poppins block font-medium leading-6 text-gray-800"
                >
                  Plan About <span className="text-red-600"> *</span>
                </label>
                <div className="">
                  <textarea
                    id="about"
                    name="about"
                    type="about"
                    required
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="font-Poppins appearance-none outline-none block w-full rounded-sm border-0 px-1.5 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="access"
                  className="font-Poppins block font-medium leading-6 text-gray-800"
                >
                  Access Type<span className="text-red-600"> *</span>
                </label>
                <div className="">
                  <select
                    id="access"
                    name="access"
                    required
                    value={access}
                    onChange={(e) => setAccess(e.target.value)}
                    className="font-Poppins appearance-none outline-none block w-full rounded-sm border-0 px-1.5 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                    <option value="Restricted" disabled>
                      Restricted
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 hidden">
            <div className="font-Poppins text-xl font-bold text-slate-800">
              Additional Details
            </div>
            <div className="space-y-2">

              <div className="block sm:flex space-y-2 sm:space-x-2 sm:space-y-0 w-full">
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="startDate"
                    className="font-Poppins block font-medium leading-6 text-gray-800"
                  >
                    Start Date
                  </label>
                  <div className="mt-1">
                    <input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="font-Poppins appearance-none outline-none block w-full rounded-sm border-0 px-1.5 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="endDate"
                    className="font-Poppins block font-medium leading-6 text-gray-800"
                  >
                    End Date
                  </label>
                  <div className="mt-1">
                    <input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="font-Poppins appearance-none outline-none block w-full rounded-sm border-0 px-1.5 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            {planId ? (
              isUpdatePlanMutationLoading ? (
                <div className="font-Poppins flex w-full justify-center rounded-sm bg-indigo-700 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700">
                  Updating this Plan ...
                </div>
              ) : (
                <button
                  type="submit"
                  onClick={handleUpdatePlan}
                  className="font-Poppins flex w-full justify-center rounded-sm bg-indigo-700 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
                >
                  Update this Plan
                </button>
              )
            ) : isCreatePlanMutationLoading ? (
              <div className="font-Poppins flex w-full justify-center rounded-sm bg-indigo-700 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700">
                Creating this Plan ...
              </div>
            ) : (
              <button
                type="submit"
                onClick={handleCreatePlan}
                className="font-Poppins flex w-full justify-center rounded-sm bg-indigo-700 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
              >
                Create this Plan
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditPlan;