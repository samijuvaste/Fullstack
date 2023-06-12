import { Female, Male } from "@mui/icons-material";

import { Gender } from "../../types";

interface Props {
  gender: Gender;
}

const GenderIcon = ({ gender }: Props) => {
  switch (gender) {
    case "male":
        return <Male />
    case "female":
        return <Female />
    default:
        return <></>
  }
};

export default GenderIcon;