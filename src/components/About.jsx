import React from "react";
const About = () => {
  return (
    <>
      <div className="overflow-hidden space-y-5">
        <div className="space-y-1">
          <div className="font-Poppins text-2xl font-bold text-slate-800">
            Create A Plan
          </div>
          <div className="font-Poppins text-base font-medium text-slate-500">
            Information about this Create A Plan web application
          </div>
        </div>
        <div className="border-y border-gray-200 px-4 py-5 sm:p-0 font-Poppins">
          <dl className="divide-y divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Project</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Create A Plan
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Design & Developed by
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Ritwik Satpati
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">LinkedIn:</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 underline">
                <a
                  href="https://www.linkedin.com/in/ritwik-satpati/"
                  target="_blank"
                >
                  @ritwik-satpati
                </a>
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                X (Twitter):
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 underline">
                <a href="https://twitter.com/ritwik_satpati" target="_blank">
                  @ritwik_satpati
                </a>
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">GitHub:</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 underline">
                <a href="https://github.com/ritwik-satpati" target="_blank">
                  @ritwik-satpati
                </a>
              </dd>
            </div>

            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                GitHub Repo - Frontend
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 underline">
                <a
                  href="https://github.com/ritwik-satpati/Project-Create-A-Plan-Frontend"
                  target="_blank"
                >
                  ritwik-satpati/Project-Create-A-Plan-Frontend
                </a>
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                GitHub Repo - Backend
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 underline">
                <a
                  href="https://github.com/ritwik-satpati/Project-Create-A-Plan-Backend"
                  target="_blank"
                >
                  ritwik-satpati/Project-Create-A-Plan-Backend
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default About;
