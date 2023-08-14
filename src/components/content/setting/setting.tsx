import { Box } from "@mui/material";
import BranchSettingBox from "../../common/box/branchSettingBox/branchSettingBox";
import MemberSettingBox from "../../common/box/memberSettingBox/memberSettingBox";
import DangerZoneBox from "../../common/box/dangerZoneBox/dangerZoneBox";

export default function Setting() {
  return(
    <Box display='block'>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ rowGap: 5, mx: 20, py: 5, pt: 0, overflow: "auto", height:"830px" }}
      >
        <BranchSettingBox/>
        <MemberSettingBox/>
        <DangerZoneBox/>
      </Box>
    </Box>
  );
}