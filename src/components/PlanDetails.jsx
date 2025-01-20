import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TbExternalLink } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateItineraryMutation,
  useGetItineraryQuery,
} from "../redux/api/itinerary.api";
import Loading from "./Loading";
import {
  IoBookmarkOutline,
  IoBookmark,
  IoShareOutline,
  IoCloseCircle,
} from "react-icons/io5";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import {
  useDeletePlanMutation,
  useBookmarkMutation,
  useGetBookmarkedPlanByPlanIdQuery,
} from "../redux/api/plan.api";
import {
  createItineraryFail,
  createItineraryRequest,
  createItinerarySuccess,
  deletePlanFail,
  deletePlanRequest,
  deletePlanSuccess,
  getItineraryFail,
  getItineraryRequest,
  getItinerarySuccess,
} from "../redux/slices/planDetails.slice";
import Dialog from "./Dialog";
import Popup from "../utils/Popup";
import NeedToLogin from "./NeedToLogin";
import { MdFormatAlignLeft } from "react-icons/md";
import { AiOutlineTable } from "react-icons/ai";
import PlanDetailsViewTable from "./PlanDetailsViewTable";
import PlanDetailsViewStepper from "./PlanDetailsViewStepper";
import MetaData from "../utils/MetaData";

const PlanDetails = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const { plan: planData, itinerary: itineraryData } = useSelector(
    (state) => state.planDetails
  );

  const [BookmarkPlanApiCall] = useBookmarkMutation();
  const [DeletePlanApiCall] = useDeletePlanMutation();
  const [LoadSampleItineraryApiCall] = useCreateItineraryMutation();

  const { data, error, isLoading } = useGetItineraryQuery(planId);
  const {
    data: dataBookmarked,
    error: errorBookmarked,
    isLoading: isLoadingBookmarked,
  } = useGetBookmarkedPlanByPlanIdQuery(planId);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBookmarkClickedWithoutLogin, setIsBookmarkClickedWithoutLogin] =
    useState(false);

  const [viewType, setViewType] = useState("stepper");

  useEffect(() => {
    // Read the "view" query parameter from the URL on mount
    const query = new URLSearchParams(window.location.search);
    const viewQueryValue = query.get("view");
    if (viewQueryValue) {
      setViewType(viewQueryValue);
    }
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(getItineraryRequest());
      toast.success(data?.message);
      dispatch(getItinerarySuccess(data?.data));
    } else if (error) {
      dispatch(getItineraryFail());
      toast.error(error?.data?.message || "Failed to fetch plan");
    }
  }, [data, error, dispatch]);

  useEffect(() => {
    if (dataBookmarked?.data?.bookmark) {
      setIsBookmarked(true);
    } else if (errorBookmarked) {
      setIsBookmarked(false);
    }
  }, [dataBookmarked, errorBookmarked]);

  const handleLoginRedirect = () => {
    navigate(`/login?ref=${encodeURIComponent(location.pathname)}`);
  };

  const handleBookmark = async () => {
    if (user) {
      try {
        setIsBookmarked(!isBookmarked);
        const res = await BookmarkPlanApiCall({ planId }).unwrap();
        toast.success(res?.message);
      } catch (err) {
        setIsBookmarked(isBookmarked);
        toast.error(err?.data?.message || "Something went wrong");
      }
    } else {
      setIsBookmarkClickedWithoutLogin(true);
    }
  };

  const [isEditClicked, setIsEditClicked] = useState(false);

  const handleEdit = () => {
    setIsEditClicked(true);
  };

  const handleEditPlan = () => {
    navigate(`/plans/${planId}/edit-plan`);
  };

  const handleEditItinerary = () => {
    if (itineraryData === null) {
      toast.error("First Load Sample Itineray!");
    } else {
      navigate(`/plans/${planId}/edit-itinerary`);
    }
  };

  const handleEditAccess = () => {
    toast.warning("Edit Access Feature coming soon...");
  };

  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  const handleDelete = () => {
    setIsDeleteClicked(true);
  };

  const handleConfirmDelete = async () => {
    try {
      dispatch(deletePlanRequest());
      const res = await DeletePlanApiCall(planId).unwrap();
      toast.success(res?.message);
      dispatch(deletePlanSuccess());
      navigate("/");
    } catch (err) {
      dispatch(deletePlanFail());
      toast.error(err?.data?.message || "Something went wrong");
    }
    setIsDeleteClicked(false);
  };

  const handleShare = async () => {
    if (planData.access === "Private") {
      toast.warning("This plan is private. Others cannot view it.");
    }
    try {
      // const fullUrl = window.location.origin + location.pathname;
      const fullUrl = window.location.href;
      const text = `${planData?.name} :: ${fullUrl}`;
      await window.navigator.clipboard.writeText(text);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      // console.error("Failed to copy: ", err);
      toast.error("Failed to copy the link.");
    }
  };

  const handleLoadSampleItinerary = async () => {
    try {
      dispatch(createItineraryRequest());
      const res = await LoadSampleItineraryApiCall(planId).unwrap();
      toast.success(res?.message);
      dispatch(createItinerarySuccess(res?.data));
    } catch (err) {
      // console.log(err);
      dispatch(createItineraryFail());
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  const handleChangeViewType = () => {
    const newViewType = viewType === "table" ? "stepper" : "table";
    setViewType(newViewType);

    // Update the "view" query parameter in the URL
    const query = new URLSearchParams(window.location.search);
    query.set("view", newViewType);
    window.history.pushState({}, "", `?${query.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        {" "}
        <Loading />{" "}
      </div>
    );
  }

  return (
    <>
      {planData && (
        <MetaData
          page={planData.name}
          desc={planData.about}
          keywords={`Plan, ${planData.name}`}
        />
      )}

      <div className="relative h-full">
        {planData ? (
          <div className="space-y-0">
            <div className="space-y-1">
              <div className="font-Poppins text-2xl font-bold text-slate-800">
                {planData.name}
                {/* <span>
                      {planData.access === "Public" && <p><FaLockOpen /> </p>}
                      {planData.access === "Private" && <p><FaLock /> </p>}
                      {planData.access === "Resticted" && <p><FaUserLock /> </p>}
                </span> */}
              </div>
              {planData && planData.about && (
                <div className="font-Poppins text-base font-medium text-slate-500">
                  {planData?.about}
                </div>
              )}
            </div>

            {/* Bookmark & Edit & Delete & Share ==> Start */}
            <div className="pt-3 flex flex-wrap items-center justify-start gap-x-3 gap-y-2">
              {/* Bookmark */}
              {(planData?.access != "Private" ||
                user?._id === planData?.createdBy) && (
                <div
                  className="flex items-center justify-start space-x-1 bg-blue-400 hover:bg-blue-500 px-2 py-1 rounded-sm select-none cursor-pointer text-sm font-Poppins text-blue-900"
                  onClick={handleBookmark}
                >
                  {isBookmarked ? (
                    <>
                      <div className="">
                        <IoBookmark />
                      </div>
                      <div className="">
                        {isLoadingBookmarked ? (
                          <p>Checking</p>
                        ) : (
                          <p>Bookmarked</p>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="">
                        <IoBookmarkOutline />
                      </div>
                      {isLoadingBookmarked ? <p>Checking</p> : <p>Bookmark</p>}
                    </>
                  )}
                </div>
              )}
              {user?._id === planData?.createdBy && (
                <>
                  {/* Edit */}
                  <div
                    className="h-7 flex items-center justify-start space-x-1 bg-yellow-400 hover:bg-yellow-500 px-2 py-1 rounded-sm select-none cursor-pointer text-sm font-Poppins text-yellow-900"
                    onClick={handleEdit}
                  >
                    <div className="">
                      <BiSolidEdit />
                    </div>
                    <div className="">Edit</div>
                  </div>
                  {/* Delete */}
                  <div
                    className="h-7 flex items-center justify-start space-x-1 bg-red-500 hover:bg-red-600 px-2 py-1 rounded-sm select-none cursor-pointer text-sm font-Poppins text-red-900"
                    onClick={handleDelete}
                  >
                    <div className="">
                      <MdDelete />
                    </div>
                    <div className="">Delete</div>
                  </div>
                </>
              )}
              {/* Share */}
              <div
                className="h-7 flex items-center justify-start space-x-1 bg-green-400 hover:bg-green-500 px-2 py-1 rounded-sm select-none cursor-pointer text-sm font-Poppins text-green-900"
                onClick={handleShare}
              >
                <div className="">
                  <IoShareOutline />
                </div>
                <div className="">Share</div>
              </div>
              {/* Switch View Button */}
              <div>
                <label className="flex cursor-pointer select-none items-center">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={viewType === "table"}
                      onChange={handleChangeViewType}
                      className="sr-only"
                    />
                    <div className="block h-7 w-14 rounded-sm bg-gray-600"></div>
                    <div
                      className={`dot absolute left-1 top-1 h-5 w-5 rounded-sm bg-white transition ${
                        viewType === "table" ? "translate-x-7" : ""
                      }`}
                    >
                      {viewType === "table" ? (
                        <AiOutlineTable className="rounded-full h-5 w-5 p-0.5 text-gray-900 text-xl" />
                      ) : (
                        <MdFormatAlignLeft className="rounded-full h-5 w-5 p-0.5 text-gray-900 text-xl" />
                      )}
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Bookmark & Edit & Delete & Share ==> End */}

            <div className="overflow-hidden pt-3 space-y-3">
              {itineraryData ? (
                <>
                  {viewType === "table" ? (
                    <PlanDetailsViewTable itineraryData={itineraryData} />
                  ) : (
                    <PlanDetailsViewStepper itineraryData={itineraryData} />
                  )}
                </>
              ) : (
                <div className="py-10 flex items-center justify-start pl-1 w-full">
                  {user?._id === planData?.createdBy ? (
                    <div className="-ml-1 bg-gray-50 rounded-sm shadow-sm border-2 border-gray-300 max-w-md w-full p-4 space-y-4">
                      <div className="space-y-2">
                        <h2 className="font-Poppins text-xl font-semibold text-gray-800">
                          Load Sample Itinerary
                        </h2>
                        <p className="font-Poppins text-gray-800">
                          First need to load Sample Itinerary and Edit the
                          Itinerary.
                        </p>
                      </div>
                      <button
                        className="font-Poppins text-base bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded-sm text-white"
                        onClick={handleLoadSampleItinerary}
                      >
                        Load Sample Itinerary
                      </button>
                    </div>
                  ) : (
                    <div className="-ml-1 bg-gray-50 rounded-sm shadow-sm border-2 border-gray-300 max-w-md w-full p-4 space-y-2">
                      <h2 className="font-Poppins text-xl font-semibold text-gray-800">
                        Plan is Private
                      </h2>
                      <p className="font-Poppins text-gray-800">
                        This Plan is Private, only the owner can see it. Ask the
                        owner to make it Public!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
            {itineraryData && itineraryData.note && (
              <div className="font-Poppins text-sm font-medium text-slate-500 pt-5">
                <div className="text-base">Note:</div>
                <div className="text-sm">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: itineraryData?.note
                        .replace(
                          /(https?:\/\/[^\s]+)/g,
                          '<a  href="$1" target="_blank" rel="noopener noreferrer" class="underline text-blue-600">$1</a>'
                        )
                        .replace(/\n/g, "<br />"), // Ensure line breaks are handled
                    }}
                  />
                </div>
              </div>
            )}
            {itineraryData && planData && (
              <>
                <div className="font-Poppins text-sm text-slate-500 pt-5">
                  <div>Created by: {planData?.createdByName}</div>
                  <div>
                    Created At: {new Date(planData?.createdAt).toLocaleString()}
                  </div>
                  <div>
                    Updated At: {new Date(planData?.updatedAt).toLocaleString()}
                  </div>
                </div>
                {planData?.status != "Completed" && (
                  <div className="font-Poppins text-sm text-red-500 pt-5">
                    {planData.status === "Ongoing" && (
                      <p>
                        If you have Completed this Plan, please update the
                        Status to 'Completed' in Edit Plan...
                      </p>
                    )}
                    {planData.status === "Updated" && (
                      <p>Kindly Update the Itinerary in Edit Itinerary...</p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <NeedToLogin
              refQuery={location.pathname}
              title="Protected Plan"
              text="Plan is not Public, need to Login first!"
            />
          </div>
        )}
        {isDeleteClicked && (
          <Dialog
            isOpen={isDeleteClicked}
            handleClose={() => setIsDeleteClicked(false)}
            title="Delete this Plan"
            message="Are you sure to delete this ?"
            buttonsCount={2}
            button1Text="Cancel"
            button1Colour="green-500"
            button1OnClick={() => setIsDeleteClicked(false)}
            button2Text="Delete"
            button2Colour="red-600"
            button2OnClick={handleConfirmDelete}
            buttonsAlign="right"
            buttonsGap="8"
            buttonsWidth="notmax"
          ></Dialog>
        )}

        {isEditClicked && (
          <Dialog
            isOpen={isEditClicked}
            canClose={true}
            handleClose={() => setIsEditClicked(false)}
            title="Edit this Plan"
            message="Select what you want to Edit"
            button1Text="Plan"
            button1Colour="yellow-500"
            button1OnClick={handleEditPlan}
            button2Text="Itinerary"
            button2Colour="yellow-500"
            button2OnClick={handleEditItinerary}
            button3Text="Access"
            button3Colour="yellow-500"
            button3OnClick={handleEditAccess}
            buttonsGap="8"
          />
        )}

        {isBookmarkClickedWithoutLogin && (
          <Dialog
            isOpen={isBookmarkClickedWithoutLogin}
            handleClose={() => setIsBookmarkClickedWithoutLogin(false)}
            title="Login to Bookmark"
            message="Need to login for bookmarking the plan"
            buttonsCount={1}
            button1Text="Login"
            button1Colour="blue-500"
            button1OnClick={handleLoginRedirect}
            submitBtn={1}
            buttonsAlign="full"
            buttonsWidth="max"
          ></Dialog>
        )}
      </div>
    </>
  );
};

export default PlanDetails;
