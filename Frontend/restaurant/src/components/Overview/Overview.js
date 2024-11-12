import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiMapPin } from "react-icons/fi";
import FbButton from "../Button/FbButton";

const Overview = () => {
  return (
    <div>
      <div className="text-center text-gray-500 uppercase text-lg mb-2 mt-16">
        - Overview Restaurant -
      </div>
      <div className=" text-4xl font-bold text-center">
        About Our Restaurant
      </div>
      <div className="min-h-screen px-4 py-12 text-zinc-50">
        <motion.div
          initial="initial"
          animate="animate"
          transition={{
            staggerChildren: 0.05,
          }}
          className="mx-auto grid max-w-7xl grid-flow-dense grid-cols-12 gap-4"
        >
          <HeaderBlock />
          <SocialsBlock />
          <AboutBlock />
          <AboutBlock2 />
          <LocationBlock />
          <EmailListBlock />
        </motion.div>
      </div>
    </div>
  );
};
export default Overview;

const Block = ({ className, noBorder = false, ...rest }) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "col-span-4 rounded-lg bg-orange-400 p-6",
        noBorder ? "" : "border border-zinc-700",
        className
      )}
      {...rest}
    />
  );
};

const HeaderBlock = () => (
  <Block className="col-span-12 row-span-1 md:col-span-6">
    <img
      src="https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=John"
      alt="avatar"
      className="mb-4 size-14 rounded-full"
    />
    <h1 className="mb-12 text-4xl font-bold leading-tight">
      Hi, We are Koala Restaurant.{" "}
      <span className="text-zinc-800 font-bold">
        Let's find out what makes our restaurant special?
      </span>
    </h1>
  </Block>
);

const SocialsBlock = () => (
  <>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-zinc-50 md:col-span-3"
      noBorder={true}
    >
      <div className="grid h-full place-content-center w-full">
        <img
          src="/images/signature_food/tranding-food-4.png"
          alt="Menu 1"
          className="h-full w-full object-cover rounded"
        />
      </div>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-zinc-50 md:col-span-3"
      noBorder={true}
    >
      <div className="grid h-full place-content-center">
        <img
          src="/images/signature_food/tranding-food-4.png"
          alt="Menu 2"
          className="h-full w-full object-cover rounded"
        />
      </div>
    </Block>
  </>
);

const AboutBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug font-semibold">
    <p>
      At our restaurant,{" "}
      <span className="text-zinc-800 font-semibold">
        we believe that every meal should be an experience. From the freshest
        ingredients to the meticulous presentation, every dish is crafted to
        offer a blend of flavors that excite your palate.
      </span>
    </p>
  </Block>
);
const AboutBlock2 = () => (
  <Block className="col-span-12 text-3xl leading-snug font-semibold">
    <p>
      Our chefs{" "}
      <span className="text-zinc-800 font-semibold">
        pour their passion into creating culinary delights, whether it's a
        hearty breakfast, a light lunch, or a lavish dinner. We strive to
        provide an atmosphere where great food and excellent service come
        together to create unforgettable dining moments.
      </span>
    </p>
  </Block>
);
const LocationBlock = () => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
    <FiMapPin className="text-3xl" />
    <p className="text-center text-lg text-zinc-800 font-semibold">Viet Nam</p>
  </Block>
);

const EmailListBlock = () => (
  <Block className="col-span-12 md:col-span-9">
    <p className="mb-3 text-lg font-semibold">Feedback here!</p>
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center gap-2"
    >
      <input
        placeholder="Enter your feedback"
        className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-1.5 transition-colors focus:border-red-300 focus:outline-0"
      />
      <button type="submit" className="whitespace-nowrap text-zinc-900">
        <FbButton />
      </button>
    </form>
  </Block>
);
