import React from 'react';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs';

function Hero() {
  return (
    <section className="bg-black">
      <div className="flex items-baseline justify-center pt-20">
        <h2 className="text-white border px-3 p-2 rounded-full text-center border-white">
          See What's New  <span className="text-sky-300"></span>
        </h2>
      </div>
      <div className="mx-auto h-screen max-w-screen-xl px-4 py-12 lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl text-sky-300 font-extrabold sm:text-5xl">
            Orgainize and Rule
            <strong className="font-extrabold text-white sm:block">
              {' '}for engineering teams.
            </strong>
          </h1>
          <p className="mt-4 sm:text-xl/relaxed text-slate-200">
            All-in-one markdown editor, collaborative canvas, and diagram-as-code builder
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="block rounded-md px-5 py-2.5 text-sm font-medium text-white transition">
              <LoginLink postLoginRedirectURL="/dashboard">Learn More</LoginLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;