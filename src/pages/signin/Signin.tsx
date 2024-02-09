import {FC} from "react";
import {Box, SxProps} from "@mui/material";
import TextField from "@mui/material/TextField"
import {Button} from "@mui/material";

const Signin: FC = () => {

    const rootStyles: SxProps = {
        width: "330px",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }

    const inputStyles: SxProps = {
        paddingTop: "40px",
        display: "flex",
        width: "254px",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: "1",
    }

    const buttonStyles: SxProps = {
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
        marginBottom: "40px",
    }

    return <>
        <Box sx={rootStyles}>
            <Box sx={inputStyles}>
                <TextField
                    type="email"
                    label="Логин"
                    variant="outlined"
                    sx={{
                        marginBottom: "25px"
                    }}
                    fullWidth={true}
                />
                <TextField
                    type="password"
                    label="Пароль"
                    variant="outlined"
                    fullWidth={true}
                />
            </Box>
            <Box sx={buttonStyles}>
                <Button variant="outlined" disabled>Регистрация</Button>
                <Button variant="filled" type="submit">Войти</Button>
            </Box>
        </Box>
    </>
}

export default Signin