import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette:{
        mode:"dark",
        primary:{
            main:"#ff1744"
        },
        secondary:{
            main:"#b0b0b0"
        },
        black:{
            main:"#242B2E"
        },
        blue:{
            main:"#2196f3"
        },
        background:{
            main:"#000000",
            default:"#0D0D0D",
            paper:"#262626"
        },
        textColor:{
            main:"#111111"
        }
    }
})