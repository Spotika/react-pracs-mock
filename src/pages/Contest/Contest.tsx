import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
    Avatar,
    Box, Button,
    Stack,
    SxProps,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    useTheme
} from "@mui/material";
import {getCurrentUser, UserType} from "../../api/auth.tsx";
import {ContestType, getContestById} from "../../api/api.tsx";
import CheckIcon from "@mui/icons-material/Check";
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuIcon from '@mui/icons-material/Menu';
import { Editor } from "@monaco-editor/react";
import { ThemeModeContext } from "../../Theme/index.ts";
import { useContext } from "react";

const ResultContent: FC = () => {

    return <>
        result
    </>
}


const TasksContent: FC = () => {

    const [tasks, setTasks] = useState<number[]>([]);
    const [taskText, setTaskText] = useState(
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae dicta, distinctio dolores eos iure libero omnis, perferendis perspiciatis placeat quas ut veniam! Animi assumenda beatae consequatur debitis deleniti deserunt dolores enim et, harum illum ipsam ipsum libero pariatur quas quasi quis quo, quod repellendus totam vitae. Aliquam amet animi beatae commodi cupiditate debitis dolorem eius, eos eveniet exercitationem impedit incidunt, ipsa iure maiores modi neque nesciunt nobis nostrum officia quisquam rem repudiandae rerum soluta, velit veritatis. Atque dignissimos dolore ducimus earum, excepturi illo laboriosam laborum laudantium libero minus necessitatibus odit quae quasi repellat sunt temporibus voluptatibus! Dignissimos dolore dolores, esse id laborum magnam omnis quia veritatis voluptas. Ab alias animi architecto asperiores at delectus eligendi esse et ex expedita illo incidunt iste itaque iure magnam maiores nisi nostrum optio possimus quaerat qui reiciendis temporibus ullam veritatis, voluptatem. Accusamus aliquid ipsa libero maiores quam suscipit tenetur vel! A dolorem, quia? Accusamus animi aperiam consequuntur deleniti dignissimos hic illum incidunt, laboriosam laborum laudantium minima molestiae, nesciunt pariatur quidem reprehenderit sapiente voluptas! Ab beatae blanditiis commodi deleniti, eum eveniet fugit hic illum numquam odio officiis optio quam quasi quibusdam repellendus temporibus vitae voluptatibus. Accusantium at enim excepturi harum hic perferendis provident reiciendis rem sapiente similique? Assumenda aut corporis, cupiditate dicta doloremque dolores eaque esse est excepturi, ipsam, laboriosam maxime minima nam necessitatibus nihil obcaecati odio praesentium quibusdam quis recusandae repellendus similique soluta? Aliquid aperiam blanditiis dolorem eligendi esse eum eveniet expedita fugit harum inventore ipsam ipsum labore laborum, laudantium magnam maiores molestiae nam necessitatibus nostrum, odio omnis quasi quis quo repellat sapiente similique suscipit tempora, voluptas voluptatibus voluptatum? Deserunt eius excepturi fuga impedit iste labore laboriosam laudantium, maiores minima modi nesciunt numquam placeat praesentium quibusdam reiciendis rem, veniam vitae. Ad consectetur culpa magnam unde. Architecto aspernatur cupiditate dicta doloremque, est eveniet explicabo harum, id ipsam itaque libero necessitatibus pariatur possimus quo recusandae ullam unde ut veritatis. Animi architecto aut cum debitis delectus deserunt dolor dolore dolores ducimus eligendi enim est, ex hic in incidunt ipsam, iste libero magnam minus molestiae nam necessitatibus numquam officia pariatur perspiciatis quae quibusdam quidem quis recusandae repellat repellendus repudiandae suscipit tempora tempore tenetur velit vero. Alias aliquid amet aspernatur consequuntur, culpa dicta ducimus enim excepturi exercitationem facere in incidunt inventore ipsum laboriosam laudantium magni, nam non nulla obcaecati officia optio quidem quod recusandae sequi, unde. Ab accusamus ad minima nostrum possimus. Aliquid architecto explicabo labore magni modi mollitia nulla obcaecati perferendis ullam voluptatum? Alias culpa cupiditate est iure pariatur, repellat voluptate. Ab beatae consectetur fugit numquam rem similique totam? Ab accusamus aliquam autem blanditiis cum deserunt dicta dignissimos, doloremque ea eius eligendi ex excepturi fugiat hic illo itaque magni molestias, necessitatibus nihil numquam obcaecati omnis perferendis provident ratione repellat tenetur ut veniam. Ab accusantium architecto autem beatae consequuntur cum debitis doloremque ea est expedita facilis fugiat harum inventore itaque magnam magni maiores, molestiae molestias nam numquam officiis perspiciatis quidem recusandae reprehenderit sapiente, suscipit veniam voluptas! Alias commodi facere illo iusto libero, modi nemo nulla officia placeat quasi repellendus tempore voluptates voluptatum? Beatae delectus ducimus itaque iusto molestiae recusandae sapiente soluta voluptatem. Adipisci enim, nihil. A architecto asperiores aspernatur assumenda, autem beatae dolores eos et, ex explicabo illo magnam officia, omnis quas quisquam repellendus repudiandae ullam vitae! A adipisci aut deleniti deserunt dignissimos dolor doloribus eum facere hic illo illum ipsam ipsum iure laudantium maiores minima minus non odio officia perferendis quasi qui quisquam recusandae, reprehenderit sint! A adipisci architecto asperiores beatae blanditiis consequuntur corporis, culpa cum delectus doloribus ex expedita explicabo fuga impedit ipsa laboriosam laudantium libero minus nam natus nobis obcaecati odio officiis optio pariatur perferendis praesentium quam quod quos recusandae repellendus tenetur unde vero? Animi exercitationem iusto minus nulla obcaecati officia perferendis velit! Inventore laudantium nostrum officiis placeat praesentium. Accusamus amet aspernatur consequuntur cum, dicta distinctio doloribus enim excepturi id impedit in pariatur quas quisquam quo quod repellat repudiandae sed sint! Aut doloremque earum ipsam laudantium modi provident sapiente voluptates? Corporis et odio pariatur perferendis porro sint? Cum maiores suscipit voluptates. Aut autem dicta, est harum illum, ipsa ipsam ipsum magni nemo odio porro, quam quia quidem soluta vitae. Adipisci aliquam amet animi aspernatur atque beatae consectetur delectus dignissimos dolore doloremque doloribus explicabo fugiat fugit in incidunt inventore iste, minima molestiae mollitia nemo neque nobis non nostrum obcaecati officiis optio perspiciatis porro quibusdam repellendus tempore temporibus ullam ut vel voluptas voluptatem voluptates voluptatibus? Ad aliquam aliquid aperiam cum cumque, cupiditate dicta distinctio dolorem doloremque ducimus est eum excepturi fuga in incidunt laboriosam magnam maxime minus omnis perspiciatis quam quasi quia quibusdam quisquam reiciendis rem repellat reprehenderit rerum sed tempora ullam unde veritatis voluptatibus. Accusamus aspernatur at atque commodi corporis cum dicta dignissimos dolor dolore doloremque doloribus eius eligendi eos eum, fugiat inventore ipsum iste itaque iure libero modi necessitatibus neque nostrum quaerat quas quasi quibusdam repudiandae, sed sequi similique sint tempora temporibus tenetur totam vitae voluptas voluptatibus. Ad aliquam aperiam dolorum magni minus nobis officiis perferendis suscipit! Adipisci aliquid animi consequuntur explicabo illum magni neque quidem, quo rerum voluptatum. Aliquam aperiam architecto aspernatur assumenda beatae blanditiis consequatur cupiditate delectus dolor dolorem eaque explicabo, illo in laboriosam laudantium modi, molestias nemo nesciunt nihil nostrum pariatur quam qui quia quos repellat saepe sequi tempora tempore veritatis voluptatum. Aperiam corporis dolorum, eaque enim nam saepe. Adipisci aliquid aut autem beatae consequuntur culpa cumque deleniti deserunt dolore expedita facilis illo labore minima nemo, nobis nulla officia perferendis, perspiciatis quam ratione sint temporibus totam ut? Aspernatur at autem beatae dolorem eligendi excepturi, fuga labore nesciunt, odit placeat sequi vero voluptates! Amet assumenda cupiditate deleniti eaque, earum impedit magnam natus nesciunt numquam optio reiciendis sapiente, totam voluptas. Accusantium alias animi delectus doloremque, eius eligendi in iure molestias nostrum repellat totam voluptatem? Aperiam numquam quae quaerat voluptatum. Commodi dolor dolorum error in magnam nesciunt omnis quaerat voluptatibus. Ad adipisci assumenda, blanditiis consequuntur culpa esse eum eveniet ex exercitationem incidunt laudantium minus modi mollitia pariatur placeat quae quam quas qui quidem quis quo rem sed similique totam ullam, voluptas voluptate? Dolorem et officia temporibus!"
    )
    const theme = useTheme();
    const { toggleTheme, themeMode, setThemeMode } = useContext(ThemeModeContext);

    const [currentState, setCurrentState] = useState(0);

    const [code, setCode] = useState("")

    useEffect(() => {
        setTasks([1, 2, 3, 4, 5, 6, 7, 8]);
    }, []);

    const rootStyles: SxProps = {
        padding: "40px",
        height: "100%",
        marginBottom: "40px"
    }

    const navStyles: SxProps = {
        display: "flex",
        marginBottom: "30px",
        overflow: "scroll"
    }

    const taskStyles: SxProps = {
        backgroundColor: `${theme.palette.surfaceContainerHigh.main}`,
        borderRadius: "30px",
        overflow: "scroll",
        padding: "20px",
        height: "100%",
        paddingBottom: "150px"
    }

    let states_num = 10;
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    const handleChangeState = (e: any) => {
        setCurrentState(e.target.value)
    }

    const navButtons = [];
    for (let i = 0; i < states_num; ++i) {
        navButtons.push(
            <Button key={i} value={i} variant={currentState == i ? "filled" : "outlined"} color="secondary" onClick={handleChangeState}>{alphabet[i]}</Button>
        )
    }

    const handleSubmit = () => {
        console.log(currentState);
    }

    return <Box sx={rootStyles}>
        <Box sx={navStyles}>
            <Stack spacing={2} direction="row">
                {navButtons}
            </Stack>
        </Box>
        <Box sx={taskStyles}>
            <Box sx={{
                marginBottom: "20px"
            }}>
                <Typography variant="h3" fontWeight="bold" mb="20px">
                    {alphabet[currentState]}. Задача говна
                </Typography>
                <Typography variant="h5">
                    {tasks[currentState]}
                </Typography>
            </Box>
            <Box sx={{
                borderRadius: "30px",
                height: "500px",
                overflow: "hidden",
                width: "800px",
                marginBottom: "20px",
            }}>
                <Editor
                    options={{
                        fontSize: 20,
                        formatOnType: true,
                    }}
                    theme={themeMode == "light" ? "" : "vs-dark" }
                    height="100%"
                    width="100%"
                    language="cpp"
                    value={code}
                    onChange={(code: any) => setCode(code)}
                    />
            </Box>
            <Button variant="filled" onClick={handleSubmit}>Submit</Button>
        </Box>
    </Box>
}


