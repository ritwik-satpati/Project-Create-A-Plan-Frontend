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
import { FaLockOpen, FaLock, FaUserLock } from "react-icons/fa";
import NeedToLogin from "./NeedToLogin";

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
  const [isBookmarkClickedWithoutLogin, setIsBookmarkClickedWithoutLogin] = useState(false);

  useEffect(() => {
    if (data) {
      dispatch(getItineraryRequest());
      toast.success(data?.message);
      dispatch(getItinerarySuccess(data?.data));
      if (dataBookmarked && dataBookmarked.data.bookmark) {
        setIsBookmarked(true);
      } else if (errorBookmarked) {
        setIsBookmarked(false);
      }
    } else if (error) {
      dispatch(getItineraryFail());
      console.log(error);
      toast.error(error?.data?.message || "Failed to fetch plan");
    }
  }, [data, error]);


  const handleLoginRedirect = () => {
    navigate(`/login?ref=${encodeURIComponent(location.pathname)}`);
  };

  const handleBookmark = async () => {
    if (user) {
      try {
        const res = await BookmarkPlanApiCall({ planId }).unwrap();
        toast.success(res?.message);
        setIsBookmarked(!isBookmarked);
      } catch (err) {
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
      toast.error("Currently this Plan is Private. Edit Access to Share !");
    } else {
      try {
        const fullUrl = window.location.origin + location.pathname;
        // await window.navigator.clipboard.writeText(fullUrl);
        const text = `${planData?.name} :: ${fullUrl}`;
        await window.navigator.clipboard.writeText(text);
        toast.success("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy the link.");
      }
    }
  };

  const handleLoadSampleItinerary = async () => {
    try {
      dispatch(createItineraryRequest());
      const res = await LoadSampleItineraryApiCall(planId).unwrap();
      toast.success(res?.message);
      dispatch(createItinerarySuccess(res?.data));
    } catch (err) {
      console.log(err);
      dispatch(createItineraryFail());
      toast.error(err?.data?.message || "Something went wrong");
    }
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
                        <div className="">Bookmarked</div>
                      </>
                    ) : (
                      <>
                        <div className="">
                          <IoBookmarkOutline />
                        </div>
                        <div className="">Bookmark</div>
                      </>
                    )}
                  </div>
                )}
              {user?._id === planData?.createdBy && (
                <>
                  {/* Edit */}
                  <div
                    className="flex items-center justify-start space-x-1 bg-yellow-400 hover:bg-yellow-500 px-2 py-1 rounded-sm select-none cursor-pointer text-sm font-Poppins text-yellow-900"
                    onClick={handleEdit}
                  >
                    <div className="">
                      <BiSolidEdit />
                    </div>
                    <div className="">Edit</div>
                  </div>
                  {/* Delete */}
                  <div
                    className="flex items-center justify-start space-x-1 bg-red-500 hover:bg-red-600 px-2 py-1 rounded-sm select-none cursor-pointer text-sm font-Poppins text-red-900"
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
                className="flex items-center justify-start space-x-1 bg-green-400 hover:bg-green-500 px-2 py-1 rounded-sm select-none cursor-pointer text-sm font-Poppins text-green-900"
                onClick={handleShare}
              >
                <div className="">
                  <IoShareOutline />
                </div>
                <div className="">Share</div>
              </div>
            </div>

            {/* Bookmark & Edit & Delete & Share ==> End */}

            <div className="overflow-hidden">
              {itineraryData ? (
                itineraryData.itinerary &&
                itineraryData.itinerary.map((item, index) => (
                  <div
                    key={index}
                    className="relative pl-8 sm:pl-32 pt-6 group/item"
                  >
                    {/* <!-- Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) --> */}
                    <div className="flex flex-col sm:flex-row items-start mb-1 group-last/item:before:h-[full] before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-sm sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                      <div className="pt-0.5 sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full font-Poppins">
                        {item.date}
                      </div>
                      <div className="font-Poppins font-medium text-2xl text-indigo-500 mb-1 sm:mb-0">
                        Day - {item.day}
                      </div>
                    </div>
                    {/* <!-- Content --> */}
                    <div className="text-slate-500 font-Poppins">
                      {item.desc}
                    </div>
                    {/* <!-- Sub-Content --> */}
                    <div>
                      {item &&
                        item.plans &&
                        item.plans.map((subItem, subIndex) => (
                          <div
                            key={subIndex}
                            className="relative pl-8 sm:pl-32 pt-6 group"
                          >
                            {/* <!-- Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) --> */}
                            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                              <div className="pt-0.5 sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full font-Poppins">
                                {subItem.time || "10:00 AM"}
                              </div>
                              <div className="flex flex-wrap gap-x-2">
                                <div className="text-slate-500 font-Poppins">
                                  {subItem.plan}
                                </div>
                                {/* <!-- Link --> */}
                                <div className="text-slate-500 font-Poppins">
                                  {subItem.link && (
                                    <a
                                      href={subItem?.link}
                                      target="blank"
                                      className="flex items-center justify-start space-x-1 text-blue-700 cursor-pointer"
                                    >
                                      <div className="">Link</div>
                                      <div className="pb-[1px]">
                                        <TbExternalLink />
                                      </div>
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-10 flex items-center justify-start pl-1 w-full">
                  {user?._id === planData?.createdBy ? (
                    <div className="bg-gray-50 rounded-md shadow-md  border-2 border-gray-300 max-w-md w-full p-4 space-y-4">
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
                    <div className="bg-gray-50 rounded-md shadow-md shadow-black border-2 border-gray-300 max-w-md w-full p-4 space-y-2">
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
              <div className="font-Poppins text-base font-medium text-slate-500 pt-5">
                <div>Note: {itineraryData?.note}</div>
              </div>
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
            title="Delete this Plan"
            message="Are you sure to delete this ?"
            isColourReverse={true}
            submitText="Delete"
            handleSubmit={handleConfirmDelete}
            closeText="Cancel"
            handleClose={() => setIsDeleteClicked(false)}
          ></Dialog>
        )}

        {isEditClicked && (
          <Popup onClose={() => setIsEditClicked(false)}>
            <div className="bg-gray-50 rounded-md shadow-md shadow-black border-2 border-gray-300 max-w-md w-full">
              <div className="flex justify-between items-center px-4 py-2 border-b-2 border-gray-300">
                <h2 className="font-Poppins text-lg font-semibold text-gray-800">
                  Edit this Plan
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsEditClicked(false)}
                >
                  <IoCloseCircle className="text-2xl" />
                </button>
              </div>
              <div className="p-4">
                <p className="font-Poppins text-gray-800">
                  Select what you want to Edit
                </p>
                <div className="flex items-center justify-evenly pt-8 space-x-8">
                  <button
                    className={`text-yellow-500 border-yellow-500 hover:bg-yellow-500 min-w-[100px] p-1 font-Poppins  hover:text-white border-2 rounded-md`}
                    onClick={handleEditPlan}
                  >
                    Edit Plan
                  </button>
                  <button
                    className={`text-yellow-500 border-yellow-500 hover:bg-yellow-500 min-w-[100px] p-1 font-Poppins  hover:text-white border-2 rounded-md`}
                    onClick={handleEditItinerary}
                  >
                    Edit Itinerary
                  </button>
                  <button
                    className={`text-yellow-500 border-yellow-500 hover:bg-yellow-500 min-w-[100px] p-1 font-Poppins  hover:text-white border-2 rounded-md`}
                    onClick={handleEditAccess}
                  >
                    Edit Access
                  </button>
                </div>
              </div>
            </div>
          </Popup>
        )}

        {isBookmarkClickedWithoutLogin && (
          <Dialog
            isOpen={isBookmarkClickedWithoutLogin}
            title="Login to Bookmark"
            message="Need to login for bookmarking the plan"
            isColourReverse={false}
            submitText="Login"
            handleSubmit={handleLoginRedirect}
            closeText="Cancel"
            handleClose={() => setIsBookmarkClickedWithoutLogin(false)}
          ></Dialog>
        )}
      </div>
    </>
  );
};

export default PlanDetails;
