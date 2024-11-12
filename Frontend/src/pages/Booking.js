import React, { useState } from "react";

const Booking = () => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [note, setNote] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmBooking = () => {
    setIsBookingConfirmed(true);
    setShowModal(false);
  };

  const cancelBooking = () => {
    setShowModal(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Booking Table Reservation
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-900">
            Reservation Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="customerName"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                placeholder="Enter your name"
                type="text"
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="text-gray-800 py-1 mt-1 block w-full rounded-md border-gray-100 border-2 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                placeholder="Enter your phone number"
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-gray-800 py-1 mt-1 block w-full rounded-md border-gray-100 border-2 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                placeholder="Enter your email"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-gray-800 py-1 mt-1 block w-full rounded-md border-gray-100 border-2 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="text-gray-800 py-1 mt-1 block w-full rounded-md border-gray-100 border-2 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700"
              >
                Time
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="text-gray-800 py-1 mt-1 block w-full rounded-md border-gray-100 border-2 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label
                htmlFor="guests"
                className="block text-sm font-medium text-gray-700"
              >
                Number of Guests
              </label>
              <input
                placeholder="Enter number of guests"
                type="number"
                id="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                min="1"
                className="text-gray-800 py-1 mt-1 block w-full rounded-md border-gray-100 border-2 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label
                htmlFor="note"
                className="block text-sm font-medium text-gray-700"
              >
                Note (Optional)
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows="3"
                className="text-gray-800 mt-1 block w-full rounded-md border-gray-100 border-2 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                placeholder="Any special requests or additional information"
              ></textarea>
            </div>
            <div className="flex justify-center overflow-hidden">
              <button
                type="submit"
                className="px-10 py-1 lg:px-64 z-30 lg:py-2 bg-orange-400 rounded-md text-white relative font-semibold after:-z-20 after:absolute after:h-2 after:w-2 after:bg-orange-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#be123c;] hover:[text-shadow:2px_2px_2px_#fda4af] text-2xl"
              >
                Book Table
              </button>
            </div>
          </form>
        </div>

        
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-900">
              Booking Summary
            </h2>
            {isBookingConfirmed && (
            <div className="space-y-2">
              <p className="text-gray-800">
                <span className="font-medium">Name:</span> {customerName}
              </p>
              <p className="text-gray-800">
                <span className="font-medium">Phone:</span> {phoneNumber}
              </p>
              <p className="text-gray-800">
                <span className="font-medium">Email:</span> {email}
              </p>
              <p className="text-gray-800">
                <span className="font-medium">Date:</span> {date}
              </p>
              <p className="text-gray-800">
                <span className="font-medium">Time:</span> {time}
              </p>
              <p className="text-gray-800">
                <span className="font-medium">Guests:</span> {guests}
              </p>
              <p className="text-gray-800">
                <span className="font-medium">Note:</span> {note || "No additional notes"}
              </p>
            </div>
          )}
            <div>
              <img src="/images/logo.webp" alt="booking logo" className="w-2/3 ml-auto" />
            </div>
          </div>
        
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Confirm Booking
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to book this table?
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                  onClick={confirmBooking}
                >
                  Confirm
                </button>
                <button
                  id="cancel-btn"
                  className="mt-3 px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                  onClick={cancelBooking}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
