const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <div className="w-full h-24 bg-[#0e4152] flex p-5">
        <p className="text-white phone:text-sm">
          All Rights Reserved © Yaticare {year} &nbsp;{" "}
        </p>
        <select name="" id="" className="w-40 h-5 phone:w-36">
          <option value="">Select language</option>
          <option value="">English</option>
        </select>
      </div>
    </>
  );
};

export default Footer;
