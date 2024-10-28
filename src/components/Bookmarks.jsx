import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetBookmarkedPlansQuery } from "../redux/api/plan.api";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import NeedToLogin from "./NeedToLogin";

const Bookmarks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  const { data, error, isLoading } = useGetBookmarkedPlansQuery();

  const [bookmarkedPlans, setBookmarkedPlans] = useState();

  useEffect(() => {
    if (data) {
      toast.success(data?.message);
      setBookmarkedPlans(data?.data?.bookmarks);
    } else if (error) {
      toast.error(error?.data?.message || "Failed to fetch Bookmarked Plans");
    }
  }, [data, error]);

  const handlePlan = (plan) => {
    navigate(`/plans/${plan._id}`);
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
      <div className="overflow-hidden space-y-5 h-full flex flex-col">
        <div className="space-y-1">
          <div className="font-Poppins text-2xl font-bold text-slate-800">
            Bookmark Plans
          </div>
          <div className="font-Poppins text-base font-medium text-slate-500">
            All the plans those are bookmarked
          </div>
        </div>

        <div className="border-t border-gray-200 overflow-y-auto">
          <div className="border-b border-gray-200 font-Poppins">
            <ul className="divide-y divide-gray-200">
              {bookmarkedPlans &&
                bookmarkedPlans.map((item) => (
                  <div
                    key={item._id}
                    className="py-3 sm:py-5 flex items-center justify-start cursor-pointer group hover:bg-blue-200"
                    onClick={() => handlePlan(item.plan)}
                  >
                    <div className="px-2 py-2 font-Poppins text-center font-medium line-clamp-2 sm:line-clamp-2">
                      {item.plan.name}
                    </div>
                  </div>
                ))}
            </ul>
          </div>
        </div>

        {!user && (
          <div className="h-full w-full">
            <NeedToLogin refQuery={location.pathname} />
          </div>
        )}
      </div>
    </>
  );
};

export default Bookmarks;
