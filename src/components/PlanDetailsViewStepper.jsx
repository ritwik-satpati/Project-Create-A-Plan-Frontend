import React from "react";
import { TbExternalLink } from "react-icons/tb";

const PlanDetailsViewStepper = ({ itineraryData }) => {
    return (
        <>
            {itineraryData.itinerary &&
                itineraryData.itinerary.map((item, index) => (
                    <div key={index} className="relative pl-8 sm:pl-32 pt-6 group/item">
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
                        <div className="text-slate-500 font-Poppins">{item.desc}</div>
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
                ))}
        </>
    );
};

export default PlanDetailsViewStepper;