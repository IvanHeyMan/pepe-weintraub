import clsx from "clsx";
import React from "react";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Bounded from "@/components/Bounded";
import { isFilled } from "@prismicio/client";
import { FaInstagram, FaTwitter, FaTiktok, FaYoutube } from "react-icons/fa6";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return (
    <Bounded as="footer" className="text-pink-600">
      <div className="container mx-auto mt-20 flex flex-col items-center justify-between gap-6 py-8 sm:flex-row ">
        <div className="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tighter text-black transition-colors duration-150 hover:text-pink-400"
          >
            {settings.data.name}
          </Link>
          <span
            className="hidden text-5xl font-extralight leading-[0] text-pink-400 sm:inline"
            aria-hidden={true}
          >
            /
          </span>
          <p className=" text-sm text-black ">
            © {new Date().getFullYear()} Development and SEO by Ivan Entin
          </p>
        </div>
        <nav className="navigation" aria-label="Footer Navigation">
          <ul className="flex items-center gap-1">
            {settings.data.nav_item.map(({ link, label }, index) => (
              <React.Fragment key={label}>
                <li>
                  <PrismicNextLink
                    className={clsx(
                      "group relative block overflow-hidden  rounded px-3 py-1 text-base font-bold text-black transition-colors duration-150 hover:hover:text-pink-400",
                    )}
                    field={link}
                  >
                    {label}
                  </PrismicNextLink>
                </li>
                {index < settings.data.nav_item.length - 1 && (
                  <span
                    className="text-4xl font-thin leading-[0] text-pink-400"
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>
        <div className="socials inline-flex justify-center sm:justify-end">
          {isFilled.link(settings.data.instagram_link) && (
            <PrismicNextLink
              field={settings.data.instagram_link}
              className="p-2 text-2xl text-black transition-all duration-150 hover:scale-125 hover:text-pink-400"
              aria-label={settings.data.name + " on Instagram"}
            >
              <FaInstagram />
            </PrismicNextLink>
          )}
          {isFilled.link(settings.data.twitter_link) && (
            <PrismicNextLink
              field={settings.data.twitter_link}
              className="p-2 text-2xl text-black transition-all duration-150 hover:scale-125 hover:text-pink-400"
              aria-label={settings.data.name + " on YouTube"}
            >
              <FaYoutube />
            </PrismicNextLink>
          )}
          {isFilled.link(settings.data.tiktok_link) && (
            <PrismicNextLink
              field={settings.data.tiktok_link}
              className="p-2 text-2xl text-black transition-all duration-150 hover:scale-125 hover:text-pink-400"
              aria-label={settings.data.name + " on TikTok"}
            >
              <FaTiktok />
            </PrismicNextLink>
          )}
        </div>
      </div>
    </Bounded>
  );
}