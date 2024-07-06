import React, { useState } from "react";
import { Button } from "./ui";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  DatePicker,
  TimeInput,
} from "@nextui-org/react";
import { Time } from "@internationalized/date";
import { today, getLocalTimeZone } from "@internationalized/date";
import toast from "react-hot-toast";
import { axiosInstance } from "../Axios/AxiosInstance";

export default function Hero() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isopen, setIsOpen] = useState(false);
  let [date, setDate] = useState(today(getLocalTimeZone()));
  const [time, setTime] = useState(new Time(11, 45));

  const [formData, setformData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setformData({
      ...formData,
      [name]: value,
    });
  };

  const action = () => {
    console.log(formData, date, time);
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(formData).every((value) => value !== "");
    try {
      if (isValid && date !== "" && time !== "") {
        const appointment = date.year + "-" + date.month + "-" + date.day;
        const appTime = time.hour + ":" + time.minute;
        const data = new FormData();

        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("time", appTime);
        data.append("date", appointment);

        toast.promise(
          axiosInstance.post(`/gateway/book/`, data).then((res) => {
            if (res.data) {
              setIsOpen(false);
            }
          }),

          {
            loading: "please wait...", // Message shown while waiting for the response
            success: "Booking successful!", // Message shown on successful login
            error: "failed", // Message shown on login failure
          }
        );
      } else {
        toast.error("fill all fields");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setformData({
        name: "",
        email: "",
        phone: "",
      });
      setTime(new Time(11, 45));
    }
  };

  return (
    <div className="pd:pb-[90px] mx-auto flex max-w-screen-xl flex-col-reverse items-center justify-between gap-4 px-3 pb-10 pt-[80px] md:flex-row lg:gap-[72px] lg:px-0 lg:pt-[108px]">
      <div className="mt-10 flex flex-col items-start gap-6 md:mt-0">
        <h5 className="font-poppins text-[22px] font-medium tracking-[0.44px] text-secondary">
          Dr. Matthew Anderson
        </h5>
        <h1 className="font-poppins text-4xl font-bold text-[#031432] md:text-5xl md:leading-[120%]">
          A dedicated doctor <br />
          you can trust
        </h1>
        <p className="max-w-[452px] text-para">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
          eget vel, nunc nulla feugiat. Metus ut.
        </p>
        <Button onClick={() => setIsOpen(true)} title="Book an appointment" />
      </div>

      <div className="max-h-[506px] max-w-[678px]">
        <img
          className="custom-animate size-full object-contain"
          src="/hero.png"
          alt="Hero"
        />
      </div>
      <Modal size={"lg"} isOpen={isopen} isDismissable={true}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Book your appointment here
              </ModalHeader>
              <form onSubmit={handleSubmit}>
                <ModalBody>
                  <div className="flex flex-col gap-5">
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      size={"sm"}
                      type="text"
                      label="Name"
                      placeholder="Enter your Full Name"
                    />
                    <div className="flex flex-row gap-3">
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        size={"sm"}
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                      />
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        size={"sm"}
                        type="text"
                        label="Phone"
                        placeholder="Enter your Ph.no"
                      />
                    </div>
                    <div className="flex flex-row gap-3">
                      <DatePicker
                        value={date}
                        onChange={setDate}
                        label="Birth date"
                        className="max-w-[284px]"
                      />
                      <TimeInput
                        value={time}
                        onChange={setTime}
                        label="Event Time"
                        defaultValue={new Time(11, 45)}
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <button
                    className="w-20 rounded-xl bg-rose-500 p-2 font-semibold text-white"
                    onClick={action}
                  >
                    close
                  </button>
                  <button
                    type="submit"
                    className="w-20 rounded-xl bg-sky-600 p-2 font-semibold text-white"
                  >
                    Book
                  </button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
