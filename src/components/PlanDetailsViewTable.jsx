import React from "react";
import { TbExternalLink } from "react-icons/tb";

const PlanDetailsViewTable = ({ itineraryData }) => {
    return (
        <>
            {itineraryData.itinerary &&
                itineraryData.itinerary.map((item, index) => (
                    <div key={index} className="space-y-1.5 bg-slate-200 rounded-sm p-2">
                        <div className="font-Poppins block text-xl font-semibold leading-6 text-gray-800">
                            Day: {item?.day}
                        </div>

                        <div className="font-Poppins block font-semibold leading-6 text-gray-800">
                            Date: <span className="font-normal">{item?.date}</span>
                        </div>

                        <div>
                            <div className="font-Poppins block font-semibold leading-6 text-gray-800">
                                Description:
                            </div>
                            <div className="font-Poppins text-gray-800">{item?.desc}</div>
                        </div>

                        <div className="">
                            <div className="font-Poppins block font-semibold leading-6 text-gray-800">
                                Plans
                            </div>
                            <div className="overflow-x-auto">
                                <table className="border-collapse border-2 border-gray-400 min-w-full font-Poppins text-sm sm:text-base">
                                    <thead>
                                        <tr>
                                            <th className="border-2 border-gray-400 w-12 sm:w-36">
                                                Type
                                            </th>
                                            <th className="border-2 border-gray-400 min-w-24 sm:min-w-48">
                                                Plan<span className="text-red-600"> *</span>
                                            </th>
                                            <th className="border-2 border-gray-400 w-8 sm:w-24">
                                                Time
                                            </th>
                                            <th className="border-2 border-gray-400 w-8 sm:w-24">
                                                Link
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.plans &&
                                            item.plans.map((planItem, planIndex) => (
                                                <tr
                                                    key={planIndex}
                                                    className="border border-gray-400 divide-x divide-gray-400"
                                                >
                                                    <td className="align-top">
                                                        <p className="font-Poppins px-1.5 text-gray-800">
                                                            {planItem?.type}
                                                        </p>
                                                    </td>
                                                    <td className="align-top">
                                                        <p className="font-Poppins px-1.5 text-gray-800">
                                                            {planItem?.plan}
                                                        </p>
                                                    </td>
                                                    <td className="align-top">
                                                        <p className="font-Poppins px-1.5 text-gray-800 text-center">
                                                            {planItem?.time}
                                                        </p>
                                                    </td>
                                                    <td className="align-top">
                                                        {planItem.link && (
                                                            <a
                                                                href={planItem?.link}
                                                                target="blank"
                                                                className="flex items-center justify-center space-x-1 text-blue-700 cursor-pointer px-1.5"
                                                            >
                                                                <div className="">Link</div>
                                                                <div className="pb-[1px]">
                                                                    <TbExternalLink />
                                                                </div>
                                                            </a>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default PlanDetailsViewTable;