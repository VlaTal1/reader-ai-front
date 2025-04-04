import {XStack} from "tamagui";
import React, {FC} from "react";

type Props = {
    backgroundColor: string;
    children: React.ReactNode;
}

const Header: FC<Props> = ({backgroundColor, children}) => (
    <XStack backgroundColor={backgroundColor} width="100%">
        {children}
    </XStack>
)

export default Header;