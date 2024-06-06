import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/input";
export default function ProfileInput({
  id,
  type,
  placeholder,
  label,
  right,
  left,
}) {
  return (
    <InputGroup>
        {left && (
            <InputLeftAddon
            border="1px solid rgba(255, 255, 255, 0.2)"
            padding="5px 20px"
            backgroundColor="black"
            color="rgba(255, 255, 255, 0.5)"
            borderRadius="5px 0 0 5px">
            {left}
            </InputLeftAddon>
        )}
      <Input
        placeholder={placeholder}
        id={id}
        type={type}
        backgroundColor="black"
        color="white"
        border="0.1px solid rgba(255, 255, 255, 0.2)"
        padding="5px 10px"
        width="100%"
        borderRadius="5px"
        _placeholder={{ color: "gray.500" }}
      />
        {right && (
            <InputRightAddon
            border="1px solid rgba(255, 255, 255, 0.2)"
            padding="3px 10px"
            backgroundColor="black"
            color="rgba(255, 255, 255, 0.5)"
            borderRadius="0 5px 5px 0">
            {right}
            </InputRightAddon>
        )}
    </InputGroup>
  );
}
