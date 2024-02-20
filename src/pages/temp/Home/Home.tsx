
import { Stack } from '@mui/material';

import { ButtonsView } from '../../../views/ButtonsView.tsx';
import { AccordionView } from '../../../views/AccordionView.tsx';
import { BaseColorView } from '../../../views/BaseColorView.tsx';
import { IconButtonView } from '../../../views/IconButtonView.tsx';
import { FABView } from '../../../views/FABView.tsx';
import { ToggleButtonGroupView } from '../../../views/ToggleButtonGroupView.tsx';
import { ToggleButtonView } from '../../../views/ToggleButtonView.tsx';
import { BadgeView } from '../../../views/BadgedView.tsx';
import { SwitchView } from '../../../views/SwitchView.tsx';
import { AppBarView } from '../../../views/AppBarView.tsx';
import { AvatarView } from '../../../views/AvatarView.tsx';
import { AlertView } from '../../../views/AlertView.tsx';
import MainContainer from '../../../components/Container/MainContainer.tsx';
import { CardView } from '../../../views/CardView.tsx';

const Home = () => {

    return (
        <>
            <MainContainer>
                <BaseColorView />
                <Stack spacing={6}>
                    <ButtonsView />
                    <IconButtonView />
                    <FABView />
                    <ToggleButtonView />
                    <ToggleButtonGroupView />
                    <SwitchView />
                    <CardView />
                    <BadgeView />
                    <AvatarView />
                    <AppBarView />
                    <AccordionView />
                    <AlertView />
                </Stack >
            </MainContainer>
        </>
    );
};

export default Home;