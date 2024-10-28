import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetPlansQuery } from "../redux/api/plan.api";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import NeedToLogin from "./NeedToLogin";

const Plans = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  const { data, error, isLoading } = useGetPlansQuery();

  const [plans, setPlans] = useState();

  useEffect(() => {
    if (data) {
      toast.success(data?.message);
      setPlans(data?.data?.plans);
    } else if (error) {
      toast.error(error?.data?.message || "Failed to fetch plans");
    }
  }, [data, error]);

  const handlePlan = (item) => {
    navigate(`/plans/${item._id}`);
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
            My Plans
          </div>
          <div className="font-Poppins text-base font-medium text-slate-500">
            All the plans created by you
          </div>
        </div>

        <div className="border-t border-gray-200 overflow-y-auto">
          <div className="border-b border-gray-200 font-Poppins">
            <ul className="divide-y divide-gray-200">
              {plans &&
                plans.map((item) => (
                  <div
                    key={item._id}
                    className="py-3 sm:py-5  flex items-center justify-start cursor-pointer group hover:bg-blue-200"
                    onClick={() => handlePlan(item)}
                  >
                    <div className="py-2 px-2 font-Poppins text-center font-medium line-clamp-2 sm:line-clamp-1">
                      {item.name}
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

export default Plans;
