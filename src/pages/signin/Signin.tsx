import {FC, useState} from "react";
import {Box, SxProps} from "@mui/material";
import TextField from "@mui/material/TextField"
import {Button} from "@mui/material";
import Endpoints from "../../api/endpoints";
import axios from "axios"
import {setTokens} from "../../api/auth";
import { useNavigate } from "react-router-dom";

const Signin: FC = () => {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e: any) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.get(Endpoints.AUTH_SIGNIN, {
                params: {
                    login: credentials.email,
                    password: credentials.password,
                    login_type: "email"
                }
            });

            setTokens(response.data.response.access_token, response.data.response.refresh_token);

            navigate("/Home");
        } catch (e) {
            // TODO: добавить оповещения
            alert("Неправильный логин или пароль")
        }
    }


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
        <form onSubmit={handleSubmit}>
            <Box sx={rootStyles}>
                <Box sx={inputStyles}>
                    <TextField
                        type="email"
                        name="email"
                        label="Логин"
                        variant="outlined"
                        sx={{
                            marginBottom: "25px"
                        }}
                        fullWidth={true}
                        onChange={handleChange}
                        value={credentials.email}
                        />
                    <TextField
                        name="password"
                        type="password"
                        label="Пароль"
                        variant="outlined"
                        fullWidth={true}
                        onChange={handleChange}
                        value={credentials.password}
                        />
                </Box>
                <Box sx={buttonStyles}>
                    <Button variant="outlined" onClick={() => {
                        setTokens("", "");
                    }}>Регистрация</Button>
                    <Button variant="filled" type="submit">Войти</Button>
                </Box>
            </Box>
        </form>
    </>
}

export default Signin