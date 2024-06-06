import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Textarea } from "@chakra-ui/textarea";
import ProfileInput from "../ProfileInput";
import { Input } from "@chakra-ui/input";
export default function ProfileInfoes() {
  return (
    <div className="flex flex-col justify-between gap-10 w-full">
      <div className="flex gap-10 ">
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="name">First & Last Name</label>
          <ProfileInput
            id="name"
            type="text"
            placeholder="Marci Fumans"></ProfileInput>
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-1">
            <label htmlFor="date">Date of Birth</label>
            <ProfileInput
              id="date"
              type="datetime-local"
              placeholder="Select Date and Time"
              right={<CalendarTodayIcon />}
              ></ProfileInput>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <ProfileInput
          id="email"
          type="text"
          placeholder="killanjames@gmail.com"
          right={<MailOutlineIcon />}></ProfileInput>
      </div>
      <div className="flex flex-col gap-6 ">
        <div>
          <ProfileInput
            left="https://"
            placeholder="mysite"
            type="text"
            right=".com"></ProfileInput>
        </div>
        <div>
          <ProfileInput
            left="https://"
            placeholder="mysite"
            type="text"
            right=".com"></ProfileInput>
        </div>
        <div>
          <ProfileInput
            left="https://"
            placeholder="mysite"
            type="text"
            right=".com"></ProfileInput>
        </div>
        <div>
          <ProfileInput
            left="https://"
            placeholder="mysite"
            type="text"
            right=".com"></ProfileInput>
        </div>
      </div>
      <div className="">
        <Textarea
          type="text"
          width="100%"
          backgroundColor="black"
          color="white"
          border="1px solid rgba(255, 255, 255, 0.2)"
          paddingBottom="100px"
          paddingTop="10px"
          paddingLeft="20px"
          paddingRight="10px"
          borderRadius="5px"
          _placeholder={{ color: "gray.700" }}
          placeholder="Here is a sample placeholder"
        />
      </div>
      <div>
        <ProfileInput
          left={<Input backgroundColor="black" placeholder="Company"color="white"/>}
          placeholder="Description"
          type="text"></ProfileInput>
      </div>
    </div>
  );
}