const Contest: FC = () => {

    const [_user, setUser] = useState<UserType | undefined>();
    const [contest, setContest] = useState<ContestType | undefined>(undefined);

    // const navigate = useNavigate();

    const theme = useTheme();

    const {id} = useParams();


    useEffect(() => {
        async function temp() {
            setUser(await getCurrentUser());
            // @ts-ignore
            setContest(await getContestById(parseInt(id)));
        }

        temp();
    }, []);

    const rootStyles: SxProps = {
        borderRadius: "30px",
        backgroundColor: `${theme.palette.surfaceContainerLow.main};`,
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        position: "fixed",
        // paddingBottom: "100px"
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
        position: "static"
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
        height: "100vh",
        // overflow: "scroll",
        paddingBottom: "100px"
    }

    const [alignment, setAlignment] = useState<string>("tasks");

    const [content, setContent] = useState<any>(<TasksContent/>);
    //
    const handleAlignment = (_event: React.MouseEvent<HTMLElement>,
                             newAlignment: string) => {
        if (newAlignment != null) {
            setAlignment(newAlignment);
            if (newAlignment == "tasks") {
                setContent(<TasksContent/>);
            } else if (newAlignment == "result") {
                setContent(<ResultContent/>);
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
                        {contest?.name[0]}{contest?.name[1]}
                    </Typography>
                </Avatar>
                <Box sx={nameStyles}>
                    <Typography fontWeight="bold" variant="h4" sx={{color: `${theme.palette.onSurface.main}`, textAlign:"left"}}>
                        {contest?.name}
                    </Typography>
                </Box>
                <Box sx={nameStyles}>
                    <Typography variant="body1">
                        {contest?.description}
                    </Typography>
                </Box>
            </Box>
            <Box sx={navStyles}>
                <Box sx={navButtonsStyles}>
                    <Stack direction="row" spacing={2}>
                        <ToggleButtonGroup fullWidth={true} exclusive value={alignment} onChange={handleAlignment}>
                            <ToggleButton fullWidth={true} value="tasks">
                                {alignment === 'tasks' ? <CheckIcon sx={{mr: 1}}/> : <MenuIcon sx={{mr: 1}}/>}
                                Tasks
                            </ToggleButton>
                            <ToggleButton fullWidth={true} value="result">
                                {alignment === "result" ? <CheckIcon sx={{mr: 1}}/> : <ListAltIcon sx={{mr: 1}}/>}
                                Result
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>
                </Box>
                <Box sx={dataStyles}>
                    {/*{content}*/}
                    <TasksContent/>
                </Box>
            </Box>
        </Box>
    </>
}


export default Contest