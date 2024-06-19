export default function OrdersCard() {
  return (
    <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
      <div className="img-box max-lg:w-full">
        <img
          src="https://pagedone.io/asset/uploads/1701167607.png"
          alt="Premium Watch image"
          className="aspect-square w-full lg:max-w-[140px]"
        />
      </div>
      <div className="flex flex-row items-center w-full ">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          <div className="flex items-center">
            <div className="">
              <h2 className="font-semibold text-xl leading-8 mb-3">
                Premium Quality Dust Watch
              </h2>
              <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                By: Dust Studios
              </p>
            </div>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
              <div className="flex gap-3 lg:block">
                <p className="font-medium leading-7">price</p>
                <p className="lg:mt-4 font-medium leading-7 text-purple">
                  $100
                </p>
              </div>
            </div>
            <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
              <div className="flex gap-3 lg:block">
                <p className="font-medium leading-7">Status</p>
                <p className="font-medium leading-6 whitespace-nowrap py-3 px-6 rounded-full lg:mt-3 text-emerald-50 bg-emerald-600">
                  Ready for Delivery
                </p>
              </div>
            </div>
            <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
              <div className="flex gap-3 lg:block">
                <p className="font-medium whitespace-nowrap leading-6">
                  Expected Delivery Time
                </p>
                <p className="font-medium whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                  23rd March 2021
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
