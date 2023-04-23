import {styled} from "@mui/material";
import StepConnector, {stepConnectorClasses} from "@mui/material/StepConnector";

const CustomisedConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: "#00BFF5",
            height:"5px",
            borderRadius:"10px"
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: "#1976D2",
            borderRadius: 10,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {

        height: 5,
        border: "10px",
        backgroundColor: "#e7e7e7",
        borderRadius: 10,
    },  ".MuiStepConnector-root": {
        fontSize:"10px"
    },
}));
export default CustomisedConnector