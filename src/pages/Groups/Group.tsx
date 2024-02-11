import {FC, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Avatar, Box, Stack, SxProps, ToggleButton, ToggleButtonGroup, Typography, useTheme} from "@mui/material";
import {getCurrentUser, UserType} from "../../api/auth.tsx";
import {getGroupById, GroupType} from "../../api/api.tsx";
import CheckIcon from "@mui/icons-material/Check";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";


const ContestsContent: FC = () => {

    return <>
        contests
    </>
}


const MembersContent: FC = () => {

    return <>
        members
    </>
}

const SettingsContent: FC = () => {

    return <>
        settings
    </>
}



const Group: FC = () => {

    const [_user, setUser] = useState<UserType | undefined>();
    const [group, setGroup] = useState<GroupType | undefined>(undefined);

    const navigate = useNavigate();

    const theme = useTheme();

    const {id} = useParams();


    useEffect(() => {
        async function temp() {
            setUser(await getCurrentUser());

            // @ts-ignore
            let group = await getGroupById(parseInt(id));
            console.log(group)
            if (group === undefined) {
                navigate("/NotFound");
            }
            setGroup(group);
        }

        temp();
    }, []);

    const rootStyles: SxProps = {
        borderRadius: "30px",
        backgroundColor: `${theme.palette.surfaceContainerLow.main};`,
        width: "100%",
        height: "100vh",
        display: "flex",
        position: "fixed",
    }

    const userStyles: SxProps = {
        paddingTop: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: `${theme.palette.onSurface.main}`,
        minWidth: "350px",
        marginLeft: "30px"
    }

    const navStyles: SxProps = {
        width: "100%",
        paddingLeft: "60px",
        paddingRight: "300px",
        flexGrow: "grow",
        flexDirection: "column",
        justifyContent: "center",
        display: "flex",
        height: "100%"
    }

    const avatarStyles = {
        width: "300px",
        height: "300px",
        marginBottom: "10px"
    }

    const navButtonsStyles: SxProps = {
        width: "100%",
        paddingBottom: "20px",
        paddingTop: "20px"
    }

    const dataStyles: SxProps = {
        backgroundColor: `${theme.palette.surfaceContainerLowest.main}`,
        borderRadius: "30px",
        height: "100%",
    }

    const [alignment, setAlignment] = useState<string>("contests");

    const [content, setContent] = useState<any>(<ContestsContent/>);

    const handleAlignment = (_event: React.MouseEvent<HTMLElement>,
                             newAlignment: string) => {
        if (newAlignment != null) {
            setAlignment(newAlignment);
            if (newAlignment == "contests") {
                setContent(<ContestsContent/>);
            } else if (newAlignment == "settings") {
                setContent(<SettingsContent/>);
            } else if (newAlignment == "members") {
                setContent(<MembersContent/>)
            }
        }
    };

    const nameStyles: SxProps = {
        width: "300px",
        whiteSpace: "pre-line",
        wordWrap: "break-word",
        overflow: "wrap"
    }

    return <>
        <Box sx={rootStyles}>
            <Box sx={userStyles}>
                <Avatar sx={avatarStyles}>
                    <Typography fontSize="400%">
                        {group?.name[0]}{group?.name[1]}
                    </Typography>
                </Avatar>
                <Box sx={nameStyles}>
                    <Typography fontWeight="bold" variant="h4" sx={{color: `${theme.palette.onSurface.main}`, textAlign:"left"}}>
                        {group?.name}
                    </Typography>
                    <Typography variant="h5" sx={{color: `${theme.palette.outline.main}`}}>
                        {group?.domain === null ? group?._id : group?.domain}
                    </Typography>
                </Box>
            </Box>
            <Box sx={navStyles}>
                <Box sx={navButtonsStyles}>
                    <Stack direction="row" spacing={2}>
                        <ToggleButtonGroup fullWidth={true} exclusive value={alignment} onChange={handleAlignment}>
                            <ToggleButton fullWidth={true} value="contests">
                                {alignment === 'contests' ? <CheckIcon sx={{mr: 1}}/> : <EmojiEventsIcon sx={{mr: 1}}/>}
                                Contests
                            </ToggleButton>
                            <ToggleButton fullWidth={true} value="members">
                                {alignment === 'members' ? <CheckIcon sx={{mr: 1}}/> : <GroupsIcon sx={{mr: 1}}/>}
                                Members
                            </ToggleButton>
                            <ToggleButton fullWidth={true} value="settings">
                                {alignment === 'settings' ? <CheckIcon sx={{mr: 1}}/> : <SettingsIcon sx={{mr: 1}}/>}
                                Settings
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>
                </Box>
                <Box sx={dataStyles}>
                    {content}
                </Box>
            </Box>
        </Box>
    </>
}


export default Group