import {FC, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    Avatar,
    Box,
    Card, CardActionArea, CardActions, CardContent,
    CardHeader, IconButton,
    Stack,
    SxProps,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    useTheme
} from "@mui/material";
import {getCurrentUser, UserType} from "../../api/auth.tsx";
import {getGroupById, getGroupContests, GroupType} from "../../api/api.tsx";
import CheckIcon from "@mui/icons-material/Check";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MoreVertIcon from "@mui/icons-material/MoreVertOutlined";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MenuIcon from '@mui/icons-material/Menu';

const ContestsContent: FC<{group_id: any}> = (props: {group_id: any}) => {

    const [contests, setContests] = useState<any>([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function setup() {
            setContests( await getGroupContests(props.group_id));
        }
        setup();
    }, []);

    type Props = {
        name: string, description: string, domain: string,
        _id: number, tasks_num: number
    };
    const ContestCard: FC<Props> = (props: Props) => {

        const handleAction = () => {
            navigate(`/Contest/${props._id}`);
        }

        return <Card variant="elevation" sx={{width: "250px", display: "flex", flexDirection: "column"}}>
            <CardHeader
                avatar={<Avatar
                    sx={{background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText}}>
                    {props.name.substring(0, 2)}
                </Avatar>}
                action={
                    <IconButton color="inherit">
                        <MoreVertIcon/>
                    </IconButton>
                }
                // subheader="September 14, 2016"
            />
            <CardActionArea sx={{display: "flex", flexDirection: "column", flexGrow: "1", alignItems: "flex-start", justifyContent: "flex-start"}} onClick={handleAction}>
                <CardContent>
                    <Typography gutterBottom variant="h5" sx={{wrap: "normal"}}>
                        {props.name}
                    </Typography>
                    <Typography variant="body2" flexGrow="1">
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{display: 'flex', justifyContent: 'space-around', paddingRight: "10%"}}>
                <Box sx={{display: "flex", alighItems: "flex-end"}}>
                    <Typography sx={{marginRight: "3px"}} fontWeight="bold">
                        {0} {/*TODO: MAKE it work*/}
                    </Typography>
                    <LightbulbIcon/>
                </Box>
                <Box sx={{display: "flex", alighItems: "flex-end"}}>
                    <Typography sx={{marginRight: "3px"}} fontWeight="bold">
                        {props.tasks_num}
                    </Typography>
                    <MenuIcon/>
                </Box>
            </CardActions>
        </Card>
    }


    const rootStyles: SxProps = {
        paddingLeft: "30px",
        paddingTop: "25px",
        width: "100%"
    }

    const stackStyles: SxProps = {
        display: "flex",
        overflow: "scroll",
    }

    let contests_cards = [];

    for (let i = 0; i < contests.length; ++i) {
        let current_group_domain = contests[i].domain;
        if (current_group_domain === null) {
            current_group_domain = contests[i]._id
        }

        contests_cards.push(
            <ContestCard key={i}
                       name={contests[i].name}
                       description={contests[i].description}
                       domain={current_group_domain}
                       tasks_num={contests[i].tasks.length}
                       _id={contests[i]._id}/>
        )
    }

    return <Box sx={rootStyles}>
        <Typography sx={{paddingBottom: "5px"}} variant="h2" fontWeight="bold">
            Groups contests
        </Typography>
        <Box sx={stackStyles}>
            <Stack direction="row" spacing={2}>
                {contests_cards} {/*FIXME FIXME FIXME here bug when a lot of groups*/}
            </Stack>
        </Box>
    </Box>
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

    const [content, setContent] = useState<any>(<ContestsContent group_id={id}/>);

    const handleAlignment = (_event: React.MouseEvent<HTMLElement>,
                             newAlignment: string) => {
        if (newAlignment != null) {
            setAlignment(newAlignment);
            if (newAlignment == "contests") {
                setContent(<ContestsContent group_id={id}/>);
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
                <Box sx={nameStyles}>
                    <Typography variant="body1">
                        {group?.description}
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